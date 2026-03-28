import api, { BASE_URL, getErrorMessage } from './api';

export interface Booking {
  id: number;
  ServiceId: number;
  customerId: number;
  spId?: number;
  Rooms: number;
  Bath: number;
  Datee: string;
  Time: string;
  ServiceHours: number;
  Totaltime: number;
  Payment: number;
  EffPeyment: number;
  ServiceAddress: string;
  status: string;
  rating?: number;
  SpComment?: string;
  photos?: string[];
  paymentStatus?: string;
  [key: string]: unknown;
}

// ─── Fetch bookings ──────────────────────────────────────────────────────────
export const getBookings = async (params: Record<string, string | number> = {}): Promise<Booking[]> => {
  try {
    const { data } = await api.get('/bookings', { params });
    return data.bookings;
  } catch {
    // Fallback to legacy endpoint
    const q = new URLSearchParams(params as Record<string, string>).toString();
    const res = await fetch(`${BASE_URL}/Bookservice?${q}`);
    return res.json();
  }
};

export const getAvailableBookings = async (): Promise<Booking[]> => {
  try {
    const { data } = await api.get('/bookings/available');
    return data.bookings;
  } catch {
    return [];
  }
};

export const createBooking = async (payload: Partial<Booking>): Promise<Booking> => {
  try {
    const { data } = await api.post('/bookings', payload);
    return data.booking;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const acceptBooking = async (id: number): Promise<Booking> => {
  try {
    const { data } = await api.patch(`/bookings/${id}/accept`);
    return data.booking;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const cancelBooking = async (id: number, reason?: string): Promise<Booking> => {
  try {
    const { data } = await api.patch(`/bookings/${id}/cancel`, { reason });
    return data.booking;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const completeBooking = async (id: number): Promise<Booking> => {
  try {
    const { data } = await api.patch(`/bookings/${id}/complete`);
    return data.booking;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const rateBooking = async (id: number, rating: number, comment?: string): Promise<Booking> => {
  try {
    const { data } = await api.patch(`/bookings/${id}/rate`, { rating, comment });
    return data.booking;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const rescheduleBooking = async (id: number, payload: Partial<Booking>): Promise<Booking> => {
  try {
    const { data } = await api.patch(`/bookings/${id}/reschedule`, payload);
    return data.booking;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// ─── Upload service photos ────────────────────────────────────────────────────
export const uploadBookingPhotos = async (id: number, files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((f) => formData.append('photos', f));
  try {
    const { data } = await api.post(`/bookings/${id}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.photoUrls;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// ─── Razorpay payment ─────────────────────────────────────────────────────────
export const createPaymentOrder = async (amount: number, bookingId?: number) => {
  try {
    const { data } = await api.post('/payment/create-order', { amount, bookingId });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId?: number;
}) => {
  try {
    const { data } = await api.post('/payment/verify', paymentData);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const validateCoupon = async (code: string, amount: number) => {
  try {
    const { data } = await api.post('/admin/coupons/validate', { code, amount });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
