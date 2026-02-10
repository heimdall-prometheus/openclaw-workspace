# mein-schluessel.de — Dev Workflow

## 🏗️ Server-Struktur (Ist-Zustand)

**Hosting:** Plesk (Hetzner), KEIN Docker, KEIN Git auf Server
**Shopware:** 6.6.9.0

### Environments
| Env | Pfad | URL |
|-----|------|-----|
| **PROD** | `~/httpdocs_sw6/releases/14/` (Deployer) | mein-schluessel.de |
| **Staging** | `~/staging.mein-schluessel.de/` (Deployer) | staging.mein-schluessel.de |
| **Test** | `~/test.mein-schluessel.de/` (Legacy SW5?) | test.mein-schluessel.de |

### Deployment: Deployer Pattern
```
httpdocs_sw6/
├── current -> releases/14     # Symlink auf aktuellen Release
├── releases/                  # Alle Releases (5-14)
│   └── 14/                    # Aktueller Release
│       ├── custom/plugins/    # 9 Plugins (ER*, Ms*, Neon6*, Rd*)
│       └── vendor/
│           ├── meinschluessel/schliessanlagendesigner/  # Designer Plugin!
│           └── meinschluesselde/rdmeinschluesseltheme/  # Custom Theme!
└── shared/                    # Shared zwischen Releases
    ├── config/
    ├── files/
    ├── public/
    └── var/
```

### Key Components
| Component | Location | Type |
|-----------|----------|------|
| **Theme** | `vendor/meinschluesselde/rdmeinschluesseltheme` | Composer Package |
| **Designer** | `vendor/meinschluessel/schliessanlagendesigner` | Composer Package |
| **ER Plugins** | `custom/plugins/ER*` | Custom Plugins (Erik?) |
| **Ms Plugins** | `custom/plugins/Ms*` | Custom Plugins |

**Wichtig:** Theme + Designer sind **Composer Packages** (in vendor/), KEINE custom/plugins! Das bedeutet sie kommen über `composer.json` rein, nicht über Plugin-Upload.

## 🚀 Empfohlener Dev Workflow

### Option A: Docker-basiertes Local Dev (EMPFOHLEN)

```
┌─────────────────────────────────────────────────┐
│  Local (Docker)                                  │
│  ├── Shopware 6.6.9.0                           │
│  ├── Theme (Git Repo)                           │
│  ├── Designer Plugin (Git Repo)                 │
│  └── MySQL + Redis                              │
└──────────────┬──────────────────────────────────┘
               │ git push
               ▼
┌─────────────────────────────────────────────────┐
│  GitHub Repo(s)                                  │
│  ├── mein-schluessel-theme                      │
│  └── mein-schluessel-designer                   │
└──────────────┬──────────────────────────────────┘
               │ Deployer / CI
               ▼
┌─────────────────────────────────────────────────┐
│  Staging → Test → PROD                           │
└─────────────────────────────────────────────────┘
```

#### Setup-Schritte:

**1. Theme + Designer von Server holen:**
```bash
# Theme
scp -r meinschluesselde@server:httpdocs_sw6/releases/14/vendor/meinschluesselde/rdmeinschluesseltheme ./rdmeinschluesseltheme
# Designer
scp -r meinschluesselde@server:httpdocs_sw6/releases/14/vendor/meinschluessel/schliessanlagendesigner ./schliessanlagendesigner
```

**2. GitHub Repos erstellen:**
- `heimdall-prometheus/mein-schluessel-theme` (oder unter becker-sicherheit Org)
- `heimdall-prometheus/mein-schluessel-designer`

**3. Docker Compose für lokales Dev:**
```yaml
# docker-compose.yml
services:
  shopware:
    image: dockware/dev:6.6.9.0
    ports:
      - "8888:80"
      - "8443:443"
    volumes:
      - ./rdmeinschluesseltheme:/var/www/html/custom/plugins/RdMeinSchluesselTheme
      - ./schliessanlagendesigner:/var/www/html/custom/plugins/SchliessanlagenDesigner
    environment:
      - XDEBUG_ENABLED=0
```
**Dockware** = offizielles Shopware Dev Image (vorinstalliert + konfiguriert)

**4. DB-Seed:**
- Anonymisierter DB-Dump von Staging (keine echten Kundendaten!)
- Oder: Shopware Demo-Daten + Produkt-Import

### Option B: Direkt auf Staging arbeiten (SCHNELLER, weniger Setup)

```
Local Editor ──SSH/SFTP──→ Staging Server
                           └── staging.mein-schluessel.de
```

- Theme/Plugin direkt auf Staging editieren
- Schnelle Iteration, kein Docker nötig
- **Nachteil:** Keine Versionierung, kein Rollback, riskant

### 💡 Empfehlung: Option A (Docker) mit Hybrid-Ansatz

1. **Local Docker** für Theme + Designer Entwicklung
2. **GitHub** für Versionierung (Branches, PRs)
3. **Staging** für Integration Testing
4. **PROD** nur via Deployer (nie direkt!)

## ⏭️ Status

- [x] Theme vom Server kopiert (1.1 MB)
- [x] Designer vom Server kopiert (66 MB)
- [x] GitHub Repo: `heimdall-prometheus/mein-schluessel-theme` (privat)
- [x] GitHub Repo: `heimdall-prometheus/mein-schluessel-designer` (privat)
- [x] Docker Compose erstellt (`docker-dev/docker-compose.yml`)
- [ ] Docker Compose testen (lokaler Dev-Rechner nötig)
- [ ] DB-Seed Strategy klären
- [ ] Deployer-Config verstehen/dokumentieren
- [ ] WCAG Fixes im Theme-Repo starten

## 📋 Infos

- **Agentur:** Rundum Digital (hat GitLab + Deployer eingerichtet)
- **Entscheidung:** Wir arbeiten unabhängig über GitHub, nicht über deren GitLab
- **Staging:** staging.mein-schluessel.de (SW6, Deployer-Struktur)
