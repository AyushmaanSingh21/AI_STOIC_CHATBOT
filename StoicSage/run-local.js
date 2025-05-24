// Simple script to run the server locally on Windows
const { spawn } = require('child_process');

console.log('Starting StoicSage in development mode...');
console.log('Using localhost:3000 for better Windows compatibility');

// Run the server with cross-env
const server = spawn('npx', [
  'cross-env', 
  'NODE_ENV=development', 
  'tsx', 
  'server/index.ts'
], { 
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
});