# Kickoff-Leitfaden: JDR Anforderungen challengen

**Ziel:** Jeder Wunsch → konkreter Anwendungsfall → messbarer Nutzen. Kein Feature ohne Use Case.

---

## Fragetechnik

Für JEDEN Punkt die gleiche Struktur:
1. **Was machst du heute?** (Ist-Zustand)
2. **Was genau nervt daran?** (Pain Point)
3. **Wie oft pro Woche/Monat?** (Frequenz = Priorität)
4. **Was passiert wenn wir das NICHT machen?** (Business Impact)

---

## Oxomi

- Nutzt ihr Oxomi aktuell? Wenn ja — wofür konkret?
- Kataloge anschauen? Datenblätter raussuchen? Produktbilder?
- Wie oft am Tag greift ihr darauf zu?
- Reicht ein Link/Bookmark oder muss das IN Odoo sein?
- Welche Hersteller liefern über Oxomi?

**Challenge:** Oxomi ist eine eigene Plattform mit eigenem Login. Integration in Odoo heißt Custom Dev. Wenn ihr Oxomi nur zum Nachschlagen nutzt → Tab auf, fertig. Integration lohnt nur bei >20 Zugriffen/Tag mit direktem Bezug zu Odoo-Vorgängen.

---

## PIM / DataView

- Was meint ihr mit PIM? Eigenes System das ihr heute nutzt — oder wollt ihr dass Odoo das wird?
- Wo pflegt ihr heute Produktdaten? (Excel? Altsystem? Hersteller-Portale?)
- DataView — ist das ein konkretes Tool oder ein Wunsch nach Datenansichten?
- Was fehlt euch heute bei der Artikelpflege?

**Challenge:** Odoo HAT Produktmanagement (Attribute, Varianten, Bilder, Kategorien). Wenn das reicht = kein Extra nötig. Wenn PIM = Herstellerdaten automatisch einlesen → anderes Thema, dann reden wir über Schnittstellen zu Lieferanten.

---

## EDI / NORDWEST DataConnect

- Welche Lieferanten laufen über EDI?
- Welche Formate? (EDIFACT, OpenTrans, BMEcat, CSV?)
- Was macht ihr heute mit DataConnect? (Artikelstammdaten? Bestellungen? Rechnungen?)
- Habt ihr Zugangsdaten + gibt es API-Dokumentation?
- Wie viele Bestellungen pro Woche gehen über EDI?
- Was passiert heute wenn EDI nicht funktioniert? (Manuell bestellen?)

**Challenge:** EDI ist der teuerste Posten auf der Liste. Ohne konkretes Volumen und Format-Klärung können wir das nicht scopen. Wenn 5 Bestellungen/Woche → lohnt sich Custom Dev nicht. Wenn 50 → schon eher.

---

## Email / Outlook

- Braucht ihr Odoo-Daten IN Outlook? Oder reicht es wenn Odoo Mails senden/empfangen kann?
- Wer braucht das konkret? Alle oder nur Vertrieb?
- Habt ihr MS365 Lizenzen für alle relevanten User?

**Challenge:** Odoo kann Mails senden und empfangen über euren MS365-Server. Das deckt 90% ab. Ein Outlook-Plugin das Odoo-Daten in Outlook anzeigt ist Enterprise-Feature — braucht ihr das wirklich oder reicht Odoo im Browser-Tab daneben?

---

## Shopware-Schnittstelle

- Bezieht sich das auf mein-schluessel.de oder plant Becker einen eigenen Shop?
- Was soll synchronisiert werden? (Artikel? Bestände? Bestellungen? Preise?)
- In welche Richtung? (Odoo → Shop? Shop → Odoo? Beides?)

**Challenge:** Shopware-Connector ist hoher Aufwand (M9). Erstmal klären ob das überhaupt relevant ist oder ob JDR das nur als "nice to have" auf die Liste gesetzt hat.

---

## eBay

- Verkauft Becker aktuell auf eBay?
- Wenn ja — Umsatzvolumen? Anzahl Artikel?
- Was soll Odoo können? (Listings erstellen? Bestellungen importieren? Beides?)

**Challenge:** Wenn eBay <5% vom Umsatz → manuell weiter, Aufwand für Integration lohnt nicht. Wenn signifikant → Drittanbieter-Modul evaluieren.

---

## WhatsApp Business

- Wofür konkret? Kundenkommunikation? Monteur-Koordination? Marketing?
- Wie viele Nachrichten pro Tag/Woche?
- Wer soll das nutzen? (Vertrieb? Service? Alle?)
- DSGVO: Kundendaten über WhatsApp = heikel. Jenny (DSB) muss das absegnen.

**Challenge:** WhatsApp klingt modern, aber: Was macht WhatsApp besser als eine Email oder ein Anruf? Konkreten Mehrwert benennen lassen.

---

## Helpdesk

- Wofür? Kunden-Reklamationen? Interner IT-Support? Monteur-Rückmeldungen?
- Wie werden Reklamationen/Anfragen heute bearbeitet? (Excel? Email-Postfach? Zettel?)
- Wie viele Tickets/Anfragen pro Woche?

**Challenge:** Odoo Community hat kein Helpdesk, aber OCA-Alternative. Wichtiger: Braucht es ein Ticketsystem oder reicht das Projekt-Modul mit Kanban-Board? Oft ist "Helpdesk" ein Buzzword für "ich will eine Übersicht meiner offenen Themen".

---

## SumUp / POS

- Wo wird kassiert? Nur Zentrale oder auch mobil?
- Welches SumUp-Gerät? (Air, Solo, Terminal?)
- Wie viele Transaktionen pro Tag?
- Braucht ihr Kassenbon-Druck?

**Challenge:** POS + SumUp funktioniert, Drittanbieter-Modul existiert. Machbar. Aber: TSE-Pflicht in Deutschland klären (Technische Sicherheitseinrichtung für Kassen).

---

## Barcode

- Wofür? Wareneingang? Kommissionierung? Inventur?
- Welche Scanner/Geräte sind vorhanden?
- Wie viele Artikel werden pro Tag gescannt?

**Challenge:** Basis-Barcode geht in Community (OCA). Vollwertige Barcode-App mit Echtzeit-Validierung = Enterprise. Für die meisten Lagerprozesse reicht die OCA-Lösung.

---

## Priorisierung (Vorschlag für Kickoff)

| Prio | Thema | Warum |
|------|-------|-------|
| 1 | X-Rechnung | Gesetzliche Pflicht |
| 2 | QR-Codes | Nativ, 0 Aufwand |
| 3 | DHL/GLS | Täglicher Nutzen, OCA-Module da |
| 4 | Email/MS365 | Grundfunktion, SMTP reicht |
| 5 | Barcode | Lager-Effizienz, OCA reicht |
| 6 | POS/SumUp | Klar definiert, Modul existiert |
| 7 | PIM (=Odoo) | Konfiguration, kein Extra |
| 8 | Helpdesk/OCA | Nur wenn echtes Ticketvolumen |
| 9 | Shopware | M9, erst wenn Kern steht |
| 10 | Oxomi | Nur bei hoher Nutzungsfrequenz |
| 11 | eBay | Nur bei relevantem Umsatz |
| 12 | EDI/NORDWEST | Größter Brocken, M9 |
| 13 | WhatsApp | DSGVO + geringer Mehrwert |
| ❌ | Studio | Abgelehnt |

---

*Erstellt: 06.02.2026 | Heimdall*
