# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## Email (skills/email/)
**Provider:** IONOS  
**Address:** heim.dall@prometheus-labs.io  
**Credentials:** credentials/email.md

**Quick commands:**
```bash
# Check inbox
node skills/email/check-email.js --limit 5

# Search for verification codes
node skills/email/search-email.js --query "verification code" --limit 1

# Filter unread
node skills/email/check-email.js --unread
```

**Use cases:**
- Account verifications (GitHub, services)
- Monitor for important notifications
- Extract verification codes automatically

## SSH
**mein-malbuch server:**
- Host: 100.67.243.6 (Tailscale)
- User: heimdall
- Key: ~/.ssh/id_ed25519

## GitHub
**Account:** heimdall-prometheus  
**Email:** heim.dall@prometheus-labs.io  
**Credentials:** credentials/github-heimdall.txt

---

Add whatever helps you do your job. This is your cheat sheet.
