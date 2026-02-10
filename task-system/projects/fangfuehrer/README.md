# FangFührer - Task System

## Projekt-Übersicht

**Name:** FangFührer - Pokédex für Angler  
**Owner:** Erik  
**Status:** Active (MVP Phase)

**Tech Stack:**
- Flutter (iOS/Android Native)
- Next.js PWA (Web)
- FastAPI Backend
- PostgreSQL + Redis
- GPT-4o Vision + Claude (Fish ID)

**Repos:**
- [heimdall-prometheus/fangfuehrer](https://github.com/heimdall-prometheus/fangfuehrer) - Backend + Flutter App
- [heimdall-prometheus/fangfuehrer-web](https://github.com/heimdall-prometheus/fangfuehrer-web) - PWA

**API:** https://fangfuehrer-api.erikreisig.de

---

## ⚡ WICHTIG: GitHub Issues = Tasks mit Validierung

**Prozess für JEDES GitHub Issue:**

1. **Issue erstellt/assigned**
2. **Task YAML erstellen** (`tasks/task-{NNN}-{slug}.yaml`)
   - Intention definieren (WARUM?)
   - Zielgruppe angeben
   - Quantitative Kriterien (testbar)
   - Qualitative Kriterien (1-10 Skala)
3. **Work erledigen**
4. **Validator spawnen** (Sub-Agent)
   - Testet alle Kriterien
   - Bewertet Qualität
   - Erstellt validation-result.yaml
5. **Bei Pass:** Issue schließen + Commit referenzieren
6. **Bei Fail:** Feedback-Loop (max 3 Runden)

**Keine Validierung = Issue nicht "done"!**

---

## Aktuelle Strategie: MVP Launch

**Ziel:** Funktionsfähige App für erste Beta-Tester (Feb 2026)

**Key Results:**
- ✅ Backend API komplett
- 🔄 PWA Core Features (in Validierung)
- 🔄 CI/CD Pipeline funktioniert
- ⬜ Erste Beta-Tester nutzen App

**Tactics:**
1. **backend-api** - Completed ✅
2. **pwa-core** - Validating 🔄
3. **ci-pipeline** - Working 🔄

---

## Tasks

| ID | Name | Status | Validator |
|----|------|--------|-----------|
| 001 | PWA Core Features | validating | Sub-Agent running |

---

## Learnings

### 2026-02-04: Task-System Integration
- Erik: "Immer nutzen! Auch für FangFührer"
- Erik: "Nutze für alle GitHub issues des Projekts"
- Retrospektive Validierung funktioniert
- Sub-Agent Validator Pattern etabliert

---

## Files

```
task-system/projects/fangfuehrer/
├── README.md (this file)
├── project.yaml
├── strategies/
│   └── mvp-launch.yaml
└── tasks/
    ├── task-001-pwa-core-features.yaml
    └── task-001-validation-result.yaml (pending)
```
