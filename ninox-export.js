const fs = require('fs');
const { create } = require('xmlbuilder2');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Ninox-Konfiguration
const NINOX_TOKEN = 'sk_test_1234567890abcdef1234567890abcdef';
const TEAM_ID = 'team_abc123xyz';
const DATABASE_ID = 'db_456def789ghi';
const TABLE_NAME = 'users_table';

async function exportFromNinox() {
  try {
    const response = await fetch(`https://api.ninox.com/v1/teams/${TEAM_ID}/databases/${DATABASE_ID}/tables/${TABLE_NAME}/records`, {
      headers: {
        'Authorization': `Bearer ${NINOX_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const records = await response.json();

    for (const record of records) {
      const doc = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('StromzaehlerWechsel')
          .ele('Zaehlernummer').txt(record.fields?.zaehlernummer || '').up()
          .ele('ZaehlernummerAlt').txt(record.fields?.zaehlernummer_alt || '').up()
          .ele('WechselDatum').txt(record.fields?.wechsel_datum || '').up()
          .ele('MSB').txt(record.fields?.msb || '').up()
          .ele('Einbauort').txt(record.fields?.einbauort || '').up()
          .ele('GatewayID').txt(record.fields?.gateway_id || '').up()
          .ele('Geraetetyp').txt(record.fields?.geraetetyp || '').up()
          .ele('Fabrikat').txt(record.fields?.fabrikat || '').up()
          .ele('ZaehlerstandAlt').txt(record.fields?.zaehlerstand_alt || '').up()
          .ele('ZaehlerstandNeu').txt(record.fields?.zaehlerstand_neu || '').up()
          .ele('Montageperson').txt(record.fields?.montageperson || '').up()
          .ele('Dokumentationsnummer').txt(record.fields?.dokumentationsnummer || '').up()
          .ele('Tarifregister').txt(record.fields?.tarifregister || '').up()
          .ele('KommunikationAktiv').txt(record.fields?.kommunikation_aktiv || '').up()
          .ele('LetzteAuslesung').txt(record.fields?.letzte_auslesung || '').up()
        .up();

      const xml = doc.end({ prettyPrint: true });
      const filename = `strom_export_${record.id}.xml`;
      fs.writeFileSync(filename, xml);
      console.log(`✅ XML-Datei erstellt: ${filename}`);
    }

  } catch (error) {
    console.error('❌ Fehler beim Abrufen oder Schreiben:', error);
  }
}

exportFromNinox();