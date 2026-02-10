# Reddit Automation Insights (2026-02-02)

## 🎯 Problem
Reddit blockiert Server-basierte Browser-Automation aggressiv.

## ❌ Was NICHT funktioniert

### 1. Server Playwright (Headless Chrome)
- **IP:** 167.235.140.63 (Hetzner Datacenter)
- **Ergebnis:** "You've been blocked by network security"
- **Grund:** Datacenter IP + Headless Browser Fingerprint

### 2. Server Playwright + TC21 Exit Node
- **IP:** 31.19.31.13 (Residential via Tailscale Exit Node)
- **Ergebnis:** Immer noch geblockt!
- **Grund:** Headless Chrome Fingerprint wird erkannt (nicht nur IP)

### 3. TC21 Reddit App + ADB
- **Ergebnis:** Teilweise - Login funktioniert, aber UI-Automation zu komplex
- **Grund:** Mobile App UI ist schwer zu automatisieren, Landscape-Mode Probleme

## ✅ Was FUNKTIONIERT

### TC21 Chrome Browser (Mobile Web)
- **Gerät:** Zebra TC21 (Android 11)
- **IP:** 31.19.31.13 (Residential - Erik's Vodafone Kiel)
- **Browser:** Chrome Mobile (nicht Headless!)
- **URL:** reddit.com (wird zu mobile Web redirected)
- **Ergebnis:** ✅ Kein Block, Feed lädt, Login möglich!

## 🔑 Key Insights

1. **Residential IP allein reicht nicht** - Reddit checkt auch Browser-Fingerprint
2. **Headless = Blocked** - Auch mit guter IP wird Headless Chrome erkannt
3. **Echtes Gerät = Trusted** - TC21 mit Chrome wird als normaler User behandelt
4. **old.reddit.com redirected** - Auf Mobile wird man zu www.reddit.com geleitet

## 📱 TC21 Setup für Reddit

```bash
# ADB Verbindung
ADB="/home/reisig/platform-tools/adb -s 100.125.79.108:39359"

# Chrome mit Reddit öffnen
$ADB shell am start -a android.intent.action.VIEW -d "https://reddit.com/r/de_EDV" -n com.android.chrome/com.google.android.apps.chrome.Main

# Screenshot
$ADB exec-out screencap -p > /tmp/screenshot.png

# Text eingeben
$ADB shell input text "Kommentar"

# Tap auf Koordinaten
$ADB shell input tap X Y
```

## 🔄 Tailscale Exit Node Setup

Falls Server-Browser doch mal nötig:
```bash
# TC21 als Exit Node (muss in Tailscale Admin genehmigt werden)
sudo tailscale up --exit-node=100.125.79.108 --exit-node-allow-lan-access=true --accept-routes --accept-risk=linux-strict-rp-filter

# IP verifizieren (sollte 31.19.31.13 sein)
curl -s ifconfig.me
```

## 📋 Empfohlener Workflow für Reddit Karma

1. **TC21 Chrome** für Reddit-Interaktion (Login, Kommentieren)
2. **ADB** für Automation (Screenshots, Taps, Text-Input)
3. **Nicht:** Server Playwright, Reddit App, Headless Browser

## 🚨 Wichtig für Cron-Jobs

Die bestehenden Reddit Cron-Jobs müssen angepasst werden:
- ❌ Nicht: Playwright auf Server
- ✅ Ja: TC21 Chrome via ADB

---
*Dokumentiert nach 2h Debugging am 2026-02-02*
