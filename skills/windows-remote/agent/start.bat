@echo off
echo ========================================
echo  ZF Windows Remote Agent
echo ========================================
echo.

:: Check Python
python --version 2>nul || (
    echo [ERROR] Python not found! Install Python 3.10+
    echo https://www.python.org/downloads/
    pause
    exit /b 1
)

:: Install/update dependencies
echo [1/2] Installing dependencies...
pip install -r requirements.txt --quiet

:: Start agent (import string for --reload support)
echo [2/2] Starting agent on port 8888...
echo.
python -m uvicorn agent:app --host 0.0.0.0 --port 8888 --reload
