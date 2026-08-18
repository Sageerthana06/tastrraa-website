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

    // Seed initial products ONLY if products table is empty (NON-DESTRUCTIVE)
    const productCheck = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(productCheck.rows[0].count, 10) === 0) {
      const initialProducts = [
        {
          name: 'TASTRAA Premium Rice Flour (1kg)',
          slug: 'tastraa-premium-rice-flour-1kg',
          description: 'Finely ground from 100% locally sourced premium Sri Lankan rice. Ideal for String Hoppers (Idiyappam), Pittu, Dosa, and crispy Sri Lankan snacks.',
          category: 'Rice Flour',
          price: 380.00,
          unit: '1kg',
          image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
          features: ['100% Pure & Natural', 'Super Fine Texture', 'No Preservatives', 'Locally Processed in Jaffna', 'Hygienically Sealed']
        },
        {
          name: 'TASTRAA Traditional Jaffna Mixture (500g)',
          slug: 'tastraa-traditional-jaffna-mixture-500g',
          description: 'Authentic spicy and savory Jaffna mixture made with premium peanuts, fried gram, curry leaves, and secret family spice blends.',
          category: 'Mixture',
          price: 650.00,
          unit: '500g',
          image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
          features: ['Authentic Jaffna Recipe', 'Crunchy & Fresh', 'Zero Trans Fat', 'Traditional Spice Blend', 'Sealed Freshness']
        },
        {
          name: 'TASTRAA Pure Cold-Pressed Gingelly Oil (500ml)',
          slug: 'tastraa-pure-cold-pressed-gingelly-oil-500ml',
          description: 'Pure cold-pressed sesame / gingelly oil extracted from selected sesame seeds using traditional expeller methods. Rich natural aroma and healthy.',
          category: 'Gingelly Oil',
          price: 1250.00,
          unit: '500ml',
          image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
          features: ['Cold-Pressed Extraction', '100% Pure Sesame', 'Rich Natural Aroma', 'Heart-Healthy', 'Traditional Quality']
        },
        {
          name: 'TASTRAA Special Rice Flour (500g)',
          slug: 'tastraa-special-rice-flour-500g',
          description: 'Convenient 500g pack of high-grade rice flour for everyday family cooking and baking. Silky smooth texture.',
          category: 'Rice Flour',
          price: 200.00,
          unit: '500g',
          image_url: 'https://images.unsplash.com/photo-1610555356070-d0efb6505f81?auto=format&fit=crop&w=800&q=80',
          features: ['Easy-to-use Pack', 'Silky Smooth Grain', 'Locally Sourced Rice', 'Strict Quality Control']
        },
        {
          name: 'TASTRAA Spicy Mixture Delight (250g)',
          slug: 'tastraa-spicy-mixture-delight-250g',
          description: 'Extra spicy Jaffna mixture for snack lovers. Packed with roasted cashews, fried lentils, and aromatic herbs.',
          category: 'Mixture',
          price: 350.00,
          unit: '250g',
          image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80',
          features: ['Extra Crunchy', 'Spicy Chili Blast', 'Perfect Tea-time Snack', 'Freshly Fried Daily']
        },
        {
          name: 'TASTRAA Pure Gingelly Oil (1 Litre)',
          slug: 'tastraa-pure-cold-pressed-gingelly-oil-1l',
          description: 'Bulk 1L bottle of 100% pure cold-pressed Gingelly Oil for commercial kitchens, catering, and food enthusiasts.',
          category: 'Gingelly Oil',
          price: 2400.00,
          unit: '1 Litre',
          image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
          features: ['Economical Pack', 'Unrefined & Chemical-Free', 'Rich Golden Hue', 'Deep Authentic Flavor']
        },
        {
          name: 'TASTRAA Pakoda Hot & Crispy (250g)',
          slug: 'tastraa-pakoda-250g',
          description: 'Authentic spicy & crispy Pakoda snack (பகோடா) made with gram flour, sesame, omam, garlic, curry leaves, and traditional spice blends.',
          category: 'Mixture',
          price: 530.00,
          unit: '250g Pack',
          image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80',
          features: ['100% Veg', 'Hot & Crispy', 'Spicy Snack', '250g Pack', 'Traditional Recipe']
        },
        {
          name: 'TASTRAA Special Curry Powder (250g)',
          slug: 'tastraa-curry-powder-250g',
          description: 'Traditional Sri Lankan Curry Powder (கரித்தூள்) ground from red dry chilli, coriander, fennel, cumin, turmeric, curry leaves, cinnamon, cardamom, and black pepper.',
          category: 'Spices',
          price: 250.00,
          unit: '250g Pack',
          image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
          features: ['100% Pure Spices', 'Authentic Recipe', 'Rich Aroma & Flavor', 'No Preservatives']
        },
        {
          name: 'TASTRAA Crispy Bites (50g)',
          slug: 'tastraa-crispy-bites-50g',
          description: 'Crunchy savory snack bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning. Net Wt: 50g.',
          category: 'Mixture',
          price: 50.00,
          unit: '50g Pack',
          image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
          features: ['Crispy & Savory', 'Tea-time Snack', 'Spicy Seasoning', 'Pocket Friendly']
        },
        {
          name: 'TASTRAA Special Curry Powder (100g)',
          slug: 'tastraa-curry-powder-100g',
          description: 'Convenient 100g pack of authentic Jaffna curry powder (கரித்தூள்) with premium whole spices for delicious family meals.',
          category: 'Spices',
          price: 100.00,
          unit: '100g Pack',
          image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
          features: ['100g Pack', 'Authentic Jaffna Blend', '100% Natural Spices', 'Rich Curry Flavor']
        },
        {
          name: 'TASTRAA Bengal Gram (மஞ்சள் கடலை)',
          slug: 'tastraa-bengal-gram-100',
          description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) seasoned with salt. Crisp, delicious, healthy traditional roasted snack. MRP LKR 500.00.',
          category: 'Mixture',
          price: 500.00,
          unit: 'Rs 500 Pack',
          image_url: '/assets/bengal_gram_yellow.jpg',
          features: ['Roasted Yellow Gram', '100% Pure & Natural', 'Lightly Salted', 'High Protein Snack']
        },
        {
          name: 'TASTRAA Plate Dumplings (தட்டு வடை)',
          slug: 'tastraa-plate-dumplings-100',
          description: 'Authentic traditional crunchy Plate Dumplings (தட்டு வடை) made from dhal, vegetable oil, salt, and spicy red chilli powder.',
          category: 'Mixture',
          price: 100.00,
          unit: 'Rs 100 Pack',
          image_url: '/assets/plate_dumplings.jpg',
          features: ['Authentic Plate Dumplings', '100% Pure & Natural', 'Dhal, Oil, Salt & Chilli', 'Crispy Tea-time Snack']
        },
        {
          name: 'TASTRAA Bites (பைட்ஸ்)',
          slug: 'tastraa-bites-50',
          description: 'Crunchy savory snack Bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning.',
          category: 'Mixture',
          price: 50.00,
          unit: 'Rs 50 Pack',
          image_url: '/assets/bites_pack.jpg',
          features: ['Crispy Savory Bites', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Rs 50 Pocket Pack']
        },
        {
          name: 'TASTRAA Masala Murukku (மசாலா முறுக்கு)',
          slug: 'tastraa-masala-murukku-50',
          description: 'Authentic spicy & crispy Masala Murukku (மசாலா முறுக்கு) made with rice flour, urad flour, gram flour, curry leaves, and traditional spices.',
          category: 'Mixture',
          price: 50.00,
          unit: 'Rs 50 Pack',
          image_url: '/assets/masala_murukku.jpg',
          features: ['Authentic Masala Murukku', 'Crispy & Crunchy', 'Curry Leaves & Spices', '100% Veg Snack']
        }
      ];

      for (const p of initialProducts) {
        await client.query(
          `INSERT INTO products (name, slug, description, category, price, unit, image_url, features, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [p.name, p.slug, p.description, p.category, p.price, p.unit, p.image_url, JSON.stringify(p.features), true]
        );
      }
      console.log('✅ Initial TASTRAA products seeded into PostgreSQL');
    }

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
    // --- FLOUR ---
    { id: 101, name: 'Red Rice Flour 5kg (சிவப்பு அரிசி மா)', slug: 'red-rice-flour-5kg', description: '100% Pure Sri Lankan Red Rice Flour stone-milled to smooth perfection.', category: 'Flour', price: 1200.00, wholesale_price: 1140.00, unit: '5kg Sack', image_url: '/assets/red_rice_flour_5kg.jpg', features: ['100% Pure Red Rice', '5kg Woven Sack', 'Wholesale Rate: LKR 1,140'], is_active: true },
    { id: 102, name: 'Red Rice Flour 10kg (சிவப்பு அரிசி மா)', slug: 'red-rice-flour-10kg', description: '100% Pure Sri Lankan Red Rice Flour in a durable 10kg family saver sack.', category: 'Flour', price: 3000.00, wholesale_price: 2300.00, unit: '10kg Sack', image_url: '/assets/red_rice_flour_10kg.jpg', features: ['10kg Bulk Sack', 'Rich in Fiber', 'Wholesale Rate: LKR 2,300'], is_active: true },
    { id: 103, name: 'Red Rice Flour 25kg (சிவப்பு அரிசி மா)', slug: 'red-rice-flour-25kg', description: 'Heavy duty commercial 25kg bulk sack of premium red rice flour.', category: 'Flour', price: 7000.00, wholesale_price: 5600.00, unit: '25kg Sack', image_url: '/assets/red_rice_flour_25kg.png', features: ['25kg Commercial Pack', 'Strict Hygiene Quality', 'Wholesale Rate: LKR 5,600'], is_active: true },

    // --- MIXTURE ---
    { id: 201, name: 'Traditional Jaffna Mixture 1kg', slug: 'jaffna-mixture-1kg', description: 'Authentic spicy and savory Jaffna mixture with curry leaves & roasted nuts.', category: 'Mixture', price: 1200.00, wholesale_price: 880.00, unit: '1kg Pack', image_url: '/assets/bites_pack.jpg', features: ['1kg Catering Pack', 'Traditional Spiced', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 202, name: 'Traditional Jaffna Mixture 500g', slug: 'jaffna-mixture-500g', description: 'Crispy savory spicy mixture packed fresh for tea-time and celebrations.', category: 'Mixture', price: 600.00, wholesale_price: 460.00, unit: '500g Pack', image_url: '/assets/bites_pack.jpg', features: ['500g Value Pack', 'Crunchy Fresh', 'Wholesale Rate: LKR 460'], is_active: true },
    { id: 203, name: 'Traditional Jaffna Mixture 250g', slug: 'jaffna-mixture-250g', description: 'Perfect tea-time family pack of traditional Jaffna mixture.', category: 'Mixture', price: 300.00, wholesale_price: 250.00, unit: '250g Pack', image_url: '/assets/bites_pack.jpg', features: ['250g Pack', 'Spicy & Crispy', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 204, name: 'Traditional Jaffna Mixture 80g', slug: 'jaffna-mixture-80g', description: 'Convenient 80g snack pouch of authentic Jaffna mixture.', category: 'Mixture', price: 100.00, wholesale_price: 75.00, unit: '80g Pack', image_url: '/assets/bites_pack.jpg', features: ['80g Snack Pack', 'Pocket Friendly', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 205, name: 'Traditional Jaffna Mixture 40g', slug: 'jaffna-mixture-40g', description: 'Pocket-sized spicy snack pouch for quick bites on the go.', category: 'Mixture', price: 50.00, wholesale_price: 35.00, unit: '40g Pouch', image_url: '/assets/bites_pack.jpg', features: ['40g Pouch', 'Quick Snack', 'Wholesale Rate: LKR 35'], is_active: true },

    // --- PAKODA ---
    { id: 301, name: 'TASTRAA Crispy Pakoda 1kg (பகோடா)', slug: 'pakoda-1kg', description: 'Authentic hot & crispy Pakoda snack made with gram flour & curry leaves.', category: 'Pakoda', price: 1200.00, wholesale_price: 880.00, unit: '1kg Pack', image_url: '/assets/plate_dumplings.jpg', features: ['1kg Catering Pack', '100% Veg Hot & Crispy', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 302, name: 'TASTRAA Crispy Pakoda 500g (பகோடா)', slug: 'pakoda-500g', description: 'Golden crunchy pakoda snacks seasoned with authentic Jaffna spices.', category: 'Pakoda', price: 600.00, wholesale_price: 460.00, unit: '500g Pack', image_url: '/assets/plate_dumplings.jpg', features: ['500g Family Pack', 'Spicy & Crispy', 'Wholesale Rate: LKR 460'], is_active: true },
    { id: 303, name: 'TASTRAA Crispy Pakoda 250g (பகோடா)', slug: 'pakoda-250g', description: 'Savory crispy snack perfect for evening tea.', category: 'Pakoda', price: 300.00, wholesale_price: 250.00, unit: '250g Pack', image_url: '/assets/plate_dumplings.jpg', features: ['250g Pack', 'Traditional Recipe', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 304, name: 'TASTRAA Crispy Pakoda 80g (பகோடா)', slug: 'pakoda-80g', description: 'Crispy crunchy pakoda snack pouch.', category: 'Pakoda', price: 100.00, wholesale_price: 75.00, unit: '80g Pack', image_url: '/assets/plate_dumplings.jpg', features: ['80g Pouch', 'Everyday Snack', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 305, name: 'TASTRAA Crispy Pakoda 40g (பகோடா)', slug: 'pakoda-40g', description: 'Individual snack size hot & crispy pakoda pouch.', category: 'Pakoda', price: 50.00, wholesale_price: 35.00, unit: '40g Pouch', image_url: '/assets/plate_dumplings.jpg', features: ['40g Pouch', 'Pocket Pack', 'Wholesale Rate: LKR 35'], is_active: true },

    // --- GARLIC MURUKKU ---
    { id: 401, name: 'Garlic Murukku 1kg (பூண்டு முறுக்கு)', slug: 'garlic-murukku-1kg', description: 'Aromatic crunchy spiral murukku infused with fresh garlic flavor.', category: 'Murukku', price: 1200.00, wholesale_price: 880.00, unit: '1kg Pack', image_url: '/assets/masala_murukku.jpg', features: ['1kg Bulk Pack', 'Real Garlic Flavor', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 402, name: 'Garlic Murukku 160g (பூண்டு முறுக்கு)', slug: 'garlic-murukku-160g', description: 'Crispy savory garlic murukku pack for tea time.', category: 'Murukku', price: 200.00, wholesale_price: 150.00, unit: '160g Pack', image_url: '/assets/masala_murukku.jpg', features: ['160g Pack', 'Garlic Infused', 'Wholesale Rate: LKR 150'], is_active: true },
    { id: 403, name: 'Garlic Murukku 80g (பூண்டு முறுக்கு)', slug: 'garlic-murukku-80g', description: 'Aromatic garlic spiced murukku pouch.', category: 'Murukku', price: 100.00, wholesale_price: 75.00, unit: '80g Pack', image_url: '/assets/masala_murukku.jpg', features: ['80g Pouch', 'Crispy Crunch', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 404, name: 'Garlic Murukku 40g (பூண்டு முறுக்கு)', slug: 'garlic-murukku-40g', description: 'Handy pocket size garlic murukku pouch.', category: 'Murukku', price: 50.00, wholesale_price: 35.00, unit: '40g Pouch', image_url: '/assets/masala_murukku.jpg', features: ['40g Pouch', 'Pocket Friendly', 'Wholesale Rate: LKR 35'], is_active: true },

    // --- MASALA MURUKKU ---
    { id: 501, name: 'Masala Murukku 1kg (மசாலா முறுக்கு)', slug: 'masala-murukku-1kg', description: 'Spicy seasoned murukku spirals prepared with traditional spices.', category: 'Murukku', price: 1200.00, wholesale_price: 880.00, unit: '1kg Pack', image_url: '/assets/masala_murukku.jpg', features: ['1kg Catering Pack', 'Traditional Spices', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 502, name: 'Masala Murukku 250g (மசாலா முறுக்கு)', slug: 'masala-murukku-250g', description: 'Golden crunchy masala murukku for family gatherings.', category: 'Murukku', price: 300.00, wholesale_price: 240.00, unit: '250g Pack', image_url: '/assets/masala_murukku.jpg', features: ['250g Pack', 'Spicy & Crispy', 'Wholesale Rate: LKR 240'], is_active: true },
    { id: 503, name: 'Masala Murukku 80g (மசாலா முறுக்கு)', slug: 'masala-murukku-80g', description: 'Everyday crunchy masala murukku pouch.', category: 'Murukku', price: 100.00, wholesale_price: 75.00, unit: '80g Pack', image_url: '/assets/masala_murukku.jpg', features: ['80g Pouch', 'Crispy Snack', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 504, name: 'Masala Murukku 40g (மசாலா முறுக்கு)', slug: 'masala-murukku-40g', description: 'Pocket size spicy masala murukku pouch.', category: 'Murukku', price: 50.00, wholesale_price: 35.00, unit: '40g Pouch', image_url: '/assets/masala_murukku.jpg', features: ['40g Pouch', 'Quick Bite', 'Wholesale Rate: LKR 35'], is_active: true },

    // --- BITES & CHIPS ---
    { id: 601, name: 'TASTRAA Crispy Bites 1kg (பைட்ஸ்)', slug: 'bites-1kg', description: 'Savory spicy wheat flour and urad dal bites.', category: 'Bites & Chips', price: 1200.00, wholesale_price: 880.00, unit: '1kg Pack', image_url: '/assets/bites_pack.jpg', features: ['1kg Catering Pack', 'Spicy Seasoning', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 602, name: 'TASTRAA Crispy Bites 250g (பைட்ஸ்)', slug: 'bites-250g', description: 'Crispy crunchy bite-sized savory snack.', category: 'Bites & Chips', price: 300.00, wholesale_price: 240.00, unit: '250g Pack', image_url: '/assets/bites_pack.jpg', features: ['250g Pack', 'Crispy Savory', 'Wholesale Rate: LKR 240'], is_active: true },
    { id: 603, name: 'TASTRAA Crispy Bites 80g (பைட்ஸ்)', slug: 'bites-80g', description: 'Tea time favorite crunchy bite snack pouch.', category: 'Bites & Chips', price: 100.00, wholesale_price: 75.00, unit: '80g Pack', image_url: '/assets/bites_pack.jpg', features: ['80g Pouch', 'Spicy Crunch', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 604, name: 'TASTRAA Crispy Bites 40g (பைட்ஸ்)', slug: 'bites-40g', description: 'Pocket pack savory bites for on-the-go snackers.', category: 'Bites & Chips', price: 50.00, wholesale_price: 35.00, unit: '40g Pouch', image_url: '/assets/bites_pack.jpg', features: ['40g Pouch', 'Pocket Size', 'Wholesale Rate: LKR 35'], is_active: true },

    { id: 701, name: 'Thaddu Vadai 1kg (தட்டு வடை)', slug: 'thaddu-vadai-1kg', description: 'Traditional flattened crunchy lentil disk crackers.', category: 'Bites & Chips', price: 1800.00, wholesale_price: 1400.00, unit: '1kg Pack', image_url: '/assets/plate_dumplings.jpg', features: ['1kg Catering Pack', 'Traditional Recipe', 'Wholesale Rate: LKR 1,400'], is_active: true },
    { id: 702, name: 'Thaddu Vadai 250g (தட்டு வடை)', slug: 'thaddu-vadai-250g', description: 'Spicy crisp thaddu vadai disks.', category: 'Bites & Chips', price: 450.00, wholesale_price: 400.00, unit: '250g Pack', image_url: '/assets/plate_dumplings.jpg', features: ['250g Pack', 'Crispy Disks', 'Wholesale Rate: LKR 400'], is_active: true },
    { id: 703, name: 'Thaddu Vadai 60g (தட்டு வடை)', slug: 'thaddu-vadai-60g', description: 'Crispy thaddu vadai snack pouch.', category: 'Bites & Chips', price: 100.00, wholesale_price: 75.00, unit: '60g Pack', image_url: '/assets/plate_dumplings.jpg', features: ['60g Pouch', 'Savory Disks', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 704, name: 'Thaddu Vadai 30g (தட்டு வடை)', slug: 'thaddu-vadai-30g', description: 'Pocket size thaddu vadai pouch.', category: 'Bites & Chips', price: 50.00, wholesale_price: 40.00, unit: '30g Pouch', image_url: '/assets/plate_dumplings.jpg', features: ['30g Pouch', 'Pocket Friendly', 'Wholesale Rate: LKR 40'], is_active: true },

    { id: 801, name: 'Manioc Chips 1kg (மரவள்ளி கிழங்கு சிப்ஸ்)', slug: 'manioc-chips-1kg', description: 'Thinly sliced fresh tapioca / manioc roots fried crisp.', category: 'Bites & Chips', price: 1400.00, wholesale_price: 900.00, unit: '1kg Pack', image_url: '/assets/plate_dumplings.jpg', features: ['1kg Bulk Pack', 'Fresh Manioc Root', 'Wholesale Rate: LKR 900'], is_active: true },
    { id: 802, name: 'Manioc Chips 250g (மரவள்ளி கிழங்கு சிப்ஸ்)', slug: 'manioc-chips-250g', description: 'Crunchy golden manioc chips.', category: 'Bites & Chips', price: 350.00, wholesale_price: 300.00, unit: '250g Pack', image_url: '/assets/plate_dumplings.jpg', features: ['250g Pack', 'Crispy Slices', 'Wholesale Rate: LKR 300'], is_active: true },
    { id: 803, name: 'Manioc Chips 60g (மரவள்ளி கிழங்கு சிப்ஸ்)', slug: 'manioc-chips-60g', description: 'Snack pouch of crispy manioc chips.', category: 'Bites & Chips', price: 100.00, wholesale_price: 75.00, unit: '60g Pack', image_url: '/assets/plate_dumplings.jpg', features: ['60g Pouch', 'Golden Crisp', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 804, name: 'Manioc Chips 30g (மரவள்ளி கிழங்கு சிப்ஸ்)', slug: 'manioc-chips-30g', description: 'Pocket size manioc chips pouch.', category: 'Bites & Chips', price: 50.00, wholesale_price: 40.00, unit: '30g Pouch', image_url: '/assets/plate_dumplings.jpg', features: ['30g Pouch', 'Quick Crunch', 'Wholesale Rate: LKR 40'], is_active: true },

    // --- PEANUT PAKODA ---
    { id: 901, name: 'Peanut Pakoda 1kg (கடலை பகோடா)', slug: 'peanut-pakoda-1kg', description: 'Crunchy whole peanuts coated in spicy gram flour batter.', category: 'Pakoda', price: 1800.00, wholesale_price: 1400.00, unit: '1kg Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['1kg Catering Pack', 'Spicy Peanut Crunch', 'Wholesale Rate: LKR 1,400'], is_active: true },
    { id: 902, name: 'Peanut Pakoda 250g (கடலை பகோடா)', slug: 'peanut-pakoda-250g', description: 'Spicy peanut pakoda snack pack.', category: 'Pakoda', price: 450.00, wholesale_price: 400.00, unit: '250g Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['250g Pack', 'High Protein Snack', 'Wholesale Rate: LKR 400'], is_active: true },
    { id: 903, name: 'Peanut Pakoda 100g (கடலை பகோடா)', slug: 'peanut-pakoda-100g', description: 'Crispy peanut pakoda pouch for snacks.', category: 'Pakoda', price: 200.00, wholesale_price: 170.00, unit: '100g Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['100g Pouch', 'Nutty Crunch', 'Wholesale Rate: LKR 170'], is_active: true },

    // --- DHAL & GRAM ---
    { id: 1001, name: 'Roasted Dhal Snack 1kg (பருப்பு பைட்ஸ்)', slug: 'dhal-1kg', description: 'Crispy salted roasted lentils/dhal.', category: 'Dhal & Gram', price: 1000.00, wholesale_price: 700.00, unit: '1kg Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['1kg Bulk Pack', 'Roasted & Salted', 'Wholesale Rate: LKR 700'], is_active: true },
    { id: 1002, name: 'Roasted Dhal Snack 250g (பருப்பு பைட்ஸ்)', slug: 'dhal-250g', description: 'Crunchy dhal snack pack.', category: 'Dhal & Gram', price: 300.00, wholesale_price: 200.00, unit: '250g Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['250g Pack', 'High Fiber', 'Wholesale Rate: LKR 200'], is_active: true },
    { id: 1003, name: 'Roasted Dhal Snack 40g (பருப்பு பைட்ஸ்)', slug: 'dhal-40g', description: 'Small pouch of roasted crunchy dhal.', category: 'Dhal & Gram', price: 50.00, wholesale_price: 35.00, unit: '40g Pouch', image_url: '/assets/bengal_gram_yellow.jpg', features: ['40g Pouch', 'Pocket Pack', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 1004, name: 'Roasted Dhal Snack 18g (பருப்பு பைட்ஸ்)', slug: 'dhal-18g', description: 'Mini pocket pouch of roasted dhal.', category: 'Dhal & Gram', price: 20.00, wholesale_price: 16.00, unit: '18g Mini Pouch', image_url: '/assets/bengal_gram_yellow.jpg', features: ['18g Mini Pouch', 'Rs 20 Pouch', 'Wholesale Rate: LKR 16'], is_active: true },

    { id: 1101, name: 'Baby Mixture 1kg (பேபி மிக்சர்)', slug: 'baby-mixture-1kg', description: 'Mildly spiced fine noodle mixture crafted for all ages.', category: 'Mixture', price: 1200.00, wholesale_price: 880.00, unit: '1kg Pack', image_url: '/assets/bites_pack.jpg', features: ['1kg Catering Pack', 'Mild Spice Recipe', 'Wholesale Rate: LKR 880'], is_active: true },
    { id: 1102, name: 'Baby Mixture 250g (பேபி மிக்சர்)', slug: 'baby-mixture-250g', description: 'Mild crunchy family snack mixture pack.', category: 'Mixture', price: 300.00, wholesale_price: 250.00, unit: '250g Pack', image_url: '/assets/bites_pack.jpg', features: ['250g Pack', 'Fine & Mild', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 1103, name: 'Baby Mixture 80g (பேபி மிக்சர்)', slug: 'baby-mixture-80g', description: 'Pouch size mild baby mixture.', category: 'Mixture', price: 100.00, wholesale_price: 75.00, unit: '80g Pack', image_url: '/assets/bites_pack.jpg', features: ['80g Pouch', 'Mild Snack', 'Wholesale Rate: LKR 75'], is_active: true },

    { id: 1201, name: 'Roasted Bengal Gram 1kg (மஞ்சள் கடலை)', slug: 'bengal-gram-1kg', description: 'Aromatic roasted yellow Bengal Gram seasoned with salt.', category: 'Dhal & Gram', price: 1000.00, wholesale_price: 700.00, unit: '1kg Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['1kg Bulk Pack', '100% Pure Roasted Gram', 'Wholesale Rate: LKR 700'], is_active: true },
    { id: 1202, name: 'Roasted Bengal Gram 500g (மஞ்சள் கடலை)', slug: 'bengal-gram-500g', description: 'Crisp roasted yellow gram family pack.', category: 'Dhal & Gram', price: 500.00, wholesale_price: 350.00, unit: '500g Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['500g Pack', 'High Protein', 'Wholesale Rate: LKR 350'], is_active: true },
    { id: 1203, name: 'Roasted Bengal Gram 250g (மஞ்சள் கடலை)', slug: 'bengal-gram-250g', description: 'Healthy crunchy roasted gram pack.', category: 'Dhal & Gram', price: 300.00, wholesale_price: 200.00, unit: '250g Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['250g Pack', 'Salted & Crisp', 'Wholesale Rate: LKR 200'], is_active: true },
    { id: 1204, name: 'Roasted Bengal Gram 80g (மஞ்சள் கடலை)', slug: 'bengal-gram-80g', description: 'Pocket pouch roasted yellow gram.', category: 'Dhal & Gram', price: 100.00, wholesale_price: 75.00, unit: '80g Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['80g Pouch', 'Quick Protein', 'Wholesale Rate: LKR 75'], is_active: true },
    { id: 1205, name: 'Roasted Bengal Gram 40g (மஞ்சள் கடலை)', slug: 'bengal-gram-40g', description: 'Handy mini pouch roasted yellow gram.', category: 'Dhal & Gram', price: 50.00, wholesale_price: 35.00, unit: '40g Pouch', image_url: '/assets/bengal_gram_yellow.jpg', features: ['40g Pouch', 'Pocket Friendly', 'Wholesale Rate: LKR 35'], is_active: true },
    { id: 1206, name: 'Roasted Bengal Gram 18g (மஞ்சள் கடலை)', slug: 'bengal-gram-18g', description: 'Mini pocket pouch roasted gram.', category: 'Dhal & Gram', price: 20.00, wholesale_price: 16.00, unit: '18g Mini Pouch', image_url: '/assets/bengal_gram_yellow.jpg', features: ['18g Mini Pouch', 'Rs 20 Pouch', 'Wholesale Rate: LKR 16'], is_active: true },

    { id: 1301, name: 'Roasted Salted Peanuts 1kg (வேர்க்கடலை)', slug: 'peanut-1kg', description: 'Selected premium Sri Lankan peanuts roasted to crunchy perfection.', category: 'Dhal & Gram', price: 1800.00, wholesale_price: 1300.00, unit: '1kg Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['1kg Catering Pack', 'Freshly Roasted', 'Wholesale Rate: LKR 1,300'], is_active: true },
    { id: 1302, name: 'Roasted Salted Peanuts 100g (வேர்க்கடலை)', slug: 'peanut-100g', description: 'Crunchy roasted peanut snack pack.', category: 'Dhal & Gram', price: 200.00, wholesale_price: 180.00, unit: '100g Pack', image_url: '/assets/bengal_gram_yellow.jpg', features: ['100g Pack', 'Rich Flavor', 'Wholesale Rate: LKR 180'], is_active: true },
    { id: 1303, name: 'Roasted Salted Peanuts 50g (வேர்க்கடலை)', slug: 'peanut-50g', description: 'Convenient pocket size roasted peanut pouch.', category: 'Dhal & Gram', price: 100.00, wholesale_price: 80.00, unit: '50g Pouch', image_url: '/assets/bengal_gram_yellow.jpg', features: ['50g Pouch', 'Pocket Pack', 'Wholesale Rate: LKR 80'], is_active: true },

    // --- SPICES ---
    { id: 1401, name: 'Roasted Chilli Powder 1kg (வறுத்த மிளகாய்த்தூள்)', slug: 'chilli-powder-1kg', description: 'Sun-dried red Jaffna chillies slow-roasted & milled.', category: 'Spices', price: 1400.00, wholesale_price: 1000.00, unit: '1kg Pack', image_url: '/assets/roasted_chilli_powder_50g.jpg', features: ['1kg Catering Pack', 'Sun-Dried Jaffna Chillies', 'Wholesale Rate: LKR 1,000'], is_active: true },
    { id: 1402, name: 'Roasted Chilli Powder 250g (வறுத்த மிளகாய்த்தூள்)', slug: 'chilli-powder-250g', description: 'Authentic Jaffna roasted chilli powder.', category: 'Spices', price: 350.00, wholesale_price: 250.00, unit: '250g Pack', image_url: '/assets/roasted_chilli_powder_50g.jpg', features: ['250g Pack', 'Deep Fiery Color', 'Wholesale Rate: LKR 250'], is_active: true },
    { id: 1403, name: 'Roasted Chilli Powder 50g (வறுத்த மிளகாய்த்தூள்)', slug: 'chilli-powder-50g', description: 'Handy family pack of slow-roasted chilli powder.', category: 'Spices', price: 70.00, wholesale_price: 52.00, unit: '50g Pack', image_url: '/assets/roasted_chilli_powder_50g.jpg', features: ['50g Pack', 'Aromatic & Spicy', 'Wholesale Rate: LKR 52'], is_active: true },

    // --- GINGELLY OIL ---
    { id: 1501, name: 'Pure Cold-Pressed Gingelly Oil 750ml (நல்லெண்ணெய்)', slug: 'gingelly-oil-750ml', description: 'Wood-pressed 100% pure sesame oil.', category: 'Gingelly Oil', price: 1400.00, wholesale_price: 1050.00, unit: '750ml Bottle', image_url: '/assets/gingelly_oil_750ml.jpg', features: ['750ml Bottle', 'Cold-Pressed Unrefined', 'Wholesale Rate: LKR 1,050'], is_active: true },
    { id: 1502, name: 'Pure Cold-Pressed Gingelly Oil 350ml (நல்லெண்ணெய்)', slug: 'gingelly-oil-350ml', description: '100% natural cold-pressed sesame oil.', category: 'Gingelly Oil', price: 750.00, wholesale_price: 560.00, unit: '350ml Bottle', image_url: '/assets/gingelly_oil_375ml.jpg', features: ['350ml Bottle', 'Rich Aroma & Taste', 'Wholesale Rate: LKR 560'], is_active: true },
    { id: 1503, name: 'Pure Cold-Pressed Gingelly Oil 200ml (நல்லெண்ணெய்)', slug: 'gingelly-oil-200ml', description: 'Convenient 200ml bottle of authentic pure cold-pressed Gingelly oil.', category: 'Gingelly Oil', price: 400.00, wholesale_price: 320.00, unit: '200ml Bottle', image_url: '/assets/gingelly_oil_375ml.jpg', features: ['200ml Bottle', 'Pure & Unrefined', 'Wholesale Rate: LKR 320'], is_active: true }
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
