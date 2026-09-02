import fs from 'fs';

const rawData = `
1. Red rice flour 5kg. 1140 1200
2. Red rice flour 10kg. 2300 3000
3. Red rice flour 25kg. 5600 7000
1. Mixture 1kg. 880 1200
2. Mixture 500g. 460 600        
4. Mixture 80g. 75 100
5. Mixture 40g. 35 50
1. Pakoda 1kg. 880 1200
2. Pakoda 500g. 460 600
3. Pakoda 250g. 250 300
4. Pakoda 80g. 75 100
5. Pakoda 40g. 35 50
1. Garlic murukku 1kg. 880 1200
2. Garlic murukku 160g. 150 200
3. Garlic murukku 80g. 75 100
4. Garlic murukku 40g. 35 50
1. Masala murukku 1kg. 880 1200
2. Masala murukku 250g. 240 300
3. Masala murukku 80g. 75 100
4. Masala murukku 40g. 35 50
1. Bites 1kg. 880 1200
2. Bites 250g. 240 300
3. Bites 80g. 75 100
4. Bites 40g. 35 50
1. Thadduvadai 1kg. 1400 1800
2. Thadduvadai 250g. 400 450
3. Thadduvadai 60g. 75 100
4. Thadduvadai 30g. 40 50
1. Manioc chips 1kg. 900 1400
2. Manioc chips 250g. 300 350
3. Manioc chips 60g. 75 100
4. Manioc chips 30g. 40 50
1. Peanut pakoda 1kg. 1400 1800
2. Peanut pakoda 250g. 400 450
3. Peanut pakoda100g. 170 200
1. Dhal 1kg. 700 1000
2. Dhal 250g. 200 300
3. Dhal 40g. 35 50
4. Dhal 18g. 16 20
1. Baby mixture 1kg. 880 1200
2. Baby mixture 250g. 250 300
3. Baby mixture 80g. 75 100
1. Bengal gram1kg. 700 1000
2. Bengal gram 500g. 350 500
3. Bengal gram250g. 200 300
4. Bengal gram80g. 75 100
5. Bengal gram 40g. 35 50
6. Bengal gram 18g. 16 20
1. Peanut 1kg. 1300 1800
2. Peanut 100g. 180 200
3. Peanut 50g. 80 100
1. Chilli powder 1kg. 1000 1400
2. Chilli powder 250g. 250 350
3. Chilli powder 50g. 52 70
1. Gingelly oil 750ml 1050 1400
2. Gingelly oil 350ml 560 750
3. Gingelly oil 200ml 320 400
1. Red raw rice 25kg 6500 7500
2. Red raw rice 10kg 2600 3000
3. Red raw rice 5kg 1300 1500
4. Mikser 200g 180 300
5. Mikser 400g 360 600
6. Mixture 250g 250 300
`;

const lines = rawData.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const getCategoryAndImage = (name) => {
  const n = name.toLowerCase();
  if (n.includes('raw rice')) {
     if (n.includes('25kg')) return { cat: 'Rice', img: '/assets/tastraa_red_raw_rice_25kg.jpg' };
     return { cat: 'Rice', img: '/assets/tastraa_red_raw_rice_5kg.jpg' };
  }
  if (n.includes('rice flour')) return { cat: 'Flour', img: '/assets/red_rice_flour_5kg.jpg' };
  if (n.includes('murukku')) return { cat: 'Murukku', img: '/assets/tastraa_masala_murukku.jpg' };
  if (n.includes('pakoda') && !n.includes('peanut')) return { cat: 'Pakoda', img: '/assets/plate_dumplings.jpg' };
  if (n.includes('peanut pakoda')) return { cat: 'Pakoda', img: '/assets/bengal_gram_yellow.jpg' };
  if (n.includes('thadduvadai') || n.includes('manioc chips') || n.includes('bites')) return { cat: 'Bites & Chips', img: '/assets/tastraa_bites.jpg' };
  if (n.includes('mixture') || n.includes('mikser')) return { cat: 'Mixture', img: '/assets/tastraa_mixture.jpg' };
  if (n.includes('dhal') || n.includes('bengal gram') || n.includes('peanut')) return { cat: 'Dhal & Gram', img: '/assets/bengal_gram_yellow.jpg' };
  if (n.includes('chilli powder')) return { cat: 'Spices', img: '/assets/roasted_chilli_powder_50g.jpg' };
  if (n.includes('gingelly oil')) return { cat: 'Gingelly Oil', img: '/assets/gingelly_oil_750ml.jpg' };
  return { cat: 'Other', img: '/assets/tastraa_bites.jpg' };
};

const parsedProducts = [];
let id = 101;

lines.forEach(line => {
  // strip "1. " from start
  let cleaned = line.replace(/^\d+\.\s*/, '');
  
  let match = cleaned.match(/^(.*?)\s*([\d\.]+[kmlg]+)\.?\s+(\d+)\s+(\d+)$/i);
  if (!match) {
     match = cleaned.match(/^(.*?)\.?\s+(\d+)\s+(\d+)$/i);
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
    
    parsedProducts.push({
      id: id++,
      name, slug, cat, retail, wholesale, unit, img
    });
  } else {
    console.log("Could not parse:", line);
  }
});

const getUnitWeight = (unit) => {
  let u = unit.toLowerCase();
  if (u.includes('kg')) return parseFloat(u) * 1000;
  if (u.includes('ml')) return parseFloat(u);
  if (u.includes('g')) return parseFloat(u);
  return 0;
};

const getBaseName = (name) => {
  return name.replace(/\d+[kmlg]+$/i, '').trim();
};

parsedProducts.sort((a, b) => {
  const catOrder = ['Rice', 'Flour', 'Mixture', 'Pakoda', 'Murukku', 'Bites & Chips', 'Dhal & Gram', 'Spices', 'Gingelly Oil'];
  let catA = catOrder.indexOf(a.cat);
  let catB = catOrder.indexOf(b.cat);
  if (catA === -1) catA = 99;
  if (catB === -1) catB = 99;
  if (catA !== catB) return catA - catB;
  
  const baseA = getBaseName(a.name);
  const baseB = getBaseName(b.name);
  if (baseA !== baseB) return baseA.localeCompare(baseB);
  
  const weightA = getUnitWeight(a.unit);
  const weightB = getUnitWeight(b.unit);
  return weightB - weightA;
});

id = 101;
parsedProducts.forEach(p => {
  p.id = id++;
  p.descName = p.name.includes('Mikser') ? p.name + ' (Mixture)' : p.name;
});

// Update backend/db.js
let productsJsForDb = '  memoryProducts = [\n';
parsedProducts.forEach(p => {
    productsJsForDb += `    { id: ${p.id}, name: '${p.name}', slug: '${p.slug}', description: 'Premium quality ${p.descName}', category: '${p.cat}', price: ${p.retail}.00, wholesale_price: ${p.wholesale}.00, unit: '${p.unit}', image_url: '${p.img}', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR ${p.wholesale}'], is_active: true },\n`;
});
productsJsForDb += '  ];';

let dbContent = fs.readFileSync('backend/db.js', 'utf8');
const startDb = dbContent.indexOf('  memoryProducts = [');
const endDb = dbContent.indexOf('  ];\n};', startDb) + 4;
dbContent = dbContent.substring(0, startDb) + productsJsForDb + dbContent.substring(endDb);
fs.writeFileSync('backend/db.js', dbContent);
console.log('backend/db.js updated successfully!');

// Update web/src/pages/Products.jsx fallbackProducts
let productsJsForFrontend = 'const fallbackProducts = [\n';
parsedProducts.forEach(p => {
    productsJsForFrontend += `  {
    id: ${p.id},
    name: '${p.name}',
    category: '${p.cat}',
    price: '${p.retail}.00',
    wholesale_price: '${p.wholesale}.00',
    unit: '${p.unit}',
    description: 'Premium quality ${p.descName}',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR ${p.wholesale}'],
    image_url: '${p.img}',
    slug: '${p.slug}'
  },
`;
});
productsJsForFrontend += '];';

let frontContent = fs.readFileSync('web/src/pages/Products.jsx', 'utf8');
const startFront = frontContent.indexOf('const fallbackProducts = [');
const endFront = frontContent.indexOf('];\n\nconst Products =', startFront) + 2;
frontContent = frontContent.substring(0, startFront) + productsJsForFrontend + frontContent.substring(endFront);
fs.writeFileSync('web/src/pages/Products.jsx', frontContent);
console.log('web/src/pages/Products.jsx updated successfully!');
