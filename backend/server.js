import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import statsRoutes from './routes/stats.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Security & Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lazy Database Initialization Middleware for Serverless
let dbInitPromise = null;
app.use(async (req, res, next) => {
  if (!dbInitPromise) {
    dbInitPromise = initDb().catch(err => {
      console.error('Database initialization error:', err);
    });
  }
  await dbInitPromise;
  next();
});

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', company: 'TASTRAA (PVT) LTD', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/ai', aiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Backend Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Local listener
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 TASTRAA Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
