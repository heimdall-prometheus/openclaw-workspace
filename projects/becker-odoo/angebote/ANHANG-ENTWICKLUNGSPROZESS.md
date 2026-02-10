# Anhang: Entwicklungs- und Qualitätsprozess
## Angebot CLED-2026-001 - Becker Sicherheitstechnik GmbH

**Projekt:** Odoo ERP Implementation  
**Kunde:** Becker Sicherheitstechnik GmbH  
**Anbieter:** C-led Solutions GmbH

---

## Warum dieser Prozess?

Unser Entwicklungsprozess stellt sicher, dass:
- ✅ Änderungen nachvollziehbar dokumentiert sind
- ✅ Neue Funktionen gründlich getestet werden
- ✅ Das Produktivsystem stabil und sicher bleibt
- ✅ Fehler frühzeitig erkannt werden

---

## Aufgabenverwaltung (GitHub Issues)

### Was ist das?
Ein **digitales Aufgabensystem**, in dem alle Anforderungen, Änderungswünsche und Fehlerberichte erfasst werden.

### Wie funktioniert es?
1. **Sie melden einen Wunsch oder Fehler** → per E-Mail oder Telefon
2. **Wir erstellen ein "Issue"** → digitaler Aufgabenzettel mit Beschreibung
3. **Sie sehen den Status** → Offen, In Bearbeitung, Erledigt
4. **Alles ist dokumentiert** → Wer hat was wann angefordert/umgesetzt

### Ihr Vorteil
- Nichts geht verloren
- Jederzeit einsehbar was gerade passiert
- Nachvollziehbar auch nach Monaten

---

## Versionskontrolle

### Was ist das?
Eine Art **"Zeitmaschine" für Software**. Jede Änderung wird gespeichert und kann bei Problemen zurückgesetzt werden.

### Warum ist das wichtig?
- Bei Problemen können wir sofort zur letzten funktionierenden Version zurück
- Alle Änderungen sind dokumentiert (wer, wann, was)
- Mehrere Entwickler können gleichzeitig arbeiten ohne sich zu behindern

### Ihr Vorteil
- **Sicherheit:** Keine Änderung kann das System dauerhaft beschädigen
- **Transparenz:** Jede Anpassung ist nachvollziehbar

---

## Drei Umgebungen: Dev → Test → Produktion

Wir arbeiten mit **drei getrennten Systemen**. Das schützt Ihr Produktivsystem vor unfertigen Änderungen.

### 🔧 1. Entwicklung (Dev)
**Was:** Hier programmieren wir neue Funktionen

| Aspekt | Details |
|--------|---------|
| Zweck | Neue Features entwickeln |
| Daten | Testdaten (keine echten Kundendaten) |
| Zugriff | Nur C-led Entwickler |
| Stabilität | Kann instabil sein - das ist normal |

**Für Sie:** Unsichtbar, hier arbeiten wir intern.

---

### 🧪 2. Test (Staging)
**Was:** Hier testen Sie neue Funktionen vor dem Go-Live

| Aspekt | Details |
|--------|---------|
| Zweck | Prüfen ob alles funktioniert |
| Daten | Kopie der Echtdaten (anonymisiert) |
| Zugriff | C-led + ausgewählte Becker-Mitarbeiter |
| Stabilität | Stabil, aber nicht für Echtbetrieb |

**Für Sie:** Hier können Sie neue Funktionen ausprobieren, ohne Risiko für den Echtbetrieb.

---

### ✅ 3. Produktion (Live)
**Was:** Das echte System, mit dem Sie täglich arbeiten

| Aspekt | Details |
|--------|---------|
| Zweck | Tägliche Arbeit |
| Daten | Echte Geschäftsdaten |
| Zugriff | Alle Becker-Mitarbeiter |
| Stabilität | Höchste Priorität |

**Für Sie:** Hier arbeiten Sie. Änderungen kommen nur hierher, wenn sie auf Test geprüft wurden.

---

## Der Ablauf einer Änderung

```
1. Anforderung          Sie melden einen Wunsch
       ↓
2. Issue erstellt       Wir dokumentieren die Aufgabe
       ↓
3. Entwicklung          Umsetzung auf DEV-System
       ↓
4. Interner Test        Wir prüfen die Funktion
       ↓
5. Test-Freigabe        Bereitstellung auf TEST-System
       ↓
6. Ihre Abnahme         Sie testen und geben frei
       ↓
7. Produktiv-Release    Freischaltung im LIVE-System
```

---

## Was bedeutet das für Sie?

### Qualität
- Jede Änderung wird zweifach getestet (intern + durch Sie)
- Fehler werden erkannt bevor sie den Echtbetrieb stören

### Transparenz
- Sie sehen jederzeit den Status aller Aufgaben
- Alle Änderungen sind dokumentiert

### Sicherheit
- Ihr Produktivsystem ist geschützt
- Bei Problemen: Schnelle Rückkehr zum vorherigen Stand

### Planbarkeit
- Klare Abläufe statt chaotischer Änderungen
- Releases zu abgesprochenen Zeitpunkten

---

## Häufige Fragen

**"Wie lange dauert es bis eine Änderung live ist?"**
→ Kleine Änderungen: 1-3 Tage. Größere Funktionen: Nach Absprache.

**"Kann ich direkt im Live-System testen?"**
→ Nein, dafür gibt es das Test-System. So bleibt Live stabil.

**"Was passiert wenn nach einem Update etwas nicht funktioniert?"**
→ Wir können innerhalb von Minuten zur vorherigen Version zurück.

**"Muss ich mich mit GitHub auskennen?"**
→ Nein. Sie kommunizieren wie gewohnt per E-Mail/Telefon. Wir übernehmen die technische Dokumentation.

---

*Dieser Prozess entspricht Industriestandards für professionelle Softwareentwicklung und gewährleistet höchste Qualität bei minimalen Risiken für Ihren Geschäftsbetrieb.*
