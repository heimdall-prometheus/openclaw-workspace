# mein-schluessel.de — Local Dev Environment

## Voraussetzungen
- Docker + Docker Compose
- ~4GB RAM frei (Shopware ist hungry)

## Quick Start

```bash
# 1. Repos klonen (neben dieses Verzeichnis)
cd projects/mein-schluessel/
git clone git@github.com:heimdall-prometheus/mein-schluessel-theme.git rdmeinschluesseltheme
git clone git@github.com:heimdall-prometheus/mein-schluessel-designer.git schliessanlagendesigner

# 2. Docker starten
cd docker-dev
docker compose up -d

# 3. Warten bis Shopware bereit ist (~2-3 Min beim ersten Start)
docker compose logs -f shopware

# 4. Plugins installieren + aktivieren
docker exec ms-shopware-dev bash -c "
  cd /var/www/html
  bin/console plugin:refresh
  bin/console plugin:install --activate RdMeinSchluesselTheme
  bin/console plugin:install --activate SchliessanlagenDesigner
  bin/console theme:change RdMeinSchluesselTheme
  bin/console cache:clear
"
```

## URLs
| Service | URL | Credentials |
|---------|-----|-------------|
| **Storefront** | http://localhost:8888 | — |
| **Admin** | http://localhost:8888/admin | admin / shopware |
| **Adminer (DB)** | http://localhost:9090 | root / root / shopware |

## Live Editing

Theme und Designer sind als Volume gemounted:
- Änderungen in `../rdmeinschluesseltheme/` → sofort im Container
- Änderungen in `../schliessanlagendesigner/` → sofort im Container

Nach Template-Änderungen:
```bash
docker exec ms-shopware-dev bash -c "cd /var/www/html && bin/console cache:clear"
```

Nach SCSS/JS-Änderungen:
```bash
docker exec ms-shopware-dev bash -c "cd /var/www/html && bin/console theme:compile"
```

## Workflow: WCAG Fixes

```
1. Branch erstellen (z.B. fix/wcag-contrast)
2. Lokal ändern → Browser prüfen
3. pa11y gegen localhost laufen lassen
4. Commit + Push
5. PR erstellen
6. Auf Staging deployen + testen
7. → Prod via Deployer
```

## DB Seed (optional)

Für realistische Daten einen anonymisierten Dump von Staging nutzen:
```bash
# Auf Server:
ssh meinschluesselde@116.202.162.231
mysqldump -h 127.0.0.1 -P 3307 -u mein_schluessel_prod -p mein_schluessel_staging > staging_dump.sql

# Lokal importieren:
docker exec -i ms-shopware-dev mysql -u root -proot shopware < staging_dump.sql
```

## Troubleshooting

**Container startet nicht:** Prüfe ob Port 8888 frei ist
**Plugins nicht sichtbar:** `bin/console plugin:refresh` im Container
**Theme-Änderungen nicht sichtbar:** Cache leeren + Theme kompilieren
