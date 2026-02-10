# Becker Odoo - Externer Validation Flow

## Validiert: 2026-02-05 ✅

Erster vollständiger Durchlauf mit Techniker Dashboard (Issue #2).

## Flow (Step by Step)

### 1. GitHub CI wird grün
Pipeline: Lint → Unit Tests → Deploy TEST → Smoke Test
→ Heimdall wird benachrichtigt (beobachtet via `gh pr checks`)

### 2. Screenshot von TEST nehmen
```
browser navigate → TEST URL
browser login → Heimdall Credentials (CREDENTIALS.md)
browser navigate → Feature URL
browser screenshot → Speichern
```

### 3. Kriterien laden
```
Datei: .github/criteria/<feature>.yaml
Enthält: quantitative + qualitative Kriterien + Scoring
```

### 4. AI Vision Bewertung
```
image tool → Screenshot + Kriterien als Prompt
→ Score pro Kriterium (1-10)
→ Gewichteter Gesamtscore
→ Feedback-Text
```

### 5. Ergebnis posten
**PR Comment:**
```bash
gh pr comment <PR#> --repo becker-sicherheit/odoo --body "## 🤖 AI Validation\n\nScore: X/10\n..."
```

**Telegram Notification:**
```
message send → target: 1424138659
→ Score + Screenshot + Kriterien-Bewertung
→ Bei 7-8: "merge" oder "nochmal"?
```

### 6. Entscheidung
| Score | Aktion |
|-------|--------|
| ≥9 | `gh pr merge --squash --delete-branch` |
| 7-8 | Warte auf Erik via Telegram |
| <7 | Analysiere Feedback, fixe, pushe erneut |

## Credentials für TEST Login
→ `projects/becker-odoo/CREDENTIALS.md`
→ User: heimdall (muss Techniker-Gruppe haben)

## Erster Durchlauf - Ergebnis
- **Feature:** Techniker Dashboard
- **Score:** 7.7/10 (UI: 8, Odoo-Standard: 7, Dichte: 8)
- **Status:** PASS
- **Findings:**
  - Auto-Redirect nicht aktiv (Home-Action muss pro User gesetzt werden)
  - Leere Zustände könnten Handlungshinweise haben
  - Gelb/Orange-Header leicht non-standard

## Offene Verbesserungen für den Flow
- [ ] Automatischer Trigger wenn CI grün wird (Webhook oder Cron)
- [ ] Mobile-Screenshot zusätzlich (Responsive-Check)
- [ ] PR Comment automatisch posten (nicht nur Telegram)
- [ ] Feedback Loop: automatisch fixen wenn Score <7
