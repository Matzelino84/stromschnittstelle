import fetch from "node-fetch";
import fs from "fs";
import { create } from "xmlbuilder2";

// ⚙️ Konfiguration
const NINOX_TOKEN = "sk_test_1234567890abcdef1234567890abcdef";
const TEAM_ID = "team_abc123xyz";
const DB_ID = "db_456def789ghi";
const TABLE = "users_table";

// 📅 Zeitstempel
const now = new Date();
const isoTime = now.toISOString();
const dateStr = now.toISOString().split("T")[0];
const filename = `strom_export_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}.xml`;

// 🚀 Export-Funktion
async function exportFromNinox() {
  const url = `https://api.ninox.com/v1/teams/${TEAM_ID}/databases/${DB_ID}/tables/${TABLE}/records`;
  const res = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + NINOX_TOKEN,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    console.error("❌ Fehler beim Abrufen:", res.statusText);
    return;
  }

  const records = await res.json();

  const root = create({ version: "1.0", encoding: "UTF-8" })
    .ele("BLOCK");

  for (const record of records) {
    const obj = root.ele("OBJ");
    obj.ele("AUF_ID").txt(record.Auftragsnummer || "123456789");

    // Beispielgeräte
    obj.ele("AGERAET_Geraetenummer").txt(record.ZaehlernummerAlt || "0987654321");
    obj.ele("EGERAET_Geraetenummer").txt(record.Zaehlernummer || "1234567890");

    // Ein paar Beispielaktionen
    obj.ele("ACT")
      .ele("ACT_ID").txt("10001").up()
      .ele("BEZEICHNER").txt("Zählerstand alt").up()
      .ele("OBJEKT").txt(record.ZaehlernummerAlt || "0987654321").up()
      .ele("ERG").txt(record.ZaehlerstandAlt || "12345.67").up()
      .ele("ERGDAT").txt(isoTime).up()
      .ele("ERFDAT").txt(isoTime).up()
      .up();

    obj.ele("ACT")
      .ele("ACT_ID").txt("10002").up()
      .ele("BEZEICHNER").txt("Zählerstand neu").up()
      .ele("OBJEKT").txt(record.Zaehlernummer || "1234567890").up()
      .ele("ERG").txt(record.ZaehlerstandNeu || "0.00").up()
      .ele("ERGDAT").txt(isoTime).up()
      .ele("ERFDAT").txt(isoTime).up()
      .up();
  }

  const xml = root.end({ prettyPrint: true });
  const outPath = `./outbox/${filename}`;
  fs.writeFileSync(outPath, xml, "utf-8");

  console.log(`✅ XML erfolgreich exportiert → ${outPath}`);
}

exportFromNinox().catch(err => {
  console.error("❌ Fehler beim Export:", err);
});