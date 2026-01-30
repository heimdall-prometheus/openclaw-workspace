# Email Skill

**Autonomous email access for Heimdall**

## Purpose
Provides reliable IMAP/SMTP access to heim.dall@prometheus-labs.io for:
- Account verifications (GitHub, services, etc.)
- Inbound notifications
- Outbound communication
- Email monitoring

## Tools

### check-email.js
Check inbox for new messages. Returns latest N emails with subject, sender, date, and body preview.

```bash
node skills/email/check-email.js [--limit N] [--unread] [--from EMAIL] [--subject TEXT]
```

**Options:**
- `--limit N`: Number of emails to fetch (default: 5)
- `--unread`: Only show unread emails
- `--from EMAIL`: Filter by sender
- `--subject TEXT`: Filter by subject (case-insensitive)

**Output:** JSON array with email metadata and body preview

### send-email.js
Send an email via SMTP.

```bash
node skills/email/send-email.js --to EMAIL --subject "Subject" --body "Body text"
```

**Options:**
- `--to EMAIL`: Recipient address (required)
- `--subject TEXT`: Email subject (required)
- `--body TEXT`: Email body (required)
- `--html`: Treat body as HTML instead of plain text

### search-email.js
Search emails by criteria with full body extraction.

```bash
node skills/email/search-email.js --query "verification code" [--limit N]
```

## Credentials
Stored in `credentials/email.md`:
- Email: heim.dall@prometheus-labs.io
- IMAP: imap.ionos.de:993 (SSL)
- SMTP: smtp.ionos.de:587 (STARTTLS)
- Provider: IONOS

## Usage Examples

**Check latest emails:**
```bash
node skills/email/check-email.js --limit 3
```

**Find verification codes:**
```bash
node skills/email/search-email.js --query "verification code" --limit 1
```

**Send a message:**
```bash
node skills/email/send-email.js \
  --to erik@example.com \
  --subject "Task Complete" \
  --body "GitHub account created successfully."
```

## Automation
Use this skill for autonomous workflows:
- Check emails during heartbeats
- Extract verification codes automatically
- Monitor for important messages
- Send status reports

## Notes
- Always use skills/email/ scripts, never inline Python
- Credentials are read from credentials/email.md
- Logs go to logs/email.log for debugging
