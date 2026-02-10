# mein-schluessel.de – Server-Dokumentation

## Server
| Eigenschaft | Wert |
|-------------|------|
| **Host** | p4x.hepinet.de |
| **IP** | 116.202.162.231 (Hetzner) |
| **OS** | Ubuntu 22.04.5 LTS |
| **RAM** | 64 GB |
| **Disk** | 906 GB (538 GB used) |
| **Panel** | Plesk |
| **SSH User** | meinschluesselde |
| **SSH Key** | credentials/mein-schluessel/erik_id_ed25519 |

## SSH Zugang
```bash
ssh -i credentials/mein-schluessel/erik_id_ed25519 meinschluesselde@116.202.162.231
```
⚠️ **ACHTUNG:** fail2ban aktiv! NIE mehrere User probieren. Nur `meinschluesselde`.

## Shopware 6 Installation

### Pfade
| Pfad | Beschreibung |
|------|-------------|
| `/var/www/vhosts/mein-schluessel.de/httpdocs_sw6/` | SW6 Root (Deployer) |
| `/var/www/vhosts/mein-schluessel.de/httpdocs_sw6/current/` | Aktives Release (→ releases/14) |
| `/var/www/vhosts/mein-schluessel.de/httpdocs_sw6/shared/` | Shared Configs (.env, files, etc.) |
| `/var/www/vhosts/mein-schluessel.de/httpdocs/` | Alte SW5 Installation |
| `/var/www/vhosts/mein-schluessel.de/shopware-export/` | CSV Import/Export (UserSoft ↔ Shopware) |

### Version & Tech Stack
| Komponente | Version |
|-----------|---------|
| **Shopware** | 6.6.9.0 |
| **PHP** | 8.2 (CLI: /opt/plesk/php/8.2/bin/php) |
| **PHP (system)** | 8.0.30 (veraltet!) |
| **MySQL** | Port 3307 (lokal) |
| **OpenSearch** | Port 9020 (lokal) |
| **Deployer** | v7.3+ |
| **Git Repo** | git@code.hepinet.de:mein-schuessel/shopware6.mein-schluessel.de.git |

### URLs
| URL | Umgebung |
|-----|----------|
| https://www.mein-schluessel.de | **Production** |
| test.mein-schluessel.de | Test |
| staging.mein-schluessel.de | Staging |
| oldsw5.mein-schluessel.de | Alte SW5 |

### Datenbank
- **DB Name:** mein_schluessel_prod
- **DB User:** mein_schluessel_prod
- **DB Pass:** UJHnY5X4ALsy377cnW6HZP5xGrcKetH3
- **DB Host:** 127.0.0.1:3307
- **Live Version ID:** 0x0FA91CE3E96A4BC2BE4BD9CE752C3425
- **OpenSearch Index:** mein_schluessel_sw6_prod

## Custom Plugins (Eriks eigene!)

### Von Erik Reisig entwickelt:
| Plugin | Beschreibung |
|--------|-------------|
| **ERBundleOptimizer** | Smart Bundle Optimizer |
| **ERCustomerIntelligence** | Customer Intelligence |
| **ERPerformanceReporter** | E-Commerce Performance Reporter |
| **ERReorderIntelligence** | Reorder Intelligence |
| **MsProductSchema** | Produkt JSON-LD Schema (SEO) |
| **MsVideoElement** | Self-Hosted Video Element |
| **RdSeoCategoryAnalyzer** | SEO Kategorie Analyse Tool |
| **SchliessanlagenDesignerPlugin** | Schließanlagen Designer (Kernfeature!) |

### Shop-Plugins (gekauft):
| Plugin | Funktion |
|--------|----------|
| Neon6Configurator (+Info, +Media, +Products, +Fileupload) | **Produkt-Konfigurator** (Kernfeature!) |
| SwagPayPal | PayPal Checkout |
| SwagAmazonPay | Amazon Pay |
| KlarnaPayment | Klarna |
| PickwareDhl + PickwareGls | DHL & GLS Versand |
| H1webBlog | Blog |
| MoorlForms (+CustomProducts, +Foundation, +CmsTwig, +BrandSlider) | Formulare & CMS |
| SemesManufacturerPlus | Hersteller/Marken Seiten |
| DvsnProductAccessory | Produkt-Zubehör |
| ScopPlatformRedirecter | SEO Redirects |
| FroshPlatformMailArchive | Mail-Archiv |
| FroshPlatformThumbnailProcessor | Thumbnail/WebP |
| Rdcsvexport6 / Rdcsvimport6 | CSV Import/Export (UserSoft) |
| RdCheckoutHelper | Checkout-Anpassungen |
| RdCmsCategoryHelper | CMS Kategorie-Helper |
| RdDocumentHelper | Dokument-Anpassungen |
| RdMeinSchluesselTheme | Custom Theme |
| SwagLanguagePack | Mehrsprachigkeit |
| GbmedTopseller | Topseller |
| AcrisFlowBuilderDelayCS | Flow Builder Verzögerung |
| DtgsGoogleTagManagerSw6 | Google Tag Manager |
| RecentlyViewedProduct | Kürzlich angesehen |
| SwpaMassActions | Massenaktionen |
| TmmsCmsElementPeriodRequestForm | Anfrage-Formular |
| DigaQuickPriceChangeApp | Schnelle Preisänderung |

**Gesamt: 45 Plugins, 44 installiert, 43 aktiv, 1 upgradeable (Rdcsvexport6)**

## Cron Jobs (aktiv)

| Schedule | Befehl | Funktion |
|----------|--------|----------|
| */5 min | `rd:csv:import:stock` | Lagerbestand-Import aus UserSoft |
| */5 min | `cron_export.sh` | Export-Script |
| */5 min | `cron_artikel.sh` | Artikel-Script |
| */1 min | `scheduled-task:run --time-limit=60` | Shopware Scheduled Tasks |
| */5 min | `rsync shopware-export/ZumShop` | UserSoft → Shopware Sync |

**Verantwortlich (Cron-Mails):** pilz@rundum.digital (Agentur rundum.digital)

## Deployment

### Prozess (Deployer)
```bash
# Deploy auf Test
dep deploy test.mein-schluessel.de

# Manuell auf Server
cd /var/www/vhosts/mein-schluessel.de/httpdocs_sw6/current
/opt/plesk/php/8.2/bin/php bin/console cache:clear
/opt/plesk/php/8.2/bin/php bin/console theme:refresh
```

### Release-System
```
httpdocs_sw6/
├── current → releases/14      (Symlink auf aktives Release)
├── releases/
│   ├── 5/ bis 14/            (10 Releases)
├── shared/
│   ├── .env, .env.local      (Konfiguration)
│   ├── config/jwt/           (JWT Keys)
│   ├── files/                (Uploads)
│   └── public/media/         (Produktbilder)
└── .dep/                     (Deployer State)
```

## Andere VHosts auf dem Server
- mein-schluessel.de (Hauptseite)
- rundum.dev (Agentur rundum.digital)

## Backups vorhanden
- becker-sicherheit_prod_*.sql.zip (6 Backups, 2023-2024)
- mein_schluessel_prod_*.sql.zip (2 Backups, 2024-2025)
- theme-backup-20260126

## Integration: UserSoft ERP
- **Sync:** rsync alle 5 Min von /mnt/shopware-export/ZumShop/
- **Import:** CSV Lagerbestand → Shopware
- **Export:** Bestellungen → CSV → UserSoft

## Hinweise
- Plesk Panel verwaltet die Webserver-Konfiguration
- Alte Shopware 5 Installation noch vorhanden (httpdocs/)
- Agentur **rundum.digital** (Herr Pilz) war/ist Dienstleister
- Git Repository liegt auf code.hepinet.de (Hetzner GitLab)
