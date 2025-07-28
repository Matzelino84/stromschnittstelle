const { create } = require('xmlbuilder2');
const fs = require('fs');

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

const xml = create({ version: '1.0', encoding: 'UTF-8' })
  .ele('BLOCK')
    .ele('OBJ')
      .ele('AUF_ID').txt(auftrag.AUF_ID).up()
      .ele('GER_SERIALNR').txt(auftrag.GER_SERIALNR).up()
      .ele('ARBEITSPROZESS').txt(auftrag.ARBEITSPROZESS).up()
      .ele('AV_ID').txt(auftrag.AV_ID).up()
      .ele('BNID').txt(auftrag.BNID).up()
      .ele('ISTBEARB').txt(auftrag.ISTBEARB).up()
      .import(auftrag.ACTS.map(act => ({
        ACT: {
          ACT_ID: act.ACT_ID,
          BEZEICHNER: act.BEZEICHNER,
          OBJEKT: act.OBJEKT,
          ERG: act.ERG,
          ERGDAT: act.ERGDAT,
          ERFDAT: act.ERFDAT
        }
      })))
    .up()
  .up()
.end({ prettyPrint: true });

fs.writeFileSync('strom-export.xml', xml);
console.log('✅ Export-Datei geschrieben: strom-export.xml');
