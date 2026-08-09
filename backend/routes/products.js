import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { queryDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Multer storage setup for image uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|svg/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, webp, svg) are allowed!'));
  }
});

// Helper slug generator
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
};

// GET /api/products - Get all products (Public/Admin filter)
router.get('/', async (req, res) => {
  try {
    const { includeInactive, category, search } = req.query;
    let queryText = 'SELECT * FROM products';
    const conditions = [];
    const params = [];

    // Unless explicitly requested by admin, only return active products
    if (includeInactive !== 'true') {
      conditions.push('is_active = true');
    }

    if (category && category !== 'All') {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length})`);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY id DESC';

    const result = await queryDb(queryText, params);
    
    // Format JSON features if returned as string
    const products = result.rows.map(p => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
    }));

    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve products.' });
  }
});

// GET /api/products/slug/:slug - Get product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await queryDb('SELECT * FROM products WHERE slug = $1', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const p = result.rows[0];
    const product = {
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
    };

    return res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving product.' });
  }
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await queryDb('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const p = result.rows[0];
    const product = {
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
    };

    return res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving product.' });
  }
});

// POST /api/products/upload - Upload Product Image (Protected)
router.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded.' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  return res.json({ success: true, imageUrl });
});

// POST /api/products - Create Product (Protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, category, price, unit, image_url, features, is_active } = req.body;

    if (!name || !description || !category || price === undefined || !unit) {
      return res.status(400).json({ success: false, message: 'Missing required product fields.' });
    }

    let slug = slugify(name);
    // Ensure slug uniqueness
    const existingSlug = await queryDb('SELECT id FROM products WHERE slug = $1', [slug]);
    if (existingSlug.rows.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : (features || '[]');
    const activeBool = is_active !== undefined ? Boolean(is_active) : true;
    const finalImageUrl = image_url || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80';

    const result = await queryDb(
      `INSERT INTO products (name, slug, description, category, price, unit, image_url, features, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, slug, description, category, parseFloat(price), unit, finalImageUrl, featuresJson, activeBool]
    );

    const created = result.rows[0];
    return res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product: {
        ...created,
        features: typeof created.features === 'string' ? JSON.parse(created.features) : (created.features || [])
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ success: false, message: 'Failed to create product.' });
  }
});

// PUT /api/products/:id - Update Product (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, unit, image_url, features, is_active } = req.body;

    const checkProduct = await queryDb('SELECT * FROM products WHERE id = $1', [id]);
    if (checkProduct.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const current = checkProduct.rows[0];
    const newName = name || current.name;
    const newSlug = name ? slugify(name) : current.slug;
    const newDescription = description || current.description;
    const newCategory = category || current.category;
    const newPrice = price !== undefined ? parseFloat(price) : current.price;
    const newUnit = unit || current.unit;
    const newImageUrl = image_url || current.image_url;
    const newFeatures = Array.isArray(features) ? JSON.stringify(features) : (features !== undefined ? features : current.features);
    const newIsActive = is_active !== undefined ? Boolean(is_active) : current.is_active;

    const result = await queryDb(
      `UPDATE products 
       SET name = $1, slug = $2, description = $3, category = $4, price = $5, unit = $6, image_url = $7, features = $8, is_active = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 RETURNING *`,
      [newName, newSlug, newDescription, newCategory, newPrice, newUnit, newImageUrl, newFeatures, newIsActive, id]
    );

    const updated = result.rows[0];
    return res.json({
      success: true,
      message: 'Product updated successfully!',
      product: {
        ...updated,
        features: typeof updated.features === 'string' ? JSON.parse(updated.features) : (updated.features || [])
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
});

// DELETE /api/products/:id - Delete Product (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const checkProduct = await queryDb('SELECT id FROM products WHERE id = $1', [id]);
    if (checkProduct.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    await queryDb('DELETE FROM products WHERE id = $1', [id]);
    return res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
});

export default router;
