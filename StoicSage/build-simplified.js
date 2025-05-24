/**
 * Build script for creating a simplified version of StoicSage
 * This script will:
 * 1. Create a simplified dist folder with just what's needed
 * 2. Copy only the quote generator and daily practice components
 * 3. Set up a simple express server
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const DIST_FOLDER = path.join(__dirname, 'simplified-dist');
const COMPONENTS_SRC = path.join(__dirname, 'client/src/components');
const COMPONENTS_DEST = path.join(DIST_FOLDER, 'client/src/components');

// Create folders
console.log('Creating simplified distribution...');
if (!fs.existsSync(DIST_FOLDER)) {
  fs.mkdirSync(DIST_FOLDER, { recursive: true });
}

if (!fs.existsSync(COMPONENTS_DEST)) {
  fs.mkdirSync(COMPONENTS_DEST, { recursive: true });
}

// Copy server and package files
console.log('Copying simplified server files...');
fs.copyFileSync(
  path.join(__dirname, 'server-simple.js'),
  path.join(DIST_FOLDER, 'server.js')
);

fs.copyFileSync(
  path.join(__dirname, 'simple-package.json'),
  path.join(DIST_FOLDER, 'package.json')
);

fs.copyFileSync(
  path.join(__dirname, 'README-SIMPLIFIED.md'),
  path.join(DIST_FOLDER, 'README.md')
);

// Copy essential frontend components
const essentialComponents = [
  'QuoteGenerator.tsx',
  'DailyStoicPractice.tsx',
  'ParallaxBackground.tsx',
  'Header.tsx',
  'Footer.tsx'
];

console.log('Copying essential components...');
essentialComponents.forEach(component => {
  if (fs.existsSync(path.join(COMPONENTS_SRC, component))) {
    fs.copyFileSync(
      path.join(COMPONENTS_SRC, component),
      path.join(COMPONENTS_DEST, component)
    );
    console.log(`Copied ${component}`);
  } else {
    console.warn(`Warning: Could not find ${component}`);
  }
});

// Copy UI components folder
console.log('Copying UI components...');
if (fs.existsSync(path.join(COMPONENTS_SRC, 'ui'))) {
  fs.mkdirSync(path.join(COMPONENTS_DEST, 'ui'), { recursive: true });
  
  const uiFiles = fs.readdirSync(path.join(COMPONENTS_SRC, 'ui'));
  uiFiles.forEach(file => {
    fs.copyFileSync(
      path.join(COMPONENTS_SRC, 'ui', file),
      path.join(COMPONENTS_DEST, 'ui', file)
    );
  });
}

console.log('Build complete! Your simplified StoicSage is ready in the simplified-dist folder.');
console.log('To use it:');
console.log('1. Copy the simplified-dist folder to your desired location');
console.log('2. Open command prompt in that folder');
console.log('3. Run: npm install');
console.log('4. Run: npm start');
console.log('5. Open http://localhost:5000 in your browser');