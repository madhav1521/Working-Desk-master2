import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, Button, TextField, CircularProgress,
  Alert, Divider, Chip, InputAdornment,
} from '@mui/material';
import { LocalOffer, CreditCard, CheckCircle } from '@mui/icons-material';
import { createPaymentOrder, verifyPayment, validateCoupon } from '../../services/booking.service';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  bookingId?: number;
  bookingDetails?: {
    date: string; time: string; rooms: number; bath: number; totalTime: number;
  };
  onPaymentSuccess: (paymentId: string, finalAmount: number) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src*="razorpay"]')) {
      resolve(!!window.Razorpay);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const modalStyle = {
  position: 'absolute' as const,
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 480 },
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
  p: 4, outline: 'none',
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  open, onClose, amount, bookingId, bookingDetails, onPaymentSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponData, setCouponData] = useState<{ discount: number; finalAmount: number; code: string } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  const finalAmount = couponData ? couponData.finalAmount : amount;

  const handleCouponApply = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const result = await validateCoupon(couponCode.trim(), amount);
      setCouponData({ discount: result.discount, finalAmount: result.finalAmount, code: couponCode.trim() });
    } catch (err: any) {
      setCouponError(err.message || 'Invalid coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      const razorpayLoaded = await loadRazorpay();
      const orderData = await createPaymentOrder(finalAmount, bookingId);

      if (orderData.demo || !razorpayLoaded) {
        // Demo mode – simulate payment success
        await new Promise((r) => setTimeout(r, 1500));
        setPaymentSuccess(true);
        onPaymentSuccess(`demo_${Date.now()}`, finalAmount);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Helperland',
        description: `Cleaning Service${bookingDetails ? ` – ${bookingDetails.date}` : ''}`,
        image: '/logo192.png',
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            await verifyPayment({ ...response, bookingId });
            setPaymentSuccess(true);
            onPaymentSuccess(response.razorpay_payment_id, finalAmount);
          } catch {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!).FirstName + ' ' + JSON.parse(localStorage.getItem('user')!).LastName
            : '',
          email: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!).Email
            : '',
        },
        theme: { color: '#1D7A8C' },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{ ...modalStyle, textAlign: 'center' }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4caf50, #388e3c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <CheckCircle sx={{ color: '#fff', fontSize: 44 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="#2c3e50" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Your booking has been confirmed. You'll receive a confirmation email shortly.
          </Typography>
          <Button
            fullWidth variant="contained" onClick={onClose}
            sx={{
              background: 'linear-gradient(135deg, #1D7A8C, #146371)',
              borderRadius: '25px', py: 1.5, textTransform: 'none', fontWeight: 600,
            }}
          >
            View My Bookings
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <CreditCard sx={{ color: '#1D7A8C', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700} color="#2c3e50">
            Complete Payment
          </Typography>
        </Box>

        {bookingDetails && (
          <Box sx={{ background: '#f8fafb', borderRadius: '12px', p: 2, mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Booking Summary
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
              {[
                ['Date', bookingDetails.date],
                ['Time', bookingDetails.time],
                ['Rooms', `${bookingDetails.rooms}`],
                ['Duration', `${bookingDetails.totalTime} hrs`],
              ].map(([k, v]) => (
                <Box key={k}>
                  <Typography variant="caption" color="text.secondary">{k}</Typography>
                  <Typography variant="body2" fontWeight={600}>{v}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Coupon */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Have a coupon code?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small" fullWidth placeholder="Enter coupon code"
              value={couponCode} onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(''); }}
              disabled={!!couponData}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LocalOffer sx={{ color: '#1D7A8C', fontSize: 18 }} /></InputAdornment>,
                sx: { borderRadius: '10px' },
              }}
            />
            <Button
              variant="outlined" onClick={handleCouponApply}
              disabled={couponLoading || !!couponData || !couponCode.trim()}
              sx={{ borderRadius: '10px', minWidth: 80, textTransform: 'none', borderColor: '#1D7A8C', color: '#1D7A8C' }}
            >
              {couponLoading ? <CircularProgress size={16} /> : 'Apply'}
            </Button>
          </Box>
          {couponError && <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{couponError}</Typography>}
          {couponData && (
            <Chip
              label={`${couponData.code} – €${couponData.discount.toFixed(2)} off`}
              color="success" size="small" sx={{ mt: 1 }}
              onDelete={() => setCouponData(null)}
            />
          )}
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* Amount breakdown */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography color="text.secondary">Service Amount</Typography>
            <Typography fontWeight={600}>€{amount.toFixed(2)}</Typography>
          </Box>
          {couponData && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography color="success.main">Coupon Discount</Typography>
              <Typography color="success.main" fontWeight={600}>-€{couponData.discount.toFixed(2)}</Typography>
            </Box>
          )}
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>Total</Typography>
            <Typography variant="h6" fontWeight={700} color="#1D7A8C">€{finalAmount.toFixed(2)}</Typography>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>}

        <Button
          fullWidth variant="contained" onClick={handlePayment} disabled={loading}
          sx={{
            background: 'linear-gradient(135deg, #1D7A8C 0%, #146371 100%)',
            borderRadius: '25px', py: 1.6, textTransform: 'none',
            fontSize: '16px', fontWeight: 700,
            '&:hover': { background: 'linear-gradient(135deg, #146371, #0f4f5c)', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(29,122,140,0.35)' },
            '&:disabled': { opacity: 0.7 },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : `Pay €${finalAmount.toFixed(2)}`}
        </Button>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          🔒 Secured by Razorpay. Your payment details are encrypted.
        </Typography>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
