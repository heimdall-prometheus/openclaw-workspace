# Server-Infrastruktur

## Server Liste

### mein-malbuch
- **IP:** 100.67.243.6 (Tailscale)
- **OS:** Ubuntu 24.04.3 LTS (Noble Numbat)
- **User:** heimdall
- **Status:** ✅ Online und funktional
- **SSH-Config:** ✅ Eingerichtet

**Tech Stack:**
- 🐳 **Docker**: WordPress (PHP 8.1) + MySQL 5.7
- 🌐 **Nginx**: Reverse Proxy für 15+ Domains
- 🗄️ **PostgreSQL 16**: Hauptdatenbank
- 🔥 **Redis**: Caching & Sessions  
- 🔒 **Tailscale**: Sichere Netzwerk-Anbindung

**Hauptprojekte:**
- **mein-malbuch**: Vollständige Web-App (Frontend/Backend)
- **Camillo**: Business-Platform (getcamillo.com + API)  
- **Winterhof/Sophia**: Website-Projekte
- **VentureKitchen**: Business-Venture
- **IMR Media**: Lead-Generation Services
- **Rommee-Club**: Gaming-Projekt

**Domains (aktiv):**
- becker-sicherheit.erikreisig.de
- getcamillo.com, api.getcamillo.com, brandkit.getcamillo.com
- sophia.erikreisig.de, sophias-winterhof.com
- venturekitchen.erikreisig.de, winterhof.erikreisig.de
- leads.erikreisig.de, dev.leads.imr-media.de
- ugc.erikreisig.de

## Zukünftige Server
- [Weitere Server werden hier ergänzt]

## SSH-Konfiguration
Alle Server verwenden den Heimdall Ed25519-Schlüssel:
```
~/.ssh/heimdall_key
```

## Tailscale
- Netzwerk für sichere Server-Verbindungen
- mein-malbuch ist über Tailscale erreichbar