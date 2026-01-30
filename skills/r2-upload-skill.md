# Claude Skill: R2 File Upload

Upload Dateien nach Cloudflare R2 und generiere öffentliche Download-Links.

## Trigger-Phrasen
- "Lade Datei hoch..."
- "Upload nach R2..."
- "Mach Datei verfügbar zum Download..."
- "Download-Link für..."
- "Teile diese Datei..."

## Konfiguration

| Setting | Wert |
|---------|------|
| **Bucket Name** | `claude-uploads` |
| **Account ID** | `e1625bd206eaa162677dba0e5bc1569f` |
| **Public Domain** | `pub-7bcdb4f4d1244bbd8786e26ec0be73da.r2.dev` |
| **Ordnerstruktur** | `/YYYY/MM/DD/filename` |

## Environment Variables (in ~/.bashrc)

```bash
CLOUDFLARE_API_TOKEN    # R2 Upload Token
CLOUDFLARE_ACCOUNT_ID   # Account ID
CLOUDFLARE_TOKEN_CREATOR # Master Token (zum Erstellen neuer Tokens)
```

## Workflow

### 1. Upload durchführen

```bash
wrangler r2 object put claude-uploads/$(date +%Y/%m/%d)/dateiname.ext --file="/pfad/datei.ext" --remote
```

### 2. URL generieren

```
https://pub-7bcdb4f4d1244bbd8786e26ec0be73da.r2.dev/YYYY/MM/DD/filename
```

### Quick One-Liner

```bash
FILE="/pfad/datei.ext" && \
wrangler r2 object put claude-uploads/$(date +%Y/%m/%d)/$(basename "$FILE") --file="$FILE" --remote && \
echo "URL: https://pub-7bcdb4f4d1244bbd8786e26ec0be73da.r2.dev/$(date +%Y/%m/%d)/$(basename "$FILE")"
```

## Wichtige Hinweise

- **--remote Flag ist erforderlich** (sonst nur lokaler Upload)
- Max Dateigröße: 5GB (multipart für größere)
- r2.dev URLs sind öffentlich zugänglich
- Dateien werden NICHT automatisch gelöscht
- Token hat keine Ablaufzeit

## Dateien löschen

```bash
wrangler r2 object delete claude-uploads/YYYY/MM/DD/filename --remote
```

## Bucket auflisten

```bash
wrangler r2 object list claude-uploads --remote
```

## Backup Token-Dateien

Falls ~/.bashrc verloren geht:
- `~/.secrets/r2-token.txt` - R2 Token
- `~/.secrets/cloudflare-master-token.txt` - Master Token
- `~/.secrets/r2-domain.txt` - Public Domain
