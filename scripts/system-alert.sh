#!/bin/bash
# System Alert Script - runs from heartbeat, sends Telegram alerts
# Returns: "OK" or "ALERT:<message>"

LOG_DIR="$HOME/.openclaw/workspace/memory"
ALERT_LOG="$LOG_DIR/system-alerts.log"
STATE_FILE="$LOG_DIR/alert-state.json"

# Thresholds
RAM_WARN=80
RAM_CRIT=90

mkdir -p "$LOG_DIR"

# Get metrics
RAM_TOTAL=$(free -m | awk '/^Mem:/ {print $2}')
RAM_USED=$(free -m | awk '/^Mem:/ {print $3}')
RAM_AVAIL=$(free -m | awk '/^Mem:/ {print $7}')
RAM_PCT=$((RAM_USED * 100 / RAM_TOTAL))

SWAP_TOTAL=$(free -m | awk '/^Swap:/ {print $2}')
SWAP_USED=$(free -m | awk '/^Swap:/ {print $3}')

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Check for OOM kills
OOM_COUNT=$(sudo dmesg 2>/dev/null | grep -c "Killed process" || echo 0)

# Build alert message
ALERT=""
ACTION=""

if [ $RAM_PCT -ge $RAM_CRIT ]; then
    ALERT="🔴 CRITICAL: RAM ${RAM_PCT}% (${RAM_AVAIL}MB free)"
    ACTION="kill_chrome"
elif [ $RAM_PCT -ge $RAM_WARN ]; then
    ALERT="⚠️ WARNING: RAM ${RAM_PCT}% (${RAM_AVAIL}MB free)"
fi

if [ $SWAP_USED -gt 1000 ]; then
    ALERT="$ALERT | Swap: ${SWAP_USED}MB used"
fi

if [ "$OOM_COUNT" -gt 0 ] 2>/dev/null; then
    ALERT="$ALERT | ⚠️ OOM Kills detected: $OOM_COUNT"
fi

# Output
if [ -n "$ALERT" ]; then
    echo "$TIMESTAMP | $ALERT" >> "$ALERT_LOG"
    
    # Auto-cleanup if critical
    if [ "$ACTION" = "kill_chrome" ]; then
        # Kill oldest chrome renderer to free RAM
        CHROME_PID=$(pgrep -o -f "chrome.*renderer")
        if [ -n "$CHROME_PID" ]; then
            kill $CHROME_PID 2>/dev/null
            ALERT="$ALERT | Auto-killed Chrome tab to free RAM"
        fi
    fi
    
    echo "ALERT|$ALERT"
else
    echo "OK|RAM:${RAM_PCT}% Swap:${SWAP_USED}MB"
fi
