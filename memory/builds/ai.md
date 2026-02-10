# 🤖 AI/ML Builds

## Image Generation

### fal.ai Image Generation (2026-01-30)
**Was:** Blog-Bilder mit KI generieren
**Wie:**
- API: fal.ai
- Modell: `fal-ai/nano-banana-pro`
- Stil: Smarte Infografiken wenn möglich
- Format: 16:9 (Header) oder 1:1 (Social)
- Upload: Immer auf R2 für permanente URLs
**WICHTIG:** Infografiken STRENG auf Korrektheit prüfen!
**Credentials:** `credentials/imr-api-keys.md`

### fal.ai TTS (German Voices)
**Was:** Text-to-Speech für deutsche Inhalte
**Wie:**
- Voice IDs: 
  - Sophie: `Voice47317d7f1767100465`
  - Monk: `Voiced1b5389a1768753261`
- Speed: 1.1 (default), 1.2-1.3 (schnell)
**API Format:**
```json
{
  "text": "...",
  "voice_setting": {
    "voice_id": "Voice47317d7f1767100465",
    "speed": 1.1,
    "pitch": 1
  },
  "language_boost": "German"
}
```

---

## Transcription

### Audio Message Processing (2026-02-01)
**Was:** Automatische Audio-Transkription
**Wie:**
- OpenClaw Gateway → Whisper API (automatisch!)
- Format in Message: `<media:audio> Transcript: [text]`
- Deutsche Umlaute korrekt
- Kein manuelles Script nötig
**Status:** ✅ Funktioniert automatisch
