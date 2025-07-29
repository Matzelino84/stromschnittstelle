import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verzeichnisse
const outboxDir = path.join(__dirname, 'outbox');
const bilderDir = path.join(__dirname, 'bilder');
const paketeDir = path.join(__dirname, 'pakete');

// ZIP erstellen
async function createZip() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const zipName = `strom_export_${timestamp}.zip`;
  const zipPath = path.join(paketeDir, zipName);

  // Sicherstellen, dass das Zielverzeichnis existiert
  if (!fs.existsSync(paketeDir)) fs.mkdirSync(paketeDir);

  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ ZIP erstellt: ${path.relative(__dirname, zipPath)}`);
      resolve(zipPath);
    });

    archive.on('error', err => reject(err));

    archive.pipe(output);

    // XML-Dateien aus /outbox hinzufügen
    fs.readdirSync(outboxDir).forEach(file => {
      if (file.endsWith('.xml')) {
        const filePath = path.join(outboxDir, file);
        archive.file(filePath, { name: file });
      }
    });

    // Bilder aus /bilder hinzufügen (optional)
    if (fs.existsSync(bilderDir)) {
      fs.readdirSync(bilderDir).forEach(file => {
        const filePath = path.join(bilderDir, file);
        archive.file(filePath, { name: `bilder/${file}` });
      });
    }

    archive.finalize();
  });
}

export { createZip };
