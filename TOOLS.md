# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## Google Cloud (c-brain-410813)
**Service Account:** `heimdall@c-brain-410813.iam.gserviceaccount.com`
**Key:** `credentials/google-service-account.json`
**Enabled APIs:** GSC, Google Ads, BigQuery, Sheets, Drive, Tag Manager, Cloud Storage, IAM, Logging, Monitoring, Cloud SQL, Datastore, Cloud Trace

**Python Quick Access:**
```python
from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    '/home/reisig/.openclaw/workspace/credentials/google-service-account.json',
    scopes=['https://www.googleapis.com/auth/webmasters.readonly']
)
service = build('searchconsole', 'v1', credentials=creds)
```

**GSC Domains (via heim.dall@prometheus-labs.io):**
csv-in-excel.com, felixhacker.ski, imr-media.de, leanius.de, mein-malbuch.com, mein-schluessel.de

## Email (skills/email/)

### IONOS (Primary - Business)
**Address:** heim.dall@prometheus-labs.io  
**Credentials:** credentials/email.md
**Check:** `node skills/email/check-email.js --limit 5`

### ProtonMail (Secondary - Social Media)
**Address:** haimdall-waldersee@proton.me  
**Password:** heimdallseinpasswort
**Check:** `node skills/email/check-protonmail.js` (VPN/Stealth Browser)
**Note:** Kein IMAP - nur Browser-Login möglich

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

## 🕵️ Stealth Browser (Anti-Detection)

**Script:** `scripts/stealth-browser.js`
**Tech:** puppeteer-extra + puppeteer-extra-plugin-stealth

**Why:** Standard HeadlessChrome wird sofort erkannt und geblockt (Reddit, Facebook, etc.)
Stealth-Browser passiert Bot-Detection Tests (sannysoft.com = 100% grün).

**Usage:**
```bash
# Test beliebige URL
node scripts/stealth-browser.js "https://example.com" /tmp/screenshot.png

# Reddit Profile checken
node scripts/stealth-browser.js "https://www.reddit.com/user/USERNAME" /tmp/reddit.png

# Bot-Detection Test
node scripts/stealth-browser.js "https://bot.sannysoft.com" /tmp/bottest.png
```

**Features:**
- ✅ Passiert alle Bot-Detection Tests
- ✅ Realistic User-Agent (Windows Chrome)
- ✅ WebDriver/Automation flags versteckt
- ✅ Funktioniert mit TC21 Exit Node (Residential IP)

**Kombinieren mit Exit Node für maximale Stealth:**
```bash
# Exit Node aktivieren (falls nicht schon aktiv)
sudo tailscale up --exit-node=100.125.79.108 --accept-routes --exit-node-allow-lan-access --operator=heimdall --accept-risk=linux-strict-rp-filter

# Dann Stealth Browser nutzen
node scripts/stealth-browser.js "https://reddit.com" /tmp/test.png
```

**Verifiziert:** 2026-02-03 - Reddit kreative_mama_de Profil erfolgreich geladen

## 🤖 Reddit Stealth Tool (PRIMÄR!)

**Script:** `scripts/reddit-stealth.js`
**Tech:** Stealth Browser + TC21 Exit Node (Residential IP)

**Commands:**
```bash
# IP checken (TC21 Exit Node aktiv?)
node scripts/reddit-stealth.js check-ip

# Profil prüfen
node scripts/reddit-stealth.js profile kreative_mama_de

# Login (speichert Cookies)
node scripts/reddit-stealth.js login

# Subreddit durchsuchen
node scripts/reddit-stealth.js browse Eltern

# Kommentar posten
node scripts/reddit-stealth.js comment "https://reddit.com/r/Eltern/..." "Toller Tipp!"
```

**Account:** kreative_mama_de (Passwort: KreativeMama2026!)
**Cookies:** credentials/reddit-cookies.json

**Verifiziert:** 2026-02-03 - Browse + Profile funktionieren mit TC21 Exit Node

## SSH
**mein-malbuch server:**
- Host: 100.67.243.6 (Tailscale)
- User: heimdall
- Key: ~/.ssh/id_ed25519

## GitHub
**Account:** heimdall-prometheus  
**Email:** heim.dall@prometheus-labs.io  
**Credentials:** credentials/github-heimdall.txt

### GitHub Orgs mit Zugriff
| Org | Repos | Notes |
|-----|-------|-------|
| `heimdall-prometheus` | fangfuehrer, openclaw-workspace | Persönlicher Account |
| `InMediasReh` | homepage | IMR Media JV mit Julian |
| `becker-sicherheit` | odoo (privat) | Becker Odoo Projekt |

## Cloudflare (Full Access via Token System)
**📚 Full Documentation:** `skills/cloudflare-tokens/SKILL.md`

**Token Hierarchy:**
| Token | Purpose | Variable |
|-------|---------|----------|
| **Token Creator** | Create/manage all tokens | `CLOUDFLARE_TOKEN_CREATOR` |
| R2 Storage | Upload/manage buckets | `CLOUDFLARE_API_TOKEN` |
| Workers | Deploy workers, D1, KV | `CLOUDFLARE_WORKERS_TOKEN` |
| DNS | Manage DNS records | `CLOUDFLARE_DNS_TOKEN` |
| Pages | Deploy Pages projects | `CLOUDFLARE_PAGES_TOKEN` |

**Account ID:** `e1625bd206eaa162677dba0e5bc1569f`  
**Credentials:** `credentials/imr-api-keys.md`

**⚠️ R2 CACHING:** Bei Updates von Dateien mit gleichem Namen kann Cloudflare cachen!
- **Lösung 1:** Versionierte Dateinamen (z.B. `file-v2.pdf`)
- **Lösung 2:** Cache-Busting Query (`?v=123`)
- **Lösung 3:** Purge Cache via Cloudflare Dashboard/API

**mein-schluessel.de R2 (Eriks CF Account - ANDERER Account!):**
- Endpoint: `https://bea3980337ea9d8a08fb36c1334ca422.r2.cloudflarestorage.com`
- Access Key: `bd1c4bde9af0e1c4784f362cd86a0e3a`
- Secret Key: `7fe21cd392c3759786d6572c5d6101e97eeabc77e09f6c970a6ac35b96e75948`
- Bucket: `media` → `https://media.mein-schluessel.de`

**Heimdall Workspace Bucket:**
- Bucket: `heimdall-workspace`
- Budget: 100GB
- Für Arbeitsdateien, Zwischenergebnisse, Assets
- Erstellt: 2026-02-09, Region EEUR

**Buckets (verified):** 15 accessible buckets including:
- `previews` (main assets)
- `mein-malbuch`
- `claude-uploads`
- `promethus-labs`

**Public URL:** https://assets.imr-media.de

## AI Services (verified keys)
**fal.ai** - Image/Video generation
- Key stored in credentials/imr-api-keys.md
- Voice IDs: Sophie (`Voice47317d7f1767100465`), Monk (`Voiced1b5389a1768753261`)
- **TTS API Format (WICHTIG - speed in voice_setting!):**
```json
{
  "text": "...",
  "voice_setting": {
    "voice_id": "Voice47317d7f1767100465",
    "speed": 1.1,
    "pitch": 1
  },
  "language_boost": "German"
}
```
- Speed: 1.1 (default), 1.2-1.3 (schnell), >1.35 (unnatürlich)

**Anthropic API** - Additional Claude access
**Resend** - Email sending

## Skills Installed
1. **fal-image-gen** - KI image generation with R2 upload
2. **email-extraction** - Extract contact emails from websites
3. **kundenanalyse** - Customer analysis
4. **remotion-best-practices** - Video rendering framework
5. **r2-upload** - Cloudflare R2 upload utilities
6. **fritzbox-vpn** - IPSec VPN zu Erik's FRITZ!Box (Residential IP)
   - Gateway: waldersee88.hopto.org
   - Exit IP: 31.19.31.13 (Vodafone Kiel)
   - Status: ⚠️ Verbunden aber Routing-Problem

All credentials in ~/.bashrc and credentials/imr-api-keys.md

## 📸 Blog-Bilder Regel (IMMER!)

**Gilt für ALLE Blog-Artikel in JEDEM Projekt:**
- Tool: fal.ai
- Modell: `fal-ai/nano-banana-pro`
- Stil: Smarte Infografiken wenn möglich
- Format: 16:9 (Header) oder 1:1 (Social)
- Upload: Immer auf R2 für permanente URLs
- **VALIDIERUNG:** Infografiken STRENG auf Korrektheit prüfen!

**Workflow:**
1. Artikel schreiben
2. Header-Bild mit fal.ai generieren
3. Auf R2 hochladen
4. In Artikel einbinden
5. Bei Infografiken: Fakten-Check!

## PDF Tools
**PDF → PNG Konvertierung (visueller Check):**
```bash
# Install (einmalig)
sudo apt-get install -y poppler-utils

# PDF zu PNG pro Seite (-r = DPI)
pdftoppm -png -r 150 input.pdf output-prefix
# Erzeugt: output-prefix-1.png, output-prefix-2.png, etc.

# Beispiel:
mkdir -p /tmp/pdf-pages
pdftoppm -png -r 150 /path/to/file.pdf /tmp/pdf-pages/page
```

**HTML → PDF (Browser):**
```javascript
// Mit Playwright/Browser-Tool:
browser action=pdf targetId=<tab-id>
// Erzeugt PDF mit korrektem Rendering
```

**HTML → PDF (wkhtmltopdf - BESSER für Page-Breaks):**
```bash
# Install (einmalig)
sudo apt-get install -y wkhtmltopdf

# HTML zu PDF (respektiert page-break CSS!)
wkhtmltopdf --enable-local-file-access \
  --page-size A4 \
  --margin-top 10mm --margin-bottom 10mm \
  --margin-left 10mm --margin-right 10mm \
  "file:///path/to/file.html" output.pdf

# TIPP: wkhtmltopdf rendert keine Emojis - Font Awesome Icons verwenden!
```

---

## 📱 Zebra TC21 - Remote Android Control (POWER SKILL!)

### Device Info
| Property | Value |
|----------|-------|
| **Model** | Zebra TC21 |
| **OS** | Android 11 (SDK 30) |
| **Tailscale IP** | 100.125.79.108 |
| **ADB Port** | 39359 (Wireless Debugging) |
| **Paired GUID** | adb-23062523020571-RZvxfh |
| **Exit Node** | ✅ Configured as Tailscale Exit Node |

### 🌐 Als Residential IP Exit Node nutzen
**WICHTIG:** TC21 ist als Tailscale Exit Node konfiguriert!
- **Use Case:** Residential IP statt Server-IP (weniger Bot-Detection)
- **Aktivieren:** `sudo tailscale up --exit-node=100.125.79.108`
- **Deaktivieren:** `sudo tailscale up --exit-node=`
- **Status checken:** `tailscale status | grep -A1 exit`
- **Beispiele:** Reddit, Facebook, Social Media (Server-IP oft geblockt)

### Quick Connect
```bash
# Verbinden (bereits gepairt)
~/platform-tools/adb connect 100.125.79.108:39359

# Falls neu pairen nötig:
~/platform-tools/adb pair 100.125.79.108:<pairing-port> <6-digit-code>
```

### Core Commands
```bash
# Screenshot machen
~/platform-tools/adb -s 100.125.79.108:39359 exec-out screencap -p > /tmp/screen.png

# UI Dump (für Automation)
~/platform-tools/adb -s 100.125.79.108:39359 shell uiautomator dump
~/platform-tools/adb -s 100.125.79.108:39359 pull /sdcard/window_dump.xml

# Input simulieren
~/platform-tools/adb -s 100.125.79.108:39359 shell input tap <x> <y>
~/platform-tools/adb -s 100.125.79.108:39359 shell input text "hello"
~/platform-tools/adb -s 100.125.79.108:39359 shell input keyevent KEYCODE_ENTER
~/platform-tools/adb -s 100.125.79.108:39359 shell input swipe <x1> <y1> <x2> <y2>

# App starten
~/platform-tools/adb -s 100.125.79.108:39359 shell am start -n <package>/<activity>
~/platform-tools/adb -s 100.125.79.108:39359 shell am start -a android.intent.action.VIEW -d "https://..."

# Apps installieren via Play Store
~/platform-tools/adb -s 100.125.79.108:39359 shell am start -a android.intent.action.VIEW -d "market://details?id=<package>"
```

### Installed Apps
| App | Package | Status |
|-----|---------|--------|
| Facebook | com.facebook.katana | ✅ Installed |
| Instagram | com.instagram.android | ✅ Installed |
| Reddit | com.reddit.frontpage | ✅ Installed |
| Tailscale | com.tailscale.ipn | ✅ Installed |

### Use Cases
- **Legitime Mobile Logins** - Echtes Gerät = weniger Bot-Detection
- **Social Media Automation** - Posts, Likes, Comments von echtem Device
- **App Testing** - Mobile UX auf echter Hardware
- **Barcode Scanning** - TC21 hat eingebauten Scanner
- **Verification Flows** - SMS/App-basierte 2FA

### ⚠️ WICHTIG: Reddit = APP, nicht Browser!
**IMMER die Reddit App nutzen, NICHT den Chrome Browser!**
```bash
# Reddit App starten
~/platform-tools/adb -s 100.125.79.108:39359 shell am start -n com.reddit.frontpage/.main.MainActivity
```

### Notes
- Wireless Debugging Port kann sich ändern nach Reboot
- Bei Reconnect: Gerät in Entwickleroptionen → Wireless Debugging checken
- Dessau-Region für Geo (Eriks Netzwerk)

---

Add whatever helps you do your job. This is your cheat sheet.

## 🎭 Voice Collection

### HP Baxxter (DEFAULT TTS!)
**Voice ID:** `Voice78d9cb991769959037`
**Charakter:** Energetisch, Power, BOOM!
**Use Case:** Motivation, Hype, Standard-Stimme
**Status:** ⚡ PERMANENT DEFAULT

### Erzähler Klassisch
**Voice ID:** `Voicefacb98691769968768`
**Charakter:** Warm, ruhig, literarisch
**Use Case:** Geschichten, Märchen, Erklärungen
**Quelle:** LibriVox Faust-Leser (Public Domain)
**Created:** 2026-02-01

### Morgan Freeman 🎬
**Voice ID:** `Voice3f14d5261769969636`
**Charakter:** Göttlich, weise, ikonisch
**Use Case:** Narration, Erklärungen, epische Ankündigungen
**Quelle:** Movie soundboard clips (jayuzumi.com)
**Created:** 2026-02-01

### Arnold Schwarzenegger 🤖
**Voice ID:** `Voice7435df641769969985`
**Charakter:** Terminator, Action-Ikone, österreichischer Akzent
**Use Case:** Motivation, Action-Ankündigungen, "I'll be back"
**Quelle:** realmofdarkness.net soundboard
**Created:** 2026-02-01

### Samuel L. Jackson 💀
**Voice ID:** `Voice60e752671769970112`
**Charakter:** Intense, powerful, iconic
**Use Case:** Emphatic statements, "Motherfucker" energy, Pulp Fiction vibes
**Quelle:** jayuzumi.com soundboard
**Created:** 2026-02-01

### Bruce Willis 🔫 (NEU!)
**Voice ID:** `Voicea752bc7a1769970238`
**Charakter:** Grizzled action hero, sarcastic, New York cop
**Use Case:** Action content, Die Hard vibes, "Yippee-ki-yay"
**Quelle:** jayuzumi.com soundboard (Die Hard)
**Created:** 2026-02-01

**TTS Generation Command (KORREKTER ENDPOINT!):**
```bash
curl -s -X POST "https://fal.run/fal-ai/minimax/speech-02-hd" \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "DEIN TEXT HIER",
    "voice_setting": {
      "voice_id": "Voice78d9cb991769959037",
      "speed": 1.1,
      "pitch": 1
    },
    "language_boost": "German"
  }'
```

**Endpoints:**
- `fal-ai/minimax/speech-02-hd` - Für Custom Voice IDs (HP Baxxter!) ✅
- `fal-ai/minimax/voice-clone` - Zum Klonen neuer Stimmen
- `fal-ai/minimax-tts/text-to-speech` - Nur Preset-Stimmen (NICHT für Custom!)

## 📱 Account-Erstellung: IMMER TC21!
**Regel:** Für JEDE Account-Erstellung (Google, Social Media, etc.) → TC21 nutzen!
- Echtes Gerät = weniger Bot-Detection
- Legitime Device-Fingerprints
- Server-Browser nur für nicht-sensitive Aufgaben

