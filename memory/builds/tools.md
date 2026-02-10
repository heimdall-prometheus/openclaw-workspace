# 🛠️ Tools & Utilities

## Cloudflare

### R2 Upload (2026-01-30)
**Was:** Dateien auf Cloudflare R2 hochladen
**Wie:**
- Token: `CLOUDFLARE_API_TOKEN`
- Account ID: `e1625bd206eaa162677dba0e5bc1569f`
- Public URL: https://assets.imr-media.de
**Buckets (verified):** 14 accessible, inkl:
- `previews` (main assets)
- `mein-malbuch`
- `claude-uploads`
- `promethus-labs`
**⚠️ CACHING-Problem:** Bei Updates mit gleichem Namen kann Cloudflare cachen!
- Lösung 1: Versionierte Dateinamen (z.B. `file-v2.pdf`)
- Lösung 2: Cache-Busting Query (`?v=123`)
- Lösung 3: Purge Cache via Dashboard/API

---

## PDF Tools

### PDF → PNG Konvertierung
**Was:** PDF visuell checken
**Wie:**
```bash
# Install
sudo apt-get install -y poppler-utils

# PDF zu PNG pro Seite (-r = DPI)
pdftoppm -png -r 150 input.pdf output-prefix
```

### HTML → PDF (wkhtmltopdf)
**Was:** HTML zu PDF mit korrekten Page-Breaks
**Wie:**
```bash
# Install
sudo apt-get install -y wkhtmltopdf

# Konvertieren
wkhtmltopdf --enable-local-file-access \
  --page-size A4 \
  --margin-top 10mm --margin-bottom 10mm \
  --margin-left 10mm --margin-right 10mm \
  "file:///path/to/file.html" output.pdf
```
**TIPP:** wkhtmltopdf rendert keine Emojis - Font Awesome Icons verwenden!

---

## GitHub

### GitHub CLI Setup (2026-01-30)
**Account:** heimdall-prometheus
**Email:** heim.dall@prometheus-labs.io
**SSH Key:** ~/.ssh/id_ed25519 (uploaded)
**First Repo:** openclaw-workspace (PRIVATE)
