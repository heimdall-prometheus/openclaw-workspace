#!/usr/bin/env python3
"""
Windows Remote Control CLI
Usage:
  wr.py screenshot [--save PATH] [--quality Q] [--max-width W]
  wr.py click X Y [--button left|right] [--clicks N]
  wr.py double_click X Y
  wr.py type TEXT
  wr.py type_unicode TEXT
  wr.py key KEYS  (e.g. "ctrl+c", "enter", "alt+tab")
  wr.py scroll X Y CLICKS
  wr.py drag X1 Y1 X2 Y2 [--duration D]
  wr.py move X Y
  wr.py mouse
  wr.py screen
  wr.py health
"""

import sys
import json
import urllib.request
import urllib.error
import os

AGENT_HOST = os.environ.get("WR_HOST", "100.121.240.14")
AGENT_PORT = os.environ.get("WR_PORT", "8888")
BASE_URL = f"http://{AGENT_HOST}:{AGENT_PORT}"


def api_get(path):
    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def api_post(path, data=None):
    url = f"{BASE_URL}{path}"
    body = json.dumps(data or {}).encode()
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as resp:
        ct = resp.headers.get("content-type", "")
        raw = resp.read()
        if "image/" in ct:
            return raw  # binary
        return json.loads(raw)


def api_get_binary(path):
    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read()


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    cmd = sys.argv[1]
    
    try:
        if cmd == "health":
            print(json.dumps(api_get("/health"), indent=2))
        
        elif cmd == "screen":
            print(json.dumps(api_get("/screen"), indent=2))
        
        elif cmd == "mouse":
            print(json.dumps(api_get("/mouse"), indent=2))
        
        elif cmd == "screenshot":
            save_path = "/tmp/wr-screenshot.jpg"
            quality = 70
            max_width = 1920
            
            i = 2
            while i < len(sys.argv):
                if sys.argv[i] == "--save":
                    save_path = sys.argv[i + 1]; i += 2
                elif sys.argv[i] == "--quality":
                    quality = int(sys.argv[i + 1]); i += 2
                elif sys.argv[i] == "--max-width":
                    max_width = int(sys.argv[i + 1]); i += 2
                else:
                    i += 1
            
            data = api_post("/screenshot", {"quality": quality, "max_width": max_width})
            with open(save_path, "wb") as f:
                f.write(data)
            size_kb = len(data) / 1024
            print(f"Screenshot saved: {save_path} ({size_kb:.0f} KB)")
        
        elif cmd == "click":
            x, y = int(sys.argv[2]), int(sys.argv[3])
            button = "left"
            clicks = 1
            i = 4
            while i < len(sys.argv):
                if sys.argv[i] == "--button":
                    button = sys.argv[i + 1]; i += 2
                elif sys.argv[i] == "--clicks":
                    clicks = int(sys.argv[i + 1]); i += 2
                else:
                    i += 1
            print(json.dumps(api_post("/click", {"x": x, "y": y, "button": button, "clicks": clicks})))
        
        elif cmd == "double_click":
            x, y = int(sys.argv[2]), int(sys.argv[3])
            print(json.dumps(api_post("/double_click", {"x": x, "y": y})))
        
        elif cmd == "type":
            text = " ".join(sys.argv[2:])
            print(json.dumps(api_post("/type", {"text": text})))
        
        elif cmd == "type_unicode":
            text = " ".join(sys.argv[2:])
            print(json.dumps(api_post("/type_unicode", {"text": text})))
        
        elif cmd == "key":
            keys = sys.argv[2]
            print(json.dumps(api_post("/key", {"keys": keys})))
        
        elif cmd == "scroll":
            x, y, clicks = int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
            print(json.dumps(api_post("/scroll", {"x": x, "y": y, "clicks": clicks})))
        
        elif cmd == "drag":
            x1, y1, x2, y2 = int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
            duration = 0.5
            if "--duration" in sys.argv:
                idx = sys.argv.index("--duration")
                duration = float(sys.argv[idx + 1])
            print(json.dumps(api_post("/drag", {"start_x": x1, "start_y": y1, "end_x": x2, "end_y": y2, "duration": duration})))
        
        elif cmd == "move":
            x, y = int(sys.argv[2]), int(sys.argv[3])
            print(json.dumps(api_post("/move", {"x": x, "y": y})))
        
        else:
            print(f"Unknown command: {cmd}")
            print(__doc__)
            sys.exit(1)
    
    except urllib.error.URLError as e:
        print(f"ERROR: Cannot connect to agent at {BASE_URL}: {e}")
        print("Is the agent running on the Windows PC? (start.bat)")
        sys.exit(1)
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
