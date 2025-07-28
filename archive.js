const fs = require('fs');
const path = require('path');

const filename = process.argv[2];
if (!filename || !fs.existsSync(filename)) {
  console.error('❌ Bitte gültige XML-Datei angeben.');
  process.exit(1);
}

const now = new Date();
const dateStr = now.toISOString().split('T')[0]; // z. B. 2025-07-28
const archiveDir = path.join(__dirname, 'archiv', dateStr);

if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

const destPath = path.join(archiveDir, path.basename(filename));
fs.renameSync(filename, destPath);
console.log(`🗃️ Datei archiviert nach ${destPath}`);