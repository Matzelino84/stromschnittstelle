const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Konfiguration
const NINOX_TOKEN = 'sk_test_1234567890abcdef1234567890abcdef';
const TEAM_ID = 'team_abc123xyz';
const DATABASE_ID = 'db_456def789ghi';
const TABLE_NAME = 'users_table';

// XML einlesen und parsen
const xmlData = fs.readFileSync('strom-export.xml', 'utf8');
const parser = new XMLParser({ ignoreAttributes: false });
const json = parser.parse(xmlData);

// Root-Element: BLOCK > OBJ
const obj = json.BLOCK.OBJ;

// Extrahiere Grunddaten + Tätigkeiten
const grunddaten = {
  auf_id: obj.AUF_ID,
  geraet_nr: obj.GER_SERIALNR,
  arbeitsprozess: obj.ARBEITSPROZESS,
  av_id: obj.AV_ID,
  bnid: obj.BNID,
  istbearb: obj.ISTBEARB
};

const acts = Array.isArray(obj.ACT) ? obj.ACT : [obj.ACT];

async function sendToNinox() {
  for (const act of acts) {
    try {
      const response = await fetch(`https://api.ninox.com/v1/teams/${TEAM_ID}/databases/${DATABASE_ID}/tables/${TABLE_NAME}/records`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NINOX_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            auftrag_id: grunddaten.auf_id,
            geraet_nr: grunddaten.geraet_nr,
            arbeitsprozess: grunddaten.arbeitsprozess,
            av_id: grunddaten.av_id,
            bnid: grunddaten.bnid,
            istbearbeitet_am: grunddaten.istbearb,
            taetigkeit_id: act.ACT_ID,
            bezeichnung: act.BEZEICHNER,
            objekt: act.OBJEKT,
            ergebnis: act.ERG,
            ergebnis_datum: act.ERGDAT,
            erfassung_datum: act.ERFDAT
          }
        })
      });

      const result = await response.json();
      console.log('✅ Datensatz an Ninox übertragen:', result.id || result);
    } catch (error) {
      console.error('❌ Fehler beim Übertragen:', error);
    }
  }
}

sendToNinox();