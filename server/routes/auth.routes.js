const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { readDB, writeDB } = require('../config/database');
const { signToken } = require('../middleware/auth');
const { sendPasswordReset } = require('../services/email.service');

// ─── Helpers ────────────────────────────────────────────────────────────────
const findUser = (db, email) =>
  db.user.find((u) => u.Email && u.Email.toLowerCase() === email.toLowerCase());

const formatError = (errors) => errors.array().map((e) => e.msg).join(', ');

// ─── POST /api/auth/register ─────────────────────────────────────────────────
router.post(
  '/register',
  [
    body('FirstName').trim().notEmpty().withMessage('First name is required'),
    body('LastName').trim().notEmpty().withMessage('Last name is required'),
    body('Email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('Mobile').trim().notEmpty().withMessage('Mobile is required'),
    body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('ConfirmPassword').custom((val, { req }) => {
      if (val !== req.body.Password) throw new Error('Passwords do not match');
      return true;
    }),
    body('userTypeId').optional().isIn([0, 1]).withMessage('Invalid user type'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    try {
      const db = readDB();
      const { FirstName, LastName, Email, Mobile, Password, userTypeId = 0 } = req.body;

      if (findUser(db, Email)) {
        return res.status(409).json({ success: false, message: 'Email already registered' });
      }

      const passwordHash = await bcrypt.hash(Password, 12);
      const newUser = {
        id: db.user.length ? Math.max(...db.user.map((u) => u.id || 0)) + 1 : 1,
        FirstName: FirstName.trim(),
        LastName: LastName.trim(),
        Email: Email.toLowerCase().trim(),
        Mobile,
        Password: passwordHash,
        ConfirmPassword: passwordHash,
        userTypeId: parseInt(userTypeId),
        status: 'Active',
        createdAt: new Date().toISOString(),
      };

      db.user.push(newUser);
      writeDB(db);

      const token = signToken({ id: newUser.id, Email: newUser.Email, userTypeId: newUser.userTypeId });
      const { Password: _, ConfirmPassword: __, ...safeUser } = newUser;

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: safeUser,
      });
    } catch (err) {
      console.error('[Register]', err);
      return res.status(500).json({ success: false, message: 'Server error during registration' });
    }
  }
);

// ─── POST /api/auth/login ────────────────────────────────────────────────────
router.post(
  '/login',
  [
    body('Email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('Password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    try {
      const db = readDB();
      const { Email, Password } = req.body;
      const user = findUser(db, Email);

      if (!user) {
        return res.status(404).json({ success: false, message: 'Email address not registered. Please create an account.' });
      }
      if (user.status === 'Inactive') {
        return res.status(403).json({ success: false, message: 'Account is deactivated. Please contact support.' });
      }

      // Support both bcrypt-hashed (new) and plain-text (legacy) passwords
      let passwordValid = false;
      if (user.Password && user.Password.startsWith('$2')) {
        passwordValid = await bcrypt.compare(Password, user.Password);
      } else {
        passwordValid = user.Password === Password;
        // Migrate plain-text password to bcrypt on successful login
        if (passwordValid) {
          const idx = db.user.findIndex((u) => u.id === user.id);
          db.user[idx].Password = await bcrypt.hash(Password, 12);
          db.user[idx].ConfirmPassword = db.user[idx].Password;
          writeDB(db);
        }
      }

      if (!passwordValid) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const token = signToken({ id: user.id, Email: user.Email, userTypeId: user.userTypeId });
      const { Password: _, ConfirmPassword: __, ...safeUser } = user;

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: safeUser,
      });
    } catch (err) {
      console.error('[Login]', err);
      return res.status(500).json({ success: false, message: 'Server error during login' });
    }
  }
);

// ─── POST /api/auth/forgot-password ─────────────────────────────────────────
router.post(
  '/forgot-password',
  [body('Email').trim().isEmail().withMessage('Valid email is required').normalizeEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    try {
      const db = readDB();
      const { Email } = req.body;
      const user = findUser(db, Email);

      if (!user) {
        // Security: don't reveal whether email exists
        return res.json({ success: true, message: 'If this email is registered, a reset link has been sent.' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expireTime = Date.now() + 600_000; // 10 min

      if (!db.forgotPasswordLink) db.forgotPasswordLink = [];
      db.forgotPasswordLink.push({ token, ExpireTime: expireTime, Email: user.Email });
      writeDB(db);

      try {
        await sendPasswordReset(user.Email, token);
      } catch {
        // Email sending failed, but still respond positively
      }

      return res.json({ success: true, message: 'Password reset link sent to your email' });
    } catch (err) {
      console.error('[ForgotPassword]', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ─── POST /api/auth/reset-password ──────────────────────────────────────────
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('NewPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    try {
      const db = readDB();
      const { token, NewPassword } = req.body;
      const link = (db.forgotPasswordLink || []).find((l) => l.token === token);

      if (!link || link.ExpireTime < Date.now()) {
        return res.status(401).json({ success: false, message: 'Reset link is invalid or expired' });
      }

      const userIdx = db.user.findIndex((u) => u.Email === link.Email);
      if (userIdx === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const hashed = await bcrypt.hash(NewPassword, 12);
      db.user[userIdx].Password = hashed;
      db.user[userIdx].ConfirmPassword = hashed;
      db.forgotPasswordLink = db.forgotPasswordLink.filter((l) => l.token !== token);
      writeDB(db);

      return res.json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
      console.error('[ResetPassword]', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ─── Legacy compat: POST /account/forgotpassword/ ───────────────────────────
router.post('/legacy/forgot', async (req, res) => {
  req.body.Email = req.body.Email || req.body.email;
  // Forward to new handler logic
  const db = readDB();
  const email = req.body.Email;
  if (!email) return res.status(400).json('Email is required');
  const user = findUser(db, email);
  if (!user) return res.status(400).json('Email is not registerd');
  const token = crypto.randomBytes(32).toString('hex');
  const expireTime = Date.now() + 600_000;
  if (!db.forgotPasswordLink) db.forgotPasswordLink = [];
  db.forgotPasswordLink.push({ token, ExpireTime: expireTime, Email: user.Email });
  writeDB(db);
  try { await sendPasswordReset(user.Email, token); } catch {}
  return res.json('Sent');
});

module.exports = router;
