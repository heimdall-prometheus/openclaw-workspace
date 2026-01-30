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

## Cloudflare R2 (S3-compatible Storage)
**Account ID:** e1625bd206eaa162677dba0e5bc1569f  
**Credentials:** credentials/imr-api-keys.md  
**Buckets (verified):** 14 accessible buckets including:
- `previews` (main assets)
- `mein-malbuch`
- `claude-uploads`
- `promethus-labs`

**Public URL:** https://assets.imr-media.de

## AI Services (verified keys)
**fal.ai** - Image/Video generation
- Key stored in credentials/imr-api-keys.md
- Voice IDs: Sophie, Monk (German TTS)

**Anthropic API** - Additional Claude access
**Resend** - Email sending

## Skills Installed
1. **fal-image-gen** - KI image generation with R2 upload
2. **email-extraction** - Extract contact emails from websites
3. **kundenanalyse** - Customer analysis
4. **remotion-best-practices** - Video rendering framework
5. **r2-upload** - Cloudflare R2 upload utilities

All credentials in ~/.bashrc and credentials/imr-api-keys.md

---

Add whatever helps you do your job. This is your cheat sheet.
