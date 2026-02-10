#!/bin/bash
# System Resource Monitor for OpenClaw
# Logs to memory/system-health.log and alerts if thresholds exceeded

LOG_DIR="$HOME/.openclaw/workspace/memory"
LOG_FILE="$LOG_DIR/system-health.log"
ALERT_FILE="$LOG_DIR/system-alerts.log"

# Thresholds
RAM_WARN=80    # Percent
RAM_CRIT=90
LOAD_WARN=3    # Per CPU core (so 3*4=12 total)
DISK_WARN=85   # Percent

mkdir -p "$LOG_DIR"

# Get metrics
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
RAM_TOTAL=$(free -m | awk '/^Mem:/ {print $2}')
RAM_USED=$(free -m | awk '/^Mem:/ {print $3}')
RAM_AVAIL=$(free -m | awk '/^Mem:/ {print $7}')
RAM_PCT=$((RAM_USED * 100 / RAM_TOTAL))

CPU_CORES=$(nproc)
LOAD_1=$(cat /proc/loadavg | cut -d' ' -f1)
LOAD_5=$(cat /proc/loadavg | cut -d' ' -f2)

DISK_PCT=$(df / | tail -1 | awk '{print $5}' | tr -d '%')

OPENCLAW_MEM=$(ps aux | grep "[o]penclaw-gateway" | awk '{sum+=$6} END {print int(sum/1024)}')
CHROME_MEM=$(ps aux | grep "[c]hrome" | awk '{sum+=$6} END {print int(sum/1024)}')

# Log entry
echo "$TIMESTAMP | RAM: ${RAM_USED}/${RAM_TOTAL}MB (${RAM_PCT}%) avail:${RAM_AVAIL}MB | Load: $LOAD_1/$LOAD_5 | Disk: ${DISK_PCT}% | OC:${OPENCLAW_MEM}MB Chr:${CHROME_MEM}MB" >> "$LOG_FILE"

# Check for alerts
ALERT=""

if [ $RAM_PCT -ge $RAM_CRIT ]; then
    ALERT="🔴 CRITICAL: RAM at ${RAM_PCT}% (${RAM_AVAIL}MB free)"
elif [ $RAM_PCT -ge $RAM_WARN ]; then
    ALERT="⚠️ WARNING: RAM at ${RAM_PCT}% (${RAM_AVAIL}MB free)"
fi

if [ $DISK_PCT -ge $DISK_WARN ]; then
    ALERT="$ALERT | ⚠️ DISK at ${DISK_PCT}%"
fi

# Output for cron/heartbeat
if [ -n "$ALERT" ]; then
    echo "$TIMESTAMP | $ALERT" >> "$ALERT_FILE"
    echo "ALERT: $ALERT"
else
    echo "OK | RAM:${RAM_PCT}% Load:$LOAD_1 Disk:${DISK_PCT}%"
fi
