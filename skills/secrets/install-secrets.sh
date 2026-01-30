#!/bin/bash
# Install secrets on a new server
# Usage: ./install-secrets.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SECRETS_FILE="$SCRIPT_DIR/secrets.env.gpg"
BASHRC="$HOME/.bashrc"

echo "=== Claude Skills - Secrets Installation ==="
echo

if [ ! -f "$SECRETS_FILE" ]; then
    echo "ERROR: $SECRETS_FILE nicht gefunden!"
    echo "Führe zuerst ./export-secrets.sh auf dem Quell-Server aus."
    exit 1
fi

# Entschlüsseln
echo "Entschlüssele secrets.env.gpg..."
TEMP_FILE=$(mktemp)
gpg -d "$SECRETS_FILE" > "$TEMP_FILE" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "ERROR: Entschlüsselung fehlgeschlagen!"
    rm -f "$TEMP_FILE"
    exit 1
fi

# Prüfen welche Secrets schon existieren
echo
echo "Installiere Secrets in $BASHRC..."
ADDED=0
SKIPPED=0

while IFS= read -r line; do
    # Nur export Zeilen verarbeiten
    if [[ "$line" =~ ^export\ ([A-Z_]+)= ]]; then
        VAR_NAME="${BASH_REMATCH[1]}"

        # Prüfen ob schon in bashrc
        if grep -q "^export $VAR_NAME=" "$BASHRC" 2>/dev/null; then
            echo "  SKIP: $VAR_NAME (existiert bereits)"
            ((SKIPPED++))
        else
            echo "  ADD:  $VAR_NAME"
            echo "$line" >> "$BASHRC"
            ((ADDED++))
        fi
    fi
done < "$TEMP_FILE"

# Aufräumen
rm -f "$TEMP_FILE"

echo
echo "=== Fertig ==="
echo "Hinzugefügt: $ADDED"
echo "Übersprungen: $SKIPPED"
echo
echo "Secrets aktivieren mit:"
echo "  source ~/.bashrc"
