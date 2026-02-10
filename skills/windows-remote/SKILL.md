---
name: windows-remote
description: Remote-control a Windows PC via screenshot-action loop. Take screenshots, analyze with vision, click, type, scroll, drag. Use when controlling Windows desktop applications remotely, automating UI workflows on Windows, or when the user mentions "Windows fernsteuern," "Windows remote," "Evident," or "ZahnarztFlüsterer."
---

# Windows Remote Control

Control a Windows PC running the ZF Agent via Tailscale.

## Architecture

```
OpenClaw (this machine)          Windows PC (hermes)
├─ wr.py (CLI client)    ◄─Tailscale─►  agent.py (FastAPI)
├─ screenshot → vision               ├─ mss (screenshots)
├─ decide action                     ├─ pyautogui (input)
└─ send command                      └─ uvicorn --reload
```

**Agent Host:** `100.121.240.14` (hermes) Port `8888`
**Deployment:** Syncthing auto-syncs `skills/windows-remote/agent/` to Windows.

## Setup (One-Time on Windows)

1. Ensure Python 3.10+ is installed
2. Navigate to the synced `skills/windows-remote/agent/` folder
3. Run `start.bat` (installs deps + starts agent with auto-reload)

## Control Loop

The core workflow for UI automation:

```
1. Take screenshot     →  python3 scripts/wr.py screenshot --save /tmp/screen.jpg
2. Analyze with vision →  image tool: "Describe the UI, find element X at coordinates"
3. Execute action      →  python3 scripts/wr.py click 450 320
4. Verify              →  python3 scripts/wr.py screenshot --save /tmp/screen2.jpg
5. Repeat until done
```

## CLI Reference (scripts/wr.py)

All commands use `python3 scripts/wr.py <command>` from the skill directory.

| Command | Args | Description |
|---------|------|-------------|
| `health` | — | Check agent status + screen size |
| `screen` | — | Get screen dimensions |
| `screenshot` | `[--save PATH] [--quality 70] [--max-width 1920]` | Capture screen as JPEG |
| `click` | `X Y [--button left\|right] [--clicks N]` | Click at coordinates |
| `double_click` | `X Y` | Double-click |
| `type` | `TEXT` | Type ASCII text |
| `type_unicode` | `TEXT` | Type unicode text (clipboard paste method) |
| `key` | `KEYS` | Key combo: `enter`, `ctrl+c`, `alt+tab` |
| `scroll` | `X Y CLICKS` | Scroll (positive=up, negative=down) |
| `drag` | `X1 Y1 X2 Y2 [--duration 0.5]` | Drag between coordinates |
| `move` | `X Y` | Move mouse |
| `mouse` | — | Get current mouse position |

## Environment Variables

| Var | Default | Description |
|-----|---------|-------------|
| `WR_HOST` | `100.121.240.14` | Agent Tailscale IP |
| `WR_PORT` | `8888` | Agent port |

## Vision Analysis Tips

When analyzing screenshots to find UI elements:
- Ask for **exact pixel coordinates** of buttons, fields, menus
- Describe the full screen layout first, then zoom in on target area
- For text fields: click the field first, then type
- For dropdowns: click to open, screenshot again, then click option
- Account for taskbar (~40px bottom) and title bars (~30px top)

## Unicode / German Text

Use `type_unicode` for text with umlauts (ä, ö, ü, ß) — it uses clipboard paste instead of direct keystrokes, which handles all characters correctly.

## Error Handling

- **Connection refused:** Agent not running. Start `start.bat` on Windows.
- **Timeout:** Agent might be busy with screenshot. Retry.
- **FAILSAFE:** If mouse reaches screen corner, pyautogui aborts. This is a safety feature.
