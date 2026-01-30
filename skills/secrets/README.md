# Claude Skills - Secrets Management

Verschlüsselte API Keys für alle Claude Skills.

## Neuer Server Setup (One-Liner)

```bash
git clone git@github.com:Reisig-Erik/claude-skills.git ~/.claude/skills && \
~/.claude/skills/secrets/install-secrets.sh && \
source ~/.bashrc
```

## Manuell

### Secrets installieren (neuer Server)
```bash
cd ~/.claude/skills/secrets
./install-secrets.sh
source ~/.bashrc
```

### Secrets aktualisieren (nach Änderungen)
```bash
cd ~/.claude/skills/secrets
./export-secrets.sh
git add secrets.env.gpg
git commit -m "Update secrets"
git push
```

## Enthaltene Secrets

| Variable | Service | Verwendet von |
|----------|---------|---------------|
| `FAL_AI_KEY` | fal.ai | Image Gen, OmniHuman, TTS |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare | R2, Workers, DNS |
| `CLOUDFLARE_API_TOKEN` | Cloudflare | R2 Upload |
| `CLOUDFLARE_TOKEN_CREATOR` | Cloudflare | Token Management |
| `CLOUDFLARE_WORKERS_TOKEN` | Cloudflare | Workers Deploy |
| `CLOUDFLARE_DNS_TOKEN` | Cloudflare | DNS Management |

## Passwort

Das GPG-Passwort ist: **[im Passwort-Manager]**

## Sicherheit

- `secrets.env.gpg` ist AES-256 verschlüsselt
- Unverschlüsselte `secrets.env` wird nie committed
- `.gitignore` schließt `secrets.env` aus
