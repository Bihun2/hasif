/**
 * Build script to prepare files before building
 * This script can be used to perform tasks before vite build runs
 */

const fs = require('fs');
const path = require('path');

// Get current year
const currentYear = new Date().getFullYear();

// Path to index.html
const indexPath = path.join(__dirname, 'index.html');

// Read index.html
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Update copyright year
indexContent = indexContent.replace(
  /<p class="text-xs mt-2 text-text">© \d{4} All Rights Reserved<\/p>/g,
  `<p class="text-xs mt-2 text-text">© ${currentYear} All Rights Reserved</p>`
);

// Write updated content back to file
fs.writeFileSync(indexPath, indexContent);

console.log(`🚀 Build preparation complete! Updated copyright year to ${currentYear}`);
