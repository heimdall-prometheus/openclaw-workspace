# Global Claude Instructions

## Skills

Skills sind wiederverwendbare Workflows die ich ausführen kann.

### Verfügbare Skills:

| Skill | Befehl | Beschreibung |
|-------|--------|--------------|
| **UGC Video Ad** | "Erstelle UGC Video für [website]" | AI-generierte Video Ads mit Avatar, Voice Clone, Lip-Sync |
| **fal.ai Image Gen** | "Generiere Bild..." | Bildgenerierung mit fal.ai (Nano Banana Pro, Recraft, FLUX) |

### Skill-Dateien:
- `~/.claude/skills/ugc-video-ad-skill.md` - UGC Video Ads
- `~/.claude/skills/fal-image-gen-skill.md` - Bildgenerierung mit fal.ai

---

## Skill: UGC Video Ad

Wenn der User ein UGC Video Ad erstellen möchte, lies zuerst:
`~/.claude/skills/ugc-video-ad-skill.md`

**Trigger-Phrasen:**
- "Erstelle UGC Video für..."
- "Video Ad für..."
- "UGC Ad mit Avatar..."

**Benötigte Inputs:**
1. Produkt-Website URL
2. Zielgruppe
3. Voice-Referenz (oder bestehende Voice-ID)
4. Format (1:1 oder 9:16)

**Quick Reference:**
- Voice ID (Sophie): `Voice47317d7f1767100465`
- OmniHuman Limit: 30 Sekunden
- Kritisch: NIEMALS OmniHuman Output schneiden - nur Overlay!

---

## Skill: fal.ai Image Generation

Wenn der User ein Bild generieren möchte, lies zuerst:
`~/.claude/skills/fal-image-gen-skill.md`

**Trigger-Phrasen:**
- "Generiere Bild..."
- "Erstelle Bild mit fal..."
- "Image-to-Image..."
- "Bearbeite Bild..."

**Features:**
- Wizard-Style Parameter-Führung
- Prompt-Optimizer (Claude verbessert Prompts)
- Kosten-Tracker (Preis vor Generation)
- Batch-Generation (Varianten)

**Modelle:**
| Modell | Best für | Preis |
|--------|----------|-------|
| Nano Banana Pro | Photo, Avatar | $0.15/img |
| Recraft V3 | Illustration, Vector | $0.04/img |
| FLUX.2 Pro | Max Qualität | $0.03/MP |
| FLUX.2 Flash | Speed | $0.01/MP |
