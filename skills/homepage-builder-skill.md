# Claude Skill: Homepage Builder (Payload CMS + Cloudflare)

## Skill Overview

Builds modern, production-ready homepages with:
- **Frontend**: Next.js 15 + React 19 (App Router)
- **CMS**: Payload CMS 3.x with Lexical Rich Text
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (Media)
- **Hosting**: Cloudflare Workers via OpenNextJS
- **Styling**: Tailwind CSS with custom design system

**Target Cost**: ~$5/month (Cloudflare Workers Paid Plan)
**Template Project**: `/root/homepage-builder/felix-hacker-website/`

---

## Trigger Phrases

- "Erstelle Homepage für..."
- "Baue Website mit Payload..."
- "Homepage-Projekt für..."
- "Neue Website für [Business]..."

---

## PHASE 0: GitHub Repository erstellen (IMMER ZUERST!)

**Jedes Projekt beginnt mit einem GitHub Repository:**

```bash
# 1. Projektverzeichnis erstellen
mkdir -p /root/homepage-builder/{project-name}-website
cd /root/homepage-builder/{project-name}-website

# 2. Git initialisieren
git init
git branch -M main

# 3. Basis .gitignore erstellen
cat > .gitignore << 'EOF'
node_modules/
.next/
.open-next/
.env
.env.local
*.log
.DS_Store
EOF

# 4. Initial Commit
git add .gitignore
git commit -m "Initial commit: {Project Name} Website"

# 5. GitHub Repo in InMediasReh Organisation erstellen
gh repo create InMediasReh/{project-name}-website \
  --private \
  --source=. \
  --push \
  --description "{Business Name} Website - Next.js + Payload CMS + Cloudflare"
```

**Repository Naming Convention:**
- Format: `{project-slug}-website`
- Beispiele: `baumschule-halle-website`, `felix-hacker-website`
- Immer in **InMediasReh** Organisation: `https://github.com/InMediasReh/`

**Nach jedem größeren Schritt committen!**

---

## PHASE 1: Business Discovery

**Before any code, gather requirements:**

```
BUSINESS INTAKE:
┌─────────────────────────────────────────────────────────┐
│ 1. BASICS                                                │
├─────────────────────────────────────────────────────────┤
│ Business Name: _________________________________________│
│ Business Type: [ ] Retail  [ ] Service  [ ] Portfolio   │
│                [ ] Restaurant  [ ] Professional          │
│ Existing Website: ______________________________________│
│ New Domain: ____________________________________________│
│ Languages: [ ] German only  [ ] German + English        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. CONTACT                                               │
├─────────────────────────────────────────────────────────┤
│ Address: _______________________________________________│
│ Phone: _________________________________________________│
│ Email: _________________________________________________│
│ Opening Hours: [ ] Fixed  [ ] Seasonal  [ ] 24/7        │
│ Social Media: __________________________________________│
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. PAGES NEEDED                                          │
├─────────────────────────────────────────────────────────┤
│   [ ] Home       [ ] About      [ ] Contact             │
│   [ ] Products   [ ] Services   [ ] Gallery             │
│   [ ] Blog       [ ] Team       [ ] FAQ                 │
│   [ ] Pricing    [ ] Portfolio  [ ] Custom: ________    │
│                                                          │
│ Special Features:                                        │
│   [ ] Product Catalog   [ ] Newsletter Signup           │
│   [ ] Contact Form      [ ] Google Maps                 │
│   [ ] E-Commerce        [ ] Booking System              │
│   [ ] AI Text Assist    [ ] Seasonal Content            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. DESIGN                                                │
├─────────────────────────────────────────────────────────┤
│ Style: [ ] Modern Minimal  [ ] Nature/Organic           │
│        [ ] Bold/Vibrant    [ ] Professional             │
│        [ ] Playful         [ ] Luxury/Elegant           │
│                                                          │
│ Reference Websites: ____________________________________│
│ Brand Colors: __________________________________________│
│ Logo: [ ] Exists  [ ] Need created  [ ] Text only       │
└─────────────────────────────────────────────────────────┘
```

---

## PHASE 2: Content Migration (If Existing Site)

**If migrating from old website:**

```bash
# 1. Create scraper script
mkdir -p /root/homepage-builder/{project-name}/scripts

# 2. Install dependencies
npm init -y
npm install playwright cheerio

# 3. Create and run scraper
# See /root/homepage-builder/baumschule-halle/scripts/scrape-old-site.cjs for template

# 4. Output structure:
# scraped-content/
# ├── images/{page-slug}/
# ├── data/
# │   ├── all-pages.json
# │   ├── categories.json
# │   └── summary.json
```

---

## PHASE 3: Project Setup

### 3.1 Create Cloudflare Resources

```bash
# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create {project-name}-db
# → Note the database_id

# Create R2 bucket for media
wrangler r2 bucket create {project-name}-media
```

### 3.2 Clone Template

```bash
# Copy from template
cp -r /root/homepage-builder/felix-hacker-website /root/homepage-builder/{project-name}
cd /root/homepage-builder/{project-name}

# Remove git history
rm -rf .git

# Update project identity in:
# - package.json (name)
# - wrangler.jsonc (name, d1_databases.database_id, r2_buckets.bucket_name)
# - payload.config.ts (admin.meta.titleSuffix)
```

### 3.3 Generate Secrets

```bash
# Generate PAYLOAD_SECRET
openssl rand -hex 32

# Add to .env
echo "PAYLOAD_SECRET=your-generated-secret" > .env
```

### 3.4 Install Dependencies

```bash
pnpm install
```

---

## PHASE 4: Collection Architecture

### Core Collections (Always)

| Collection | Purpose |
|------------|---------|
| `Users` | CMS authentication |
| `Media` | Image/file storage (→ R2) |
| `Pages` | Static content pages |
| `ContactSubmissions` | Form submissions |

### Business-Specific Templates

**RETAIL / GARDEN CENTER:**
```typescript
// Products.ts
{
  slug: 'products',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'category', type: 'relationship', relationTo: 'product-categories' },
    { name: 'description', type: 'richText' },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
    { name: 'price', type: 'group', fields: [
      { name: 'amount', type: 'number' },
      { name: 'unit', type: 'select', options: ['Stück', 'pro Meter', 'pro kg'] },
      { name: 'priceOnRequest', type: 'checkbox' }
    ]},
    { name: 'availability', type: 'select', options: ['available', 'limited', 'seasonal', 'soldOut'] },
    { name: 'featured', type: 'checkbox' },
  ]
}

// ProductCategories.ts
{
  slug: 'product-categories',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ]
}
```

**SERVICE BUSINESS:**
```typescript
// Services.ts, Testimonials.ts, Team.ts
```

**PORTFOLIO / ATHLETE:**
```typescript
// Projects.ts, Results.ts, Gallery.ts
```

---

## PHASE 5: Design System

### Preset: Nature/Organic
```css
--color-primary: #2D5A27;      /* Forest Green */
--color-secondary: #8B5A2B;    /* Earth Brown */
--color-accent: #E8B339;       /* Sunflower */
--color-background: #FDFBF7;   /* Warm Cream */
--font-display: 'Cormorant Garamond', serif;
--font-body: 'Nunito Sans', sans-serif;
```

### Preset: Modern Minimal
```css
--color-primary: #0A0A0A;
--color-secondary: #525252;
--color-accent: #3B82F6;
--color-background: #FAFAFA;
--font-display: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Preset: Bold/Vibrant
```css
--color-primary: #7C3AED;      /* Violet */
--color-secondary: #EC4899;    /* Pink */
--color-accent: #F59E0B;       /* Amber */
--color-background: #0F172A;   /* Dark */
--font-display: 'Bebas Neue', sans-serif;
--font-body: 'Poppins', sans-serif;
```

---

## PHASE 6: AI Integration (Optional)

### AI Text Assistant for CMS

```typescript
// /api/ai-suggest/route.ts
export async function POST(request: Request) {
  const { type, context } = await request.json()

  const prompts = {
    'product': `Generate a German product description for: ${context.name} in category ${context.category}`,
    'offer': `Generate a short German offer text for: ${context.title} at ${context.price}€`,
    'tip': `Generate a German gardening tip for ${context.month}`,
  }

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: prompts[type] }],
  })

  return Response.json({ suggestion: response.content[0].text })
}
```

### Custom Payload Field with AI Button
```typescript
// components/AIAssistedTextField.tsx
// Button that calls /api/ai-suggest and fills the field
```

---

## PHASE 7: Development Workflow

```bash
# Local development
pnpm dev

# Generate types after schema changes
pnpm generate:types

# Create migration
pnpm payload migrate:create

# Test locally
pnpm test

# Deploy
pnpm deploy
```

---

## PHASE 8: Deployment

### Full Deployment Pipeline

```bash
# 1. Run migrations
cross-env NODE_ENV=production PAYLOAD_SECRET=ignore payload migrate

# 2. Optimize database
wrangler d1 execute D1 --command 'PRAGMA optimize' --remote

# 3. Build with OpenNextJS
opennextjs-cloudflare build

# 4. Deploy to Workers
opennextjs-cloudflare deploy
```

### DNS Setup

```
# Cloudflare DNS
Type: CNAME
Name: @ (or subdomain)
Target: {worker-name}.{account}.workers.dev
Proxy: Enabled
```

---

## PHASE 9: Post-Launch Checklist

```
[ ] Website loads correctly
[ ] All pages accessible
[ ] Mobile responsive
[ ] Contact form works
[ ] CMS admin accessible (/admin)
[ ] SEO meta tags correct
[ ] Open Graph images working
[ ] SSL certificate active
[ ] Performance check (Lighthouse > 90)
[ ] Accessibility check (WCAG 2.1 AA)
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `payload.config.ts` | CMS configuration |
| `wrangler.jsonc` | Cloudflare bindings |
| `tailwind.config.ts` | Design system |
| `globals/GlobalSettings.ts` | Site-wide settings |
| `open-next.config.ts` | OpenNextJS config |

---

## Common Issues & Solutions

1. **Bundle size > 3MB**: Use Cloudflare Paid plan
2. **Image crop not working**: Disable in Media collection (Workers limitation)
3. **Migration fails**: Check D1 connection, run locally first
4. **R2 access denied**: Configure public bucket or custom domain

---

## Example Projects

- **Felix Hacker** (Athlete Portfolio): `/root/homepage-builder/felix-hacker-website/`
- **Baumschule Halle** (Garden Center): `/root/homepage-builder/baumschule-halle/`
