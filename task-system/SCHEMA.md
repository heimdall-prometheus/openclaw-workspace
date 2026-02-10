# Task System Schema

## Philosophie

**Output ≠ Outcome.** Ein Task ist nicht "erledigt" wenn er gemacht wurde, sondern wenn er seinen Zweck erfüllt hat.

Dieses System verbindet OKR-Denken mit Taskmanagement und automatisierter Validierung.

## Hierarchie

```
Projekt
  └── Strategie (hat Ziel, Zeithorizont)
        └── Taktik (hat Ziel, dient Strategie)
              └── Task (hat Intention, Kriterien, Zielgruppe)
                    └── Subtask (optional)
```

## Validierungs-Flow

```
┌─────────────────────────────────────────────────────┐
│  Task erstellen                                      │
│  ├── Intention (Warum?)                             │
│  ├── Qualitätskriterien (quantitativ + qualitativ)  │
│  └── Zielgruppe (Für wen?)                          │
└─────────────────┬───────────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────────┐
│  Main Agent arbeitet                                 │
└─────────────────┬───────────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────────┐
│  Validator Sub-Agent prüft neutral                   │
│  ├── Quantitativ: Playwright/Tests → Pass/Fail      │
│  └── Qualitativ: Bewertung 1-10 (min. 7 = Pass)     │
└─────────────────┬───────────────────────────────────┘
                  ▼
         ┌───────┴───────┐
         ▼               ▼
    [Pass ≥7/10]    [Fail <7/10]
         │               │
         ▼               ▼
    ✅ Task Done    Feedback + Loop
                         │
                         ▼
                  (max 10 Loops)
                         │
                         ▼
                  ❌ Aborted → Eskalation
```

## Task Status

| Status | Bedeutung |
|--------|-----------|
| `draft` | Task definiert, noch nicht gestartet |
| `open` | Bereit zur Bearbeitung |
| `working` | Main Agent arbeitet daran |
| `validating` | Bei Validator Sub-Agent |
| `passed` | Validierung erfolgreich ✅ |
| `failed` | Nach max_loops nicht validiert ❌ |
| `blocked` | Wartet auf externe Abhängigkeit |
| `aborted` | Manuell abgebrochen |

## Dateistruktur

```
task-system/
├── SCHEMA.md                    # Diese Dokumentation
├── validators/
│   └── default.md               # Standard Validator Prompt
├── templates/
│   ├── task.yaml                # Task Template
│   ├── strategy.yaml            # Strategie Template
│   └── project.yaml             # Projekt Template
└── projects/
    └── {project-slug}/
        ├── project.yaml         # Projekt-Meta
        ├── strategies/
        │   └── {strategy-slug}.yaml
        └── tasks/
            └── {task-id}.yaml
```

## Kontext-Weitergabe an Validator

Der Validator erhält:
1. **Task-Definition** (Intention, Kriterien, Zielgruppe)
2. **Strategie-Kontext** (Ziel der übergeordneten Strategie)
3. **Taktik-Kontext** (Ziel der Taktik)
4. **Ergebnis/Artefakt** (was der Main Agent produziert hat)
5. **Zugang zu Tools** (Playwright für E2E-Tests)

## Qualitative Bewertung

Skala 1-10:
- **1-3:** Unbrauchbar, verfehlt das Ziel
- **4-6:** Ansätze erkennbar, aber nicht ausreichend
- **7-8:** Gut, erfüllt die Kriterien
- **9-10:** Exzellent, übertrifft Erwartungen

**Minimum für Pass: 7/10**

## Regeln für Task-Erstellung

1. **Keine vagen Intentionen.** "Website verbessern" ❌ → "Conversion Rate der Landing Page erhöhen" ✅
2. **Mindestens 1 quantitatives Kriterium** wenn technisch möglich
3. **Zielgruppe immer definieren** – auch wenn es "Erik" oder "Endkunde" ist
4. **Bei Unklarheit: Fragen** statt raten

## 🔴 Pflicht-Validierung: Live-URL + Screenshots

**Bei JEDEM Task der eine Web-Oberfläche betrifft** (Frontend, Theme, Plugin, Config):

1. **Live-URL testen** — Die Prod/Dev/Staging-URL im Browser aufrufen (nicht nur CLI-Output vertrauen!)
2. **Playwright-Screenshots** — Mindestens 3 Seiten screenshotten:
   - Startseite
   - Eine Kategorie-/Listing-Seite
   - Eine Detail-Seite
3. **HTTP-Status prüfen** — `curl -sI <url>` muss 200 zurückgeben
4. **Kein Fehler-Check** — Keine Shopware Error Pages, keine 500er, kein "Domain Mapping Misconfiguration"
5. **CSS/Assets geladen** — Visuell verifizieren dass Styling korrekt ist (kein unstyled HTML)
6. **Vorher/Nachher** — Bei visuellen Änderungen: Screenshots VOR und NACH dem Deploy vergleichen

**Warum:** Theme-Compile, Cache-Clear, DB-Migrations können Seiteneffekte haben die nur über den Browser sichtbar sind. CLI-Erfolg ≠ Seite funktioniert.

**Template für URL-Validierung im Task:**
```yaml
live_url_validation:
  urls:
    - url: "https://ms-dev.erikreisig.de/"
      expect: 200
      screenshot: true
    - url: "https://ms-dev.erikreisig.de/sicherheitstechnik/"
      expect: 200
      screenshot: true
  checks:
    - "Kein Error-Screen"
    - "CSS vollständig geladen"
    - "Bilder/Assets laden"
```

## Abbruch-Kriterien

Nach 10 fehlgeschlagenen Validierungsversuchen:
1. Task wird auf `failed` gesetzt
2. Validator-Feedback wird gesammelt
3. Eskalation an Erik mit:
   - Was wurde versucht?
   - Warum scheitert die Validierung?
   - Vorschlag: Task neu formulieren oder aufteilen?
