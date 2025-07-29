import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

// 📁 Konfiguration
const XML_FILE = "./outbox/strom_export_17.xml";
const BILD_DIR = "./bilder";
const ZIP_DIR = "./pakete";

// 🕒 Zeitstempel für den Dateinamen
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, "-");
const zipName = `strom_export_${timestamp}.zip`;
const zipPath = path.join(ZIP_DIR, zipName);

try {
  if (!fs.existsSync(XML_FILE)) {
    console.error("❌ XML-Datei nicht gefunden:", XML_FILE);
    process.exit(1);
  }

  if (!fs.existsSync(BILD_DIR)) {
    console.error("❌ Bilder-Verzeichnis fehlt:", BILD_DIR);
    process.exit(1);
  }

  if (!fs.existsSync(ZIP_DIR)) {
    fs.mkdirSync(ZIP_DIR);
  }

  const zip = new AdmZip();

  // XML-Datei
  zip.addLocalFile(XML_FILE);

  // Bilder
  const bilder = fs.readdirSync(BILD_DIR).filter(f => f.endsWith(".jpg"));
  bilder.forEach(file => {
    zip.addLocalFile(path.join(BILD_DIR, file));
  });

  // Schreiben
  zip.writeZip(zipPath);
  console.log("✅ ZIP erstellt:", zipPath);

} catch (err) {
  console.error("❌ Fehler beim Packen:", err);
}