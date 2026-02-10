#!/usr/bin/env node
/**
 * save-everything.js - Heimdall's Memory Persistence Hook
 * 
 * Saves all messages, files, and session data to permanent storage.
 * "Was nicht gespeichert wird, existiert nicht."
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = '/home/reisig/.openclaw/workspace';
const LOGS_DIR = path.join(WORKSPACE, 'logs');
const MESSAGES_DIR = path.join(LOGS_DIR, 'messages');
const FILES_DIR = path.join(LOGS_DIR, 'files');

// Ensure directories exist
[LOGS_DIR, MESSAGES_DIR, FILES_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Get today's date for file naming
function getToday() {
  return new Date().toISOString().split('T')[0];
}

// Get current timestamp
function getTimestamp() {
  return new Date().toISOString();
}

// Append message to daily log
function logMessage(direction, content, metadata = {}) {
  const today = getToday();
  const logFile = path.join(MESSAGES_DIR, `${today}.jsonl`);
  
  const entry = {
    timestamp: getTimestamp(),
    direction, // 'in' or 'out'
    content,
    ...metadata
  };
  
  fs.appendFileSync(logFile, JSON.stringify(entry) + '\n');
  return entry;
}

// Log file creation/modification
function logFile(filePath, action = 'created') {
  const today = getToday();
  const logFile = path.join(FILES_DIR, `${today}.jsonl`);
  
  const entry = {
    timestamp: getTimestamp(),
    action,
    path: filePath,
    size: fs.existsSync(filePath) ? fs.statSync(filePath).size : null
  };
  
  fs.appendFileSync(logFile, JSON.stringify(entry) + '\n');
  return entry;
}

// Export session transcript
function exportSession(sessionKey, messages) {
  const sessionsDir = path.join(LOGS_DIR, 'sessions');
  if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true });
  }
  
  const timestamp = getTimestamp().replace(/[:.]/g, '-');
  const filename = `${sessionKey || 'main'}-${timestamp}.json`;
  const filePath = path.join(sessionsDir, filename);
  
  fs.writeFileSync(filePath, JSON.stringify({
    exported: getTimestamp(),
    sessionKey,
    messageCount: messages.length,
    messages
  }, null, 2));
  
  return filePath;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'message':
      const direction = args[1] || 'in';
      const content = args.slice(2).join(' ') || 'test message';
      const result = logMessage(direction, content);
      console.log('Logged:', JSON.stringify(result));
      break;
      
    case 'file':
      const filePath = args[1];
      if (filePath) {
        const fileResult = logFile(filePath, args[2] || 'created');
        console.log('Logged:', JSON.stringify(fileResult));
      } else {
        console.log('Usage: save-everything.js file <path> [action]');
      }
      break;
      
    case 'stats':
      const today = getToday();
      const msgLog = path.join(MESSAGES_DIR, `${today}.jsonl`);
      const fileLog = path.join(FILES_DIR, `${today}.jsonl`);
      
      const msgCount = fs.existsSync(msgLog) 
        ? fs.readFileSync(msgLog, 'utf8').trim().split('\n').length 
        : 0;
      const fileCount = fs.existsSync(fileLog) 
        ? fs.readFileSync(fileLog, 'utf8').trim().split('\n').length 
        : 0;
      
      console.log(`Today (${today}):`);
      console.log(`  Messages logged: ${msgCount}`);
      console.log(`  Files logged: ${fileCount}`);
      break;
      
    default:
      console.log('Heimdall Memory Persistence Hook');
      console.log('Usage:');
      console.log('  save-everything.js message <in|out> <content>');
      console.log('  save-everything.js file <path> [action]');
      console.log('  save-everything.js stats');
  }
}

module.exports = { logMessage, logFile, exportSession, getToday };
