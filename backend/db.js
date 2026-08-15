import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { Pool } = pg;

// PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') 
    ? { rejectUnauthorized: false } 
    : false,
});

// Fallback in-memory/file storage if PG is unreachable
let isPgConnected = false;
let memoryProducts = [];
let memoryAdmins = [];

export const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL Database');
    isPgConnected = true;

    // Create admins table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) DEFAULT 'TASTRAA Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create products table if not exists
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

    // Ensure columns exist on existing table
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(255);`);
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS unit VARCHAR(50) DEFAULT '1kg';`);
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;`);
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;`);


    // Seed default admin if not exists
    const adminCheck = await client.query('SELECT * FROM admins WHERE email = $1', ['admin@tastraa.com']);
    if (adminCheck.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO admins (email, password, name) VALUES ($1, $2, $3)',
        ['admin@tastraa.com', hashedPassword, 'TASTRAA Admin Manager']
      );
      console.log('✅ Default Admin created (admin@tastraa.com / admin123)');
    }

    // Seed default products if empty
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
    console.warn('⚠️ PostgreSQL connection failed, activating fallback memory store:', err.message);
    isPgConnected = false;
    setupMemoryStore();
  }
};

const setupMemoryStore = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  memoryAdmins = [
    { id: 1, email: 'admin@tastraa.com', password: hashedPassword, name: 'TASTRAA Admin Manager' }
  ];
  memoryProducts = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      name: 'TASTRAA Special Rice Flour (500g)',
      slug: 'tastraa-special-rice-flour-500g',
      description: 'Convenient 500g pack of high-grade rice flour for everyday family cooking and baking. Silky smooth texture.',
      category: 'Rice Flour',
      price: 200.00,
      unit: '500g',
      image_url: 'https://images.unsplash.com/photo-1610555356070-d0efb6505f81?auto=format&fit=crop&w=800&q=80',
      features: ['Easy-to-use Pack', 'Silky Smooth Grain', 'Locally Sourced Rice', 'Strict Quality Control'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 5,
      name: 'TASTRAA Spicy Mixture Delight (250g)',
      slug: 'tastraa-spicy-mixture-delight-250g',
      description: 'Extra spicy Jaffna mixture for snack lovers. Packed with roasted cashews, fried lentils, and aromatic herbs.',
      category: 'Mixture',
      price: 350.00,
      unit: '250g',
      image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80',
      features: ['Extra Crunchy', 'Spicy Chili Blast', 'Perfect Tea-time Snack', 'Freshly Fried Daily'],
      is_active: true,
      created_at: new Date()
    },
    {
      id: 6,
      name: 'TASTRAA Pure Gingelly Oil (1 Litre)',
      slug: 'tastraa-pure-cold-pressed-gingelly-oil-1l',
      description: 'Bulk 1L bottle of 100% pure cold-pressed Gingelly Oil for commercial kitchens, catering, and food enthusiasts.',
      category: 'Gingelly Oil',
      price: 2400.00,
      unit: '1 Litre',
      image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      features: ['Economical Pack', 'Unrefined & Chemical-Free', 'Rich Golden Hue', 'Deep Authentic Flavor'],
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
      console.error('PostgreSQL Query Error:', err.message);
      throw err;
    }
  } else {
    // Fallback query emulator for memory storage
    return executeMemoryQuery(text, params);
  }
};

const executeMemoryQuery = (text, params = []) => {
  const normalized = text.trim().toLowerCase();

  // Admin login query
  if (normalized.includes('from admins where email')) {
    const email = params[0];
    const admin = memoryAdmins.find(a => a.email.toLowerCase() === email.toLowerCase());
    return { rows: admin ? [admin] : [] };
  }

  // Get all products (admin vs public)
  if (normalized.includes('from products')) {
    let list = [...memoryProducts];

    // Filter active only if specified
    if (normalized.includes('is_active = true') || normalized.includes('is_active = $1')) {
      list = list.filter(p => p.is_active);
    }

    // Filter by slug
    if (normalized.includes('slug =')) {
      const slug = params[0];
      const prod = list.find(p => p.slug === slug);
      return { rows: prod ? [prod] : [] };
    }

    // Filter by id
    if (normalized.includes('id =')) {
      const id = parseInt(params[0], 10);
      const prod = list.find(p => p.id === id);
      return { rows: prod ? [prod] : [] };
    }

    // Sorting
    list.sort((a, b) => b.id - a.id);
    return { rows: list };
  }

  // Insert Product
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
      created_at: new Date(),
      updated_at: new Date()
    };
    memoryProducts.unshift(newProduct);
    return { rows: [newProduct] };
  }

  // Update Product
  if (normalized.includes('update products')) {
    // Handling update
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

  // Delete Product
  if (normalized.includes('delete from products')) {
    const id = parseInt(params[0], 10);
    memoryProducts = memoryProducts.filter(p => p.id !== id);
    return { rows: [{ id }] };
  }

  // Stats query
  if (normalized.includes('count(*)')) {
    const total = memoryProducts.length;
    const active = memoryProducts.filter(p => p.is_active).length;
    const inactive = total - active;
    return { rows: [{ total, active, inactive }] };
  }

  return { rows: [] };
};

export default pool;
