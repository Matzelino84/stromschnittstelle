// ninox-export.js

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const OUTBOX_DIR = './outbox';

export async function exportFromNinox() {
  const token = process.env.NINOX_TOKEN || 'DUMMY_TOKEN';
  const databaseId = process.env.NINOX_DB || 'DEMO_DB';

  // Simulierter API-Aufruf
  const response = await fetch('https://api.ninox.com/v1/data', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Ninox API Fehler: ' + response.statusText);
  }

  const auftraege = await response.json();

  fs.mkdirSync(OUTBOX_DIR, { recursive: true });

  auftraege.forEach((eintrag, idx) => {
    const xml = `<StromzaehlerWechsel>
  <Zaehlernummer>${eintrag.zaehlernummer || '1234567890'}</Zaehlernummer>
  <ZaehlerstandNeu>${eintrag.zaehlerstandNeu || '0.00'}</ZaehlerstandNeu>
</StromzaehlerWechsel>`;

    fs.writeFileSync(`${OUTBOX_DIR}/strom_export_${idx}.xml`, xml);
  });

  console.log(`📝 ${auftraege.length} XML-Dateien exportiert.`);
}
