/**
 * Cloudflare Worker — api.erikreisig.de
 * Handles contact form submissions
 */

const RESEND_API_KEY = 're_PXhYFnAR_8rV1fW86cG7jA36LnmAt6Hbf';
const FROM_EMAIL = 'noreply@imr-media.de';
const TO_EMAIL = 'heim.dall@prometheus-labs.io';

const ALLOWED_ORIGINS = [
  'https://erikreisig.de',
  'https://www.erikreisig.de',
  'https://erikreisig.pages.dev',
];

// In-memory rate limit store (resets on worker restart, which is fine for basic protection)
const rateLimitMap = new Map();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.find(o => origin === o || origin.endsWith('.erikreisig.pages.dev'));
  return {
    'Access-Control-Allow-Origin': allowed || ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  // Window expired — reset
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// Periodic cleanup of stale entries (runs on each request, lightweight)
function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

function validateInput(data) {
  if (!data || typeof data !== 'object') {
    return 'Invalid request body';
  }

  const { name, email, message } = data;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length > 200) {
    return 'Name too long';
  }

  if (!email || typeof email !== 'string') {
    return 'Email is required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return 'Invalid email address';
  }
  if (email.trim().length > 320) {
    return 'Email too long';
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return 'Message is required';
  }
  if (message.trim().length > 10000) {
    return 'Message too long';
  }

  return null;
}

async function sendEmail(name, email, message) {
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0a1628; margin-bottom: 24px;">Neue Kontaktanfrage</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top; width: 100px;">Name</td>
          <td style="padding: 8px 12px; color: #222;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">E-Mail</td>
          <td style="padding: 8px 12px; color: #222;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">Nachricht</td>
          <td style="padding: 8px 12px; color: #222; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
      <hr style="margin-top: 24px; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #999; margin-top: 12px;">Gesendet über erikreisig.de</p>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Erik Reisig Website <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: email.trim(),
      subject: `Neue Kontaktanfrage: ${name.trim()}`,
      html: htmlBody,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Resend API error: ${res.status} — ${errorBody}`);
  }

  return await res.json();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only POST /contact
    if (url.pathname !== '/contact' || request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    cleanupRateLimit();

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse body
    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate
    const validationError = validateInput(data);
    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email
    try {
      await sendEmail(data.name.trim(), data.email.trim(), data.message.trim());
    } catch (err) {
      console.error('Email send failed:', err.message);
      return new Response(
        JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  },
};
