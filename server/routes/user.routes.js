const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { readDB, writeDB } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

const formatError = (errors) => errors.array().map((e) => e.msg).join(', ');

// ─── GET /api/users/me ────────────────────────────────────────────────────────
router.get('/me', authenticate, (req, res) => {
  const db = readDB();
  const user = db.user.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const { Password, ConfirmPassword, ...safeUser } = user;
  return res.json({ success: true, user: safeUser });
});

// ─── GET /api/users ────────────────────────────────────────────────────────
// Admin only - list all users with filters
router.get('/', authenticate, authorize(2), (req, res) => {
  const db = readDB();
  const { search, userTypeId, status, postalCode } = req.query;
  let users = db.user.map(({ Password, ConfirmPassword, ...u }) => u);

  if (search) {
    const q = search.toLowerCase();
    users = users.filter(
      (u) =>
        `${u.FirstName} ${u.LastName}`.toLowerCase().includes(q) ||
        (u.Email && u.Email.toLowerCase().includes(q)) ||
        (u.Mobile && u.Mobile.includes(q))
    );
  }
  if (userTypeId !== undefined) {
    users = users.filter((u) => u.userTypeId === parseInt(userTypeId));
  }
  if (status) {
    users = users.filter((u) => u.status === status);
  }
  if (postalCode) {
    users = users.filter((u) => u.PostalCode === postalCode);
  }

  return res.json({ success: true, count: users.length, users });
});

// ─── PATCH /api/users/:id ─────────────────────────────────────────────────────
router.patch(
  '/:id',
  authenticate,
  [
    body('Email').optional().trim().isEmail().normalizeEmail(),
    body('Mobile').optional().trim(),
    body('FirstName').optional().trim().notEmpty(),
    body('LastName').optional().trim().notEmpty(),
  ],
  (req, res) => {
    const userId = parseInt(req.params.id);
    // Users can only edit themselves; admins can edit anyone
    if (req.user.userTypeId !== 2 && req.user.id !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    const db = readDB();
    const idx = db.user.findIndex((u) => u.id === userId);
    if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' });

    const forbidden = ['Password', 'ConfirmPassword', 'userTypeId', 'id'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => !forbidden.includes(k))
    );

    db.user[idx] = { ...db.user[idx], ...updates, updatedAt: new Date().toISOString() };
    writeDB(db);

    const { Password, ConfirmPassword, ...safeUser } = db.user[idx];
    return res.json({ success: true, message: 'Profile updated', user: safeUser });
  }
);

// ─── PATCH /api/users/:id/status ─────────────────────────────────────────────
router.patch('/:id/status', authenticate, authorize(2), (req, res) => {
  const userId = parseInt(req.params.id);
  const { status } = req.body;
  if (!['Active', 'Inactive'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Status must be Active or Inactive' });
  }

  const db = readDB();
  const idx = db.user.findIndex((u) => u.id === userId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' });

  db.user[idx].status = status;
  db.user[idx].updatedAt = new Date().toISOString();
  writeDB(db);

  return res.json({ success: true, message: `User ${status.toLowerCase()}d successfully` });
});

// ─── PATCH /api/users/:id/password ───────────────────────────────────────────
router.patch(
  '/:id/password',
  authenticate,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  async (req, res) => {
    const userId = parseInt(req.params.id);
    if (req.user.id !== userId) return res.status(403).json({ success: false, message: 'Forbidden' });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    const db = readDB();
    const idx = db.user.findIndex((u) => u.id === userId);
    if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' });

    const user = db.user[idx];
    const { currentPassword, newPassword } = req.body;

    let valid = false;
    if (user.Password && user.Password.startsWith('$2')) {
      valid = await bcrypt.compare(currentPassword, user.Password);
    } else {
      valid = user.Password === currentPassword;
    }

    if (!valid) return res.status(401).json({ success: false, message: 'Current password is incorrect' });

    db.user[idx].Password = await bcrypt.hash(newPassword, 12);
    db.user[idx].ConfirmPassword = db.user[idx].Password;
    writeDB(db);

    return res.json({ success: true, message: 'Password changed successfully' });
  }
);

// ─── POST /api/users/:id/avatar ───────────────────────────────────────────────
router.post('/:id/avatar', authenticate, upload.single('avatar'), (req, res) => {
  const userId = parseInt(req.params.id);
  if (req.user.id !== userId && req.user.userTypeId !== 2) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const db = readDB();
  const idx = db.user.findIndex((u) => u.id === userId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' });

  const avatarUrl = `/uploads/${req.file.filename}`;
  db.user[idx].avatarUrl = avatarUrl;
  writeDB(db);

  return res.json({ success: true, avatarUrl });
});

module.exports = router;
