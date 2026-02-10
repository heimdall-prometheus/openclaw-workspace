"""
ZF Windows Remote Agent
Lightweight FastAPI server for remote desktop control.
Runs on the Windows target PC, controlled by OpenClaw via Tailscale.
"""

import sys
import types

# Block cv2 from loading — we use mss for screenshots, not pyscreeze/cv2.
# This prevents numpy 1.x/2.x compatibility crashes.
# Must intercept at meta_path level to prevent the real cv2 package from loading.
class _BlockCV2Importer:
    """Import hook that returns a dummy cv2 module."""
    def find_module(self, fullname, path=None):
        if fullname == "cv2" or fullname.startswith("cv2."):
            return self
        return None
    def load_module(self, fullname):
        if fullname in sys.modules:
            return sys.modules[fullname]
        mod = types.ModuleType(fullname)
        mod.__version__ = "0.0.0"
        mod.__path__ = []
        mod.__file__ = "blocked"
        sys.modules[fullname] = mod
        return mod

sys.meta_path.insert(0, _BlockCV2Importer())

import base64
import io
import time
import subprocess

from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel, Field
from typing import Optional

import pyautogui
import mss
from PIL import Image

# Safety: disable pyautogui fail-safe (move mouse to corner to abort)
pyautogui.FAILSAFE = True
# Small pause between actions for stability
pyautogui.PAUSE = 0.05

app = FastAPI(title="ZF Windows Remote Agent", version="0.1.0")


# --- Models ---

class ClickRequest(BaseModel):
    x: int
    y: int
    button: str = "left"  # left, right, middle
    clicks: int = 1

class TypeRequest(BaseModel):
    text: str
    interval: float = 0.02  # seconds between keystrokes

class KeyRequest(BaseModel):
    keys: str  # e.g. "ctrl+c", "enter", "alt+tab"

class ScrollRequest(BaseModel):
    x: int
    y: int
    clicks: int  # positive = up, negative = down

class DragRequest(BaseModel):
    start_x: int
    start_y: int
    end_x: int
    end_y: int
    duration: float = 0.5
    button: str = "left"

class MoveRequest(BaseModel):
    x: int
    y: int

class ScreenshotRequest(BaseModel):
    region: Optional[dict] = None  # {"x": 0, "y": 0, "width": 800, "height": 600}
    quality: int = Field(default=70, ge=10, le=100)
    max_width: int = Field(default=1920, ge=100, le=3840)


# --- Endpoints ---

@app.get("/health")
async def health():
    """Health check."""
    screen_size = pyautogui.size()
    return {
        "status": "ok",
        "screen_width": screen_size[0],
        "screen_height": screen_size[1],
        "timestamp": time.time()
    }


@app.post("/screenshot")
@app.get("/screenshot")
async def screenshot(req: Optional[ScreenshotRequest] = None):
    """Capture screenshot, return as JPEG bytes."""
    if req is None:
        req = ScreenshotRequest()
    
    with mss.mss() as sct:
        if req.region:
            monitor = {
                "left": req.region.get("x", 0),
                "top": req.region.get("y", 0),
                "width": req.region.get("width", 800),
                "height": req.region.get("height", 600),
            }
        else:
            monitor = sct.monitors[0]  # Full virtual screen
        
        img = sct.grab(monitor)
        pil_img = Image.frombytes("RGB", img.size, img.bgra, "raw", "BGRX")
    
    # Resize if too large
    if pil_img.width > req.max_width:
        ratio = req.max_width / pil_img.width
        new_height = int(pil_img.height * ratio)
        pil_img = pil_img.resize((req.max_width, new_height), Image.LANCZOS)
    
    # Encode as JPEG
    buf = io.BytesIO()
    pil_img.save(buf, format="JPEG", quality=req.quality)
    buf.seek(0)
    
    return Response(content=buf.read(), media_type="image/jpeg")


@app.post("/screenshot/b64")
async def screenshot_b64(req: Optional[ScreenshotRequest] = None):
    """Capture screenshot, return as base64 string."""
    if req is None:
        req = ScreenshotRequest()
    
    response = await screenshot(req)
    b64 = base64.b64encode(response.body).decode()
    return {"image_base64": b64, "content_type": "image/jpeg"}


@app.post("/click")
async def click(req: ClickRequest):
    """Click at coordinates."""
    pyautogui.click(x=req.x, y=req.y, button=req.button, clicks=req.clicks)
    return {"status": "ok", "action": "click", "x": req.x, "y": req.y}


@app.post("/double_click")
async def double_click(req: ClickRequest):
    """Double-click at coordinates."""
    pyautogui.doubleClick(x=req.x, y=req.y, button=req.button)
    return {"status": "ok", "action": "double_click", "x": req.x, "y": req.y}


@app.post("/type")
async def type_text(req: TypeRequest):
    """Type text with keyboard."""
    pyautogui.typewrite(req.text, interval=req.interval) if req.text.isascii() else pyautogui.write(req.text)
    return {"status": "ok", "action": "type", "length": len(req.text)}


@app.post("/type_unicode")
async def type_unicode(req: TypeRequest):
    """Type text including unicode (German umlauts etc.) via clipboard."""
    import subprocess
    # Copy to clipboard, then paste
    subprocess.run(
        ["powershell", "-command", f"Set-Clipboard -Value '{req.text}'"],
        capture_output=True
    )
    pyautogui.hotkey("ctrl", "v")
    time.sleep(0.1)
    return {"status": "ok", "action": "type_unicode", "length": len(req.text)}


@app.post("/key")
async def press_key(req: KeyRequest):
    """Press key combination (e.g. 'ctrl+c', 'enter', 'alt+tab')."""
    keys = [k.strip() for k in req.keys.split("+")]
    if len(keys) == 1:
        pyautogui.press(keys[0])
    else:
        pyautogui.hotkey(*keys)
    return {"status": "ok", "action": "key", "keys": req.keys}


@app.post("/scroll")
async def scroll(req: ScrollRequest):
    """Scroll at coordinates. Positive clicks = up, negative = down."""
    pyautogui.moveTo(req.x, req.y)
    pyautogui.scroll(req.clicks)
    return {"status": "ok", "action": "scroll", "clicks": req.clicks}


@app.post("/drag")
async def drag(req: DragRequest):
    """Drag from start to end coordinates."""
    pyautogui.moveTo(req.start_x, req.start_y)
    pyautogui.drag(
        req.end_x - req.start_x,
        req.end_y - req.start_y,
        duration=req.duration,
        button=req.button
    )
    return {"status": "ok", "action": "drag"}


@app.post("/move")
async def move(req: MoveRequest):
    """Move mouse to coordinates."""
    pyautogui.moveTo(req.x, req.y)
    return {"status": "ok", "action": "move", "x": req.x, "y": req.y}


@app.get("/mouse")
async def mouse_position():
    """Get current mouse position."""
    pos = pyautogui.position()
    return {"x": pos[0], "y": pos[1]}


@app.get("/screen")
async def screen_info():
    """Get screen dimensions + DPI info."""
    size = pyautogui.size()
    with mss.mss() as sct:
        mon = sct.monitors[0]
        phys_w, phys_h = mon["width"], mon["height"]
    return {
        "logical_width": size[0], "logical_height": size[1],
        "physical_width": phys_w, "physical_height": phys_h,
        "scale_x": phys_w / size[0] if size[0] else 1,
        "scale_y": phys_h / size[1] if size[1] else 1,
    }


if __name__ == "__main__":
    import uvicorn
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8888
    print(f"🖥️ ZF Windows Remote Agent starting on port {port}")
    print(f"📐 Screen: {pyautogui.size()}")
    print(f"🔒 Bind: 0.0.0.0 (use Tailscale for secure access)")
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True, reload_dirs=["."])
