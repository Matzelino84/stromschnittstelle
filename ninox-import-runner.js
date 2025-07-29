import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// 📦 Nimm alle neuen XML-Dateien, die gerade erst exportiert wurden
const OUTBOX_DIR = "./outbox";
const PAKETE_DIR = "./pakete";

if (!fs.existsSync(PAKETE_DIR)) fs.mkdirSync(PAKETE_DIR);

(async () => {
  try {
    console.log("🚀 Starte Export aus Ninox...");
    execSync("node ninox-export.js", { stdio: "inherit" });

    const xmlFiles = fs
      .readdirSync(OUTBOX_DIR)
      .filter((f) => f.endsWith(".xml"));

    if (xmlFiles.length === 0) {
      console.log("ℹ️ Keine neuen XML-Dateien vorhanden. ZIP wird übersprungen.");
      return;
    }

    console.log("📦 Starte ZIP-Erstellung...");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const zipName = `strom_export_${timestamp}.zip`;
    const zipPath = path.join(PAKETE_DIR, zipName);

    // Übergib alle XML-Dateien an das ZIP-Script
    const args = xmlFiles.map((f) => path.join(OUTBOX_DIR, f)).join(" ");
    execSync(`node zip-packager-final.js ${args} ${zipPath}`, { stdio: "inherit" });

    console.log(`✅ ZIP-Paket erstellt: ${zipPath}`);
  } catch (err) {
    console.error("❌ Fehler beim Ablauf:", err.message);
  }
})();
