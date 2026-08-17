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
    {
      id: 1,
      name: 'TASTRAA Pakoda Hot & Crispy (250g)',
      slug: 'tastraa-pakoda-250g',
      description: 'Authentic spicy & crispy Pakoda snack (பகோடா) made with gram flour, sesame, omam, garlic, curry leaves, and traditional spice blends.',
      category: 'Mixture',
      price: 530.00,
      unit: '250g Pack',
      image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80',
      features: ['100% Veg', 'Hot & Crispy', 'Spicy Snack', '250g Pack', 'Traditional Recipe'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 2,
      name: 'TASTRAA Special Curry Powder (250g)',
      slug: 'tastraa-curry-powder-250g',
      description: 'Traditional Sri Lankan Curry Powder (கரித்தூள்) ground from red dry chilli, coriander, fennel, cumin, turmeric, curry leaves, cinnamon, cardamom, and black pepper.',
      category: 'Spices',
      price: 250.00,
      unit: '250g Pack',
      image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      features: ['100% Pure Spices', 'Authentic Recipe', 'Rich Aroma & Flavor', 'No Preservatives'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 3,
      name: 'TASTRAA Crispy Bites (50g)',
      slug: 'tastraa-crispy-bites-50g',
      description: 'Crunchy savory snack bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning. Net Wt: 50g.',
      category: 'Mixture',
      price: 50.00,
      unit: '50g Pack',
      image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
      features: ['Crispy & Savory', 'Tea-time Snack', 'Spicy Seasoning', 'Pocket Friendly'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 4,
      name: 'TASTRAA Special Curry Powder (100g)',
      slug: 'tastraa-curry-powder-100g',
      description: 'Convenient 100g pack of authentic Jaffna curry powder (கரித்தூள்) with premium whole spices for delicious family meals.',
      category: 'Spices',
      price: 100.00,
      unit: '100g Pack',
      image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      features: ['100g Pack', 'Authentic Jaffna Blend', '100% Natural Spices', 'Rich Curry Flavor'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 5,
      name: 'TASTRAA Premium Rice Flour (1kg)',
      slug: 'tastraa-premium-rice-flour-1kg',
      description: 'Finely ground from 100% locally sourced premium Sri Lankan rice. Ideal for String Hoppers (Idiyappam), Pittu, Dosa, and crispy Sri Lankan snacks.',
      category: 'Rice Flour',
      price: 380.00,
      unit: '1kg',
      image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      features: ['100% Pure & Natural', 'Super Fine Texture', 'No Preservatives', 'Locally Processed in Jaffna', 'Hygienically Sealed'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 6,
      name: 'TASTRAA Traditional Jaffna Mixture (500g)',
      slug: 'tastraa-traditional-jaffna-mixture-500g',
      description: 'Authentic spicy and savory Jaffna mixture made with premium peanuts, fried gram, curry leaves, and secret family spice blends.',
      category: 'Mixture',
      price: 650.00,
      unit: '500g',
      image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
      features: ['Authentic Jaffna Recipe', 'Crunchy & Fresh', 'Zero Trans Fat', 'Traditional Spice Blend', 'Sealed Freshness'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 7,
      name: 'TASTRAA Pure Cold-Pressed Gingelly Oil (500ml)',
      slug: 'tastraa-pure-cold-pressed-gingelly-oil-500ml',
      description: 'Pure cold-pressed sesame / gingelly oil extracted from selected sesame seeds using traditional expeller methods. Rich natural aroma and healthy.',
      category: 'Gingelly Oil',
      price: 1250.00,
      unit: '500ml',
      image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      features: ['Cold-Pressed Extraction', '100% Pure Sesame', 'Rich Natural Aroma', 'Heart-Healthy', 'Traditional Quality'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 8,
      name: 'TASTRAA Bengal Gram (மஞ்சள் கடலை)',
      slug: 'tastraa-bengal-gram-100',
      description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) seasoned with salt. Crisp, delicious, healthy traditional roasted snack. MRP LKR 500.00.',
      category: 'Mixture',
      price: 500.00,
      unit: 'Rs 500 Pack',
      image_url: '/assets/bengal_gram_yellow.jpg',
      features: ['Roasted Yellow Gram', '100% Pure & Natural', 'Lightly Salted', 'High Protein Snack'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 9,
      name: 'TASTRAA Plate Dumplings (தட்டு வடை)',
      slug: 'tastraa-plate-dumplings-100',
      description: 'Authentic traditional crunchy Plate Dumplings (தட்டு வடை) made from dhal, vegetable oil, salt, and spicy red chilli powder.',
      category: 'Mixture',
      price: 100.00,
      unit: 'Rs 100 Pack',
      image_url: '/assets/plate_dumplings.jpg',
      features: ['Authentic Plate Dumplings', '100% Pure & Natural', 'Dhal, Oil, Salt & Chilli', 'Crispy Tea-time Snack'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 10,
      name: 'TASTRAA Bites (பைட்ஸ்)',
      slug: 'tastraa-bites-50',
      description: 'Crunchy savory snack Bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning.',
      category: 'Mixture',
      price: 50.00,
      unit: 'Rs 50 Pack',
      image_url: '/assets/bites_pack.jpg',
      features: ['Crispy Savory Bites', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Rs 50 Pocket Pack'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 11,
      name: 'TASTRAA Masala Murukku (மசாலா முறுக்கு)',
      slug: 'tastraa-masala-murukku-50',
      description: 'Authentic spicy & crispy Masala Murukku (மசாலா முறுக்கு) made with rice flour, urad flour, gram flour, curry leaves, and traditional spices.',
      category: 'Mixture',
      price: 50.00,
      unit: 'Rs 50 Pack',
      image_url: '/assets/masala_murukku.jpg',
      features: ['Authentic Masala Murukku', 'Crispy & Crunchy', 'Curry Leaves & Spices', '100% Veg Snack'],
      is_active: true,
      created_at: new Date()
    }
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
