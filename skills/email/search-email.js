#!/usr/bin/env node
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const path = require('path');

const EMAIL = 'heim.dall@prometheus-labs.io';
const PASSWORD = 'heimdallseinpasswortMitZahlen1337';

const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
};

const query = getArg('--query');
const limit = parseInt(getArg('--limit') || '10');

if (!query) {
  console.error(JSON.stringify({ error: '--query is required' }));
  process.exit(1);
}

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

    imap.search(['ALL'], function(err, results) {
      if (err) {
        console.error(JSON.stringify({ error: err.message }));
        imap.end();
        process.exit(1);
      }

      if (!results || results.length === 0) {
        console.log(JSON.stringify({ results: [] }));
        imap.end();
        return;
      }

      const msgs = results.slice(-limit);
      const matches = [];
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
            const body = parsed.text || '';
            const html = parsed.html || '';
            const combined = `${subject} ${body} ${html}`.toLowerCase();

            if (combined.includes(query.toLowerCase())) {
              matches.push({ from, subject, date, body, seqno });
            }

            processed++;

            if (processed === msgs.length) {
              console.log(JSON.stringify({ results: matches.reverse() }, null, 2));
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
