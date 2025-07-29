import fs from "fs";
import path from "path";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Bitte gib den ZIP-Dateinamen als Argument an.");
  process.exit(1);
}

const filePath = path.join("./pakete", fileName);

if (!fs.existsSync(filePath)) {
  console.error("❌ Datei nicht gefunden:", filePath);
  process.exit(1);
}

console.log("☁️  Simuliere Upload zur Cloud:", fileName);

// ⏳ Dummy-Upload-Funktion
function uploadDummy(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Upload erfolgreich (Simulation)");
    }, 1000);
  });
}

uploadDummy(filePath).then(result => {
  console.log(result);
});