# 🎯 Heimdall Task System

Ein selbstkorrigierendes Task-Management-System mit automatisierter Validierung.

## Quick Start

### Neuen Task erstellen

```bash
# Template kopieren
cp templates/task.yaml projects/{project}/tasks/task-$(date +%Y-%m-%d)-NNN.yaml
```

### Task-Lifecycle

1. **Draft** → Task definieren (Intention, Kriterien, Zielgruppe)
2. **Open** → Bereit zur Bearbeitung
3. **Working** → Heimdall arbeitet
4. **Validating** → Sub-Agent prüft
5. **Passed** ✅ oder **Loop** 🔄 (max 10x)

## Struktur

```
task-system/
├── SCHEMA.md          # Vollständige Dokumentation
├── README.md          # Diese Datei
├── validators/
│   └── default.md     # Validator-Agent Prompt
├── templates/
│   ├── task.yaml
│   ├── strategy.yaml
│   └── project.yaml
└── projects/
    └── mein-malbuch/  # Beispiel-Projekt
```

## Philosophie

> **Output ≠ Outcome**
> 
> Ein Task ist nicht "erledigt" wenn er gemacht wurde,
> sondern wenn er seinen Zweck erfüllt hat.

## Validierung

- **Quantitative Kriterien**: Automatisch testbar (Playwright, Lighthouse)
- **Qualitative Kriterien**: 1-10 Skala, Minimum 7 für Pass
- **Feedback Loop**: Bei Fail → konkretes Feedback → erneuter Versuch
- **Exit Condition**: Nach 10 Loops → Eskalation an Erik

## Für Heimdall

Bei jedem neuen Task:
1. Definiere klare Intention (WARUM, nicht WAS)
2. Mindestens 1 quantitatives Kriterium
3. Zielgruppe immer angeben
4. Bei Unklarheit → Erik fragen

Siehe `SCHEMA.md` für vollständige Dokumentation.
