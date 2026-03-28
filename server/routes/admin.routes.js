const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { readDB, writeDB } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');

const formatError = (e) => e.array().map((x) => x.msg).join(', ');

// ─── Coupon Management ────────────────────────────────────────────────────────
router.get('/coupons', authenticate, authorize(2), (_req, res) => {
  const db = readDB();
  return res.json({ success: true, coupons: db.coupon || [] });
});

router.post(
  '/coupons',
  authenticate,
  authorize(2),
  [
    body('code').trim().notEmpty().withMessage('Coupon code is required'),
    body('discountPct').isFloat({ min: 1, max: 100 }).withMessage('Discount must be 1-100%'),
    body('maxUsage').optional().isInt({ min: 1 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: formatError(errors) });

    const db = readDB();
    if (!db.coupon) db.coupon = [];
    const existing = db.coupon.find((c) => c.code === req.body.code.toUpperCase());
    if (existing) return res.status(409).json({ success: false, message: 'Coupon code already exists' });

    const coupon = {
      id: db.coupon.length ? Math.max(...db.coupon.map((c) => c.id || 0)) + 1 : 1,
      code: req.body.code.toUpperCase().trim(),
      discountPct: parseFloat(req.body.discountPct),
      maxUsage: parseInt(req.body.maxUsage) || 100,
      usedCount: 0,
      isActive: true,
      expiresAt: req.body.expiresAt || null,
      createdAt: new Date().toISOString(),
    };

    db.coupon.push(coupon);
    writeDB(db);
    return res.status(201).json({ success: true, coupon });
  }
);

router.patch('/coupons/:id', authenticate, authorize(2), (req, res) => {
  const db = readDB();
  const idx = (db.coupon || []).findIndex((c) => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Coupon not found' });
  db.coupon[idx] = { ...db.coupon[idx], ...req.body, updatedAt: new Date().toISOString() };
  writeDB(db);
  return res.json({ success: true, coupon: db.coupon[idx] });
});

// ─── Validate coupon (customer use) ──────────────────────────────────────────
router.post('/coupons/validate', authenticate, (req, res) => {
  const { code, amount } = req.body;
  const db = readDB();
  const coupon = (db.coupon || []).find(
    (c) => c.code === code?.toUpperCase() && c.isActive && c.usedCount < c.maxUsage
  );
  if (!coupon) return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return res.status(400).json({ success: false, message: 'Coupon has expired' });
  }

  const discount = parseFloat(((amount * coupon.discountPct) / 100).toFixed(2));
  const finalAmount = parseFloat((amount - discount).toFixed(2));

  return res.json({ success: true, coupon, discount, finalAmount });
});

// ─── FAQ Management ───────────────────────────────────────────────────────────
router.get('/faqs', (_req, res) => {
  const db = readDB();
  return res.json({ success: true, faqs: (db.faq || []).filter((f) => f.isActive !== false) });
});

router.post(
  '/faqs',
  authenticate,
  authorize(2),
  [
    body('question').trim().notEmpty(),
    body('answer').trim().notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: formatError(errors) });

    const db = readDB();
    if (!db.faq) db.faq = [];
    const faq = {
      id: db.faq.length ? Math.max(...db.faq.map((f) => f.id || 0)) + 1 : 1,
      question: req.body.question.trim(),
      answer: req.body.answer.trim(),
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    db.faq.push(faq);
    writeDB(db);
    return res.status(201).json({ success: true, faq });
  }
);

router.patch('/faqs/:id', authenticate, authorize(2), (req, res) => {
  const db = readDB();
  const idx = (db.faq || []).findIndex((f) => f.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'FAQ not found' });
  db.faq[idx] = { ...db.faq[idx], ...req.body };
  writeDB(db);
  return res.json({ success: true, faq: db.faq[idx] });
});

// ─── Postal Code Management ───────────────────────────────────────────────────
router.get('/postal-codes', (_req, res) => {
  const db = readDB();
  return res.json({ success: true, postalCodes: db.postalcode || [] });
});

router.post('/postal-codes', authenticate, authorize(2), (req, res) => {
  const { postalCode } = req.body;
  if (!postalCode) return res.status(400).json({ success: false, message: 'Postal code is required' });

  const db = readDB();
  if (!db.postalcode) db.postalcode = [];
  if (db.postalcode.some((p) => p.code === postalCode)) {
    return res.status(409).json({ success: false, message: 'Postal code already exists' });
  }
  const entry = { id: db.postalcode.length ? Math.max(...db.postalcode.map((p) => p.id || 0)) + 1 : 1, code: postalCode };
  db.postalcode.push(entry);
  writeDB(db);
  return res.status(201).json({ success: true, entry });
});

router.delete('/postal-codes/:id', authenticate, authorize(2), (req, res) => {
  const db = readDB();
  if (!db.postalcode) return res.status(404).json({ success: false, message: 'Not found' });
  db.postalcode = db.postalcode.filter((p) => p.id !== parseInt(req.params.id));
  writeDB(db);
  return res.json({ success: true, message: 'Postal code removed' });
});

// ─── Analytics dashboard ──────────────────────────────────────────────────────
router.get('/stats', authenticate, authorize(2), (_req, res) => {
  const db = readDB();
  const bookings = db.Bookservice || [];
  const users = db.user || [];

  const stats = {
    totalBookings: bookings.length,
    newBookings: bookings.filter((b) => b.status === 'New').length,
    acceptedBookings: bookings.filter((b) => b.status === 'Accepted').length,
    completedBookings: bookings.filter((b) => b.status === 'Completed').length,
    cancelledBookings: bookings.filter((b) => b.status === 'Cancelled').length,
    totalRevenue: bookings
      .filter((b) => b.status === 'Completed')
      .reduce((sum, b) => sum + (b.EffPeyment || 0), 0)
      .toFixed(2),
    totalCustomers: users.filter((u) => u.userTypeId === 0).length,
    totalSPs: users.filter((u) => u.userTypeId === 1).length,
    activeUsers: users.filter((u) => u.status === 'Active').length,
    avgRating:
      bookings.filter((b) => b.rating).length
        ? (
            bookings.filter((b) => b.rating).reduce((s, b) => s + b.rating, 0) /
            bookings.filter((b) => b.rating).length
          ).toFixed(2)
        : '0',
  };

  return res.json({ success: true, stats });
});

// ─── Block / Unblock customers (SP-accessible) ───────────────────────────────
router.post('/block', authenticate, authorize(1), (req, res) => {
  const { customerId } = req.body;
  if (!customerId) return res.status(400).json({ success: false, message: 'customerId required' });

  const db = readDB();
  const spIdx = db.user.findIndex((u) => u.id === req.user.id);
  if (spIdx === -1) return res.status(404).json({ success: false, message: 'SP not found' });

  if (!db.user[spIdx].BlockList) db.user[spIdx].BlockList = [];
  if (!db.user[spIdx].BlockList.includes(parseInt(customerId))) {
    db.user[spIdx].BlockList.push(parseInt(customerId));
    writeDB(db);
  }
  return res.json({ success: true, message: 'Customer blocked' });
});

router.post('/unblock', authenticate, authorize(1), (req, res) => {
  const { customerId } = req.body;
  const db = readDB();
  const spIdx = db.user.findIndex((u) => u.id === req.user.id);
  if (spIdx === -1) return res.status(404).json({ success: false, message: 'SP not found' });

  db.user[spIdx].BlockList = (db.user[spIdx].BlockList || []).filter((id) => id !== parseInt(customerId));
  writeDB(db);
  return res.json({ success: true, message: 'Customer unblocked' });
});

module.exports = router;
