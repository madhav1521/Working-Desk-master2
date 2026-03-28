const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
  return transporter;
};

const FROM = process.env.EMAIL_FROM || 'Helperland <noreply@helperland.com>';

const sendMail = async (to, subject, html, text) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('[Email] Credentials not configured – skipping email to', to);
    return { skipped: true };
  }
  try {
    const info = await getTransporter().sendMail({ from: FROM, to, subject, html, text });
    console.log('[Email] Sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('[Email] Error:', err.message);
    throw err;
  }
};

// ─── Templates ─────────────────────────────────────────────────────────────
const sendPasswordReset = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/resetpassword/${token}`;
  return sendMail(
    email,
    'Helperland – Reset Your Password',
    `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:8px">
      <div style="background:#1D7A8C;padding:20px;border-radius:8px 8px 0 0;text-align:center">
        <h1 style="color:#fff;margin:0">Helperland</h1>
      </div>
      <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px">
        <h2 style="color:#333">Reset Your Password</h2>
        <p style="color:#555">We received a request to reset your password. Click the button below to create a new password.</p>
        <div style="text-align:center;margin:30px 0">
          <a href="${resetUrl}" style="background:#1D7A8C;color:#fff;padding:14px 30px;text-decoration:none;border-radius:25px;font-size:16px">Reset Password</a>
        </div>
        <p style="color:#888;font-size:14px">This link expires in <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p style="color:#aaa;font-size:12px;text-align:center">© 2026 Helperland. All rights reserved.</p>
      </div>
    </div>`,
    `Reset your Helperland password: ${resetUrl}\nLink expires in 10 minutes.`
  );
};

const sendBookingConfirmation = async (email, booking) => {
  return sendMail(
    email,
    `Helperland – Booking #${booking.ServiceId} Confirmed`,
    `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:8px">
      <div style="background:#1D7A8C;padding:20px;border-radius:8px 8px 0 0;text-align:center">
        <h1 style="color:#fff;margin:0">Booking Confirmed ✓</h1>
      </div>
      <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px">
        <h2 style="color:#333">Service #${booking.ServiceId}</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#555"><strong>Date:</strong></td><td style="padding:8px;color:#333">${booking.Datee}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#555"><strong>Time:</strong></td><td style="padding:8px;color:#333">${booking.Time}</td></tr>
          <tr><td style="padding:8px;color:#555"><strong>Rooms:</strong></td><td style="padding:8px;color:#333">${booking.Rooms}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#555"><strong>Bathrooms:</strong></td><td style="padding:8px;color:#333">${booking.Bath}</td></tr>
          <tr><td style="padding:8px;color:#555"><strong>Payment:</strong></td><td style="padding:8px;color:#1D7A8C;font-weight:bold">€${booking.EffPeyment?.toFixed(2)}</td></tr>
        </table>
        <p style="color:#888;font-size:13px;margin-top:20px">We will assign a service provider shortly. Thank you for choosing Helperland!</p>
      </div>
    </div>`,
    `Booking #${booking.ServiceId} confirmed for ${booking.Datee} at ${booking.Time}.`
  );
};

const sendBookingRescheduled = async (email, booking, reason) => {
  return sendMail(
    email,
    `Helperland – Booking #${booking.ServiceId} Rescheduled`,
    `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <h2 style="color:#1D7A8C">Booking Rescheduled</h2>
      <p>Your booking <strong>#${booking.ServiceId}</strong> has been rescheduled.</p>
      <p><strong>New Date:</strong> ${booking.Datee}</p>
      <p><strong>New Time:</strong> ${booking.Time}</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
    </div>`,
    `Booking #${booking.ServiceId} rescheduled to ${booking.Datee} at ${booking.Time}.`
  );
};

module.exports = { sendMail, sendPasswordReset, sendBookingConfirmation, sendBookingRescheduled };
