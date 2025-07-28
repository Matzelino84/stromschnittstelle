const fetch = require('node-fetch');
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

// Konfigurationsdaten
const NINOX_TOKEN = 'sk_test_1234567890abcdef1234567890abcdef';
const TEAM_ID = 'team_abc123xyz';
const DATABASE_ID = 'db_456def789ghi';
const TABLE_NAME = 'users_table';

// XML-Datei einlesen
const xmlData = fs.readFileSync('strom-export.xml', 'utf8');
const parser = new XMLParser({ ignoreAttributes: false });
const json = parser.parse(xmlData);

// Einzelnes Objekt extrahieren
const data = json.StromzaehlerWechsel;

async function sendToNinox() {
  try {
    const response = await fetch(`https://api.ninox.com/v1/teams/${TEAM_ID}/databases/${DATABASE_ID}/tables/${TABLE_NAME}/records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NINOX_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          zaehlernummer: data.Zaehlernummer,
          zaehlernummer_alt: data.ZaehlernummerAlt,
          wechsel_datum: data.WechselDatum,
          msb: data.MSB,
          einbauort: data.Einbauort,
          gateway_id: data.GatewayID,
          geraetetyp: data.Geraetetyp,
          fabrikat: data.Fabrikat,
          zaehlerstand_alt: data.ZaehlerstandAlt,
          zaehlerstand_neu: data.ZaehlerstandNeu,
          montageperson: data.Montageperson,
          dokumentationsnummer: data.Dokumentationsnummer,
          tarifregister: data.Tarifregister,
          kommunikation_aktiv: data.KommunikationAktiv,
          letzte_auslesung: data.LetzteAuslesung
        }
      })
    });

    const result = await response.json();
    console.log('✅ Erfolgreich an Ninox gesendet:', result);
  } catch (error) {
    console.error('❌ Fehler beim Senden an Ninox:', error);
  }
}

sendToNinox();