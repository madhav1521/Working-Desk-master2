const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const { readDB, writeDB } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const { sendBookingConfirmation, sendBookingRescheduled } = require('../services/email.service');
const { sendBookingConfirmationSMS } = require('../services/sms.service');
const upload = require('../middleware/upload');

const formatError = (e) => e.array().map((x) => x.msg).join(', ');

// ─── Conflict checker: does SP already have a booking at the same date/time? ─
const hasConflict = (db, spId, date, time, excludeId = null) =>
  db.Bookservice.some(
    (b) =>
      b.spId === spId &&
      b.Datee === date &&
      b.Time === time &&
      b.status === 'Accepted' &&
      b.id !== excludeId
  );

// ─── GET /api/bookings ────────────────────────────────────────────────────────
router.get('/', authenticate, (req, res) => {
  const db = readDB();
  const { status, customerId, spId, postalCode, search, from, to, page = 1, limit = 20 } = req.query;
  let bookings = [...(db.Bookservice || [])];

  // Role-based scoping
  if (req.user.userTypeId === 0) {
    bookings = bookings.filter((b) => b.customerId === req.user.id);
  } else if (req.user.userTypeId === 1) {
    // SP sees their own bookings; "new" requests filtered by postal code elsewhere
  }

  if (status) bookings = bookings.filter((b) => b.status === status);
  if (customerId) bookings = bookings.filter((b) => b.customerId === parseInt(customerId));
  if (spId) bookings = bookings.filter((b) => b.spId === parseInt(spId));
  if (postalCode) bookings = bookings.filter((b) => b.Postalcode === postalCode || b.postalCode === postalCode);
  if (from) bookings = bookings.filter((b) => new Date(b.Datee) >= new Date(from));
  if (to) bookings = bookings.filter((b) => new Date(b.Datee) <= new Date(to));
  if (search) {
    const q = search.toLowerCase();
    bookings = bookings.filter(
      (b) =>
        String(b.ServiceId).includes(q) ||
        (b.ServiceAddress && b.ServiceAddress.toLowerCase().includes(q))
    );
  }

  const total = bookings.length;
  const start = (parseInt(page) - 1) * parseInt(limit);
  const paginated = bookings.slice(start, start + parseInt(limit));

  return res.json({ success: true, total, page: parseInt(page), limit: parseInt(limit), bookings: paginated });
});

// ─── GET /api/bookings/available (SP: new requests in their postal code) ──────
router.get('/available', authenticate, authorize(1), (req, res) => {
  const db = readDB();
  const spUser = db.user.find((u) => u.id === req.user.id);
  if (!spUser) return res.status(404).json({ success: false, message: 'SP not found' });

  const spPostal = spUser.PostalCode;
  const blockedCustomers = spUser.BlockList || [];

  let bookings = (db.Bookservice || []).filter(
    (b) =>
      b.status === 'New' &&
      (b.Postalcode === spPostal || b.postalCode === spPostal) &&
      !blockedCustomers.includes(b.customerId)
  );

  return res.json({ success: true, bookings });
});

// ─── POST /api/bookings ───────────────────────────────────────────────────────
router.post(
  '/',
  authenticate,
  authorize(0, 2),
  [
    body('Rooms').isInt({ min: 0 }).withMessage('Rooms must be a number'),
    body('Bath').isInt({ min: 0 }).withMessage('Bath must be a number'),
    body('Datee').notEmpty().withMessage('Date is required'),
    body('Time').notEmpty().withMessage('Time is required'),
    body('ServiceHours').isFloat({ min: 0.5 }).withMessage('Service hours required'),
    body('ServiceAddress').notEmpty().withMessage('Address is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    try {
      const db = readDB();
      if (!db.Bookservice) db.Bookservice = [];

      const serviceId = Date.now();
      const newBooking = {
        id: db.Bookservice.length ? Math.max(...db.Bookservice.map((b) => b.id || 0)) + 1 : 1,
        ServiceId: serviceId,
        customerId: req.user.id,
        spId: null,
        status: 'New',
        bookedAt: new Date().toISOString(),
        ...req.body,
      };

      // Payment validation
      newBooking.Payment = parseFloat((newBooking.Totaltime * 20).toFixed(2));
      newBooking.EffPeyment = parseFloat((newBooking.Payment * 0.8).toFixed(2));

      db.Bookservice.push(newBooking);
      writeDB(db);

      // Async notifications (don't block response)
      const customer = db.user.find((u) => u.id === req.user.id);
      if (customer) {
        sendBookingConfirmation(customer.Email, newBooking).catch(() => {});
        if (customer.Mobile) sendBookingConfirmationSMS(customer.Mobile, newBooking).catch(() => {});
      }

      return res.status(201).json({ success: true, message: 'Booking created successfully', booking: newBooking });
    } catch (err) {
      console.error('[CreateBooking]', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ─── PATCH /api/bookings/:id/accept (SP accepts) ─────────────────────────────
router.patch('/:id/accept', authenticate, authorize(1), (req, res) => {
  const bookingId = parseInt(req.params.id);
  const db = readDB();
  const idx = db.Bookservice.findIndex((b) => b.id === bookingId);

  if (idx === -1) return res.status(404).json({ success: false, message: 'Booking not found' });
  const booking = db.Bookservice[idx];

  if (booking.status !== 'New') {
    return res.status(400).json({ success: false, message: 'Booking is no longer available' });
  }
  if (hasConflict(db, req.user.id, booking.Datee, booking.Time, bookingId)) {
    return res.status(409).json({ success: false, message: 'Schedule conflict: you already have a booking at this time' });
  }

  db.Bookservice[idx] = { ...booking, status: 'Accepted', spId: req.user.id, updatedAt: new Date().toISOString() };
  writeDB(db);

  return res.json({ success: true, message: 'Booking accepted', booking: db.Bookservice[idx] });
});

// ─── PATCH /api/bookings/:id/cancel ──────────────────────────────────────────
router.patch('/:id/cancel', authenticate, (req, res) => {
  const bookingId = parseInt(req.params.id);
  const db = readDB();
  const idx = db.Bookservice.findIndex((b) => b.id === bookingId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Booking not found' });

  const booking = db.Bookservice[idx];
  const { userTypeId, id } = req.user;

  // Customers can only cancel own bookings; SPs their accepted bookings; admin any
  if (userTypeId === 0 && booking.customerId !== id) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  if (userTypeId === 1 && booking.spId !== id) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  if (['Completed', 'Cancelled'].includes(booking.status)) {
    return res.status(400).json({ success: false, message: `Cannot cancel a ${booking.status} booking` });
  }

  db.Bookservice[idx] = {
    ...booking,
    status: 'Cancelled',
    cancellationReason: req.body.reason || '',
    updatedAt: new Date().toISOString(),
  };
  writeDB(db);

  return res.json({ success: true, message: 'Booking cancelled', booking: db.Bookservice[idx] });
});

// ─── PATCH /api/bookings/:id/complete ─────────────────────────────────────────
router.patch('/:id/complete', authenticate, authorize(1, 2), (req, res) => {
  const bookingId = parseInt(req.params.id);
  const db = readDB();
  const idx = db.Bookservice.findIndex((b) => b.id === bookingId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Booking not found' });

  if (db.Bookservice[idx].status !== 'Accepted') {
    return res.status(400).json({ success: false, message: 'Only Accepted bookings can be completed' });
  }

  db.Bookservice[idx] = { ...db.Bookservice[idx], status: 'Completed', updatedAt: new Date().toISOString() };
  writeDB(db);

  return res.json({ success: true, message: 'Booking marked as completed', booking: db.Bookservice[idx] });
});

// ─── PATCH /api/bookings/:id/rate ─────────────────────────────────────────────
router.patch(
  '/:id/rate',
  authenticate,
  authorize(0),
  [
    body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim().isLength({ max: 500 }),
  ],
  (req, res) => {
    const bookingId = parseInt(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    const db = readDB();
    const idx = db.Bookservice.findIndex((b) => b.id === bookingId);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Booking not found' });

    const booking = db.Bookservice[idx];
    if (booking.customerId !== req.user.id) return res.status(403).json({ success: false, message: 'Forbidden' });
    if (booking.status !== 'Completed') return res.status(400).json({ success: false, message: 'Can only rate completed bookings' });

    db.Bookservice[idx] = {
      ...booking,
      rating: parseFloat(req.body.rating),
      SpComment: req.body.comment || '',
      status: 'Rated',
      updatedAt: new Date().toISOString(),
    };
    writeDB(db);

    return res.json({ success: true, message: 'Rating submitted', booking: db.Bookservice[idx] });
  }
);

// ─── PATCH /api/bookings/:id/reschedule (Admin) ───────────────────────────────
router.patch(
  '/:id/reschedule',
  authenticate,
  authorize(2),
  [
    body('Datee').notEmpty().withMessage('New date is required'),
    body('Time').notEmpty().withMessage('New time is required'),
  ],
  async (req, res) => {
    const bookingId = parseInt(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: formatError(errors) });
    }

    const db = readDB();
    const idx = db.Bookservice.findIndex((b) => b.id === bookingId);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Booking not found' });

    const booking = db.Bookservice[idx];
    const { Datee, Time, spId, reason, ServiceAddress } = req.body;

    if (spId && hasConflict(db, parseInt(spId), Datee, Time, bookingId)) {
      return res.status(409).json({ success: false, message: 'SP has a schedule conflict at the new time' });
    }

    db.Bookservice[idx] = {
      ...booking,
      Datee,
      Time,
      status: 'Rescheduled',
      rescheduleReason: reason || '',
      ...(spId ? { spId: parseInt(spId) } : {}),
      ...(ServiceAddress ? { ServiceAddress } : {}),
      updatedAt: new Date().toISOString(),
    };
    writeDB(db);

    // Email notifications
    const customer = db.user.find((u) => u.id === booking.customerId);
    if (customer) sendBookingRescheduled(customer.Email, db.Bookservice[idx], reason).catch(() => {});

    return res.json({ success: true, message: 'Booking rescheduled', booking: db.Bookservice[idx] });
  }
);

// ─── POST /api/bookings/:id/photos (upload service photos) ───────────────────
router.post('/:id/photos', authenticate, upload.array('photos', 5), (req, res) => {
  const bookingId = parseInt(req.params.id);
  const db = readDB();
  const idx = db.Bookservice.findIndex((b) => b.id === bookingId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Booking not found' });
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded' });
  }

  const photoUrls = req.files.map((f) => `/uploads/${f.filename}`);
  if (!db.Bookservice[idx].photos) db.Bookservice[idx].photos = [];
  db.Bookservice[idx].photos.push(...photoUrls);
  db.Bookservice[idx].updatedAt = new Date().toISOString();
  writeDB(db);

  return res.json({ success: true, photoUrls, booking: db.Bookservice[idx] });
});

// ─── GET /api/bookings/:id ────────────────────────────────────────────────────
router.get('/:id', authenticate, (req, res) => {
  const bookingId = parseInt(req.params.id);
  const db = readDB();
  const booking = db.Bookservice.find((b) => b.id === bookingId);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

  // Access control
  const { userTypeId, id } = req.user;
  if (userTypeId === 0 && booking.customerId !== id) return res.status(403).json({ success: false, message: 'Forbidden' });
  if (userTypeId === 1 && booking.spId !== id && booking.status !== 'New') return res.status(403).json({ success: false, message: 'Forbidden' });

  return res.json({ success: true, booking });
});

module.exports = router;
