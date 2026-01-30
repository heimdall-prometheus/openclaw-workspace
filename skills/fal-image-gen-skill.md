# Claude Skill: fal.ai Image Generation

## Skill Overview

Generiert Bilder mit fal.ai - unterstützt mehrere Modelle, Text-to-Image und Image-to-Image.

**Features:**
- Wizard-Style Parameter-Führung
- Prompt-Optimizer
- Kosten-Tracker
- Batch-Generation
- **R2 Upload** (Cloudflare R2 für einfache Verwendung)

---

## WIZARD-FLOW

### Schritt 1: Modus
```
[ ] Text-to-Image (Neues Bild generieren)
[ ] Image-to-Image (Bestehendes Bild bearbeiten)
```

### Schritt 2: Use-Case Preset
```
[ ] Marketing Asset (Produkt-Mockup, Social Graphics)
[ ] Avatar/Portrait (Photorealistische Person)
[ ] Illustration (Digital Art, Vector)
[ ] Custom (Freie Eingabe)
```

### Schritt 3: Modell-Empfehlung

| Use-Case | Empfohlenes Modell | Warum |
|----------|-------------------|-------|
| **Marketing/Produkt** | `fal-ai/nano-banana-pro` | Beste Qualität, Web-Search Option |
| **Avatar/Portrait** | `fal-ai/nano-banana-pro` | Photorealismus |
| **Illustration/Vector** | `fal-ai/recraft-v3` | SOTA für Illustrationen + Vector |
| **Schnell/Draft** | `fal-ai/flux-2-flash` | Speed über Qualität |
| **Max Qualität** | `fal-ai/flux-2-pro` | Production-optimized |

### Schritt 4: Format/Aspect Ratio
```
[ ] 1:1 (Feed, Square)
[ ] 9:16 (Stories, Reels, TikTok)
[ ] 16:9 (YouTube, Banner)
[ ] 4:3 (Klassisch)
[ ] Custom
```

### Schritt 5: Auflösung
```
[ ] 1K (Standard, schnell)
[ ] 2K (Höhere Qualität)
[ ] 4K (Maximum, 2x Preis)
```

### Schritt 6: Prompt + Optimizer
User gibt Prompt → Claude optimiert optional

### Schritt 7: Kosten-Check
Zeige geschätzte Kosten vor Generation

### Schritt 8: Generieren
Optional: Batch-Varianten

---

## MODELL-REFERENZ

### Nano Banana Pro (Default)
```typescript
// fal-ai/nano-banana-pro
const result = await fal.subscribe('fal-ai/nano-banana-pro', {
  input: {
    prompt: "...",
    num_images: 1,
    aspect_ratio: "1:1",  // 21:9, 16:9, 3:2, 4:3, 5:4, 1:1, 4:5, 3:4, 2:3, 9:16
    resolution: "1K",     // 1K, 2K, 4K
    output_format: "png", // jpeg, png, webp
    enable_web_search: false  // +$0.015 für aktuelle Infos
  }
});
```
**Preis:** $0.15/Bild (1K/2K), $0.30/Bild (4K)

### Recraft V3 (Illustrationen)
```typescript
// fal-ai/recraft-v3
const result = await fal.subscribe('fal-ai/recraft-v3', {
  input: {
    prompt: "...",
    image_size: "square_hd",  // square, portrait_4_3, landscape_16_9
    style: "realistic_image", // digital_illustration, vector_illustration
    colors: ["#FF5733", "#1E90FF"]  // Optional: Brand-Farben
  }
});
```
**Preis:** $0.04/Bild (realistisch), $0.08/Bild (vector)

**Verfügbare Styles:**
- `realistic_image` (+ Varianten: b_and_w, hdr, studio_portrait)
- `digital_illustration` (+ Varianten: pixel_art, hand_drawn, watercolor)
- `vector_illustration` (+ Varianten: cartoon, line_art, flat_2)

### FLUX.2 Pro (Max Quality)
```typescript
// fal-ai/flux-2-pro
const result = await fal.subscribe('fal-ai/flux-2-pro', {
  input: {
    prompt: "...",
    image_size: { width: 1024, height: 1024 },
    num_inference_steps: 28,
    guidance_scale: 3.5
  }
});
```
**Preis:** $0.03/Megapixel

### FLUX.2 Flash (Speed)
```typescript
// fal-ai/flux-2-flash
const result = await fal.subscribe('fal-ai/flux-2-flash', {
  input: {
    prompt: "...",
    image_size: "square_hd"
  }
});
```
**Preis:** ~$0.01/Megapixel

---

## IMAGE-TO-IMAGE EDITING

### Mit Nano Banana Pro
```typescript
const result = await fal.subscribe('fal-ai/nano-banana-pro', {
  input: {
    prompt: "Change the background to a beach sunset",
    image_urls: ["https://...original-image.png"],
    num_images: 1
  }
});
```

### Mit FLUX.2 Kontext (Präzises Editing)
```typescript
const result = await fal.subscribe('fal-ai/flux-2', {
  input: {
    prompt: "Make the person wear a red jacket",
    image_url: "https://...original.png"
  }
});
```

---

## PROMPT-OPTIMIZER

Vor Generation: Claude analysiert und verbessert Prompt.

**Beispiel:**
```
User: "ein hund am strand"

Claude optimiert zu:
"Professional photograph of a golden retriever running on a sandy beach,
golden hour lighting, waves in background, motion blur on paws,
sharp focus on face, joyful expression, Canon EOS R5 style"
```

**Optimierungs-Regeln:**
- Kamera/Licht-Details hinzufügen
- Spezifische Adjektive statt generische
- Composition-Hints (Framing, Fokus)
- Style-Keywords basierend auf Use-Case
- Negative Prompts für Qualität

---

## KOSTEN-TRACKER

Vor jeder Generation anzeigen:

```
┌─────────────────────────────────────┐
│ Geschätzte Kosten                   │
├─────────────────────────────────────┤
│ Modell:     Nano Banana Pro         │
│ Auflösung:  2K                      │
│ Anzahl:     3 Bilder                │
│ Web Search: Ja (+$0.015)            │
├─────────────────────────────────────┤
│ TOTAL:      $0.465                  │
│             (~3 Generierungen/$1)   │
└─────────────────────────────────────┘
```

### Preis-Referenz

| Modell | Preis | Speed | Qualität |
|--------|-------|-------|----------|
| Nano Banana Pro | $0.15/img | Medium | Excellent |
| Recraft V3 | $0.04/img | Fast | Excellent |
| FLUX.2 Pro | $0.03/MP | Medium | Best |
| FLUX.2 Flash | $0.01/MP | Fastest | Good |

---

## BATCH-GENERATION

Mehrere Varianten gleichzeitig generieren:

```typescript
// Style-Varianten mit Recraft
const prompts = [
  { ...baseInput, style: "realistic_image" },
  { ...baseInput, style: "digital_illustration" },
  { ...baseInput, style: "vector_illustration" }
];

const results = await Promise.all(
  prompts.map(input => fal.subscribe('fal-ai/recraft-v3', { input }))
);
```

**Batch-Optionen:**
- Style-Varianten (3-4 verschiedene Styles)
- Aspect-Ratio-Varianten (1:1, 9:16, 16:9)
- Prompt-Varianten (leichte Änderungen)
- Seed-Varianten (gleicher Prompt, verschiedene Seeds)

---

## PROMPT-TEMPLATES

### Marketing/Produkt
```
Professional product photography of {produkt},
clean white background, soft studio lighting,
commercial quality, high-end advertising style
```

### Avatar/Portrait
```
RAW photo, medium shot of a naturally beautiful {geschlecht},
age {alter}, {setting}.

FRAMING: Medium shot from waist up, camera 2 meters away.
SUBJECT: {haar}, {augen}, natural makeup, genuine smile.
CAMERA: Looking directly into lens. Sharp focus on face.
STYLE: Authentic UGC influencer. NOT AI-generated.

[Negative: artificial, CGI, plastic skin, too perfect, symmetrical]
```

### Illustration
```
{style} illustration of {subject},
vibrant colors, clean lines, professional design,
suitable for {verwendung}
```

### Social Media Post
```
Eye-catching social media graphic for {thema},
{format} format, bold typography space,
modern design, {brand_colors} color scheme
```

---

## DATEISTRUKTUR

```
image-assets/{projekt}/
├── generated/
│   └── {modell}-{timestamp}.png
├── edited/
│   └── {original}-edit-{timestamp}.png
└── prompts/
    └── prompt-log.md
```

---

## R2 UPLOAD (Cloudflare)

Nach der Generierung: Automatisch auf R2 hochladen für permanente URLs.

### Setup (einmalig)

1. **R2 Bucket erstellen** im Cloudflare Dashboard
2. **S3 API Credentials erstellen:**
   - Dashboard → R2 → Manage R2 API Tokens → Create API Token
   - Permissions: Object Read & Write
   - Kopiere Access Key ID + Secret Access Key

3. **Credentials in ~/.bashrc:**
```bash
# Cloudflare R2 (S3-kompatibel)
export R2_ACCESS_KEY_ID="your-access-key"
export R2_SECRET_ACCESS_KEY="your-secret-key"
export R2_ENDPOINT="https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
export R2_BUCKET="ai-generated-images"
export R2_PUBLIC_URL="https://images.yourdomain.com"  # Custom Domain oder R2.dev URL
```

### Upload mit curl (S3-kompatibel)

```bash
# Variablen
FILE="image.png"
KEY="generated/$(date +%Y%m%d)/image-$(date +%H%M%S).png"
CONTENT_TYPE="image/png"
DATE=$(date -R)
RESOURCE="/${R2_BUCKET}/${KEY}"

# S3 Signature erstellen
STRING_TO_SIGN="PUT\n\n${CONTENT_TYPE}\n${DATE}\n${RESOURCE}"
SIGNATURE=$(echo -en "${STRING_TO_SIGN}" | openssl sha1 -hmac "${R2_SECRET_ACCESS_KEY}" -binary | base64)

# Upload
curl -X PUT "${R2_ENDPOINT}/${R2_BUCKET}/${KEY}" \
  -H "Host: ${R2_BUCKET}.${R2_ENDPOINT#https://}" \
  -H "Date: ${DATE}" \
  -H "Content-Type: ${CONTENT_TYPE}" \
  -H "Authorization: AWS ${R2_ACCESS_KEY_ID}:${SIGNATURE}" \
  --data-binary "@${FILE}"

echo "Uploaded: ${R2_PUBLIC_URL}/${KEY}"
```

### Upload mit AWS CLI (einfacher)

```bash
# AWS CLI konfigurieren für R2
aws configure set aws_access_key_id $R2_ACCESS_KEY_ID --profile r2
aws configure set aws_secret_access_key $R2_SECRET_ACCESS_KEY --profile r2

# Upload
aws s3 cp image.png s3://${R2_BUCKET}/generated/image.png \
  --endpoint-url $R2_ENDPOINT \
  --profile r2

# Public URL
echo "${R2_PUBLIC_URL}/generated/image.png"
```

### Upload-Funktion (TypeScript)

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function uploadToR2(imageUrl: string, filename: string): Promise<string> {
  // Download from fal.ai
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  // Upload to R2
  const key = `generated/${new Date().toISOString().split('T')[0]}/${filename}`;
  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: 'image/png',
  }));

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

// Verwendung nach fal.ai Generation
const falResult = await fal.subscribe('fal-ai/nano-banana-pro', { input });
const permanentUrl = await uploadToR2(
  falResult.images[0].url,
  `marketing-${Date.now()}.png`
);
console.log('Permanent URL:', permanentUrl);
```

### Wizard-Erweiterung (Schritt 9)

Nach erfolgreicher Generierung fragen:
```
[ ] Auf R2 hochladen (permanente URL)
[ ] Nur lokal speichern
[ ] Beides
```

### Public Access einrichten

**Option A: R2.dev Subdomain (schnell)**
- Dashboard → R2 → Bucket → Settings → Public Access
- Enable R2.dev subdomain
- URL: `https://<bucket>.<account>.r2.dev/path/to/image.png`

**Option B: Custom Domain (besser)**
- Dashboard → R2 → Bucket → Settings → Custom Domains
- Add domain: `images.yourdomain.com`
- URL: `https://images.yourdomain.com/path/to/image.png`

---

## KRITISCHE PUNKTE

1. **FAL_AI_KEY** muss in `~/.bashrc` sein
2. **Aspect Ratio**: Nano Banana Pro hat mehr Optionen als andere
3. **4K = 2x Preis** bei Nano Banana Pro
4. **Web Search**: +$0.015 für aktuelle Infos (nur Nano Banana Pro)
5. **Recraft für Vector**: Einziges Modell mit echtem Vector-Output
6. **FLUX für Editing**: Präzisere Kontrolle bei Image-to-Image
7. **fal.ai URLs sind temporär** → R2 Upload für permanente URLs
8. **R2 Credentials**: S3-kompatible Keys, nicht normale API Tokens

---

## QUICK START

```bash
# 1. API Key setzen
export FAL_AI_KEY="your-key-here"

# 2. Bild generieren
npx tsx generate-image.ts

# 3. Output: image-assets/{projekt}/generated/
```

---

## CHECKLISTE VOR START

- [ ] FAL_AI_KEY in ~/.bashrc
- [ ] Use-Case klar (Marketing/Avatar/Illustration)
- [ ] Format entschieden (1:1, 9:16, 16:9)
- [ ] Prompt vorbereitet
- [ ] Budget für Generation (~$0.04-0.30 pro Bild)
- [ ] (Optional) R2 Credentials für permanente URLs
