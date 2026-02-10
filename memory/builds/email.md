# 📧 Email Builds

## Email Skill

### IMAP Email Access (2026-01-30)
**Was:** Autonomer Email-Zugriff für heim.dall@prometheus-labs.io
**Wie:**
- Provider: IONOS (imap.ionos.de)
- Node.js mit imap-simple
- Funktionen: Check, Search, Filter
**Files:**
- `skills/email/check-email.js`
- `skills/email/search-email.js`
**Commands:**
```bash
# Check inbox
node skills/email/check-email.js --limit 5

# Search for verification codes
node skills/email/search-email.js --query "verification code" --limit 1

# Filter unread
node skills/email/check-email.js --unread

# Filter by sender
node skills/email/check-email.js --limit 3 --from "reisig@c-led.net"
```
**Credentials:** `credentials/email.md`

---

## Email Security

### Challenge-Response System (2026-01-31)
**Was:** Sicherheitssystem für Email-Commands
**Wie:**
- Nur Commands von reisig@c-led.net akzeptieren
- Codewort "augustiner" bei sensitiven Anfragen
- Reply per Email + Telegram-Notification
- Logging in `memory/email-log.json`
**Trigger für Codewort:**
- Credentials / Passwörter / API Keys
- Server-Zugriffe
- Sensitive Daten (auch wenn Grund angegeben!)
