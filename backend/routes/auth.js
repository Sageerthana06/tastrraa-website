import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { queryDb } from '../db.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.toString().trim().toLowerCase();
    const cleanPassword = password.toString().trim();

    console.log(`🔑 Processing login attempt for: ${cleanEmail}`);

    const result = await queryDb('SELECT * FROM admins WHERE LOWER(email) = LOWER($1)', [cleanEmail]);
    if (result.rows.length === 0) {
      console.log(`🔒 Login failed: Admin email not found in database (${cleanEmail})`);
      return res.status(401).json({ success: false, message: 'Invalid admin email or password.' });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(cleanPassword, admin.password);

    if (!isMatch) {
      console.log(`🔒 Login failed: Password mismatch for admin (${cleanEmail})`);
      return res.status(401).json({ success: false, message: 'Invalid admin email or password.' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET || 'tastraa_jwt_secret_key_2026_secure',
      { expiresIn: '24h' }
    );

    console.log(`✅ Admin login successful for: ${cleanEmail}`);

    return res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    console.error('Login route error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
});

export default router;
