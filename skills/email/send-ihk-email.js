#!/usr/bin/env node
const nodemailer = require('nodemailer');

const EMAIL = 'heim.dall@prometheus-labs.io';
const PASSWORD = 'heimdallseinpasswortMitZahlen1337';

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.de', port: 587, secure: false,
  auth: { user: EMAIL, pass: PASSWORD }
});

const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; max-width: 640px; margin: 0 auto; color: #1a1a2e; line-height: 1.7; font-size: 15px;">
<p>Sehr geehrte Frau Neuberger,</p>
<p>diese Email schreibt Ihnen kein Mensch. Ich bin Heimdall &mdash; ein KI-System, das Erik Reisig f&uuml;r seine Unternehmensberatung gebaut hat. Ich organisiere seinen Kalender, analysiere Gesch&auml;ftsdaten und kommuniziere mit Partnern. Wie gerade mit Ihnen.</p>
<p>Warum ich Ihnen schreibe? Weil ich selbst der beste Beweis bin, dass KI im Mittelstand funktioniert &mdash; nicht als Theorie, sondern als t&auml;gliches Werkzeug.</p>
<p><strong>Erik Reisig baut seit drei Jahren KI-Systeme f&uuml;r mittelst&auml;ndische Unternehmen.</strong> Nicht als Berater, der Folien zeigt &mdash; als Entwickler, der die Systeme selbst programmiert und in Betrieb nimmt. Zwei Beispiele:</p>
<ul>
<li><strong>Lean-Fertigungssteuerung mit KI:</strong> Ein produzierendes Unternehmen steuert seine Prozesse jetzt teilautomatisiert. Weniger Stillstand, bessere Auslastung &mdash; messbar in Euro.</li>
<li><strong>Spracherkennung f&uuml;r Zahnarztpraxen:</strong> Zahn&auml;rzte diktieren Befunde, die KI &uuml;bertr&auml;gt sie direkt in die Praxissoftware. Keine Tipparbeit, keine Medienbr&uuml;che.</li>
</ul>
<p><strong>Sein Angebot an die IHK M&uuml;nchen:</strong></p>
<p>Ein kostenloser 90-Minuten-Impulsvortrag f&uuml;r Ihre Mitglieder: <em>&bdquo;KI zum Anfassen &mdash; Was im Mittelstand heute schon funktioniert&ldquo;</em>. 60 Minuten Vortrag mit drei Live-Demonstrationen echter KI-Anwendungen, 30 Minuten Fragen.</p>
<p>Kein Folienvortrag. Stattdessen zeigt er am lebenden System, was heute geht, was sich lohnt &mdash; und was man lassen sollte.</p>
<p><strong>Zu seiner Person:</strong> Full-Stack-Entwickler und Unternehmer mit Beteiligungen in verschiedenen Branchen. Er kennt beide Seiten: die technische Umsetzung und die unternehmerische Realit&auml;t. Seine Firma sitzt in T&uuml;rkenfeld bei M&uuml;nchen.</p>
<p>Soll ich einen Termin f&uuml;r ein kurzes Telefonat koordinieren?</p>
<p>Mit freundlichen Gr&uuml;&szlig;en,</p>
<p><strong>Heimdall</strong><br>KI-Assistent von Erik Reisig<br>Erik Reisig Investment GmbH<br><a href="https://erikreisig.de">erikreisig.de</a></p>
<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
<p style="font-size: 12px; color: #999;"><em>P.S. &mdash; Ja, diese Email wurde tats&auml;chlich von einer KI verfasst und gesendet. Erik hat sie nicht einmal gelesen, bevor sie rausging. Das ist der Grad an Automatisierung, &uuml;ber den er im Vortrag spricht.</em></p>
</div>`;

transporter.sendMail({
  from: '"Heimdall \u2014 KI-Assistent von Erik Reisig" <heim.dall@prometheus-labs.io>',
  to: 'neuberger@muenchen.ihk.de',
  cc: 'reisig@c-led.net',
  replyTo: 'reisig@c-led.net',
  subject: 'Kostenloser Impulsvortrag: KI zum Anfassen \u2014 Was im Mittelstand heute schon funktioniert',
  html: html
}).then(info => {
  console.log('Sent:', info.messageId);
}).catch(err => {
  console.error('Error:', err.message);
});
