#!/bin/bash
# Export and encrypt secrets from current server
# Usage: ./export-secrets.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SECRETS_FILE="$SCRIPT_DIR/secrets.env"
ENCRYPTED_FILE="$SCRIPT_DIR/secrets.env.gpg"
BASHRC="$HOME/.bashrc"

echo "=== Claude Skills - Secrets Export ==="
echo

# Secrets aus bashrc extrahieren
echo "Extrahiere Secrets aus $BASHRC..."

cat > "$SECRETS_FILE" << 'HEADER'
# Claude Skills - API Secrets
# Verschlüsselt mit: gpg -c secrets.env
# Entschlüsselt mit: gpg -d secrets.env.gpg > secrets.env
# Aktualisiert: TIMESTAMP

HEADER

# Timestamp einfügen
sed -i "s/TIMESTAMP/$(date '+%Y-%m-%d %H:%M:%S')/" "$SECRETS_FILE"

# Relevante exports extrahieren
grep -E "^export (FAL|CLOUDFLARE|ANTHROPIC|R2_|OPENAI|ELEVENLABS|HEYGEN|HEDRA)" "$BASHRC" >> "$SECRETS_FILE" 2>/dev/null || true

# Zählen
COUNT=$(grep -c "^export" "$SECRETS_FILE" || echo 0)
echo "Gefunden: $COUNT Secrets"
echo

# Anzeigen (maskiert)
echo "Secrets:"
grep "^export" "$SECRETS_FILE" | sed 's/=.*/=***/'
echo

# Verschlüsseln
echo "Verschlüssele mit GPG (Passwort eingeben)..."
rm -f "$ENCRYPTED_FILE"
gpg -c --cipher-algo AES256 "$SECRETS_FILE"

# Unverschlüsselte Version löschen
rm -f "$SECRETS_FILE"

echo
echo "=== Fertig ==="
echo "Erstellt: $ENCRYPTED_FILE"
echo
echo "Nächste Schritte:"
echo "  1. git add secrets.env.gpg"
echo "  2. git commit -m 'Update secrets'"
echo "  3. git push"
