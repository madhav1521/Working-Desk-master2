const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const { readDB, writeDB } = require('../config/database');

// Razorpay is initialized lazily
let razorpay = null;
const getRazorpay = () => {
  if (razorpay) return razorpay;
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null;
  const Razorpay = require('razorpay');
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  return razorpay;
};

// ─── POST /api/payment/create-order ──────────────────────────────────────────
router.post(
  '/create-order',
  authenticate,
  [body('amount').isFloat({ min: 1 }).withMessage('Amount must be positive')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const rp = getRazorpay();
    if (!rp) {
      return res.status(503).json({
        success: false,
        message: 'Payment gateway not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env',
        demo: true,
        orderId: `demo_${Date.now()}`,
        amount: Math.round(req.body.amount * 100),
        currency: 'INR',
      });
    }

    try {
      const amountInPaise = Math.round(parseFloat(req.body.amount) * 100);
      const options = {
        amount: amountInPaise,
        currency: req.body.currency || 'INR',
        receipt: `helperland_${Date.now()}`,
        notes: { bookingId: req.body.bookingId || '' },
      };

      const order = await rp.orders.create(options);
      return res.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (err) {
      console.error('[Payment] Create order error:', err);
      return res.status(500).json({ success: false, message: 'Failed to create payment order' });
    }
  }
);

// ─── POST /api/payment/verify ─────────────────────────────────────────────────
router.post(
  '/verify',
  authenticate,
  [
    body('razorpay_order_id').notEmpty(),
    body('razorpay_payment_id').notEmpty(),
    body('razorpay_signature').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Payment verification data incomplete' });
    }

    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

      // Signature verification
      const crypto = require('crypto');
      const expectedSig = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'demo')
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const isValid = expectedSig === razorpay_signature;
      if (!isValid && process.env.NODE_ENV !== 'development') {
        return res.status(400).json({ success: false, message: 'Invalid payment signature' });
      }

      // Update booking payment status
      if (bookingId) {
        const db = readDB();
        const idx = db.Bookservice.findIndex((b) => b.id === parseInt(bookingId));
        if (idx !== -1) {
          db.Bookservice[idx].paymentStatus = 'Paid';
          db.Bookservice[idx].paymentId = razorpay_payment_id;
          db.Bookservice[idx].paymentOrderId = razorpay_order_id;
          db.Bookservice[idx].updatedAt = new Date().toISOString();
          writeDB(db);
        }
      }

      return res.json({ success: true, message: 'Payment verified successfully', paymentId: razorpay_payment_id });
    } catch (err) {
      console.error('[Payment] Verify error:', err);
      return res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
  }
);

// ─── GET /api/payment/config ──────────────────────────────────────────────────
router.get('/config', (_req, res) => {
  return res.json({
    success: true,
    configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
    keyId: process.env.RAZORPAY_KEY_ID || null,
  });
});

module.exports = router;
