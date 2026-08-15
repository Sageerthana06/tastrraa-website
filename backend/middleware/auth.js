import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.trim().split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required. Please login.' });
  }

  jwt.verify(token.trim(), process.env.JWT_SECRET || 'tastraa_jwt_secret_key_2026_secure', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired authentication token.' });
    }
    req.user = user;
    next();
  });
};
