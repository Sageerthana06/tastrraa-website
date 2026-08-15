import express from 'express';
import { queryDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/stats (Protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await queryDb('SELECT * FROM products');
    const products = result.rows;
    const total = products.length;
    const active = products.filter(p => p.is_active).length;
    const inactive = total - active;

    const categoryBreakdown = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});

    return res.json({
      success: true,
      stats: {
        total,
        active,
        inactive,
        categoryBreakdown
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch statistics.' });
  }
});

export default router;
