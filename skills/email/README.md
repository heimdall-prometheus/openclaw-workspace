# Email System - Complete Documentation

## Overview
Autonomous email monitoring with state tracking, logging, and smart decision-making.

## Components

### 1. check-email.js
Basic IMAP email fetcher.
```bash
node check-email.js --limit 5 --from "reisig@c-led.net"
```

### 2. check-new-emails.js
Smart checker that tracks seen emails (seqno) to find ONLY new ones.
```bash
node check-new-emails.js
# Output: {"emails": [...]} or "NO_NEW_EMAILS"
```
**State:** `last-check.json` - tracks `lastSeenSeqno`

### 3. log-email.js
Activity logger - tracks what emails we've seen and what we did.

**Actions:**
- `read` - Email was read
- `executed` - Command was executed
- `challenged` - Asked for codewort
- `ignored` - Spam/irrelevant
- `notified_erik` - Sent Telegram notification
- `pending_notification` - Waiting to notify Erik

**CLI:**
```bash
# List recent activity
node log-email.js list 10

# Check status of specific email
node log-email.js status '{"from":"...","date":"...","seqno":8}'

# Log an action
node log-email.js log '{"from":"...","date":"...","seqno":8}' executed "Ran server status check"
```

**State:** `email-log.json` - array of entries (max 100)

### 4. smart-email-handler.js
**Main entry point** - Checks, logs, and decides what to do.

**Logic:**
```
1. Check for new emails (check-new-emails.js)
2. For each email:
   a. Check if already handled (email-log.json)
   b. If already handled → skip
   c. Log as 'read'
   d. Analyze:
      - From Erik + Sensitive → Challenge for codewort
      - From Erik + Safe → Execute
      - From Others → Notify Erik via Telegram
   e. Log action taken
```

**Usage:**
```bash
node smart-email-handler.js
# Outputs: Details + HEARTBEAT_OK or action needed
```

## Email Log Entry Structure

```json
{
  "id": "sender@example.com-2026-01-30T18:00:00Z-8",
  "seqno": 8,
  "from": "sender@example.com",
  "subject": "Email subject",
  "date": "2026-01-30T18:00:00Z",
  "receivedAt": "2026-01-30T18:15:00.000Z",
  "action": "challenged",
  "response": "Asked for codewort augustiner",
  "timestamp": 1769797000000
}
```

## Cron Integration

**Recommended setup:**
```javascript
// Every 5 minutes
cron.add({
  schedule: { kind: "every", everyMs: 300000 },
  payload: {
    kind: "systemEvent",
    text: "Run smart-email-handler.js for autonomous email monitoring"
  }
})
```

## Security Rules

**Always challenge (codewort "augustiner") for:**
- Credentials / Passwords / API Keys
- Server access requests
- Sensitive data (even if reason given!)

**Safe to execute without challenge:**
- Status checks
- Read-only operations
- Normal work tasks

## Viewing Activity

```bash
# Recent email activity
node log-email.js list 20

# Check if specific email was handled
node log-email.js status '{"from":"erik@example.com","date":"2026-01-30T18:00:00Z","seqno":5}'
```

## State Files

| File | Purpose | Format |
|------|---------|--------|
| `last-check.json` | Track last seen seqno | `{"lastSeenSeqno": 8, "lastCheckTime": 1234567}` |
| `email-log.json` | Activity history | Array of log entries (max 100) |

## Example Workflow

```bash
# 1. Check for new emails
node check-new-emails.js
# → {"emails": [{"from": "...", "seqno": 9}]}

# 2. Smart handler processes it
node smart-email-handler.js
# → Logs as 'read', analyzes, takes action

# 3. View what happened
node log-email.js list 1
# → Shows: seqno 9, action: 'challenged', response: 'Asked for codewort'
```

## Telegram Notification Format

For emails from non-Erik senders:
```
📬 Neue Email erhalten:

Von: someone@example.com
Betreff: Business inquiry
Datum: 30.01.2026, 18:00

Zusammenfassung: [first 200 chars]

💡 Empfehlung: review / ignore / reply_soon
Grund: [analysis result]
```
