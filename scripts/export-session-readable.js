#!/usr/bin/env node
/**
 * export-session-readable.js - Export session JSONL to readable markdown
 * 
 * Reads OpenClaw session files and creates human-readable transcripts.
 * "Was nicht gespeichert wird, existiert nicht."
 */

const fs = require('fs');
const path = require('path');

const SESSIONS_DIR = '/home/reisig/.openclaw/agents/main/sessions';
const OUTPUT_DIR = '/home/reisig/.openclaw/workspace/logs/transcripts';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get today's date
function getToday() {
  return new Date().toISOString().split('T')[0];
}

// Format timestamp for display
function formatTime(isoString) {
  try {
    const date = new Date(isoString);
    return date.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  } catch {
    return isoString;
  }
}

// Extract readable content from a message
function extractContent(entry) {
  if (!entry) return null;
  
  // Handle OpenClaw JSONL format (message is nested)
  const msg = entry.message || entry;
  
  // User message
  if (msg.role === 'user') {
    let content = '';
    if (typeof msg.content === 'string') {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      content = msg.content
        .filter(c => c.type === 'text')
        .map(c => c.text)
        .join('\n');
    }
    // Clean up system prefixes
    content = content.replace(/^\[Telegram.*?\]\s*/i, '');
    content = content.replace(/^\[message_id:.*?\]\s*/i, '');
    content = content.replace(/^A new session was started.*$/m, '');
    // Skip system messages
    if (content.includes('HEARTBEAT') || content.includes('EMAIL CHECK')) {
      return null;
    }
    return { role: 'user', content: content.trim() };
  }
  
  // Assistant message
  if (msg.role === 'assistant') {
    let content = '';
    if (typeof msg.content === 'string') {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      content = msg.content
        .filter(c => c.type === 'text')
        .map(c => c.text)
        .join('\n');
    }
    // Skip tool calls and empty content
    if (!content || content === 'HEARTBEAT_OK' || content === 'NO_REPLY') {
      return null;
    }
    return { role: 'assistant', content: content.trim() };
  }
  
  return null;
}

// Process a single session file
function processSessionFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.trim().split('\n').filter(Boolean);
  
  const messages = [];
  let sessionStart = null;
  
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      
      // Track session start time
      if (entry.timestamp && !sessionStart) {
        sessionStart = entry.timestamp;
      }
      
      // Extract message content
      const msg = extractContent(entry);
      if (msg && msg.content) {
        messages.push({
          ...msg,
          timestamp: entry.timestamp || entry.createdAt
        });
      }
    } catch (e) {
      // Skip unparseable lines
    }
  }
  
  return { sessionStart, messages };
}

// Generate markdown transcript
function generateMarkdown(sessionId, data) {
  const { sessionStart, messages } = data;
  
  let md = `# Session Transcript\n\n`;
  md += `- **Session ID**: ${sessionId}\n`;
  md += `- **Started**: ${sessionStart ? formatTime(sessionStart) : 'Unknown'}\n`;
  md += `- **Messages**: ${messages.length}\n`;
  md += `- **Exported**: ${formatTime(new Date().toISOString())}\n\n`;
  md += `---\n\n`;
  
  for (const msg of messages) {
    const role = msg.role === 'user' ? '👤 Erik' : '👁️ Heimdall';
    const time = msg.timestamp ? formatTime(msg.timestamp) : '';
    
    md += `### ${role}`;
    if (time) md += ` (${time})`;
    md += `\n\n`;
    md += msg.content + '\n\n';
  }
  
  return md;
}

// Main function
function exportSession(sessionFile) {
  const sessionId = path.basename(sessionFile, '.jsonl');
  const filepath = sessionFile.includes('/') ? sessionFile : path.join(SESSIONS_DIR, sessionFile);
  
  if (!fs.existsSync(filepath)) {
    console.error(`Session file not found: ${filepath}`);
    return null;
  }
  
  const data = processSessionFile(filepath);
  const markdown = generateMarkdown(sessionId, data);
  
  const outputFile = path.join(OUTPUT_DIR, `${sessionId}.md`);
  fs.writeFileSync(outputFile, markdown);
  
  console.log(`Exported ${data.messages.length} messages to ${outputFile}`);
  return outputFile;
}

// Export latest session
function exportLatest() {
  const files = fs.readdirSync(SESSIONS_DIR)
    .filter(f => f.endsWith('.jsonl') && !f.includes('.deleted'))
    .map(f => ({
      name: f,
      mtime: fs.statSync(path.join(SESSIONS_DIR, f)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);
  
  if (files.length === 0) {
    console.log('No session files found');
    return null;
  }
  
  const latest = files[0].name;
  console.log(`Latest session: ${latest}`);
  return exportSession(latest);
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === 'latest' || args.length === 0) {
    exportLatest();
  } else if (args[0] === 'all') {
    const files = fs.readdirSync(SESSIONS_DIR)
      .filter(f => f.endsWith('.jsonl') && !f.includes('.deleted'));
    
    for (const file of files) {
      exportSession(file);
    }
    console.log(`\nExported ${files.length} sessions`);
  } else {
    exportSession(args[0]);
  }
}

module.exports = { exportSession, exportLatest };
