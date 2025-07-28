const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const filename = process.argv[2];
if (!filename) {
  console.error('❌ Bitte XML-Dateiname als Argument angeben.');
  process.exit(1);
}

try {
  const xml = fs.readFileSync(filename, 'utf8');
  const parser = new XMLParser();
  parser.parse(xml);
  console.log(`✅ XML-Datei "${filename}" ist wohlgeformt.`);
} catch (err) {
  console.error(`❌ Fehler in "${filename}":`, err.message);
}