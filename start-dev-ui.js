#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Medical Chat UI Development Preview...');
console.log('📱 This will show all UI components without authentication');
console.log('🔧 No backend server required!');
console.log('');

// Start Vite dev server with custom config
const viteProcess = spawn('npx', ['vite', '--config', 'vite.config.dev.js', 'index.dev.html'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Development server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development server...');
  viteProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  viteProcess.kill('SIGTERM');
});