#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const isWindows = os.platform() === 'win32';

try {
  console.log('Linking workspaces...');
  
  if (isWindows) {
    // Use PowerShell on Windows
    console.log('Using PowerShell script for Windows');
    execSync('powershell -ExecutionPolicy Bypass -File ".\\scripts\\link-workspaces.ps1"', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
  } else {
    // Use Bash on Unix-like systems
    console.log('Using Bash script for Unix-like systems');
    execSync('bash ./scripts/link-workspaces.sh', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
  }
  
  console.log('Workspaces linked successfully!');
} catch (error) {
  console.error('Error linking workspaces:', error.message);
  process.exit(1);
}