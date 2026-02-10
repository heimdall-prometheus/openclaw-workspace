# Becker Odoo - CI/CD Prozess

## 🚨 GOLDENE REGEL
**KEINE Änderung ohne CI/CD Prozess!** (Erik, 2026-02-05)

## Pipeline (GitHub Actions)

```
Push/PR → 🔍 Lint → 🧪 Unit Tests → 🚀 Deploy TEST → 🎭 Smoke Test
```

| Step | Was | Dauer |
|------|-----|-------|
| Lint | flake8 + pylint-odoo | ~10s |
| Unit Tests | Manifest-Validierung | ~7s |
| Deploy TEST | docker cp + restart | ~12s |
| Smoke Test | HTTP 200 + Dateien | ~7s |

## Validation + Review (OpenClaw - extern!)

**NICHT in GitHub Actions!** Heimdall übernimmt nach Smoke Test:

### Ablauf
1. Pipeline grün → Heimdall nimmt Screenshot von TEST
2. AI Vision bewertet gegen `.github/criteria/<feature>.yaml`
3. Score als PR-Comment gepostet

### Entscheidung nach Score
| Score | Aktion |
|-------|--------|
| **≥9** | 🟢 Auto-Merge (Heimdall) |
| **7-8** | 🟡 Telegram an Erik → "merge" / "nochmal" |
| **<7** | 🔴 Heimdall fixt → erneut pushen (max 10x) |

### Telegram-Format für Review
```
🔍 Becker Odoo - Review benötigt

PR: #X - [Titel]
Score: 8/10
Screenshot: [attached]

Bewertung:
- UI intuitiv: 8/10 ✅
- Odoo-Standard: 7/10 ⚠️
- Informationsdichte: 8/10 ✅

👉 "merge" oder "nochmal"?
```

## Workflow für jede Änderung

```
1. Issue/Task definieren (WARUM? Intention!)
2. git checkout -b feature/beschreibung
3. Entwickeln
4. Lokal: flake8 --max-line-length=120 modules/
5. git push → PR erstellen
6. CI läuft automatisch
7. Heimdall validiert (Screenshot + AI)
8. Erik reviewed (wenn nötig)
9. Merge → Deploy
```

## Technische Details

### Runner
- Self-hosted auf 100.71.171.30 (Hetzner)
- 1 concurrent Job
- Docker-Zugriff auf odoo-test Container

### DB-Credentials (TEST)
- Host: `db` (Docker network)
- User: `odoo`
- Password: `odoo_test_secret`
- DB: `odoo_test`

### pylint-odoo Config
`.pylintrc` disabled OCA-spezifische Checks (import-error, manifest-required-author, etc.)
→ Wir sind kein OCA-Modul, sondern intern.

### Odoo Edition
- **Community 17.0** (NICHT Enterprise!)
- Kein `field_service`, kein `helpdesk`
- Stattdessen: `project.task` + Tags ("Auftrag" / "Ticket")

## Dateien
- `.github/workflows/ci.yml` - Pipeline
- `.github/criteria/*.yaml` - Validierungskriterien
- `.pylintrc` - Pylint Konfiguration
- `docs/VALIDATION.md` - Validation-Prozess im Repo
