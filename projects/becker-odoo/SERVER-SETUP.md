# Becker Odoo Server - Initial Setup

**Server:** becker-sicherheit-odoo-1  
**IP (Tailscale):** 100.71.171.30  
**OS:** Ubuntu 24.04.3 LTS  
**Specs:** CPX42 (16 GB RAM, 8 vCPU, 320 GB SSD)  
**Setup Date:** 5. Februar 2026

---

## ✅ Security Hardening Complete

### Users Created
- **reisig** (Erik) - sudo access
- **heimdall** - sudo access
- **root** - Login DISABLED

### SSH Configuration
- ✅ Key-only authentication
- ✅ Password login disabled
- ✅ Root login disabled
- ✅ SSH keys configured for both users

### Firewall (UFW)
```
Port 22:    SSH (ONLY via Tailscale 100.64.0.0/10)
Port 80:    HTTP (public)
Port 443:   HTTPS (public)
Port 41641: Tailscale (public)
```
**Status:** Active and enabled

**SSH Security:** 🔒 SSH ist NUR über Tailscale erreichbar (100.64.0.0/10)
- Kein öffentlicher SSH-Zugriff mehr
- Schutz vor Brute-Force-Angriffen von außen
- Fail2ban bleibt aktiv für Tailscale-Netzwerk

### Security Services
- ✅ **Fail2ban** - Active (SSH protection)
- ✅ **Unattended-upgrades** - Automatic security updates
- ✅ **UFW Firewall** - Configured and active

### Essential Packages
- git, curl, wget, vim, htop, net-tools
- ca-certificates, gnupg, lsb-release

---

## 🔑 Access

### Heimdall (tested ✅)
```bash
ssh heimdall@100.71.171.30
sudo -i  # passwordless sudo
```

### Erik (reisig)
```bash
ssh reisig@100.71.171.30
sudo -i  # passwordless sudo
```

**SSH Key configured:** `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDeYRSjq1Gw0N5WaqyTZL99go1lMXo9K7/fBAOoJQXon`

⚠️ **Note:** If Erik can't connect, the SSH key from root's authorized_keys was used. Erik should test from the machine where this key is located.

---

## 📋 Next Steps

### 1. Docker Installation
```bash
ssh heimdall@100.71.171.30
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker heimdall
sudo usermod -aG docker reisig
sudo systemctl enable docker
sudo systemctl start docker
```

### 2. Directory Structure
```bash
sudo mkdir -p /opt/odoo/{dev,test,prod}
sudo chown -R heimdall:heimdall /opt/odoo
```

### 3. Docker Compose Setup
- Dev environment: /opt/odoo/dev/docker-compose.yml
- Test environment: /opt/odoo/test/docker-compose.yml
- Production (later): /opt/odoo/prod/docker-compose.yml

### 4. Claude Code Setup
- Install Node.js 22
- Deploy Claude Code container
- Configure Nginx reverse proxy

### 5. SSL Certificates
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d odoo-dev.becker-sicherheit.de
sudo certbot --nginx -d odoo-test.becker-sicherheit.de
```

---

## 🔐 Security Summary

| Feature | Status |
|---------|--------|
| SSH Key-Only | ✅ Active |
| Root Login | ❌ Disabled |
| UFW Firewall | ✅ Active |
| Fail2ban | ✅ Active |
| Auto-Updates | ✅ Enabled |
| Passwordless Sudo | ✅ Configured |

---

## 📊 Server Specs

| Component | Value |
|-----------|-------|
| RAM | 16 GB |
| vCPU | 8 Cores (AMD) |
| Storage | 320 GB NVMe |
| Traffic | 20 TB/month |
| Location | Hetzner (Germany) |

---

## 🔒 SSH Tailscale-Only Configuration (16:12 UTC)

**Änderung:** SSH auf Tailscale-only beschränkt

**Befehle ausgeführt:**
```bash
sudo ufw delete allow 22/tcp
sudo ufw allow from 100.64.0.0/10 to any port 22 proto tcp comment 'SSH via Tailscale only'
```

**Ergebnis:**
- ✅ SSH nur noch über Tailscale (100.64.0.0/10)
- ✅ Kein öffentlicher SSH-Zugriff mehr (46.225.65.25:22 blockiert)
- ✅ Ports 80 + 443 bleiben öffentlich (für Odoo Web-UI)
- ✅ Getestet und funktioniert

**Sicherheits-Vorteil:**
- Kein SSH-Port-Scanning von außen
- Kein Brute-Force-Risiko
- Nur authentifizierte Tailscale-Geräte können verbinden

---

## 🚀 Ready for Next Phase

Server is fully hardened and ready for Docker + Odoo deployment!

**Projektstart:** 6. Februar 2026  
**Status:** Security Setup ✅ Complete
