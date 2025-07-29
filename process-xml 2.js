const { execSync } = require('child_process');

const filename = process.argv[2];
if (!filename) {
  console.error('❌ Bitte XML-Dateiname angeben.');
  process.exit(1);
}

try {
  console.log('🔍 Validierung läuft...');
  execSync(`node validate-xml.js ${filename}`, { stdio: 'inherit' });

  console.log('📤 Upload läuft...');
  execSync(`node upload.js ${filename}`, { stdio: 'inherit' });

  console.log('🗃️ Archivierung läuft...');
  execSync(`node archive.js ${filename}`, { stdio: 'inherit' });

  console.log('✅ Komplettdurchlauf erfolgreich!');
} catch (error) {
  console.error('❌ Fehler im Ablauf:', error.message);
}