# ⚙️ Automation Builds

## Cron Jobs

### Email Check System (2026-01-31)
**Was:** Automatische Email-Überwachung mit Security
**Wie:**
- Cron: Alle 5min für Erik-Emails, 10min für andere
- Challenge-Response mit Codewort "augustiner"
- Telegram-Notifications
- JSON-Logging für gelesene/ausgeführte Emails
**Files:** 
- `skills/email/check-email.js`
- `skills/email/search-email.js`
- `memory/email-log.json`
**Config:** HEARTBEAT.md

### System Health Monitoring (2026-01-31)
**Was:** RAM/Disk Monitoring mit Auto-Alerts
**Wie:**
- Bash-Script bei jedem Heartbeat
- Thresholds: RAM 80% warn, 90% critical
- Auto-Kill Chrome bei RAM >90%
- Telegram Alerts
**Files:** 
- `scripts/system-alert.sh`
- `memory/system-health.log`
- `memory/system-alerts.log`

---

## Scripts

### Shop Analysis Batch Detection (2026-01-31)
**Projekt:** Shopware 5 EOL Lead-Projekt
**Was:** Batch-Detection für Shopware 5/6 Shops
**Wie:**
- Node.js Script
- URL-Listen in JSON
- Tech-Detection via HTTP Headers + HTML
- ~193 SW5 Leads bei ~3700 analysiert
**Files:**
- `projects/shop-analysis/analyze-shop.js`
- `projects/shop-analysis/batch-detect-sw5.js`
- `projects/shop-analysis/results/sw5-leads.json`
