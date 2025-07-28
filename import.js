const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const xml = fs.readFileSync('strom-export.xml', 'utf8');
const parser = new XMLParser({ ignoreAttributes: false });
const json = parser.parse(xml);

const obj = json.BLOCK.OBJ;
console.log('📝 Auftrag:', obj.AUF_ID);
console.log('🔢 Gerät:', obj.GER_SERIALNR);

const acts = Array.isArray(obj.ACT) ? obj.ACT : [obj.ACT];
acts.forEach(act => {
  console.log(`🔧 Tätigkeit [${act.ACT_ID}]: ${act.BEZEICHNER} = ${act.ERG}`);
});
