#!/usr/bin/env node
// Send Email via SMTP (IONOS)

const nodemailer = require('nodemailer');

const EMAIL = 'heim.dall@prometheus-labs.io';
const PASSWORD = 'heimdallseinpasswortMitZahlen1337';

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.de',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

// Parse CLI args
const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
};

const to = getArg('--to');
const subject = getArg('--subject');
const body = getArg('--body');
const replyTo = getArg('--reply-to'); // Message-ID to reply to
const attachment = getArg('--attachment'); // File path for attachment

if (!to || !subject || !body) {
  console.error('Usage: node send-email.js --to EMAIL --subject "Subject" --body "Body text" [--reply-to MESSAGE-ID] [--attachment FILE]');
  process.exit(1);
}

// Compose message
const mailOptions = {
  from: EMAIL,
  to: to,
  subject: subject,
  text: body
};

if (replyTo) {
  mailOptions.inReplyTo = replyTo;
  mailOptions.references = replyTo;
}

if (attachment) {
  const path = require('path');
  mailOptions.attachments = [{
    filename: path.basename(attachment),
    path: attachment
  }];
}

// Send
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error.message);
    process.exit(1);
  }
  console.log('✅ Email sent:', info.messageId);
  console.log('To:', to);
  console.log('Subject:', subject);
});
