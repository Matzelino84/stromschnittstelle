// export-runner.js
import { exportFromNinox } from './ninox-export.js';
import { createZip } from './zip-packager-final.js';
import fs from 'fs';
import path from 'path';

const OUTBOX_DIR = './outbox';
const IMAGE_DIR = './bilder';
const ARCHIVE_DIR = `./archiv/${new Date().toISOString().split('T')[0]}`;

console.log('\n🚀 Starte Export aus Ninox...');
try {
  await exportFromNinox();
} catch (err) {
  console.warn(`⚠️ Export-Warnung: ${err.message}`);
}

console.log('\n📦 Starte ZIP-Erstellung...');
try {
  const zipPath = await createZip();

  // ➕ Archivierungslogik
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

  // XML-Dateien verschieben
  const xmlFiles = fs.readdirSync(OUTBOX_DIR).filter(f => f.endsWith('.xml'));
  for (const file of xmlFiles) {
    fs.renameSync(path.join(OUTBOX_DIR, file), path.join(ARCHIVE_DIR, file));
  }

  // JPG-Bilder verschieben (optional, falls vorhanden)
  if (fs.existsSync(IMAGE_DIR)) {
    const imgFiles = fs.readdirSync(IMAGE_DIR).filter(f => f.toLowerCase().endsWith('.jpg'));
    for (const file of imgFiles) {
      fs.renameSync(path.join(IMAGE_DIR, file), path.join(ARCHIVE_DIR, file));
    }
  }

  console.log(`✅ ZIP erstellt: ${zipPath}`);
  console.log(`📂 XML + Bilder nach ${ARCHIVE_DIR} verschoben.`);
} catch (err) {
  console.error(`❌ Fehler beim Erstellen des ZIPs: ${err.message}`);
}
