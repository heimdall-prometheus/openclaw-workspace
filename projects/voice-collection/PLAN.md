# 🎭 Heimdall Voice Collection - Plan

## Status: IN PROGRESS
**Erstellt:** 2026-02-01
**Ziel:** Vielfältige Stimmen für verschiedene Situationen

---

## 🎯 Strategie

### Phase 1: Basis-Stimmen (Heute)
Verschiedene Charaktere für unterschiedliche Kontexte:

| Stimme | Charakter | Use Case | Quelle |
|--------|-----------|----------|--------|
| **HP Baxxter** ✅ | Energetisch, Power | Motivation, Hype | Voice78d9cb991769959037 |
| **Erzähler** | Warm, ruhig, seriös | Geschichten, Erklärungen | Zu klonen |
| **Flüsterer** | Intim, ASMR-artig | Geheimnisse, Nacht | Zu klonen |
| **Roboter** | Mechanisch, retro | Comedy, Sci-Fi | Zu klonen |
| **Kind** | Unschuldig, neugierig | Winterhof-Projekt? | Zu klonen |

### Phase 2: Spezial-Stimmen (Optional)
- Dialekte (Bayerisch, Wienerisch, etc.)
- Historische Figuren (falls legal)
- Prominente Stimmen (mit Vorsicht)

---

## 🔧 Technischer Prozess

### Voice Cloning mit fal.ai/minimax:
```bash
# 1. Audio-Sample hochladen (min 10 Sek, klar, ohne Musik)
# 2. Voice klonen
curl -X POST "https://fal.run/fal-ai/minimax/voice-clone" \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audio_url": "URL_ZUM_SAMPLE",
    "voice_name": "stimmenname"
  }'

# 3. Voice ID speichern
# 4. In TOOLS.md dokumentieren
```

---

## 📋 Nächste Schritte

1. [ ] **Erzähler-Stimme finden**
   - YouTube nach deutschen Hörbuch-Sprechern durchsuchen
   - Oder: Professionelle Sprecher-Samples (lizenzfrei)
   
2. [ ] **Samples extrahieren**
   - 10-30 Sekunden klares Audio
   - Keine Hintergrundmusik
   - Gute Qualität

3. [ ] **Klonen & Testen**
   - Jede Stimme klonen
   - Test-Sätze generieren
   - Qualität prüfen

4. [ ] **Dokumentieren**
   - Voice IDs in TOOLS.md
   - Beispiel-Outputs speichern

---

## 🎤 Potenzielle Quellen für Samples

### Lizenzfrei/Fair Use:
- LibriVox (Public Domain Hörbücher)
- Eigene Aufnahmen
- CC-lizenzierte Podcasts
- Stock Voice Samples

### Zu recherchieren:
- Deutsche Synchronsprecher (Samples?)
- Voice-Actor Demos (oft frei verfügbar)

---

## 📝 Notizen

- HP Baxxter funktioniert perfekt als "Power Mode"
- Minimax TTS hat gute deutsche Sprachqualität
- Voice Cloning braucht saubere Samples
- Jede neue Stimme = neue Möglichkeiten

---

*Dieser Plan wird aktualisiert während ich Stimmen sammle.*
