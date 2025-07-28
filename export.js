const { create } = require('xmlbuilder2');
const fs = require('fs');

// Dummy-Daten für einen Stromauftrag
const auftrag = {
  AUF_ID: '123456789',
  GER_SERIALNR: 'ST123456',
  ARBEITSPROZESS: 'Stromzähler Wechsel Turnustausch',
  AV_ID: 'WE',
  BNID: 'FDL1',
  ISTBEARB: new Date().toISOString(),
  ACTS: [
    {
      ACT_ID: '10001',
      BEZEICHNER: 'Zählerstand',
      OBJEKT: 'ST123456',
      ERG: '7890',
      ERGDAT: new Date().toISOString(),
      ERFDAT: new Date().toISOString()
    },
    {
      ACT_ID: '10002',
      BEZEICHNER: 'Foto',
      OBJEKT: 'ST123456',
      ERG: 'ST123456_STROM_1630.jpg',
      ERGDAT: new Date().toISOString(),
      ERFDAT: new Date().toISOString()
    }
  ]
};

// XML erzeugen
const root = create({ version: '1.0', encoding: 'UTF-8' })
  .ele('BLOCK')
    .ele('OBJ')
      .ele('AUF_ID').txt(auftrag.AUF_ID).up()
      .ele('GER_SERIALNR').txt(auftrag.GER_SERIALNR).up()
      .ele('ARBEITSPROZESS').txt(auftrag.ARBEITSPROZESS).up()
      .ele('AV_ID').txt(auftrag.AV_ID).up()
      .ele('BNID').txt(auftrag.BNID).up()
      .ele('ISTBEARB').txt(auftrag.ISTBEARB).up();

// Tätigkeiten anhängen (jede ACT einzeln)
auftrag.ACTS.forEach(act => {
  root
    .ele('ACT')
      .ele('ACT_ID').txt(act.ACT_ID).up()
      .ele('BEZEICHNER').txt(act.BEZEICHNER).up()
      .ele('OBJEKT').txt(act.OBJEKT).up()
      .ele('ERG').txt(act.ERG).up()
      .ele('ERGDAT').txt(act.ERGDAT).up()
      .ele('ERFDAT').txt(act.ERFDAT).up()
    .up();
});

// XML finalisieren & speichern
const xml = root.end({ prettyPrint: true });
fs.writeFileSync('strom-export.xml', xml);
console.log('✅ Export-Datei geschrieben: strom-export.xml');
