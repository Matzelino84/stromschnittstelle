import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const NINOX_API_URL = "https://api.ninoxdb.de/v1/teams/<TEAM_ID>/databases/<DB_ID>/tables/<TABLE_ID>/records";
const NINOX_TOKEN = "DEIN_NINOX_TOKEN";

const OUTBOX_DIR = "./outbox";
if (!fs.existsSync(OUTBOX_DIR)) fs.mkdirSync(OUTBOX_DIR);

async function exportFromNinox() {
  try {
    const res = await fetch(`${NINOX_API_URL}?filter=exportiert=false`, {
      headers: {
        Authorization: `Bearer ${NINOX_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Ninox API Fehler: ${res.statusText}`);
    }

    const records = await res.json();

    if (records.length === 0) {
      console.log("ℹ️ Keine neuen Datensätze zum Exportieren.");
      return;
    }

    for (const record of records) {
      const filename = `strom_export_${record.id}.xml`;
      const filePath = path.join(OUTBOX_DIR, filename);

      // Beispiel-XML-Erstellung (anpassen!)
      const xmlContent = `
<StromzaehlerWechsel>
  <Zaehlernummer>${record.fields.Zaehlernummer}</Zaehlernummer>
  <WechselDatum>${record.fields.WechselDatum}</WechselDatum>
  <Einbauort>${record.fields.Einbauort}</Einbauort>
  <!-- weitere Felder -->
</StromzaehlerWechsel>
      `.trim();

      fs.writeFileSync(filePath, xmlContent, "utf8");
      console.log(`✅ Exportiert: ${filePath}`);

      // Flag in Ninox setzen (exportiert = true)
      await fetch(`${NINOX_API_URL}/${record.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${NINOX_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: { exportiert: true }
        })
      });
    }
  } catch (err) {
    console.error("❌ Fehler beim Exportieren:", err.message);
  }
}

exportFromNinox();
