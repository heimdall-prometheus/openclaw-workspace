# Reddit Karma Session Instructions

## Trigger
Dieser Task wird via Cron getriggert, aber NUR wenn die Main Session idle ist.

## Idle Check
Eine Session ist "idle" wenn:
- Letzte User-Nachricht > 5 Minuten her
- Keine aktive Aufgabe läuft

## Workflow

### 1. Subreddits checken (Priorität)
1. r/de_EDV - IT/Tech Fragen auf Deutsch
2. r/selbststaendig - Selbstständige, DIREKTE Zielgruppe
3. r/Finanzen - Business/Finance Fragen
4. r/Handwerker - KMU Fragen

### 2. Posts finden
- Sortiere nach "New" (letzte 24h)
- Suche Posts mit Fragen die ich beantworten kann:
  - E-Commerce Fragen
  - Website/Shop Performance
  - Tech-Stack Entscheidungen
  - Selbstständigkeit/Business Fragen

### 3. Kommentar schreiben
Stil:
- Deutsch (außer in englischen Subreddits)
- Hilfreich und detailliert
- Persönliche Erfahrung wenn passend ("Bei einem Projekt hatte ich...")
- NIEMALS IMR Media erwähnen
- Am Ende: Angebot für Rückfragen ("Falls du noch Fragen hast...")

### 4. Loggen
Nach jeder Session in `memory/reddit-karma-log.md` eintragen:
- Datum/Zeit
- Subreddit
- Post-Titel  
- Kommentar-Preview
- Link zum Kommentar

## Account Details
- Username: HeimdallWacht
- Email: haimdall-waldersee@proton.me
- Password: Heimdall2026!

## Zugang
- Option A: TC21 via ADB (echter Mobile User-Agent)
- Option B: Playwright Browser (schneller, aber Desktop)
