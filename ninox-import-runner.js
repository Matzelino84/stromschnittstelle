import fs from "fs";
import { XMLParser } from "fast-xml-parser";

const DUMMY_TOKEN = "sk_test_dummytoken";

function parseXmlFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Datei nicht gefunden: ${filePath}`);
    process.exit(1);
  }

  const xmlContent = fs.readFileSync(filePath, "utf-8");
  const parser = new XMLParser();
  const parsed = parser.parse(xmlContent);

  // 💡 Unterstütze sowohl einzelne als auch mehrere Einträge
  let datensaetze = [];
  if (parsed.StromzaehlerWechsel) {
    datensaetze = [parsed.StromzaehlerWechsel];
  } else if (Array.isArray(parsed.Wechsel?.StromzaehlerWechsel)) {
    datensaetze = parsed.Wechsel.StromzaehlerWechsel;
  } else {
    console.error("❌ Keine gültigen Wechsel-Daten in XML gefunden.");
    process.exit(1);
  }

  console.log("🔍 XML-Daten analysiert...");
  return datensaetze;
}

function sendeZuNinox(datensatz) {
  console.log("📤 Sende an Ninox...");
  console.log("🔢 Zählernummer:", datensatz.Zaehlernummer);
  console.log("📍 Einbauort:", datensatz.Einbauort);
  console.log("⚡ Zählerstand (alt/neu):", datensatz.ZaehlerstandAlt, "/", datensatz.ZaehlerstandNeu);
  console.log("🧑‍🔧 Monteur:", datensatz.Montageperson);

  // Hier echte API-Logik einbauen
  console.log("✅ Dummy-Daten erfolgreich verarbeitet.");
}

// 🏁 Hauptlogik
const inputFile = process.argv[2];
if (!inputFile) {
  console.error("❌ Bitte gib eine XML-Datei als Argument an.");
  process.exit(1);
}

const wechseldaten = parseXmlFile(inputFile);
for (const eintrag of wechseldaten) {
  sendeZuNinox(eintrag);
}
