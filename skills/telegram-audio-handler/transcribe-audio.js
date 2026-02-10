#!/usr/bin/env node
/**
 * Robust Telegram Audio Transcription Handler
 * 
 * Usage: node transcribe-audio.js <audio-file-path> [--language de]
 * 
 * Features:
 * - OpenAI Whisper API (primary)
 * - Local Whisper fallback
 * - German language optimization
 * - Automatic format detection
 * - Error logging
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const LOG_FILE = path.join(process.env.HOME, '.openclaw/workspace/memory/audio-transcription.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.error(logMessage.trim());
  
  // Append to log file
  try {
    fs.appendFileSync(LOG_FILE, logMessage);
  } catch (err) {
    // Ignore log write errors
  }
}

function transcribeWithWhisperAPI(audioFile, language = 'de') {
  log(`Attempting OpenAI Whisper API transcription: ${audioFile}`);
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not set');
  }
  
  const outFile = `${audioFile}.txt`;
  
  try {
    const scriptPath = '/usr/lib/node_modules/openclaw/skills/openai-whisper-api/scripts/transcribe.sh';
    
    const cmd = [
      scriptPath,
      audioFile,
      '--model', 'whisper-1',
      '--language', language,
      '--out', outFile
    ].join(' ');
    
    execSync(cmd, { 
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, OPENAI_API_KEY }
    });
    
    const transcript = fs.readFileSync(outFile, 'utf8').trim();
    log(`✅ Whisper API success: ${transcript.length} chars`);
    
    // Cleanup
    try { fs.unlinkSync(outFile); } catch {}
    
    return transcript;
  } catch (error) {
    log(`❌ Whisper API failed: ${error.message}`);
    throw error;
  }
}

function transcribeWithLocalWhisper(audioFile, language = 'de') {
  log(`Attempting local Whisper transcription: ${audioFile}`);
  
  try {
    const outFile = `${audioFile}.txt`;
    
    const cmd = `whisper "${audioFile}" --language ${language} --model base --output_format txt --output_dir "$(dirname "${audioFile}")" 2>&1`;
    
    execSync(cmd, { stdio: 'pipe' });
    
    const transcript = fs.readFileSync(outFile, 'utf8').trim();
    log(`✅ Local Whisper success: ${transcript.length} chars`);
    
    // Cleanup
    try { fs.unlinkSync(outFile); } catch {}
    
    return transcript;
  } catch (error) {
    log(`❌ Local Whisper failed: ${error.message}`);
    throw error;
  }
}

async function transcribe(audioFile, language = 'de') {
  // Validate file exists
  if (!fs.existsSync(audioFile)) {
    throw new Error(`Audio file not found: ${audioFile}`);
  }
  
  log(`Starting transcription: ${audioFile} (${language})`);
  
  // Try OpenAI Whisper API first (fast, accurate)
  try {
    return transcribeWithWhisperAPI(audioFile, language);
  } catch (apiError) {
    log(`Whisper API failed, trying local fallback...`);
    
    // Fallback to local Whisper
    try {
      return transcribeWithLocalWhisper(audioFile, language);
    } catch (localError) {
      log(`❌ All transcription methods failed`);
      throw new Error(`Transcription failed: API=${apiError.message}, Local=${localError.message}`);
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node transcribe-audio.js <audio-file> [--language de]');
    process.exit(1);
  }
  
  const audioFile = args[0];
  const langIndex = args.indexOf('--language');
  const language = langIndex !== -1 && args[langIndex + 1] ? args[langIndex + 1] : 'de';
  
  transcribe(audioFile, language)
    .then(transcript => {
      console.log(transcript);
      process.exit(0);
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    });
}

module.exports = { transcribe };
