const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'helperland_secret';

/**
 * Verify JWT token from Authorization header or x-auth-token header.
 * Attaches decoded payload to req.user.
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

/**
 * Role-based guard. Pass allowed userTypeId values.
 * 0 = Customer, 1 = Service Provider, 2 = Admin
 */
const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.userTypeId)) {
    return res.status(403).json({ success: false, message: 'Forbidden: insufficient permissions.' });
  }
  next();
};

const signToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

module.exports = { authenticate, authorize, signToken };
