const fs = require('fs');
const path = require('path');

const filename = process.argv[2];
if (!filename || !fs.existsSync(filename)) {
  console.error('❌ Bitte gültige XML-Datei angeben.');
  process.exit(1);
}

const outboxDir = path.join(__dirname, 'outbox');
if (!fs.existsSync(outboxDir)) {
  fs.mkdirSync(outboxDir, { recursive: true });
}

const destPath = path.join(outboxDir, path.basename(filename));
fs.copyFileSync(filename, destPath);
console.log(`📤 Datei kopiert nach Outbox: ${destPath}`);