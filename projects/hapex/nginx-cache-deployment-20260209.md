# Hapex Nginx Page Cache — Deployment Doku

**Datum:** 2026-02-09  
**Durchgeführt von:** Heimdall  
**Server:** root@46.101.247.162  
**Freigabe:** Erik Reisig (Telegram, 21:52 UTC)

---

## Zusammenfassung

Nginx `fastcgi_cache` für lebensmittel-sonderposten.de aktiviert.  
Anonyme Besucher (kein Session-Cookie) bekommen gecachte HTML-Seiten direkt von Nginx, ohne PHP zu involvieren.

## Vorher-Messung (21:52 UTC)

| Seite | TTFB (lokal) | Messungen |
|-------|-------------|-----------|
| Homepage | **~970ms** | 1074ms, 976ms, 956ms, 972ms, 983ms |
| Kategorie (/suessigkeiten/) | **~545ms** | 519ms, 559ms, 556ms |
| Produktseite | **~70ms** | 69ms, 72ms, 69ms |

**Response Headers vorher:**
```
cache-control: no-store, private
set-cookie: session-=...; path=/; secure; httponly; samesite=lax
```
→ Kein Caching möglich, da Shopware auf jeder Seite eine PHP-Session startet.

## Nachher-Messung (21:59 UTC)

| Seite | TTFB (lokal) | Status | Verbesserung |
|-------|-------------|--------|-------------|
| Homepage (cached) | **~3ms** | HIT | **-99.7%** |
| Kategorie (cached) | **~4ms** | HIT | **-99.3%** |
| Kategorie (erster Aufruf) | ~570ms | MISS | Füllt Cache |
| Homepage (User mit Session) | ~960ms | BYPASS | Normal |
| Checkout | ~290ms | BYPASS | Normal |

**Extern (durch Cloudflare):**
- Vorher: ~1.500ms+  
- Nachher: **~250ms** (Netzwerk-Latenz CF → Server → CF → Client)

## Cache-Logik

### Wer bekommt Cache?
- ✅ `GET`/`HEAD` Requests ohne Session-Cookie → **CACHE HIT**
- ✅ Google Bot (hat nie Cookies) → **CACHE HIT**
- ✅ Erste Besucher ohne Cookies → **CACHE HIT**

### Wer bekommt KEINEN Cache?
- ❌ Besucher mit `session-=` Cookie → **BYPASS** (normaler PHP-Weg)
- ❌ Besucher mit `sw-context-token` Cookie → **BYPASS**
- ❌ `/checkout/`, `/account/`, `/admin/`, `/api/`, `/store-api/` → **BYPASS**
- ❌ `POST` Requests → **BYPASS**

### Cache-TTL
- HTTP 200: **10 Minuten**
- HTTP 301/302: 1 Minute
- Alles andere: nicht gecacht

### Flow für einen Besucher

```
1. Erster Besuch (kein Cookie):
   → Nginx Cache HIT → HTML in ~3ms
   → Besucher bekommt set-cookie aus gecachtem Response
   
2. Zweiter Besuch (hat jetzt Cookie):
   → Nginx BYPASS → PHP generiert Seite normal (~1s)
   → Ab jetzt: volle Session-Funktionalität
   
3. Google Bot (kein Cookie):
   → Immer Cache HIT → Seite in ~3ms
```

## Technische Details

### Dateien
| Datei | Zweck |
|-------|-------|
| `/etc/nginx/conf.d/fastcgi-cache-hapex.conf` | Cache-Zone Definition |
| `/etc/nginx/sites-available/dev2` | Server-Block mit Cache-Regeln |
| `/etc/nginx/sites-available/dev2.bak-20260209-2152` | **Backup (original)** |
| `/var/cache/nginx/hapex/` | Cache-Verzeichnis (1GB max) |

### Cache-Zone
```nginx
fastcgi_cache_path /var/cache/nginx/hapex
    levels=1:2
    keys_zone=HAPEX:256m   # 256MB RAM für Keys
    max_size=1g            # 1GB Disk für Bodies
    inactive=60m           # Entfernt nach 60min ohne Zugriff
```

### Cache-Key
```nginx
fastcgi_cache_key "$request_method$scheme$host$request_uri";
```

### Debug-Header
```
X-Cache-Status: HIT | MISS | BYPASS
```
→ Sichtbar in Browser DevTools → Network → Response Headers

## Deaktivierung / Rollback

### Cache deaktivieren (sofort):
```bash
# In /etc/nginx/sites-available/dev2:
# Zeile "fastcgi_cache HAPEX;" auskommentieren → "# fastcgi_cache HAPEX;"
nginx -t && nginx -s reload
```

### Komplett zurückrollen:
```bash
cp /etc/nginx/sites-available/dev2.bak-20260209-2152 /etc/nginx/sites-available/dev2
rm /etc/nginx/conf.d/fastcgi-cache-hapex.conf
nginx -t && nginx -s reload
```

### Cache manuell leeren:
```bash
rm -rf /var/cache/nginx/hapex/*
```

## Bekannte Einschränkungen

1. **Set-Cookie im Cache:** Gecachte Responses enthalten die `set-cookie` des ersten Besuchers. Alle folgenden anonymen Besucher bekommen dieselbe Session-ID aus dem Cache. Bei ihrem ZWEITEN Request haben sie dann einen Cookie → BYPASS → PHP erstellt eine eigene Session. **Kein Security-Risiko**, da die gecachte Session-ID serverseitig nicht existiert.

2. **Veraltete Inhalte:** Produktänderungen (Preis, Bestand, MHD) sind maximal 10 Minuten verzögert für anonyme Besucher. User mit Session sehen immer live Daten.

3. **Cache-Control Header:** Der gecachte Response enthält noch `cache-control: no-store` vom PHP Backend. Cloudflare cached das HTML deshalb nicht zusätzlich (nur Nginx-Cache greift). Für CF-Caching bräuchte man `more_set_headers` (nginx headers-more Modul, aktuell nicht installierbar wegen ABI-Mismatch).

## Nächste Schritte (optional)

- [ ] Nginx auf `nginx-full` upgraden → `headers-more` Modul → sauberere Header
- [ ] Cache-TTL für Produktseiten getrennt konfigurieren (kürzer für Preise?)
- [ ] `X-Cache-Status` Header nach Monitoring-Phase entfernen
- [ ] Cloudflare Page Rule für HTML-Caching evaluieren (zusätzlich zu Nginx)

## Hapex KW7 Zeitlog

| Task | Zeit |
|------|------|
| MwSt→Stern-Lösung + Playwright | 0.5h |
| Price +35% Fontsize + Playwright | 0.3h |
| Lighthouse Analyse | 0.5h |
| Nginx Cache: Analyse + Deployment + Doku | 1.5h |
| **Gesamt KW7** | **~2.8h / 4h** |
