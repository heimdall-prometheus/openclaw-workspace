# Claude Skill: UGC Video Ad Production

## Skill Overview

Erstellt authentische UGC-style Video Ads mit:
- AI-generiertem Avatar (photorealistisch)
- Geklonter Stimme (natürlich, deutsch)
- Lip-Sync Video (OmniHuman)
- B-Roll Overlay (Produkt-Demo)

---

## PROJEKT-ORDNERSTRUKTUR

**KRITISCH:** Bei JEDER Skill-Ausführung Timestamp-Ordner erstellen!

```bash
# Ordner erstellen
mkdir -p video-assets/ugc-$(date +%Y-%m-%d-%H%M%S)/{01-briefing,02-scripts,03-avatars,04-audio,05-omnihuman,06-broll,07-final}
```

### Struktur:
```
video-assets/ugc-{YYYY-MM-DD-HHmmss}/
├── 01-briefing.md           # Projekt-Details, Zielgruppe, Angebot
├── 02-scripts/
│   ├── script-varianten.md  # Alle 5 Varianten vom Sub-Agent
│   └── script-final.md      # Gewählte Variante
├── 03-avatars/
│   ├── avatar-{name}.png    # Heruntergeladene Bilder (SOFORT!)
│   └── prompts.md           # Verwendete Prompts
├── 04-audio/
│   ├── audio-v{n}.mp3       # Heruntergeladenes Audio (SOFORT!)
│   └── meta.md              # Speed, Dauer, Voice-ID
├── 05-omnihuman/
│   ├── video-{name}.mp4     # Heruntergeladene Videos (SOFORT!)
│   └── meta.md              # Generation Details
├── 06-broll/
│   └── {asset-name}.png/mp4 # B-Roll Assets
└── 07-final/
    └── final-{name}.mp4     # Finales Video
```

### Briefing-Template (`01-briefing.md`):
```markdown
# UGC Video Ad Briefing

## Projekt
- **Erstellt:** {timestamp}
- **Kunde:** {name}
- **Website:** {url}

## Angebot
- **Produkt/Service:** {beschreibung}
- **Preis:** {preis}
- **Zeitrahmen:** {zeitrahmen}

## Zielgruppe
- **Wer:** {beschreibung}
- **Pain Points:** {liste}

## Avatar-Stil
- **Typ:** {bikini/casual/business/etc}
- **Alter:** {alter}
- **Ton:** {frech/seriös/freundlich}

## Format
- **Aspect Ratio:** {1:1 oder 9:16}
- **Ziel-Dauer:** {sekunden}s
```

---

## AUTO-DOWNLOAD REGEL

**⚠️ KRITISCH: fal.ai URLs sind temporär (~24h)!**

Nach JEDER fal.ai Generation **SOFORT** runterladen:

```bash
# Avatar
curl -o "{projekt}/03-avatars/avatar-{name}.png" "{fal-url}"

# Audio
curl -o "{projekt}/04-audio/audio-v1.mp3" "{fal-url}"

# OmniHuman Video
curl -o "{projekt}/05-omnihuman/video-{name}.mp4" "{fal-url}"
```

**NIEMALS** nur URLs in Referenz-Datei speichern ohne Download!

---

## INPUTS (Was muss ich wissen?)

### Pflicht-Inputs
| Input | Beispiel | Beschreibung |
|-------|----------|--------------|
| **Produkt-Website** | mein-malbuch.com | Für B-Roll Assets und CTA |
| **Zielgruppe** | Mütter mit Kindern (3-12) | Bestimmt Avatar-Persona |
| **Sprache** | Deutsch | TTS language_boost |
| **Voice-Referenz** | URL zu MP3 | Für Voice-Cloning |

### Optionale Inputs
| Input | Default | Optionen |
|-------|---------|----------|
| **Format** | 1:1 | 1:1 (Feed), 9:16 (Reels/Stories) |
| **Dauer** | 30s | Max 30s (OmniHuman Limit) |
| **Avatar-Stil** | Medium Shot Couch | Selfie, Stehend, Küche |
| **B-Roll Typ** | Vorher/Nachher | Split-Screen, Produkt-Mockup |

---

## WORKFLOW

### Phase 1: Voice Cloning (einmalig)
```typescript
// fal-ai/minimax/voice-clone
const result = await fal.subscribe('fal-ai/minimax/voice-clone', {
  input: { audio_url: 'https://..../reference.mp3' }
});
const VOICE_ID = result.custom_voice_id;
// Speichern! Kann wiederverwendet werden.
```

### Phase 1.5: Voice Selection (MIT CHECKPOINT!)

**⏸️ CHECKPOINT: Voice auswählen**

```
Optionen:
→ [Sophie (Default)] - Voice ID: Voice47317d7f1767100465 (weiblich, deutsch)
→ [Monk] - Voice ID: Voiced1b5389a1768753261 (männlich, ruhig, deutsch)
→ [Andere Voice-ID] - User gibt bestehende ID ein
→ [Neue Voice clonen] - Audio-Referenz erforderlich
```

**Nach Auswahl speichern in:** `{projekt}/04-audio/meta.md`
```markdown
## Voice
- **Voice-ID:** {voice_id}
- **Name:** {Sophie/Custom}
```

### Phase 2: Avatar Generation (MIT VALIDIERUNG!)

**⏸️ CHECKPOINT: Avatar dem User zeigen bevor weiter!**

```typescript
// fal-ai/nano-banana-pro
const result = await fal.subscribe('fal-ai/nano-banana-pro', {
  input: {
    prompt: `RAW photo, medium shot of a naturally beautiful German woman, age 32, sitting on a beige linen couch.

FRAMING: Medium shot from waist up, camera placed 2 meters away. NOT a selfie. NOT close-up. Subject fills about 60% of frame height.

SUBJECT: Blonde hair with natural highlights, shoulder-length. Clear blue eyes. Light natural makeup. Genuine warm smile. Natural skin texture with pores visible.

SETTING: Cozy bright living room. Soft afternoon window light. Blurred background with houseplants.

CAMERA: Subject LOOKING DIRECTLY INTO CAMERA LENS. Sharp focus on face.

STYLE: Authentic UGC influencer. NOT AI-generated. NOT stock photo.`,
    negative_prompt: 'artificial, CGI, 3D render, illustration, cartoon, plastic skin, overly smooth skin, perfect skin, airbrushed, studio lighting, stock photo, symmetrical face, too perfect, mannequin',
    image_size: { width: 1440, height: 1440 },  // 1:1 Format
    num_inference_steps: 30,
    guidance_scale: 7.5
  }
});
```

**KRITISCH:** Avatar-Auflösung bestimmt OmniHuman Output!
- 1:1 Avatar → 1:1 Video
- 9:16 Avatar → 9:16 Video (aber nano-banana-pro macht oft 1:1)

### Phase 2.5: Script-Generierung (MIT SUB-AGENT!)

**⏸️ CHECKPOINT: 5 Skript-Varianten erstellen und auswählen**

#### 1. Sub-Agent beauftragen mit Briefing:

```
AUFGABE: Erstelle 5 virale TikTok/Reels Script-Varianten

BRIEFING:
- Produkt/Angebot: {z.B. Website in 7 Tagen, 1400€}
- Zielgruppe: {z.B. Selbstständige mit veralteter Website}
- Avatar-Stil: {z.B. jung, frech, sexy im Bikini}
- Ton: {z.B. provokant, direkt, aufmerksamkeitserregend}

FORMAT (TikTok viral):
┌─────────────────────────────────────────────┐
│ HOOK (0-3s)     │ Aufmerksamkeit greifen    │
│ PROBLEM (3-8s)  │ Pain Point ansprechen     │
│ AGITATION (8-15s) │ Problem verstärken      │
│ LÖSUNG (15-22s) │ Konkretes Angebot         │
│ CTA (22-28s)    │ Klare Handlungsaufforderung│
└─────────────────────────────────────────────┘

REGELN:
- Max 70-75 Wörter (für ~27-29s bei Speed 1.1)
- URLs phonetisch aussprechen: "i-m-r MINUS media punkt d-e"
- Konkrete Zahlen: Preis, Zeitrahmen
- Frech, aber nicht beleidigend
- Deutsch, natürlich gesprochen
- 5 VERSCHIEDENE Hooks - nicht nur Variationen!

OUTPUT-FORMAT:
## Variante 1: {Titel/Hook-Stil}
{Script}
**Wörter:** {anzahl} | **Geschätzte Dauer:** ~{sekunden}s

[...für alle 5 Varianten]
```

#### 2. Varianten in Datei speichern:
`{projekt}/02-scripts/script-varianten.md`

#### 3. User wählt Variante:
```
⏸️ Welche Variante soll verwendet werden?
→ [1] {Hook-Preview}
→ [2] {Hook-Preview}
→ [3] {Hook-Preview}
→ [4] {Hook-Preview}
→ [5] {Hook-Preview}
→ [Anpassen] - Variante modifizieren
```

#### 4. Gewählte Variante speichern:
`{projekt}/02-scripts/script-final.md`

### Phase 3: TTS Audio (MIT VALIDIERUNG!)

**⏸️ CHECKPOINT: Audio generieren und validieren**

Das Script aus Phase 2.5 (`script-final.md`) verwenden:

```typescript
// fal-ai/minimax/speech-02-hd
const audio = await fal.subscribe('fal-ai/minimax/speech-02-hd', {
  input: {
    text: SCRIPT_FROM_FILE,  // Aus {projekt}/02-scripts/script-final.md
    voice_setting: {
      voice_id: VOICE_ID,    // Aus Phase 1.5
      speed: 1.1,            // ⭐ DEFAULT: 1.1 (nicht 1.0!)
      pitch: 1
    },
    language_boost: 'German'
  }
});
```

**Workflow mit Validierung:**
1. TTS generieren mit **Speed 1.1** (Default)
2. Audio SOFORT runterladen: `curl -o "{projekt}/04-audio/audio-v1.mp3" "{url}"`
3. User Audio-URL geben und Dauer anzeigen
4. User anhören lassen
5. Iteration falls nötig:
   - Zu lang (>30s)? → Speed +0.1 ODER Script kürzen
   - Zu schnell? → Speed -0.1
6. **Erst nach User-OK → weiter zu OmniHuman!**

**KRITISCH:** Audio muss < 30s sein (OmniHuman Limit)!
- ⚠️ NIEMALS Speed > 1.3 verwenden → klingt unnatürlich!
- Besser: Script kürzen statt Speed erhöhen
- Notfall: FFmpeg atempo: `ffmpeg -i audio.mp3 -filter:a "atempo=1.05" audio-fast.mp3`

### Phase 4: OmniHuman Lip-Sync
```typescript
// fal-ai/bytedance/omnihuman/v1.5
const video = await fal.subscribe('fal-ai/bytedance/omnihuman/v1.5', {
  input: {
    image_url: uploadedAvatarUrl,
    audio_url: uploadedAudioUrl
  }
});
```

**Output:** Video mit exakt Audio-Länge, gleichem Aspect Ratio wie Avatar

### Phase 5: B-Roll erstellen
```bash
# 1. Bilder auf Video-Format skalieren
ffmpeg -y -i nachher.png -vf "scale=1440:1440:force_original_aspect_ratio=increase,crop=1440:1440" nachher-scaled.png
ffmpeg -y -i vorher.png -vf "scale=1440:1440:force_original_aspect_ratio=increase,crop=1440:1440" vorher-scaled.png

# 2. Ken Burns Clips (je 2.5s)
ffmpeg -y -loop 1 -i nachher-scaled.png -vf "zoompan=z='1+0.04*on/62.5':d=62.5:s=1440x1440:fps=25" -t 2.5 -c:v libx264 -pix_fmt yuv420p nachher-clip.mp4
ffmpeg -y -loop 1 -i vorher-scaled.png -vf "zoompan=z='1.1-0.04*on/62.5':d=62.5:s=1440x1440:fps=25" -t 2.5 -c:v libx264 -pix_fmt yuv420p vorher-clip.mp4

# 3. Crossfade (0.3s)
ffmpeg -y -i nachher-clip.mp4 -i vorher-clip.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.3:offset=2.2,format=yuv420p[v]" -map "[v]" -c:v libx264 -crf 18 broll-5s.mp4
```

### Phase 6: Final Assembly (OVERLAY ODER CUT)

**⏸️ CHECKPOINT: User fragen welchen Modus!**

#### Modus A: Overlay (Standard)
Original OmniHuman Video+Audio bleibt 100% intakt. B-Roll als Layer drüber.

```bash
ffmpeg -y -i omnihuman-output.mp4 -i broll-5s.mp4 -filter_complex "
    [1:v]format=yuva420p,
         fade=t=in:st=0:d=0.3:alpha=1,
         fade=t=out:st=4.42:d=0.3:alpha=1,
         setpts=PTS+12/TB[broll];
    [0:v][broll]overlay=0:0:enable='between(t,12,16.72)'[vout]
  " -map "[vout]" -map 0:a -c:v libx264 -crf 18 -c:a copy final.mp4
```

**Pro:** Keine Lip-Sync Probleme möglich
**Con:** B-Roll konkurriert visuell mit Avatar

#### Modus B: Cut (NEU)
OmniHuman Video wird an B-Roll Stellen geschnitten. B-Roll ersetzt komplett.
Audio läuft durchgehend weiter.

```bash
# 1. Video in Segmente schneiden (an natürlichen Pausen!)
ffmpeg -y -i omnihuman.mp4 -ss 0 -to 6 -c copy clip1.mp4      # Hook (0-6s)
ffmpeg -y -i omnihuman.mp4 -ss 8 -to 14 -c copy clip2.mp4     # Nach B-Roll 1
ffmpeg -y -i omnihuman.mp4 -ss 18 -to 28 -c copy clip3.mp4    # Nach B-Roll 2

# 2. Audio extrahieren (bleibt durchgehend)
ffmpeg -y -i omnihuman.mp4 -vn -c:a copy audio.aac

# 3. Concat-File erstellen
cat > segments.txt << EOF
file 'clip1.mp4'
file 'broll1.mp4'
file 'clip2.mp4'
file 'broll2.mp4'
file 'clip3.mp4'
file 'endscreen.mp4'
EOF

# 4. Video zusammenfügen (ohne Audio)
ffmpeg -y -f concat -safe 0 -i segments.txt -c:v libx264 -an video-concat.mp4

# 5. Original Audio drüberlegen
ffmpeg -y -i video-concat.mp4 -i audio.aac -c:v copy -c:a aac -shortest final.mp4
```

**Pro:** B-Roll hat volle Aufmerksamkeit
**Con:** Muss an natürlichen Pausen schneiden (zwischen Sätzen!)

**WICHTIG für Cut-Modus:**
- Script MUSS natürliche Pausen an B-Roll Stellen haben
- Schnitte NUR zwischen Sätzen, NIEMALS mitten im Wort
- B-Roll Timings vorher im Script-Plan definieren

### Phase 7: R2 Upload (Cloud Storage)

**Nach Final Assembly → Videos auf Cloudflare R2 hochladen**

```typescript
// upload-r2.mjs
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

// Credentials aus /root/lead-generator/webapp/.env
const client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,  // https://{account_id}.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadVideo(localPath, r2Key) {
  const body = readFileSync(localPath);
  await client.send(new PutObjectCommand({
    Bucket: 'previews',  // Bestehender Bucket
    Key: r2Key,          // z.B. 'ugc-videos/imr-media/final-variant-1.mp4'
    Body: body,
    ContentType: 'video/mp4',
  }));
  return `${process.env.R2_PUBLIC_URL}/${r2Key}`;
}

// Beispiel:
const url = await uploadVideo(
  'video-assets/ugc-2026-01-02/07-final/final-variant-1.mp4',
  'ugc-videos/client-name/final-variant-1.mp4'
);
console.log('Public URL:', url);
// → https://assets.imr-media.de/ugc-videos/client-name/final-variant-1.mp4
```

**R2 Credentials (aus `/root/lead-generator/webapp/.env`):**
```
R2_ENDPOINT=https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com
R2_BUCKET=previews
R2_ACCESS_KEY_ID=fba6fd5a52259788403b98521e965376
R2_SECRET_ACCESS_KEY=ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e
R2_PUBLIC_URL=https://assets.imr-media.de
```

**Dependency:** `npm install @aws-sdk/client-s3`

**URL-Struktur:**
```
https://assets.imr-media.de/ugc-videos/{client}/{filename}.mp4
```

#### Parameter erklärt (Overlay-Modus):
- `format=yuva420p` - Alpha-Kanal für Fade
- `fade=t=in:st=0:d=0.3:alpha=1` - 0.3s Einblenden
- `fade=t=out:st=4.42:d=0.3:alpha=1` - 0.3s Ausblenden (bei 4.72s - 0.3s)
- `setpts=PTS+12/TB` - B-Roll startet bei t=12s
- `overlay=...enable='between(t,12,16.72)'` - Sichtbar nur 12-16.72s
- `-map 0:a` - Original Audio behalten!

---

## VALIDIERUNGS-CHECKPOINTS

**WICHTIG:** NIEMALS automatisch von Avatar → TTS → OmniHuman durchlaufen!
Jeder Schritt endet mit User-Validierung. OmniHuman kostet ~$1/Video!

### Checkpoint 1: Nach Avatar-Generierung
```
1. Avatar generieren (nano-banana-pro)
2. ⏸️ STOPP - Bild dem User zeigen
3. Fragen: "Passt dieser Avatar für das Video?"
   → [Akzeptieren] - weiter zu Phase 3
   → [Regenerieren] - gleicher Prompt, neuer Seed
   → [Prompt anpassen] - User gibt Feedback
4. Loop bis User zufrieden
```

### Checkpoint 2: Nach TTS-Generierung
```
1. TTS generieren mit konservativem Speed (1.0-1.1)
2. ⏸️ STOPP - Audio-URL bereitstellen
3. Anzeigen:
   - "Audio-Dauer: X.X Sekunden"
   - "Speed: X.X"
   - ⚠️ Warnung wenn >30s: "Zu lang für OmniHuman!"
4. User anhören lassen
5. Optionen:
   → [Akzeptieren] - wenn <30s UND natürlich klingt
   → [Schneller] - Speed +0.1, neu generieren
   → [Langsamer] - Speed -0.1, neu generieren
   → [Script kürzen] - zurück zur Script-Phase
6. Loop bis Audio <30s UND User zufrieden
```

**Kosten-Warnung vor OmniHuman:**
```
⚠️ OmniHuman Lip-Sync kostet ~$1 pro Video und dauert 8-10 Minuten.
Bist du sicher dass Avatar und Audio passen?
→ [Ja, starten] → [Nochmal prüfen]
```

### Checkpoint 3: Nach OmniHuman
```
1. Video-URL bereitstellen
2. Fragen: "Ist die Lip-Sync Qualität akzeptabel?"
   → [Akzeptieren] - weiter zu Assembly
   → [Regenerieren] - nochmal ~$1, neue Generation
```

### Checkpoint 4: B-Roll Assets auswählen
```
⏸️ CHECKPOINT: B-Roll Assets

1. Verfügbare Assets auflisten:
   - Screenshots der Produkt-Website
   - Vorher/Nachher Bilder
   - Produkt-Mockups
   - Stock Footage URLs
   - Bildschirmaufnahmen

2. User wählt:
   → Welche Assets verwenden? (Mehrfachauswahl)
   → An welchen Timecodes einblenden?
   → Wie lange pro Asset?

3. Assets in {projekt}/06-broll/ speichern/kopieren
```

### Checkpoint 5: Assembly-Modus
```
⏸️ CHECKPOINT: B-Roll Modus

→ [Overlay] - B-Roll als transparente Schicht über Talking Head
   Pro: Lip-Sync bleibt intakt
   Con: B-Roll konkurriert visuell

→ [Cut] - Video schneiden, B-Roll dazwischen
   Pro: B-Roll hat volle Aufmerksamkeit
   Con: Nur an Satzgrenzen schneiden!

Bei Cut-Modus: Schnitt-Timings mit User abstimmen
```

---

## TTS SPEED-REFERENZ

| Speed | Charakter | Empfohlen für |
|-------|-----------|---------------|
| 0.9   | Sehr langsam, dramatisch | Emotionale Hooks |
| 1.0   | Normal, natürlich | Kurze Scripts |
| **1.1** | **Leicht flotter** | **⭐ DEFAULT - Standard** |
| 1.2   | Schnell aber verständlich | 30s Limit knapp |
| 1.3   | Sehr schnell | Nur wenn absolut nötig |
| 1.35+ | Unnatürlich | ⚠️ VERMEIDEN |

**DEFAULT: 1.1** (nicht 1.0!)

**Faustformel:**
- ~25 Wörter ≈ 10s bei Speed 1.0
- ~27-28 Wörter ≈ 10s bei Speed 1.1
- Ziel: Script so schreiben dass Speed 1.1 reicht
- NIEMALS Speed >1.3 verwenden → klingt roboterhaft

**Beispiel-Kalkulation:**
```
Script: 75 Wörter
Bei Speed 1.0: ~30s ✅
Bei Speed 1.1: ~27s ✅
Bei Speed 1.2: ~25s ✅
Bei Speed 1.35: ~22s ⚠️ zu schnell, unnatürlich
```

---

## KRITISCHE LEARNINGS

### 1. Aspect Ratio
- Avatar-Bild bestimmt Video-Format
- nano-banana-pro generiert oft 1:1 (auch wenn 9:16 angefragt)
- Lösung: 1:1 akzeptieren ODER recraft-v3 für 9:16

### 2. OmniHuman 30s Limit
- Audio MUSS < 30s sein
- Anpassung: TTS speed erhöhen (1.2-1.3) oder FFmpeg atempo

### 3. Schneiden nur im Cut-Modus
- OmniHuman Output ist heilig im Overlay-Modus
- Im Cut-Modus: NUR an Satzgrenzen schneiden (natürliche Pausen)
- NIEMALS mitten im Wort schneiden → Lip-Sync Probleme
- Audio bleibt immer durchgehend, nur Video wird geschnitten

### 4. Padding NACH OmniHuman
- Stille am Ende NACH Video-Generierung hinzufügen
- Nicht vorher (verwirrt OmniHuman)

### 5. CTA Aussprache
- "mein-malbuch-punkt-com" nicht ".com"
- URLs phonetisch schreiben

### 6. Photorealismus
- "NOT selfie" im Prompt
- "Medium shot, camera 2 meters away"
- Negative Prompt: "plastic skin, too perfect, symmetrical face"

---

## API REFERENZ

| Zweck | Endpoint | Max Duration |
|-------|----------|--------------|
| Voice Clone | `fal-ai/minimax/voice-clone` | - |
| TTS | `fal-ai/minimax/speech-02-hd` | - |
| Avatar | `fal-ai/nano-banana-pro` | - |
| Avatar (9:16) | `fal-ai/recraft-v3` | - |
| Lip-Sync | `fal-ai/bytedance/omnihuman/v1.5` | **30s** |
| Cloud Storage | Cloudflare R2 (S3-kompatibel) | - |

### R2 Storage Details
- **Bucket:** `previews`
- **Public URL:** `https://assets.imr-media.de/`
- **Pfad-Convention:** `ugc-videos/{client}/{filename}.mp4`

---

## DATEISTRUKTUR

**→ Siehe "PROJEKT-ORDNERSTRUKTUR" am Anfang des Skills!**

Timestamp-basiert: `video-assets/ugc-{YYYY-MM-DD-HHmmss}/`

---

## QUICK START

```bash
# 1. Avatar generieren
npx tsx generate-avatar-photorealistic.ts

# 2. Audio generieren (mit vorhandener Voice-ID)
# Im Script: VOICE_ID = 'Voice47317d7f1767100465'

# 3. Pipeline ausführen
npx tsx run-malbuch-pipeline.ts

# Output: video-assets/malbuch/final/malbuch-v{n}-{format}.mp4
```

---

## CHECKLISTE VOR START

- [ ] Produkt-Website URL
- [ ] Zielgruppe definiert
- [ ] Voice-Referenz Audio (MP3, ~10s, klar)
- [ ] B-Roll Bilder (Vorher/Nachher)
- [ ] Format entschieden (1:1 oder 9:16)
- [ ] Script geschrieben (< 30s bei 1.2x Speed)
- [ ] FAL_AI_KEY in .env
- [ ] R2 Credentials verfügbar (für Cloud Upload)
