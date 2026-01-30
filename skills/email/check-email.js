#!/usr/bin/env node
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');

// Read credentials
const credsPath = path.join(process.env.HOME, '.openclaw/workspace/credentials/email.md');
const EMAIL = 'heim.dall@prometheus-labs.io';
const PASSWORD = 'heimdallseinpasswortMitZahlen1337';

// Parse CLI args
const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
};

const limit = parseInt(getArg('--limit') || '5');
const unreadOnly = args.includes('--unread');
const fromFilter = getArg('--from');
const subjectFilter = getArg('--subject');

const imap = new Imap({
  user: EMAIL,
  password: PASSWORD,
  host: 'imap.ionos.de',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
  openInbox(function(err, box) {
    if (err) {
      console.error(JSON.stringify({ error: err.message }));
      process.exit(1);
    }

    const searchCriteria = unreadOnly ? ['UNSEEN'] : ['ALL'];
    
    imap.search(searchCriteria, function(err, results) {
      if (err) {
        console.error(JSON.stringify({ error: err.message }));
        imap.end();
        process.exit(1);
      }

      if (!results || results.length === 0) {
        console.log(JSON.stringify({ emails: [] }));
        imap.end();
        return;
      }

      // Get last N messages
      const msgs = results.slice(-limit);
      const emails = [];
      let processed = 0;

      const f = imap.fetch(msgs, { bodies: '' });
      
      f.on('message', function(msg, seqno) {
        msg.on('body', function(stream, info) {
          simpleParser(stream, (err, parsed) => {
            if (err) {
              processed++;
              return;
            }

            const from = parsed.from?.text || 'Unknown';
            const subject = parsed.subject || '(no subject)';
            const date = parsed.date ? parsed.date.toISOString() : null;
            const body = (parsed.text || '').substring(0, 500);

            // Apply filters
            if (fromFilter && !from.toLowerCase().includes(fromFilter.toLowerCase())) {
              processed++;
              return;
            }
            if (subjectFilter && !subject.toLowerCase().includes(subjectFilter.toLowerCase())) {
              processed++;
              return;
            }

            emails.push({ from, subject, date, body, seqno });
            processed++;

            if (processed === msgs.length) {
              console.log(JSON.stringify({ emails: emails.reverse() }, null, 2));
              imap.end();
            }
          });
        });
      });

      f.once('error', function(err) {
        console.error(JSON.stringify({ error: err.message }));
        imap.end();
        process.exit(1);
      });
    });
  });
});

imap.once('error', function(err) {
  console.error(JSON.stringify({ error: err.message }));
  process.exit(1);
});

imap.connect();
