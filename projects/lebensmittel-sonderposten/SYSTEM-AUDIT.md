# System Audit — Lebensmittel-Sonderposten.de
**Datum:** 06.02.2026
**Server:** 46.101.247.162 (DigitalOcean Droplet)

---

## 🔴 KRITISCH (Sofort handeln)

### 1. Ubuntu 24.10 ist END-OF-LIFE
- **OS:** Ubuntu 24.10 — **nicht mehr supportet!**
- **Risiko:** Keine Sicherheitsupdates mehr, 46 Updates ausstehend
- **Aktion:** Upgrade auf Ubuntu 25.10 LTS planen (oder 24.04 LTS)
- **Aufwand:** 2-4h mit Downtime, vorher Backup!

### 2. Firewall DEAKTIVIERT (ufw inactive)
- **Status:** UFW ist installiert aber **nicht aktiv**
- **Risiko:** ALLE Ports sind offen zum Internet
- **Offene Ports:** SSH (22), FTP (21), SMTP (25), HTTP/S (80/443), Nginx-UI (9000)
- **Aktion:** UFW aktivieren, nur 22, 80, 443 erlauben
- **FTP (Port 21):** vsftpd läuft — **FTP ist unverschlüsselt!** SFTP nutzen stattdessen
- **SMTP (Port 25):** Postfix offen — Spam-Relay-Risiko!
- **Nginx-UI (Port 9000):** Admin-Interface öffentlich erreichbar!

### 3. PermitRootLogin = yes
- **Risiko:** Root-Zugang direkt via SSH möglich
- **Aktion:** `PermitRootLogin no` setzen, dedizierter Admin-User mit sudo

### 4. Fail2Ban INAKTIV
- **Status:** Nicht installiert/inaktiv
- **Risiko:** Keine Brute-Force-Protection für SSH
- **Aktion:** `apt install fail2ban && systemctl enable --now fail2ban`

### 5. Logfiles fressen 14 GB Disk!
- **`/var/www/.../web/var/log/`:** 14 GB — API-Logging-Dateien >1 GB pro Stück!
- **`/var/log/`:** 6 GB total (davon 952 MB Nginx)
- **Einzelne Dateien:** `lws-api-logging_prod-2025-10-20.log.1.gz` = 1,3 GB (KOMPRIMIERT!)
- **Heutiges Log:** 744 MB unkomprimiert und wachsend
- **Disk ist 64% voll** (98 GB / 155 GB)
- **Aktion:** Log-Rotation einrichten, alte Logs löschen, API-Logging-Level reduzieren

### 6. MySQL-Server Git-Repo auf Prod (4,5 GB!)
- **`/root/mysql-server/.git/objects/pack/`:** 4,5 GB
- **Warum?** Jemand hat das MySQL-Source-Repo geklont
- **Aktion:** `rm -rf /root/mysql-server/` — sofort 4,5 GB frei

---

## 🟡 WICHTIG (Diese Woche)

### 7. HTTP Cache DEAKTIVIERT
- **`SHOPWARE_HTTP_CACHE_ENABLED=0`**
- **Impact:** Bei ~30k Produkten und hohem Traffic = unnötige PHP-Last
- **Erklärung für Load 10.9:** Ohne Cache muss JEDER Request durch PHP-FPM
- **Aktion:** HTTP-Cache aktivieren, mit Cloudflare Page Rules kombinieren

### 8. PHP-FPM Konfiguration überambitioniert
- **pm.max_children = 390** — bei 157 GB RAM theoretisch OK, aber:
- **Jeder Worker ~1 GB RSS** (lt. Top-Prozesse!)
- 390 × 1 GB = 390 GB — weit über verfügbarem RAM
- **Aktuell 130 Worker aktiv** — bei Spitze könnte OOM passieren
- **Aktion:** `pm.max_children` auf 120-150 reduzieren, pm.max_requests beibehalten

### 9. OPcache JIT deaktiviert
- **`opcache.jit = no value`**, **`opcache.jit_buffer_size = 0`**
- **`opcache.memory_consumption = 128`** — zu wenig für 30k Produkte
- **Aktion:** JIT aktivieren, OPcache auf 256-512 MB erhöhen
```ini
opcache.jit=1255
opcache.jit_buffer_size=128M
opcache.memory_consumption=256
```

### 10. PHP memory_limit = -1 (unbegrenzt)
- **CLI:** `memory_limit = -1` — für CLI OK
- **FPM:** Sollte auf 512M-1G begrenzt sein (Runaway-Requests verhindern)
- **Aktion:** FPM pool.d/www.conf: `php_admin_value[memory_limit] = 512M`

### 11. upload_max_filesize = 2M
- **Zu niedrig** für einen Shop mit Bulk-Uploads
- **Aktion:** Auf 64M erhöhen (php.ini + nginx client_max_body_size)

### 12. 4 sudo-User aktiv
- **sudo-Gruppe:** daniel-bohusz, pickware, maximilian.trimarchi, julien-shopware
- **Frage:** Brauchen alle sudo? Least-Privilege-Prinzip anwenden
- **pickware-ftp:** Hat Shell-Zugang + FTP — sollte auf SFTP-only beschränkt werden

---

## 🟢 GUT (Bereits OK)

### Security Headers ✅
- `X-Frame-Options: deny`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Referrer-Policy: strict-origin-when-cross-origin`

### SSL/TLS ✅
- TLSv1.3 mit AES-256-GCM-SHA384
- Cert: Google Trust Services (via Cloudflare)

### Cloudflare ✅
- WAF aktiv (blockt Bot-Traffic, wie unseren web_fetch)
- CDN für statische Assets

### Nginx `.env`-Schutz ✅
- Dot-Files werden korrekt geblockt (deny all)

### Unattended Upgrades ✅
- Installiert und aktiv

### Blue-Green Deployment ✅
- Aktiviert für Zero-Downtime-Deploys

### Messenger Workers ✅
- 4 Low-Priority + 1 Email-Worker laufen

### Redis (via stunnel) ✅
- Verschlüsselte Verbindung zum Managed Redis

---

## 📊 Performance-Zusammenfassung

| Metrik | Wert | Bewertung |
|---|---|---|
| **CPU** | 40 Cores (Xeon Platinum 8358) | ✅ Massiv |
| **RAM** | 157 GB (78 GB used) | ✅ Gut |
| **Load Average** | 10.9 (bei 40 Cores = ~27%) | ⚠️ Erhöht aber OK |
| **Disk** | 98/155 GB (64%) | 🟡 Logfiles aufräumen! |
| **PHP-FPM Workers** | 130/390 aktiv | 🟡 max_children senken |
| **HTTP Cache** | OFF | 🔴 Aktivieren! |
| **OPcache JIT** | OFF | 🟡 Aktivieren! |
| **Uptime** | 69 Tage | ✅ Stabil |

### Tideways (APM)
- **tideways-daemon** läuft seit 2025, frisst 42.5% CPU!
- Über 31.865 CPU-Minuten verbraucht
- **Frage:** Wird Tideways noch aktiv genutzt? Wenn nicht → deaktivieren = sofort -40% CPU

### Claude (AI)
- **Claude CLI** läuft als root (PID 3247514), 17% CPU
- Vermutlich interaktive Session eines Entwicklers

---

## 🎯 Priorisierte Maßnahmen

### Sofort (heute):
1. ☐ **Firewall aktivieren:** `ufw allow 22,80,443/tcp && ufw enable`
2. ☐ **Fail2Ban installieren:** `apt install fail2ban`
3. ☐ **Root-Login deaktivieren:** `PermitRootLogin no` in sshd_config
4. ☐ **Alte Logs löschen:** ~18 GB frei (API-Logs + MySQL-Repo)

### Diese Woche:
5. ☐ **HTTP Cache aktivieren:** `SHOPWARE_HTTP_CACHE_ENABLED=1`
6. ☐ **OPcache tunen:** JIT + 256 MB
7. ☐ **PHP-FPM max_children:** 390 → 150
8. ☐ **FTP deaktivieren:** vsftpd stoppen, SFTP nutzen
9. ☐ **Nginx-UI absichern:** Port 9000 nur von VPN/Whitelist
10. ☐ **Tideways prüfen:** CPU-Verbrauch 42% — noch nötig?

### Geplant:
11. ☐ **Ubuntu Upgrade:** 24.10 → LTS (24.04 oder 25.10)
12. ☐ **SMTP absichern:** Postfix nur für lokalen Versand
13. ☐ **User-Audit:** sudo-Rechte reviewen
