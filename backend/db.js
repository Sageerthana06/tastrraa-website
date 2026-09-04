import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

// PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : (isProduction ? { rejectUnauthorized: false } : false),
});

let isPgConnected = false;
let memoryProducts = [];
let memoryAdmins = [];

export const initDb = async () => {
  // Always initialize memory store so fallback is ready regardless of DB state
  await setupMemoryStore();

  if (!process.env.DATABASE_URL) {
    console.log('ℹ️ No DATABASE_URL found. Running with in-memory fallback store.');
    isPgConnected = false;
    return;
  }

  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL Database');
    isPgConnected = true;

    // Create admins table safely (NON-DESTRUCTIVE)
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) DEFAULT 'TASTRAA Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create products table safely (NON-DESTRUCTIVE)
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        image_url TEXT NOT NULL,
        features JSONB DEFAULT '[]'::jsonb,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add columns if missing (NON-DESTRUCTIVE MIGRATIONS)
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(255);`);
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS unit VARCHAR(50) DEFAULT '1kg';`);
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;`);
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;`);

    // Ensure default admin accounts exist with valid bcrypt password hash
    const adminEmails = ['admin@tastraa.com', 'admin@tastrraa.com'];
    for (const email of adminEmails) {
      const adminCheck = await client.query('SELECT * FROM admins WHERE LOWER(email) = LOWER($1)', [email]);
      if (adminCheck.rows.length === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await client.query(
          'INSERT INTO admins (email, password, name) VALUES ($1, $2, $3)',
          [email, hashedPassword, 'TASTRAA Admin Manager']
        );
        console.log(`✅ Created default admin account (${email})`);
      } else {
        const existingAdmin = adminCheck.rows[0];
        const isPasswordValid = await bcrypt.compare('admin123', existingAdmin.password);
        if (!isPasswordValid) {
          const hashedPassword = await bcrypt.hash('admin123', 10);
          await client.query(
            'UPDATE admins SET password = $1 WHERE id = $2',
            [hashedPassword, existingAdmin.id]
          );
          console.log(`✅ Updated ${email} password to valid bcrypt hash for admin123`);
        }
      }
    }

    // TRUNCATE AND RESEED with new price lists
    await client.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');
    const initialProducts = memoryProducts;

      for (const p of initialProducts) {
        await client.query(
          `INSERT INTO products (name, slug, description, category, price, unit, image_url, features, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [p.name, p.slug, p.description, p.category, p.price, p.unit, p.image_url, JSON.stringify(p.features), true]
        );
      }
      console.log('✅ Initial TASTRAA products seeded into PostgreSQL');
    client.release();
  } catch (err) {
    console.error('⚠️ PostgreSQL connection failed:', err.message);
    isPgConnected = false;
    await setupMemoryStore();
  }
};

const setupMemoryStore = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  memoryAdmins = [
    { id: 1, email: 'admin@tastraa.com', password: hashedPassword, name: 'TASTRAA Admin Manager' },
    { id: 2, email: 'admin@tastrraa.com', password: hashedPassword, name: 'TASTRAA Admin Manager' }
  ];
  memoryProducts = [
    { id: 101, name: 'Red Raw Rice 25kg', slug: 'red-raw-rice-25kg', description: 'Premium quality Red Raw Rice 25kg', category: 'Rice', price: 7500.00, wholesale_price: 6500.00, unit: '25kg', image_url: '/assets/tastraa_red_raw_rice_25kg.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 6500'], is_active: true },
    { id: 102, name: 'Red Raw Rice 10kg', slug: 'red-raw-rice-10kg', description: 'Premium quality Red Raw Rice 10kg', category: 'Rice', price: 3000.00, wholesale_price: 2600.00, unit: '10kg', image_url: '/assets/tastraa_red_raw_rice_10kg.png', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 2600'], is_active: true },
    { id: 103, name: 'Red Raw Rice 5kg', slug: 'red-raw-rice-5kg', description: 'Premium quality Red Raw Rice 5kg', category: 'Rice', price: 1500.00, wholesale_price: 1300.00, unit: '5kg', image_url: '/assets/tastraa_red_raw_rice_5kg.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1300'], is_active: true },
    { id: 104, name: 'Red Rice Flour 25kg', slug: 'red-rice-flour-25kg', description: 'Premium quality Red Rice Flour 25kg', category: 'Flour', price: 7000.00, wholesale_price: 5600.00, unit: '25kg', image_url: '/assets/red_rice_flour_5kg.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 5600'], is_active: true },
    { id: 105, name: 'Red Rice Flour 10kg', slug: 'red-rice-flour-10kg', description: 'Premium quality Red Rice Flour 10kg', category: 'Flour', price: 3000.00, wholesale_price: 2300.00, unit: '10kg', image_url: '/assets/red_rice_flour_5kg.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 2300'], is_active: true },
    { id: 106, name: 'Red Rice Flour 5kg', slug: 'red-rice-flour-5kg', description: 'Premium quality Red Rice Flour 5kg', category: 'Flour', price: 1200.00, wholesale_price: 1140.00, unit: '5kg', image_url: '/assets/red_rice_flour_5kg.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1140'], is_active: true },
    { id: 107, name: 'Baby Mixture 1kg', slug: 'baby-mixture-1kg', description: 'Premium quality Baby Mixture 1kg', category: 'Mixture', price: 1200.00, wholesale_price: 880.00, unit: '1kg', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 108, name: 'Baby Mixture 250g', slug: 'baby-mixture-250g', description: 'Premium quality Baby Mixture 250g', category: 'Mixture', price: 300.00, wholesale_price: 250.00, unit: '250g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 109, name: 'Baby Mixture 80g', slug: 'baby-mixture-80g', description: 'Premium quality Baby Mixture 80g', category: 'Mixture', price: 100.00, wholesale_price: 75.00, unit: '80g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 110, name: 'Mikser 400g', slug: 'mikser-400g', description: 'Premium quality Mikser 400g (Mixture)', category: 'Mixture', price: 600.00, wholesale_price: 360.00, unit: '400g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 360'], is_active: true },
    { id: 111, name: 'Mikser 200g', slug: 'mikser-200g', description: 'Premium quality Mikser 200g (Mixture)', category: 'Mixture', price: 300.00, wholesale_price: 180.00, unit: '200g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 180'], is_active: true },
    { id: 112, name: 'Mixture 1kg', slug: 'mixture-1kg', description: 'Premium quality Mixture 1kg', category: 'Mixture', price: 1200.00, wholesale_price: 880.00, unit: '1kg', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 113, name: 'Mixture 500g', slug: 'mixture-500g', description: 'Premium quality Mixture 500g', category: 'Mixture', price: 600.00, wholesale_price: 460.00, unit: '500g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 460'], is_active: true },
    { id: 114, name: 'Mixture 250g', slug: 'mixture-250g', description: 'Premium quality Mixture 250g', category: 'Mixture', price: 300.00, wholesale_price: 250.00, unit: '250g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 115, name: 'Mixture 80g', slug: 'mixture-80g', description: 'Premium quality Mixture 80g', category: 'Mixture', price: 100.00, wholesale_price: 75.00, unit: '80g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 116, name: 'Mixture 40g', slug: 'mixture-40g', description: 'Premium quality Mixture 40g', category: 'Mixture', price: 50.00, wholesale_price: 35.00, unit: '40g', image_url: '/assets/tastraa_mixture.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 117, name: 'Pakoda 1kg', slug: 'pakoda-1kg', description: 'Premium quality Pakoda 1kg', category: 'Pakoda', price: 1200.00, wholesale_price: 880.00, unit: '1kg', image_url: '/assets/tastraa_pakoda.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 118, name: 'Pakoda 500g', slug: 'pakoda-500g', description: 'Premium quality Pakoda 500g', category: 'Pakoda', price: 600.00, wholesale_price: 460.00, unit: '500g', image_url: '/assets/tastraa_pakoda.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 460'], is_active: true },
    { id: 119, name: 'Pakoda 250g', slug: 'pakoda-250g', description: 'Premium quality Pakoda 250g', category: 'Pakoda', price: 300.00, wholesale_price: 250.00, unit: '250g', image_url: '/assets/tastraa_pakoda.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 120, name: 'Pakoda 80g', slug: 'pakoda-80g', description: 'Premium quality Pakoda 80g', category: 'Pakoda', price: 100.00, wholesale_price: 75.00, unit: '80g', image_url: '/assets/tastraa_pakoda.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 121, name: 'Pakoda 40g', slug: 'pakoda-40g', description: 'Premium quality Pakoda 40g', category: 'Pakoda', price: 50.00, wholesale_price: 35.00, unit: '40g', image_url: '/assets/tastraa_pakoda.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 122, name: 'Peanut Pakoda 1kg', slug: 'peanut-pakoda-1kg', description: 'Premium quality Peanut Pakoda 1kg', category: 'Pakoda', price: 1800.00, wholesale_price: 1400.00, unit: '1kg', image_url: '/assets/tastraa_peanut.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1400'], is_active: true },
    { id: 123, name: 'Peanut Pakoda 250g', slug: 'peanut-pakoda-250g', description: 'Premium quality Peanut Pakoda 250g', category: 'Pakoda', price: 450.00, wholesale_price: 400.00, unit: '250g', image_url: '/assets/tastraa_peanut.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 400'], is_active: true },
    { id: 124, name: 'Peanut Pakoda 100g', slug: 'peanut-pakoda-100g', description: 'Premium quality Peanut Pakoda 100g', category: 'Pakoda', price: 200.00, wholesale_price: 170.00, unit: '100g', image_url: '/assets/tastraa_peanut.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 170'], is_active: true },
    { id: 125, name: 'Garlic Murukku 1kg', slug: 'garlic-murukku-1kg', description: 'Premium quality Garlic Murukku 1kg', category: 'Murukku', price: 1200.00, wholesale_price: 880.00, unit: '1kg', image_url: '/assets/garlic_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 126, name: 'Garlic Murukku 160g', slug: 'garlic-murukku-160g', description: 'Premium quality Garlic Murukku 160g', category: 'Murukku', price: 200.00, wholesale_price: 150.00, unit: '160g', image_url: '/assets/garlic_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 150'], is_active: true },
    { id: 127, name: 'Garlic Murukku 80g', slug: 'garlic-murukku-80g', description: 'Premium quality Garlic Murukku 80g', category: 'Murukku', price: 100.00, wholesale_price: 75.00, unit: '80g', image_url: '/assets/garlic_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 128, name: 'Garlic Murukku 40g', slug: 'garlic-murukku-40g', description: 'Premium quality Garlic Murukku 40g', category: 'Murukku', price: 50.00, wholesale_price: 35.00, unit: '40g', image_url: '/assets/garlic_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 129, name: 'Masala Murukku 1kg', slug: 'masala-murukku-1kg', description: 'Premium quality Masala Murukku 1kg', category: 'Murukku', price: 1200.00, wholesale_price: 880.00, unit: '1kg', image_url: '/assets/tastraa_masala_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 130, name: 'Masala Murukku 250g', slug: 'masala-murukku-250g', description: 'Premium quality Masala Murukku 250g', category: 'Murukku', price: 300.00, wholesale_price: 240.00, unit: '250g', image_url: '/assets/tastraa_masala_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 240'], is_active: true },
    { id: 131, name: 'Masala Murukku 80g', slug: 'masala-murukku-80g', description: 'Premium quality Masala Murukku 80g', category: 'Murukku', price: 100.00, wholesale_price: 75.00, unit: '80g', image_url: '/assets/tastraa_masala_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 132, name: 'Masala Murukku 40g', slug: 'masala-murukku-40g', description: 'Premium quality Masala Murukku 40g', category: 'Murukku', price: 50.00, wholesale_price: 35.00, unit: '40g', image_url: '/assets/tastraa_masala_murukku.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 133, name: 'Bites 1kg', slug: 'bites-1kg', description: 'Premium quality Bites 1kg', category: 'Bites & Chips', price: 1200.00, wholesale_price: 880.00, unit: '1kg', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 134, name: 'Bites 250g', slug: 'bites-250g', description: 'Premium quality Bites 250g', category: 'Bites & Chips', price: 300.00, wholesale_price: 240.00, unit: '250g', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 240'], is_active: true },
    { id: 135, name: 'Bites 80g', slug: 'bites-80g', description: 'Premium quality Bites 80g', category: 'Bites & Chips', price: 100.00, wholesale_price: 75.00, unit: '80g', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 136, name: 'Bites 40g', slug: 'bites-40g', description: 'Premium quality Bites 40g', category: 'Bites & Chips', price: 50.00, wholesale_price: 35.00, unit: '40g', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 137, name: 'Manioc Chips 1kg', slug: 'manioc-chips-1kg', description: 'Premium quality Manioc Chips 1kg', category: 'Bites & Chips', price: 1400.00, wholesale_price: 900.00, unit: '1kg', image_url: '/assets/tastraa_manioc_chips.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 900'], is_active: true },
    { id: 138, name: 'Manioc Chips 250g', slug: 'manioc-chips-250g', description: 'Premium quality Manioc Chips 250g', category: 'Bites & Chips', price: 350.00, wholesale_price: 300.00, unit: '250g', image_url: '/assets/tastraa_manioc_chips.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 300'], is_active: true },
    { id: 139, name: 'Manioc Chips 60g', slug: 'manioc-chips-60g', description: 'Premium quality Manioc Chips 60g', category: 'Bites & Chips', price: 100.00, wholesale_price: 75.00, unit: '60g', image_url: '/assets/tastraa_manioc_chips.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 140, name: 'Manioc Chips 30g', slug: 'manioc-chips-30g', description: 'Premium quality Manioc Chips 30g', category: 'Bites & Chips', price: 50.00, wholesale_price: 40.00, unit: '30g', image_url: '/assets/tastraa_manioc_chips.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 40'], is_active: true },
    { id: 141, name: 'Thadduvadai 1kg', slug: 'thadduvadai-1kg', description: 'Premium quality Thadduvadai 1kg', category: 'Bites & Chips', price: 1800.00, wholesale_price: 1400.00, unit: '1kg', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1400'], is_active: true },
    { id: 142, name: 'Thadduvadai 250g', slug: 'thadduvadai-250g', description: 'Premium quality Thadduvadai 250g', category: 'Bites & Chips', price: 450.00, wholesale_price: 400.00, unit: '250g', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 400'], is_active: true },
    { id: 143, name: 'Thadduvadai 60g', slug: 'thadduvadai-60g', description: 'Premium quality Thadduvadai 60g', category: 'Bites & Chips', price: 100.00, wholesale_price: 75.00, unit: '60g', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 144, name: 'Thadduvadai 30g', slug: 'thadduvadai-30g', description: 'Premium quality Thadduvadai 30g', category: 'Bites & Chips', price: 50.00, wholesale_price: 40.00, unit: '30g', image_url: '/assets/tastraa_bites.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 40'], is_active: true },
    { id: 145, name: 'Bengal Gram 1kg', slug: 'bengal-gram-1kg', description: 'Premium quality Bengal Gram 1kg', category: 'Dhal & Gram', price: 1000.00, wholesale_price: 700.00, unit: '1kg', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 700'], is_active: true },
    { id: 146, name: 'Bengal Gram 500g', slug: 'bengal-gram-500g', description: 'Premium quality Bengal Gram 500g', category: 'Dhal & Gram', price: 500.00, wholesale_price: 350.00, unit: '500g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 350'], is_active: true },
    { id: 147, name: 'Bengal Gram 250g', slug: 'bengal-gram-250g', description: 'Premium quality Bengal Gram 250g', category: 'Dhal & Gram', price: 300.00, wholesale_price: 200.00, unit: '250g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 200'], is_active: true },
    { id: 148, name: 'Bengal Gram 80g', slug: 'bengal-gram-80g', description: 'Premium quality Bengal Gram 80g', category: 'Dhal & Gram', price: 100.00, wholesale_price: 75.00, unit: '80g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 149, name: 'Bengal Gram 40g', slug: 'bengal-gram-40g', description: 'Premium quality Bengal Gram 40g', category: 'Dhal & Gram', price: 50.00, wholesale_price: 35.00, unit: '40g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 150, name: 'Bengal Gram 18g', slug: 'bengal-gram-18g', description: 'Premium quality Bengal Gram 18g', category: 'Dhal & Gram', price: 20.00, wholesale_price: 16.00, unit: '18g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 16'], is_active: true },
    { id: 151, name: 'Dhal 1kg', slug: 'dhal-1kg', description: 'Premium quality Dhal 1kg', category: 'Dhal & Gram', price: 1000.00, wholesale_price: 700.00, unit: '1kg', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 700'], is_active: true },
    { id: 152, name: 'Dhal 250g', slug: 'dhal-250g', description: 'Premium quality Dhal 250g', category: 'Dhal & Gram', price: 300.00, wholesale_price: 200.00, unit: '250g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 200'], is_active: true },
    { id: 153, name: 'Dhal 40g', slug: 'dhal-40g', description: 'Premium quality Dhal 40g', category: 'Dhal & Gram', price: 50.00, wholesale_price: 35.00, unit: '40g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 154, name: 'Dhal 18g', slug: 'dhal-18g', description: 'Premium quality Dhal 18g', category: 'Dhal & Gram', price: 20.00, wholesale_price: 16.00, unit: '18g', image_url: '/assets/bengal_gram_yellow.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 16'], is_active: true },
    { id: 155, name: 'Peanut 1kg', slug: 'peanut-1kg', description: 'Premium quality Peanut 1kg', category: 'Dhal & Gram', price: 1800.00, wholesale_price: 1300.00, unit: '1kg', image_url: '/assets/tastraa_peanut.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1300'], is_active: true },
    { id: 156, name: 'Peanut 100g', slug: 'peanut-100g', description: 'Premium quality Peanut 100g', category: 'Dhal & Gram', price: 200.00, wholesale_price: 180.00, unit: '100g', image_url: '/assets/tastraa_peanut.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 180'], is_active: true },
    { id: 157, name: 'Peanut 50g', slug: 'peanut-50g', description: 'Premium quality Peanut 50g', category: 'Dhal & Gram', price: 100.00, wholesale_price: 80.00, unit: '50g', image_url: '/assets/tastraa_peanut.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 80'], is_active: true },
    { id: 158, name: 'Chilli Powder 1kg', slug: 'chilli-powder-1kg', description: 'Premium quality Chilli Powder 1kg', category: 'Spices', price: 1400.00, wholesale_price: 1000.00, unit: '1kg', image_url: '/assets/roasted_chilli_powder_50g.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1000'], is_active: true },
    { id: 159, name: 'Chilli Powder 250g', slug: 'chilli-powder-250g', description: 'Premium quality Chilli Powder 250g', category: 'Spices', price: 350.00, wholesale_price: 250.00, unit: '250g', image_url: '/assets/roasted_chilli_powder_50g.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 160, name: 'Chilli Powder 50g', slug: 'chilli-powder-50g', description: 'Premium quality Chilli Powder 50g', category: 'Spices', price: 70.00, wholesale_price: 52.00, unit: '50g', image_url: '/assets/roasted_chilli_powder_50g.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 52'], is_active: true },
    { id: 161, name: 'Gingelly Oil 750ml', slug: 'gingelly-oil-750ml', description: 'Premium quality Gingelly Oil 750ml', category: 'Gingelly Oil', price: 1400.00, wholesale_price: 1050.00, unit: '750ml', image_url: '/assets/gingelly_oil_750ml.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1050'], is_active: true },
    { id: 162, name: 'Gingelly Oil 350ml', slug: 'gingelly-oil-350ml', description: 'Premium quality Gingelly Oil 350ml', category: 'Gingelly Oil', price: 750.00, wholesale_price: 560.00, unit: '350ml', image_url: '/assets/gingelly_oil_750ml.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 560'], is_active: true },
    { id: 163, name: 'Gingelly Oil 200ml', slug: 'gingelly-oil-200ml', description: 'Premium quality Gingelly Oil 200ml', category: 'Gingelly Oil', price: 400.00, wholesale_price: 320.00, unit: '200ml', image_url: '/assets/gingelly_oil_750ml.jpg', features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 320'], is_active: true },
  ];
};

export const queryDb = async (text, params) => {
  if (isPgConnected) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.error('⚠️ PostgreSQL query error, falling back to memory store:', err.message);
      return executeMemoryQuery(text, params);
    }
  }
  return executeMemoryQuery(text, params);
};

const executeMemoryQuery = (text, params = []) => {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes('from admins')) {
    const email = params[0]?.toString().trim().toLowerCase();
    const admin = memoryAdmins.find(a => 
      a.email.toLowerCase() === email || 
      (email === 'admin' && a.email.startsWith('admin@'))
    );
    return { rows: admin ? [admin] : [] };
  }

  if (normalized.includes('from products')) {
    let list = [...memoryProducts];
    if (normalized.includes('is_active = true') || normalized.includes('is_active = $1')) {
      list = list.filter(p => p.is_active);
    }
    if (normalized.includes('slug =')) {
      const slug = params[0];
      const prod = list.find(p => p.slug === slug);
      return { rows: prod ? [prod] : [] };
    }
    if (normalized.includes('id =')) {
      const id = parseInt(params[0], 10);
      const prod = list.find(p => p.id === id);
      return { rows: prod ? [prod] : [] };
    }
    list.sort((a, b) => b.id - a.id);
    return { rows: list };
  }

  if (normalized.includes('insert into products')) {
    const newId = memoryProducts.length ? Math.max(...memoryProducts.map(p => p.id)) + 1 : 1;
    const [name, slug, description, category, price, unit, image_url, features, is_active] = params;
    const newProduct = {
      id: newId,
      name,
      slug,
      description,
      category,
      price: parseFloat(price),
      unit,
      image_url,
      features: typeof features === 'string' ? JSON.parse(features) : features,
      is_active: is_active ?? true,
      created_at: new Date()
    };
    memoryProducts.unshift(newProduct);
    return { rows: [newProduct] };
  }

  if (normalized.includes('update products')) {
    const idParam = params[params.length - 1];
    const id = parseInt(idParam, 10);
    const prodIndex = memoryProducts.findIndex(p => p.id === id);
    if (prodIndex !== -1) {
      const [name, slug, description, category, price, unit, image_url, features, is_active] = params;
      memoryProducts[prodIndex] = {
        ...memoryProducts[prodIndex],
        name: name !== undefined ? name : memoryProducts[prodIndex].name,
        slug: slug !== undefined ? slug : memoryProducts[prodIndex].slug,
        description: description !== undefined ? description : memoryProducts[prodIndex].description,
        category: category !== undefined ? category : memoryProducts[prodIndex].category,
        price: price !== undefined ? parseFloat(price) : memoryProducts[prodIndex].price,
        unit: unit !== undefined ? unit : memoryProducts[prodIndex].unit,
        image_url: image_url !== undefined ? image_url : memoryProducts[prodIndex].image_url,
        features: features !== undefined ? (typeof features === 'string' ? JSON.parse(features) : features) : memoryProducts[prodIndex].features,
        is_active: is_active !== undefined ? is_active : memoryProducts[prodIndex].is_active,
        updated_at: new Date()
      };
      return { rows: [memoryProducts[prodIndex]] };
    }
    return { rows: [] };
  }

  if (normalized.includes('delete from products')) {
    const id = parseInt(params[0], 10);
    memoryProducts = memoryProducts.filter(p => p.id !== id);
    return { rows: [{ id }] };
  }

  if (normalized.includes('count(*)')) {
    const total = memoryProducts.length;
    const active = memoryProducts.filter(p => p.is_active).length;
    const inactive = total - active;
    return { rows: [{ total, active, inactive }] };
  }

  return { rows: [] };
};

export default pool;
