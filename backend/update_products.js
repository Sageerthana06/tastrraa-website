import fs from 'fs';

const rawData = `
Red rice flour 5kg. 1140 1200
Red rice flour 10kg. 2300 3000
Red rice flour 25kg. 5600 7000

Mixture 1kg. 880 1200
Mixture 500g. 460 600        
Mixture 250g. 250 300
Mixture 80g. 75 100
Mixture 40g. 35 50

Pakoda 1kg. 880 1200
Pakoda 500g. 460 600
Pakoda 250g. 250 300
Pakoda 80g. 75 100
Pakoda 40g. 35 50

Garlic murukku 1kg. 880 1200
Garlic murukku 160g. 150 200
Garlic murukku 80g. 75 100
Garlic murukku 40g. 35 50

Masala murukku 1kg. 880 1200
Masala murukku 250g. 240 300
Masala murukku 80g. 75 100
Masala murukku 40g. 35 50

Bites 1kg. 880 1200
Bites 250g. 240 300
Bites 80g. 75 100
Bites 40g. 35 50

Thadduvadai 1kg. 1400 1800
Thadduvadai 250g. 400 450
Thadduvadai 60g. 75 100
Thadduvadai 30g. 40 50

Manioc chips 1kg. 900 1400
Manioc chips 250g. 300 350
Manioc chips 60g. 75 100
Manioc chips 30g. 40 50

Peanut pakoda 1kg. 1400 1800
Peanut pakoda 250g. 400 450
Peanut pakoda 100g. 170 200

Dhal 1kg. 700 1000
Dhal 250g. 200 300
Dhal 40g. 35 50
Dhal 18g. 16 20

Baby mixture 1kg. 880 1200
Baby mixture 250g. 250 300
Baby mixture 80g. 75 100

Bengal gram 1kg. 700 1000
Bengal gram 500g. 350 500
Bengal gram 250g. 200 300
Bengal gram 80g. 75 100
Bengal gram 40g. 35 50
Bengal gram 18g. 16 20

Peanut 1kg. 1300 1800
Peanut 100g. 180 200
Peanut 50g. 80 100

Chilli powder 1kg. 1000 1400
Chilli powder 250g. 250 350
Chilli powder 50g. 52 70
                      
Gingelly oil 750ml 1050 1400
Gingelly oil 350ml 560 750
Gingelly oil 200ml 320 400

Mikser 200g 180 300
Mikser 400g 360 600
`;

const lines = rawData.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const getCategoryAndImage = (name) => {
  const n = name.toLowerCase();
  if (n.includes('rice flour')) return { cat: 'Flour', img: '/assets/red_rice_flour_5kg.jpg' };
  if (n.includes('murukku')) return { cat: 'Murukku', img: '/assets/masala_murukku.jpg' };
  if (n.includes('pakoda') && !n.includes('peanut')) return { cat: 'Pakoda', img: '/assets/plate_dumplings.jpg' };
  if (n.includes('peanut pakoda')) return { cat: 'Pakoda', img: '/assets/bengal_gram_yellow.jpg' };
  if (n.includes('thadduvadai') || n.includes('manioc chips') || n.includes('bites')) return { cat: 'Bites & Chips', img: '/assets/bites_pack.jpg' };
  if (n.includes('mixture') || n.includes('mikser')) return { cat: 'Mixture', img: '/assets/bites_pack.jpg' };
  if (n.includes('dhal') || n.includes('bengal gram') || n.includes('peanut')) return { cat: 'Dhal & Gram', img: '/assets/bengal_gram_yellow.jpg' };
  if (n.includes('chilli powder')) return { cat: 'Spices', img: '/assets/roasted_chilli_powder_50g.jpg' };
  if (n.includes('gingelly oil')) return { cat: 'Gingelly Oil', img: '/assets/gingelly_oil_750ml.jpg' };
  return { cat: 'Other', img: '/assets/bites_pack.jpg' };
};

let productsJs = '  memoryProducts = [\n';
let id = 101;

lines.forEach(line => {
  // e.g. "Red rice flour 5kg. 1140 1200"
  // e.g. "Mikser 200g 180 300"
  let match = line.match(/^(.*?)\s*([\d\.]+[kmlg]+)\.?\s+(\d+)\s+(\d+)$/i);
  if (!match) {
     match = line.match(/^(.*?)\.?\s+(\d+)\s+(\d+)$/i);
  }
  
  if (match) {
    let nameBase, unit, wholesale, retail;
    if (match.length === 5) {
       nameBase = match[1].trim();
       unit = match[2].trim();
       wholesale = match[3];
       retail = match[4];
    } else {
       // Need to extract unit from nameBase
       let parts = match[1].trim().split(' ');
       unit = parts.pop();
       nameBase = parts.join(' ').trim();
       wholesale = match[2];
       retail = match[3];
    }
    
    // Capitalize name
    const name = nameBase.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' ' + unit;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { cat, img } = getCategoryAndImage(name);
    
    productsJs += `    { id: ${id++}, name: '${name}', slug: '${slug}', description: 'Premium quality ${name}', category: '${cat}', price: ${retail}.00, wholesale_price: ${wholesale}.00, unit: '${unit}', image_url: '${img}', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR ${wholesale}'], is_active: true },\n`;
  } else {
    console.log("Could not parse:", line);
  }
});

productsJs += '  ];';

let dbContent = fs.readFileSync('db.js', 'utf8');
const start = dbContent.indexOf('  memoryProducts = [');
const end = dbContent.indexOf('  ];\n};', start) + 4;
dbContent = dbContent.substring(0, start) + productsJs + dbContent.substring(end);
fs.writeFileSync('db.js', dbContent);
console.log('db.js updated successfully!');
