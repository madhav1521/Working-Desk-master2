require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ─── CORS ──────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true,
}));

// ─── Body parsers ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Static files (uploads) ────────────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOAD_DIR));

// ─── Health check ──────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ─── API Routes ────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/payment', require('./routes/payment.routes'));

// ─── Legacy JSON-Server compatibility routes ────────────────────────────────
// These maintain backward compatibility for any frontend calls still using
// the old /user, /Bookservice, /account/* endpoints.
const { readDB, writeDB } = require('./config/database');
const crypto = require('crypto');
const { sendPasswordReset } = require('./services/email.service');

// Legacy: GET/POST /user
app.get('/user', (req, res) => {
  const db = readDB();
  let users = db.user.map(({ Password, ConfirmPassword, ...u }) => u);
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    users = users.filter((u) =>
      (u.Email && u.Email.toLowerCase().includes(q)) ||
      `${u.FirstName} ${u.LastName}`.toLowerCase().includes(q)
    );
  }
  // Allow filtering by any field
  Object.keys(req.query).forEach((key) => {
    if (key !== 'q' && key !== '_limit' && key !== '_page') {
      users = users.filter((u) => String(u[key]) === String(req.query[key]));
    }
  });
  return res.json(users);
});

app.post('/user', async (req, res) => {
  const bcrypt = require('bcryptjs');
  const db = readDB();
  const existing = db.user.find((u) => u.Email && u.Email.toLowerCase() === (req.body.Email || '').toLowerCase());
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  let password = req.body.Password;
  if (password && !password.startsWith('$2')) {
    password = await bcrypt.hash(password, 12);
  }

  const newUser = {
    ...req.body,
    Password: password,
    ConfirmPassword: password,
    id: db.user.length ? Math.max(...db.user.map((u) => u.id || 0)) + 1 : 1,
    createdAt: new Date().toISOString(),
  };
  db.user.push(newUser);
  writeDB(db);
  const { Password, ConfirmPassword, ...safe } = newUser;
  return res.status(201).json(safe);
});

app.patch('/user/:id', (req, res) => {
  const db = readDB();
  const idx = db.user.findIndex((u) => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.user[idx] = { ...db.user[idx], ...req.body };
  writeDB(db);
  const { Password, ConfirmPassword, ...safe } = db.user[idx];
  return res.json(safe);
});

// Legacy: GET/POST/PATCH /Bookservice
app.get('/Bookservice', (req, res) => {
  const db = readDB();
  let bookings = [...(db.Bookservice || [])];
  Object.keys(req.query).forEach((key) => {
    if (key !== '_limit' && key !== '_page') {
      bookings = bookings.filter((b) => String(b[key]) === String(req.query[key]));
    }
  });
  return res.json(bookings);
});

app.post('/Bookservice', (req, res) => {
  const db = readDB();
  if (!db.Bookservice) db.Bookservice = [];
  const booking = {
    ...req.body,
    id: db.Bookservice.length ? Math.max(...db.Bookservice.map((b) => b.id || 0)) + 1 : 1,
    bookedAt: new Date().toISOString(),
  };
  db.Bookservice.push(booking);
  writeDB(db);
  return res.status(201).json(booking);
});

app.patch('/Bookservice/:id', (req, res) => {
  const db = readDB();
  const idx = (db.Bookservice || []).findIndex((b) => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.Bookservice[idx] = { ...db.Bookservice[idx], ...req.body, updatedAt: new Date().toISOString() };
  writeDB(db);
  return res.json(db.Bookservice[idx]);
});

// Legacy: GET/POST /address
app.get('/address', (req, res) => {
  const db = readDB();
  let addrs = db.address || [];
  if (req.query.userId) addrs = addrs.filter((a) => String(a.userId) === String(req.query.userId));
  return res.json(addrs);
});

app.post('/address', (req, res) => {
  const db = readDB();
  if (!db.address) db.address = [];
  const addr = {
    ...req.body,
    id: db.address.length ? Math.max(...db.address.map((a) => a.id || 0)) + 1 : 1,
    createdAt: new Date().toISOString(),
  };
  db.address.push(addr);
  writeDB(db);
  return res.status(201).json(addr);
});

app.patch('/address/:id', (req, res) => {
  const db = readDB();
  const idx = (db.address || []).findIndex((a) => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.address[idx] = { ...db.address[idx], ...req.body };
  writeDB(db);
  return res.json(db.address[idx]);
});

app.delete('/address/:id', (req, res) => {
  const db = readDB();
  db.address = (db.address || []).filter((a) => a.id !== parseInt(req.params.id));
  writeDB(db);
  return res.json({ success: true });
});

// Legacy: forgot password
app.post('/account/forgotpassword/', async (req, res) => {
  const db = readDB();
  const email = req.body.Email;
  if (!db.user.find((u) => u.Email === email)) {
    return res.status(400).json('Email is not registerd');
  }
  const token = crypto.randomBytes(32).toString('hex');
  const ExpireTime = Date.now() + 600_000;
  if (!db.forgotPasswordLink) db.forgotPasswordLink = [];
  db.forgotPasswordLink.push({ token, ExpireTime, Email: email });
  writeDB(db);
  try { await sendPasswordReset(email, token); } catch {}
  return res.json('Sent');
});

app.post('/account/validateResetPasswordLink', async (req, res) => {
  const bcrypt = require('bcryptjs');
  const db = readDB();
  const { token, NewPassword } = req.body;
  const link = (db.forgotPasswordLink || []).find((l) => l.token === token);
  if (!link || link.ExpireTime < Date.now()) {
    return res.status(401).json({ error: 'Link is invalid or expired' });
  }
  const userIdx = db.user.findIndex((u) => u.Email === link.Email);
  if (userIdx === -1) return res.status(404).json({ error: 'User not found' });
  db.user[userIdx].Password = await bcrypt.hash(NewPassword, 12);
  db.user[userIdx].ConfirmPassword = db.user[userIdx].Password;
  db.forgotPasswordLink = db.forgotPasswordLink.filter((l) => l.token !== token);
  writeDB(db);
  return res.json({ message: 'Password reset succesfuly' });
});

// Legacy: newsletter
app.get('/newsletter', (_req, res) => {
  const db = readDB();
  return res.json(db.newsletter || []);
});
app.post('/newsletter', (req, res) => {
  const db = readDB();
  if (!db.newsletter) db.newsletter = [];
  const entry = { ...req.body, id: db.newsletter.length ? Math.max(...db.newsletter.map((n) => n.id || 0)) + 1 : 1, subscribedAt: new Date().toISOString() };
  db.newsletter.push(entry);
  writeDB(db);
  return res.status(201).json(entry);
});

// ─── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ─── Global error handler ──────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, message: 'File too large. Max 5MB allowed.' });
  }
  return res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Helperland Server running on http://localhost:${PORT}`);
  console.log(`   Mode    : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Database: ${process.env.USE_POSTGRES === 'true' ? 'PostgreSQL' : 'JSON file (db.json)'}`);
  console.log(`   JWT     : enabled`);
  console.log(`   Email   : ${process.env.EMAIL_USER ? 'configured' : 'not configured'}`);
  console.log(`   SMS     : ${process.env.TWILIO_ACCOUNT_SID ? 'configured' : 'not configured'}`);
  console.log(`   Razorpay: ${process.env.RAZORPAY_KEY_ID ? 'configured' : 'demo mode'}\n`);
});
