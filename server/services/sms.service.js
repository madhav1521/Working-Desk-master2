let twilioClient = null;

const getTwilio = () => {
  if (twilioClient) return twilioClient;
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null;
  const twilio = require('twilio');
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return twilioClient;
};

const sendSMS = async (to, body) => {
  const client = getTwilio();
  if (!client || !process.env.TWILIO_PHONE_NUMBER) {
    console.warn('[SMS] Twilio not configured – skipping SMS to', to);
    return { skipped: true };
  }
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log('[SMS] Sent SID:', message.sid);
    return message;
  } catch (err) {
    console.error('[SMS] Error:', err.message);
    throw err;
  }
};

const sendBookingConfirmationSMS = (phone, booking) =>
  sendSMS(phone, `Helperland: Booking #${booking.ServiceId} confirmed for ${booking.Datee} at ${booking.Time}. Total: €${booking.EffPeyment?.toFixed(2)}`);

const sendSPAssignedSMS = (phone, booking) =>
  sendSMS(phone, `Helperland: A service provider has been assigned to your booking #${booking.ServiceId} on ${booking.Datee}.`);

module.exports = { sendSMS, sendBookingConfirmationSMS, sendSPAssignedSMS };
