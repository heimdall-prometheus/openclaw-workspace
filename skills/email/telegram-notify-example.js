#!/usr/bin/env node
// Example: How to notify Erik via Telegram about new emails

// Example email data
const email = {
  from: "someone@example.com",
  subject: "Anfrage für Projekt",
  date: "2026-01-30T18:00:00Z",
  body: "Hallo, ich interessiere mich für Ihre Dienste..."
};

// Analyze and create recommendation
function analyzeEmail(email) {
  const isSpam = /viagra|lottery|prince/i.test(email.body + email.subject);
  const isImportant = /urgent|wichtig|dringend|rechnung/i.test(email.subject);
  const isCustomerInquiry = /anfrage|projekt|angebot/i.test(email.subject.toLowerCase());

  if (isSpam) {
    return { action: "ignore", reason: "Vermutlich Spam" };
  }
  if (isImportant) {
    return { action: "reply_soon", reason: "Als wichtig markiert" };
  }
  if (isCustomerInquiry) {
    return { action: "review", reason: "Potentielle Kundenanfrage" };
  }
  return { action: "review", reason: "Normale Email" };
}

const analysis = analyzeEmail(email);

// Format Telegram message
const telegramMessage = `📬 Neue Email erhalten:

Von: ${email.from}
Betreff: ${email.subject}
Datum: ${new Date(email.date).toLocaleString('de-DE')}

Zusammenfassung: ${email.body.substring(0, 200)}...

💡 Empfehlung: ${analysis.action}
Grund: ${analysis.reason}

Soll ich antworten, ignorieren oder archivieren?`;

console.log("=== TELEGRAM NOTIFICATION ===");
console.log(telegramMessage);
console.log("\n=== SEND VIA ===");
console.log("message tool:");
console.log(JSON.stringify({
  action: "send",
  channel: "telegram",
  target: "1424138659",
  message: telegramMessage
}, null, 2));
