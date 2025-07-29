import { exec } from "child_process";

console.log("🚀 Starte Export aus Ninox...");

exec("node ninox-export.js", (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Fehler beim Export: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Export-Warnung: ${stderr}`);
  }
  console.log(stdout);

  console.log("📦 Starte ZIP-Erstellung...");

  exec("node zip-packager-final.js", (zipError, zipStdout, zipStderr) => {
    if (zipError) {
      console.error(`❌ Fehler beim ZIP: ${zipError.message}`);
      return;
    }
    if (zipStderr) {
      console.error(`⚠️ ZIP-Warnung: ${zipStderr}`);
    }
    console.log(zipStdout);
  });
});