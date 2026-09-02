import fs from 'fs';

// Update db.js
let dbPath = 'c:/Users/HP/Downloads/tastrraa-website-main (1)/tastrraa-website-main/tastrraa-website-main/backend/db.js';
let dbContent = fs.readFileSync(dbPath, 'utf8');

const rawRiceData = `    { id: 181, name: 'Red Raw Rice 5kg (சிகப்பு பச்சை அரிசி)', slug: 'red-raw-rice-5kg', description: 'Premium quality Red Raw Rice 5kg', category: 'Raw Rice', price: 1500.00, wholesale_price: 1300.00, unit: '5kg', image_url: '/assets/tastraa_red_raw_rice_5kg.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1300'], is_active: true },
    { id: 182, name: 'Red Raw Rice 25kg (சிகப்பு பச்சை அரிசி)', slug: 'red-raw-rice-25kg', description: 'Premium quality Red Raw Rice 25kg', category: 'Raw Rice', price: 7500.00, wholesale_price: 6500.00, unit: '25kg', image_url: '/assets/tastraa_red_raw_rice_25kg.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 6500'], is_active: true },
`;

if (!dbContent.includes('red-raw-rice-5kg')) {
    dbContent = dbContent.replace(/];\s*};\s*export const queryDb/g, `${rawRiceData}  ];\n};\n\nexport const queryDb`);
    fs.writeFileSync(dbPath, dbContent);
}

// Update Products.jsx
let productsPath = 'c:/Users/HP/Downloads/tastrraa-website-main (1)/tastrraa-website-main/tastrraa-website-main/web/src/pages/Products.jsx';
let productsContent = fs.readFileSync(productsPath, 'utf8');

const productsRawRice = `  {
    id: 1801,
    name: 'Red Raw Rice 5kg (சிகப்பு பச்சை அரிசி)',
    category: 'Raw Rice',
    price: '1500.00',
    wholesale_price: '1300.00',
    unit: '5kg Sack',
    description: 'Premium Quality Red Raw Rice 5kg packed with care.',
    features: ['5kg Green Sack', '100% Premium Quality', 'Wholesale Rate: LKR 1,300'],
    image_url: '/assets/tastraa_red_raw_rice_5kg.jpg',
    slug: 'red-raw-rice-5kg'
  },
  {
    id: 1802,
    name: 'Red Raw Rice 25kg (சிகப்பு பச்சை அரிசி)',
    category: 'Raw Rice',
    price: '7500.00',
    wholesale_price: '6500.00',
    unit: '25kg Sack',
    description: 'Premium Quality Red Raw Rice 25kg bulk pack.',
    features: ['25kg Yellow Sack', 'Bulk Premium Pack', 'Wholesale Rate: LKR 6,500'],
    image_url: '/assets/tastraa_red_raw_rice_25kg.jpg',
    slug: 'red-raw-rice-25kg'
  },
];`;

if (!productsContent.includes('red-raw-rice-5kg')) {
    productsContent = productsContent.replace(/];\s*const \[filteredProducts/g, `${productsRawRice}\n\n  const [filteredProducts`);
    fs.writeFileSync(productsPath, productsContent);
}

console.log('Red Raw Rice added!');
