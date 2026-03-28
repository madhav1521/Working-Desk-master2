import React, { useState, useRef, useEffect } from 'react';
import {
  CartItem,
  validateCoupon,
  COUPON_DATABASE,
  SavedAddress,
  StoredBooking,
} from './catalog-data';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Step = 'cart' | 'schedule' | 'auth' | 'address' | 'payment' | 'invoice';

interface ScheduleData { pinCode: string; date: string; slotId: string; slotLabel: string }
interface AuthUser { name: string; email: string; phone: string; role: string }
interface BookingResult {
  bookingId: string;
  provider: ServiceProvider;
  subtotal: number;
  discount: number;
  gst: number;
  total: number;
  couponCode: string;
  paymentMethod: 'cod' | 'razorpay';
}
interface ServiceProvider {
  id: string; name: string; phone: string; avatar: string;
  rating: number; completedJobs: number; eta: string;
  status: 'assigned' | 'on_way' | 'arrived' | 'in_progress' | 'completed';
  lat: number; lng: number;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const SERVICEABLE_PINS = ['110001','110002','110003','400001','400050','400070','560001','560002','600001','600002','500001','500002','380001','380006','302001','302004','201301','226001','700001','700002'];

const TIME_SLOTS = [
  { id: 'am9',  label: '9:00 AM – 11:00 AM', available: true },
  { id: 'am11', label: '11:00 AM – 1:00 PM',  available: true },
  { id: 'pm2',  label: '2:00 PM – 4:00 PM',   available: true },
  { id: 'pm4',  label: '4:00 PM – 6:00 PM',   available: false },
  { id: 'pm6',  label: '6:00 PM – 8:00 PM',   available: true },
];

const PROVIDERS: ServiceProvider[] = [
  { id: 'SP001', name: 'Rajesh Kumar',    phone: '+91 98765 43210', avatar: '👨‍🔧', rating: 4.9, completedJobs: 847, eta: '25 mins', status: 'assigned', lat: 28.6139, lng: 77.2090 },
  { id: 'SP002', name: 'Priya Sharma',    phone: '+91 87654 32109', avatar: '👩‍🔧', rating: 4.8, completedJobs: 634, eta: '18 mins', status: 'assigned', lat: 19.0760, lng: 72.8777 },
  { id: 'SP003', name: 'Mohammed Rafi',   phone: '+91 76543 21098', avatar: '👨‍🔧', rating: 4.7, completedJobs: 521, eta: '32 mins', status: 'assigned', lat: 12.9716, lng: 77.5946 },
  { id: 'SP004', name: 'Sunita Patel',    phone: '+91 65432 10987', avatar: '👩‍🔧', rating: 4.85, completedJobs: 712, eta: '20 mins', status: 'assigned', lat: 22.5726, lng: 88.3639 },
];

function genBookingId() {
  return 'WD' + Date.now().toString(36).toUpperCase().slice(-4) + Math.random().toString(36).slice(2, 5).toUpperCase();
}

function genOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getDateOptions() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().slice(0, 10),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
    };
  });
}

// ─── Step indicator ────────────────────────────────────────────────────────────

const STEP_META: { id: Step; label: string; icon: string }[] = [
  { id: 'cart',     label: 'Cart',     icon: '🛒' },
  { id: 'schedule', label: 'Schedule', icon: '📅' },
  { id: 'auth',     label: 'Login',    icon: '🔐' },
  { id: 'address',  label: 'Address',  icon: '📍' },
  { id: 'payment',  label: 'Payment',  icon: '💳' },
  { id: 'invoice',  label: 'Done',     icon: '✅' },
];

const StepBar: React.FC<{ current: Step }> = ({ current }) => {
  const visible = STEP_META.filter(s => s.id !== 'invoice');
  const curIdx = STEP_META.findIndex(s => s.id === current);
  return (
    <div className="chk-step-bar">
      {visible.map((s, i) => {
        const sIdx = STEP_META.findIndex(x => x.id === s.id);
        const done = sIdx < curIdx;
        const active = sIdx === curIdx;
        return (
          <React.Fragment key={s.id}>
            <div className={`csb-step ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
              <div className="csb-dot">{done ? '✓' : s.icon}</div>
              <span className="csb-label">{s.label}</span>
            </div>
            {i < visible.length - 1 && <div className={`csb-line ${done ? 'done' : ''}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── SMS Notification Toast ────────────────────────────────────────────────────

const SmsToast: React.FC<{ phone: string; otp: string; onClose: () => void }> = ({ phone, otp, onClose }) => (
  <div className="sms-toast">
    <div className="sms-toast-header">
      <span>📱 SMS Sent (Simulated)</span>
      <button onClick={onClose}>✕</button>
    </div>
    <div className="sms-toast-body">
      <p>Message sent to <strong>{phone}</strong>:</p>
      <div className="sms-message">
        "Your Helperland OTP is: <strong>{otp}</strong>. Valid for 10 minutes. Do not share."
      </div>
    </div>
  </div>
);

// ─── STEP 1: Cart Review ───────────────────────────────────────────────────────

const StepCart: React.FC<{
  cartItems: CartItem[];
  onNext: () => void;
  onRemove: (idx: number) => void;
  onUpdateQty: (idx: number, delta: number) => void;
}> = ({ cartItems, onNext, onRemove, onUpdateQty }) => {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  if (cartItems.length === 0) {
    return (
      <div className="chk-step" style={{ textAlign: 'center', gap: 12 }}>
        <div style={{ fontSize: 56 }}>🛒</div>
        <h3 className="chk-step-title">Your cart is empty</h3>
        <p className="chk-step-sub">Add services before proceeding to checkout</p>
      </div>
    );
  }
  return (
    <div className="chk-step">
      <h3 className="chk-step-title">Review Your Services</h3>
      <p className="chk-step-sub">{cartItems.reduce((s, i) => s + i.quantity, 0)} service{cartItems.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''} selected</p>
      <div className="chk-cart-list">
        {cartItems.map((item, idx) => (
          <div key={idx} className="chk-cart-item">
            <div className="chk-ci-info">
              <div className="chk-ci-name">{item.serviceName}</div>
              <div className="chk-ci-sub">{item.categoryName} · {item.variantName}</div>
              {item.extras.length > 0 && (
                <div className="chk-ci-extras">+ {item.extras.map(e => e.name).join(', ')}</div>
              )}
            </div>
            <div className="chk-ci-right">
              <div className="chk-ci-qty">
                <button onClick={() => onUpdateQty(idx, -1)} disabled={item.quantity <= 1}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQty(idx, 1)}>+</button>
              </div>
              <div className="chk-ci-price">₹{item.price * item.quantity}</div>
              <button className="chk-ci-remove" onClick={() => onRemove(idx)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
      <div className="chk-cart-total-row">
        <span>Subtotal</span>
        <span className="chk-cart-subtotal-val">₹{subtotal}</span>
      </div>
      <div className="chk-step-actions">
        <button className="chk-next-btn" onClick={onNext}>Continue to Schedule →</button>
      </div>
    </div>
  );
};

// ─── STEP 2: Schedule (PIN + Date + Time) ─────────────────────────────────────

const StepSchedule: React.FC<{
  onNext: (data: ScheduleData) => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [pin, setPin] = useState('');
  const [pinStatus, setPinStatus] = useState<'idle' | 'checking' | 'ok' | 'fail'>('idle');
  const [selDate, setSelDate] = useState(getDateOptions()[0].value);
  const [selSlot, setSelSlot] = useState('');
  const dates = getDateOptions();

  const checkPin = () => {
    if (pin.length !== 6) return;
    setPinStatus('checking');
    setTimeout(() => setPinStatus(SERVICEABLE_PINS.includes(pin) ? 'ok' : 'fail'), 900);
  };

  const canProceed = pinStatus === 'ok' && selSlot;
  const slotLabel = TIME_SLOTS.find(s => s.id === selSlot)?.label || '';

  return (
    <div className="chk-step">
      <h3 className="chk-step-title">Schedule Your Service</h3>
      <p className="chk-step-sub">First, verify we serve your area</p>

      {/* PIN check */}
      <div className="chk-section">
        <div className="chk-section-label">📍 Check Availability by PIN Code</div>
        <div className="chk-pin-row">
          <input
            className="chk-pin-input"
            type="text" maxLength={6} pattern="\d*"
            placeholder="Enter 6-digit PIN"
            value={pin}
            onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setPinStatus('idle'); }}
            onKeyDown={e => e.key === 'Enter' && checkPin()}
          />
          <button className="chk-pin-btn" onClick={checkPin} disabled={pin.length !== 6 || pinStatus === 'checking'}>
            {pinStatus === 'checking' ? '⏳' : 'Check'}
          </button>
        </div>
        {pinStatus === 'ok' && <div className="chk-alert ok">✅ We serve <strong>{pin}</strong>! Choose your schedule below.</div>}
        {pinStatus === 'fail' && (
          <div className="chk-alert fail">
            ❌ Sorry, we don't serve <strong>{pin}</strong> yet.
            <div className="chk-sample-pins">
              Try: {['110001','400001','560001','600001'].map(p => (
                <button key={p} className="chk-sample-pin" onClick={() => { setPin(p); setPinStatus('idle'); }}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Date & Time — only show after PIN OK */}
      {pinStatus === 'ok' && (
        <>
          <div className="chk-section">
            <div className="chk-section-label">📅 Select Date</div>
            <div className="chk-date-grid">
              {dates.map(d => (
                <button key={d.value} className={`chk-date-btn ${selDate === d.value ? 'selected' : ''}`} onClick={() => setSelDate(d.value)}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          <div className="chk-section">
            <div className="chk-section-label">⏰ Select Time Slot</div>
            <div className="chk-slot-list">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot.id}
                  className={`chk-slot-btn ${selSlot === slot.id ? 'selected' : ''} ${!slot.available ? 'unavail' : ''}`}
                  onClick={() => slot.available && setSelSlot(slot.id)}
                  disabled={!slot.available}
                >
                  <span>{slot.label}</span>
                  {!slot.available && <span className="chk-slot-unavail-badge">Fully Booked</span>}
                  {slot.available && selSlot === slot.id && <span className="chk-slot-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="chk-step-actions">
        <button className="chk-back-btn" onClick={onBack}>← Back</button>
        <button className="chk-next-btn" disabled={!canProceed} onClick={() => onNext({ pinCode: pin, date: selDate, slotId: selSlot, slotLabel })}>
          Continue to Login →
        </button>
      </div>
    </div>
  );
};

// ─── STEP 3: Auth (Login/Register + OTP) ──────────────────────────────────────

const StepAuth: React.FC<{
  onNext: (user: AuthUser) => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  // Login state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showSmsToast, setShowSmsToast] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  // Check if already logged in
  const stored = localStorage.getItem('helperland_user');
  if (stored) {
    const u = JSON.parse(stored) as AuthUser;
    return (
      <div className="chk-step">
        <div className="chk-step-icon-big">✅</div>
        <h3 className="chk-step-title">Welcome back!</h3>
        <div className="chk-auth-user-card">
          <span className="chk-auth-avatar">👤</span>
          <div>
            <div className="chk-auth-uname">{u.name || 'Customer'}</div>
            <div className="chk-auth-uemail">{u.email}</div>
            <div className="chk-auth-uphone">{u.phone}</div>
          </div>
          <button className="chk-auth-logout" onClick={() => { localStorage.removeItem('helperland_user'); window.location.reload(); }}>Logout</button>
        </div>
        <div className="chk-step-actions">
          <button className="chk-back-btn" onClick={onBack}>← Back</button>
          <button className="chk-next-btn" onClick={() => onNext(u)}>Continue →</button>
        </div>
      </div>
    );
  }

  const sendOtp = () => {
    if (phone.replace(/\D/g, '').length < 10) { setOtpError('Enter a valid 10-digit mobile number.'); return; }
    setOtpError('');
    setOtpLoading(true);
    const newOtp = genOtp();
    setTimeout(() => {
      setGeneratedOtp(newOtp);
      setOtpSent(true);
      setShowSmsToast(true);
      setOtpLoading(false);
    }, 800);
  };

  const verifyOtp = () => {
    if (otp !== generatedOtp) { setOtpError('❌ Incorrect OTP. Please try again.'); return; }
    // Look up user by phone
    const users = JSON.parse(localStorage.getItem('helperland_users') || '[]');
    const found = users.find((u: any) => u.phone?.replace(/\D/g, '') === phone.replace(/\D/g, ''));
    const user: AuthUser = found || { name: 'Customer', email: '', phone: `+91${phone}`, role: 'customer' };
    localStorage.setItem('helperland_user', JSON.stringify(user));
    onNext(user);
  };

  const register = () => {
    setRegError('');
    if (!regName || !regEmail || !regPhone || !regPassword) { setRegError('All fields are required.'); return; }
    if (regPhone.replace(/\D/g, '').length < 10) { setRegError('Enter a valid mobile number.'); return; }
    setRegLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('helperland_users') || '[]');
      if (users.find((u: any) => u.email === regEmail)) { setRegError('Email already registered. Please login.'); setRegLoading(false); return; }
      const newUser = { name: regName, email: regEmail, phone: regPhone, password: regPassword, role: 'customer', createdAt: new Date().toISOString() };
      localStorage.setItem('helperland_users', JSON.stringify([...users, newUser]));
      setRegSuccess(true);
      setRegLoading(false);
      setTimeout(() => { setTab('login'); setPhone(regPhone); setRegSuccess(false); }, 2000);
    }, 800);
  };

  return (
    <div className="chk-step">
      {showSmsToast && <SmsToast phone={`+91 ${phone}`} otp={generatedOtp} onClose={() => setShowSmsToast(false)} />}
      <div className="chk-step-icon-big">🔐</div>
      <h3 className="chk-step-title">{tab === 'login' ? 'Sign In to Continue' : 'Create Your Account'}</h3>

      <div className="chk-auth-tabs">
        <button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); setOtpError(''); }}>Login</button>
        <button className={tab === 'register' ? 'active' : ''} onClick={() => { setTab('register'); setRegError(''); }}>Register</button>
      </div>

      {/* LOGIN */}
      {tab === 'login' && (
        <div className="chk-auth-form">
          {!otpSent ? (
            <>
              <div className="chk-field-label">Mobile Number</div>
              <div className="chk-phone-row">
                <span className="chk-phone-prefix">+91</span>
                <input
                  className="chk-input chk-phone-input"
                  type="tel" maxLength={10} placeholder="10-digit mobile"
                  value={phone} onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                />
              </div>
              {otpError && <div className="chk-field-error">{otpError}</div>}
              <button className="chk-next-btn" onClick={sendOtp} disabled={otpLoading} style={{ marginTop: 4 }}>
                {otpLoading ? 'Sending OTP…' : '📱 Send OTP'}
              </button>
              <div className="chk-auth-note">An OTP will be sent to your registered mobile number</div>
            </>
          ) : (
            <>
              <div className="chk-otp-sent-info">OTP sent to <strong>+91 {phone}</strong> <button className="chk-change-phone" onClick={() => { setOtpSent(false); setOtp(''); setOtpError(''); }}>Change</button></div>
              <div className="chk-field-label">Enter OTP</div>
              <div className="chk-otp-row">
                {Array.from({ length: 6 }, (_, i) => (
                  <input
                    key={i}
                    className="chk-otp-box"
                    type="text" maxLength={1}
                    value={otp[i] || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      const arr = otp.split('');
                      arr[i] = val;
                      setOtp(arr.join('').slice(0, 6));
                      setOtpError('');
                      if (val && i < 5) (document.querySelectorAll('.chk-otp-box')[i + 1] as HTMLInputElement)?.focus();
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) (document.querySelectorAll('.chk-otp-box')[i - 1] as HTMLInputElement)?.focus();
                    }}
                  />
                ))}
              </div>
              {otpError && <div className="chk-field-error">{otpError}</div>}
              <div className="chk-resend-row">
                Didn't receive? <button className="chk-resend-btn" onClick={() => { setShowSmsToast(true); }}>Resend OTP</button>
                <span className="chk-otp-hint">📌 Hint: {generatedOtp}</span>
              </div>
              <button className="chk-next-btn" disabled={otp.length < 6} onClick={verifyOtp}>
                ✅ Verify & Continue
              </button>
            </>
          )}
        </div>
      )}

      {/* REGISTER */}
      {tab === 'register' && (
        <div className="chk-auth-form">
          {regSuccess ? (
            <div className="chk-reg-success">
              <div style={{ fontSize: 40, textAlign: 'center' }}>🎉</div>
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#16a34a' }}>Registration Successful!</div>
              <div style={{ textAlign: 'center', color: '#64748b', fontSize: 13 }}>Redirecting you to Login…</div>
            </div>
          ) : (
            <>
              <div className="chk-field-label">Full Name *</div>
              <input className="chk-input" placeholder="Your full name" value={regName} onChange={e => setRegName(e.target.value)} />
              <div className="chk-field-label">Email Address *</div>
              <input className="chk-input" type="email" placeholder="you@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
              <div className="chk-field-label">Mobile Number *</div>
              <div className="chk-phone-row">
                <span className="chk-phone-prefix">+91</span>
                <input className="chk-input chk-phone-input" type="tel" maxLength={10} placeholder="10-digit mobile" value={regPhone} onChange={e => setRegPhone(e.target.value.replace(/\D/g, ''))} />
              </div>
              <div className="chk-field-label">Password *</div>
              <input className="chk-input" type="password" placeholder="Create a password" value={regPassword} onChange={e => setRegPassword(e.target.value)} />
              {regError && <div className="chk-field-error">{regError}</div>}
              <button className="chk-next-btn" onClick={register} disabled={regLoading}>
                {regLoading ? 'Registering…' : 'Create Account →'}
              </button>
              <div className="chk-auth-note">Already have an account? <button className="chk-link-btn" onClick={() => setTab('login')}>Sign In</button></div>
            </>
          )}
        </div>
      )}

      <div className="chk-step-actions">
        <button className="chk-back-btn" onClick={onBack}>← Back</button>
      </div>
    </div>
  );
};

// ─── STEP 4: Address ───────────────────────────────────────────────────────────

const StepAddress: React.FC<{
  schedulePinCode: string;
  onNext: (addr: SavedAddress) => void;
  onBack: () => void;
}> = ({ schedulePinCode, onNext, onBack }) => {
  const user: AuthUser = JSON.parse(localStorage.getItem('helperland_user') || '{}');
  const savedAddresses: SavedAddress[] = JSON.parse(localStorage.getItem('helperland_addresses') || '[]');
  const [mode, setMode] = useState<'saved' | 'new'>(savedAddresses.length > 0 ? 'saved' : 'new');
  const [selAddr, setSelAddr] = useState<SavedAddress | null>(savedAddresses.find(a => a.isDefault) || savedAddresses[0] || null);
  const [form, setForm] = useState<Omit<SavedAddress, 'id'>>({
    name: user.name || '',
    phone: user.phone?.replace('+91 ', '') || '',
    addressLine: '',
    city: '',
    pinCode: schedulePinCode,
    landmark: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form, v: string) => { setForm(p => ({ ...p, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone required';
    if (!form.addressLine) e.addressLine = 'Address is required';
    if (!form.city) e.city = 'City is required';
    if (!form.pinCode || form.pinCode.length !== 6) e.pinCode = 'Valid PIN required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveAndContinue = () => {
    if (!validate()) return;
    const addr: SavedAddress = { ...form, id: 'addr_' + Date.now() };
    // Save address for future use
    const updated = [...savedAddresses, { ...addr, isDefault: savedAddresses.length === 0 }];
    localStorage.setItem('helperland_addresses', JSON.stringify(updated));
    onNext(addr);
  };

  return (
    <div className="chk-step">
      <h3 className="chk-step-title">Service Address</h3>
      <p className="chk-step-sub">Where should we send our professional?</p>

      {savedAddresses.length > 0 && (
        <div className="chk-addr-tabs">
          <button className={mode === 'saved' ? 'active' : ''} onClick={() => setMode('saved')}>📋 Saved Addresses</button>
          <button className={mode === 'new' ? 'active' : ''} onClick={() => setMode('new')}>+ New Address</button>
        </div>
      )}

      {mode === 'saved' && savedAddresses.length > 0 && (
        <div className="chk-saved-addrs">
          {savedAddresses.map(addr => (
            <button
              key={addr.id}
              className={`chk-saved-addr-card ${selAddr?.id === addr.id ? 'selected' : ''}`}
              onClick={() => setSelAddr(addr)}
            >
              <div className="csac-icon">🏠</div>
              <div className="csac-info">
                <div className="csac-name">{addr.name}</div>
                <div className="csac-line">{addr.addressLine}, {addr.city} — {addr.pinCode}</div>
                {addr.landmark && <div className="csac-landmark">Near: {addr.landmark}</div>}
                <div className="csac-phone">📞 {addr.phone}</div>
              </div>
              {selAddr?.id === addr.id && <span className="csac-check">✓</span>}
            </button>
          ))}
          <div className="chk-step-actions">
            <button className="chk-back-btn" onClick={onBack}>← Back</button>
            <button className="chk-next-btn" disabled={!selAddr} onClick={() => selAddr && onNext(selAddr)}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {mode === 'new' && (
        <>
          <div className="chk-addr-form">
            <div className="chk-form-row">
              <div className="chk-form-field">
                <div className="chk-field-label">Full Name *</div>
                <input className={`chk-input ${errors.name ? 'err' : ''}`} placeholder="Recipient name" value={form.name} onChange={e => set('name', e.target.value)} />
                {errors.name && <div className="chk-field-error">{errors.name}</div>}
              </div>
              <div className="chk-form-field">
                <div className="chk-field-label">Mobile Number *</div>
                <div className="chk-phone-row">
                  <span className="chk-phone-prefix">+91</span>
                  <input className={`chk-input chk-phone-input ${errors.phone ? 'err' : ''}`} type="tel" maxLength={10} placeholder="10-digit mobile" value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g, ''))} />
                </div>
                {errors.phone && <div className="chk-field-error">{errors.phone}</div>}
              </div>
            </div>
            <div className="chk-field-label">Address Line *</div>
            <input className={`chk-input ${errors.addressLine ? 'err' : ''}`} placeholder="House/Flat no., Building, Street" value={form.addressLine} onChange={e => set('addressLine', e.target.value)} />
            {errors.addressLine && <div className="chk-field-error">{errors.addressLine}</div>}
            <div className="chk-form-row">
              <div className="chk-form-field">
                <div className="chk-field-label">City *</div>
                <input className={`chk-input ${errors.city ? 'err' : ''}`} placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} />
                {errors.city && <div className="chk-field-error">{errors.city}</div>}
              </div>
              <div className="chk-form-field">
                <div className="chk-field-label">PIN Code *</div>
                <input className={`chk-input ${errors.pinCode ? 'err' : ''}`} type="text" maxLength={6} placeholder="6-digit PIN" value={form.pinCode} onChange={e => set('pinCode', e.target.value.replace(/\D/g, ''))} />
                {errors.pinCode && <div className="chk-field-error">{errors.pinCode}</div>}
              </div>
            </div>
            <div className="chk-field-label">Landmark <span style={{ color: '#94a3b8' }}>(optional)</span></div>
            <input className="chk-input" placeholder="Near temple, school, metro station…" value={form.landmark} onChange={e => set('landmark', e.target.value)} />
            <div className="chk-save-addr-note">💾 Address will be saved for future bookings</div>
          </div>
          <div className="chk-step-actions">
            <button className="chk-back-btn" onClick={onBack}>← Back</button>
            <button className="chk-next-btn" onClick={saveAndContinue}>Continue to Payment →</button>
          </div>
        </>
      )}
    </div>
  );
};

// ─── STEP 5: Payment ───────────────────────────────────────────────────────────

const StepPayment: React.FC<{
  cartItems: CartItem[];
  categoryId: string;
  onConfirm: (method: 'cod' | 'razorpay', coupon: string, discount: number, total: number) => void;
  onBack: () => void;
}> = ({ cartItems, categoryId, onConfirm, onBack }) => {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const [method, setMethod] = useState<'cod' | 'razorpay'>('cod');
  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<{ valid: boolean; discount: number; message: string } | null>(null);
  const [paying, setPaying] = useState(false);

  const applyCoupon = () => {
    const result = validateCoupon(couponCode, categoryId, subtotal);
    setCouponResult(result);
  };

  const discount = couponResult?.valid ? couponResult.discount : 0;
  const gst = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + gst;

  const pay = () => {
    setPaying(true);
    if (method === 'razorpay') {
      const user: AuthUser = JSON.parse(localStorage.getItem('helperland_user') || '{}');
      const options: any = {
        key: 'rzp_test_helperland',
        amount: total * 100,
        currency: 'INR',
        name: 'Helperland Services',
        description: `Booking — ${cartItems.map(i => i.serviceName).join(', ')}`,
        image: 'https://via.placeholder.com/64x64/2563eb/fff?text=H',
        handler: () => { setPaying(false); onConfirm(method, couponCode, discount, total); },
        prefill: { name: user.name, email: user.email, contact: user.phone },
        notes: { booking_type: 'service' },
        theme: { color: '#2563eb' },
        modal: { ondismiss: () => setPaying(false), escape: true },
      };
      if ((window as any).Razorpay) {
        new (window as any).Razorpay(options).open();
      } else {
        // Simulate Razorpay if script not loaded
        setTimeout(() => { setPaying(false); onConfirm(method, couponCode, discount, total); }, 1500);
      }
    } else {
      setTimeout(() => { setPaying(false); onConfirm(method, couponCode, discount, total); }, 800);
    }
  };

  // Suggest coupons for this category
  const suggestedCoupons = COUPON_DATABASE.filter(c =>
    c.isActive &&
    new Date(c.expiryDate) >= new Date() &&
    ((!c.applicableCategoryIds || c.applicableCategoryIds.length === 0) || c.applicableCategoryIds.includes(categoryId)) &&
    subtotal >= c.minOrder
  ).slice(0, 4);

  return (
    <div className="chk-step">
      <h3 className="chk-step-title">Review & Pay</h3>

      {/* Coupon block */}
      <div className="chk-coupon-section">
        <div className="chk-section-label">🏷️ Apply Coupon</div>
        <div className="chk-coupon-input-row">
          <input
            className="chk-input"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponResult(null); }}
            onKeyDown={e => e.key === 'Enter' && applyCoupon()}
          />
          <button className="chk-coupon-apply-btn" onClick={applyCoupon} disabled={!couponCode}>Apply</button>
        </div>
        {couponResult && (
          <div className={`chk-coupon-msg ${couponResult.valid ? 'ok' : 'fail'}`}>{couponResult.message}</div>
        )}
        {suggestedCoupons.length > 0 && (
          <div className="chk-suggested-coupons">
            <span className="chk-sugg-label">Available for you:</span>
            {suggestedCoupons.map(c => (
              <button key={c.code} className="chk-sugg-chip" onClick={() => { setCouponCode(c.code); setCouponResult(null); }} title={c.description}>
                {c.code} <span>({c.discountPct}% off)</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bill breakdown */}
      <div className="chk-bill-block">
        <div className="chk-bill-title">Bill Summary</div>
        {cartItems.map((item, i) => (
          <div key={i} className="chk-bill-row">
            <span>{item.serviceName} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="chk-bill-divider" />
        <div className="chk-bill-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
        {discount > 0 && <div className="chk-bill-row green"><span>Coupon Discount ({couponCode})</span><span>−₹{discount}</span></div>}
        <div className="chk-bill-row"><span>GST (18%)</span><span>₹{gst}</span></div>
        <div className="chk-bill-divider" />
        <div className="chk-bill-row total"><span>Total Payable</span><span>₹{total}</span></div>
        {discount > 0 && <div className="chk-bill-savings">🎉 You save ₹{discount} with coupon!</div>}
      </div>

      {/* Payment methods */}
      <div className="chk-pay-section">
        <div className="chk-section-label">Select Payment Method</div>
        <button className={`chk-pay-card ${method === 'cod' ? 'selected' : ''}`} onClick={() => setMethod('cod')}>
          <span className="cpc-icon">💵</span>
          <div className="cpc-text">
            <div className="cpc-name">Cash on Delivery</div>
            <div className="cpc-sub">Pay when the professional arrives at your door</div>
          </div>
          <div className={`cpc-radio ${method === 'cod' ? 'on' : ''}`} />
        </button>
        <button className={`chk-pay-card ${method === 'razorpay' ? 'selected' : ''}`} onClick={() => setMethod('razorpay')}>
          <span className="cpc-icon">💳</span>
          <div className="cpc-text">
            <div className="cpc-name">Pay Online (Razorpay)</div>
            <div className="cpc-sub">UPI • Cards • Net Banking • Wallets</div>
          </div>
          <div className={`cpc-radio ${method === 'razorpay' ? 'on' : ''}`} />
        </button>
      </div>

      <div className="chk-step-actions">
        <button className="chk-back-btn" onClick={onBack}>← Back</button>
        <button className="chk-confirm-btn" onClick={pay} disabled={paying}>
          {paying ? '⏳ Processing…' : `Confirm & Pay ₹${total}`}
        </button>
      </div>
    </div>
  );
};

// ─── STEP 6: Invoice ───────────────────────────────────────────────────────────

const StepInvoice: React.FC<{
  booking: BookingResult;
  cartItems: CartItem[];
  schedule: ScheduleData;
  address: SavedAddress;
  onTrack: () => void;
  onDone: () => void;
}> = ({ booking, cartItems, schedule, address, onTrack, onDone }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const dateLabel = new Date(schedule.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const printInvoice = () => {
    const html = invoiceRef.current?.innerHTML || '';
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>Invoice ${booking.bookingId}</title><style>
      *{box-sizing:border-box;margin:0;padding:0} body{font-family:Arial,sans-serif;padding:32px;color:#1e293b}
      .inv-logo{font-size:22px;font-weight:800;color:#2563eb} .inv-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #e2e8f0}
      table{width:100%;border-collapse:collapse;margin:16px 0} th,td{border:1px solid #e2e8f0;padding:10px 14px;font-size:13px} th{background:#f1f5f9;font-weight:700}
      .inv-row{display:flex;justify-content:space-between;padding:6px 0;font-size:13px} .inv-total{font-size:17px;font-weight:800;border-top:2px solid #e2e8f0;padding-top:8px;margin-top:4px}
      .inv-badge{display:inline-block;background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-weight:700;font-size:13px}
    </style></head><body>${html}</body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="inv-root">
      <div ref={invoiceRef} className="inv-doc">
        {/* Header */}
        <div className="inv-doc-header">
          <div>
            <div className="inv-logo-text">🏠 Helperland</div>
            <div className="inv-logo-sub">Professional Home Services</div>
          </div>
          <div className="inv-right-header">
            <div className="inv-status-badge">✅ Booking Confirmed</div>
            <div className="inv-bid">Booking ID: <strong>{booking.bookingId}</strong></div>
            <div className="inv-date-gen">Generated: {new Date().toLocaleDateString('en-IN')}</div>
          </div>
        </div>

        {/* Meta */}
        <div className="inv-meta-grid">
          <div className="inv-meta-item"><span>📅 Date</span><strong>{dateLabel}</strong></div>
          <div className="inv-meta-item"><span>⏰ Time</span><strong>{schedule.slotLabel}</strong></div>
          <div className="inv-meta-item"><span>📍 Address</span><strong>{address.addressLine}, {address.city} — {address.pinCode}</strong></div>
          <div className="inv-meta-item"><span>💳 Payment</span><strong>{booking.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Razorpay (Paid)'}</strong></div>
        </div>

        {/* Services table */}
        <table className="inv-table">
          <thead><tr><th>#</th><th>Service</th><th>Option</th><th>Add-ons</th><th>Qty</th><th>Amount</th></tr></thead>
          <tbody>
            {cartItems.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.serviceName}</td>
                <td>{item.variantName}</td>
                <td>{item.extras.map(e => e.name).join(', ') || '—'}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="inv-totals">
          <div className="inv-row"><span>Subtotal</span><span>₹{booking.subtotal}</span></div>
          {booking.discount > 0 && <div className="inv-row green"><span>Coupon Discount ({booking.couponCode})</span><span>−₹{booking.discount}</span></div>}
          <div className="inv-row"><span>GST (18%)</span><span>₹{booking.gst}</span></div>
          <div className="inv-row total"><span>Total Amount</span><span>₹{booking.total}</span></div>
        </div>

        {/* Service Provider */}
        <div className="inv-sp-section">
          <div className="inv-sp-label">👨‍🔧 Assigned Service Professional</div>
          <div className="inv-sp-card">
            <span className="inv-sp-avatar">{booking.provider.avatar}</span>
            <div className="inv-sp-details">
              <div className="inv-sp-name">{booking.provider.name}</div>
              <div className="inv-sp-meta">ID: {booking.provider.id} · ★ {booking.provider.rating} · {booking.provider.completedJobs} jobs</div>
              <div className="inv-sp-phone">📞 {booking.provider.phone}</div>
            </div>
            <div className="inv-eta-pill">ETA: {booking.provider.eta}</div>
          </div>
        </div>

        {/* Customer address */}
        <div className="inv-addr-section">
          <div className="inv-addr-label">📍 Service Address</div>
          <div className="inv-addr-body">
            <strong>{address.name}</strong> · {address.phone}<br />
            {address.addressLine}, {address.city} — {address.pinCode}
            {address.landmark && <><br />Near: {address.landmark}</>}
          </div>
        </div>

        {/* SMS confirmation note */}
        <div className="inv-sms-note">
          📱 SMS confirmation sent to {address.phone}: "Your Helperland booking is confirmed. Booking ID: {booking.bookingId}. Track your professional in the app."
        </div>

        <div className="inv-footer">
          Thank you for choosing Helperland! For support: support@helperland.com | 1800-XXX-XXXX
        </div>
      </div>

      <div className="inv-actions">
        <button className="inv-btn print" onClick={printInvoice}>🖨️ Print / Download</button>
        <button className="inv-btn track" onClick={onTrack}>📍 Track Provider</button>
        <button className="inv-btn done" onClick={onDone}>✓ Done</button>
      </div>
    </div>
  );
};

// ─── Tracking Modal ────────────────────────────────────────────────────────────

const TrackingModal: React.FC<{
  provider: ServiceProvider;
  onClose: () => void;
}> = ({ provider, onClose }) => {
  const flow: ServiceProvider['status'][] = ['assigned', 'on_way', 'arrived', 'in_progress', 'completed'];
  const labels: Record<ServiceProvider['status'], string> = {
    assigned: 'Professional Assigned', on_way: 'On the Way', arrived: 'Arrived',
    in_progress: 'Service In Progress', completed: 'Service Completed',
  };
  const icons: Record<ServiceProvider['status'], string> = {
    assigned: '✅', on_way: '🚗', arrived: '🏠', in_progress: '🔧', completed: '🎉',
  };
  const [status, setStatus] = useState(provider.status);

  useEffect(() => {
    const idx = flow.indexOf(status);
    if (idx < flow.length - 1) {
      const t = setTimeout(() => setStatus(flow[idx + 1]), 6000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [status]);

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${provider.lng - 0.04}%2C${provider.lat - 0.04}%2C${provider.lng + 0.04}%2C${provider.lat + 0.04}&layer=mapnik&marker=${provider.lat}%2C${provider.lng}`;
  const currentIdx = flow.indexOf(status);

  return (
    <div className="track-overlay" onClick={onClose}>
      <div className="track-modal" onClick={e => e.stopPropagation()}>
        <div className="track-header">
          <span>📍 Live Tracking</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Timeline */}
        <div className="track-timeline">
          {flow.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`tl-step ${i <= currentIdx ? 'done' : ''} ${i === currentIdx ? 'active' : ''}`}>
                <div className="tl-dot">{i <= currentIdx ? icons[s] : ''}</div>
                <div className="tl-label">{labels[s]}</div>
              </div>
              {i < flow.length - 1 && <div className={`tl-line ${i < currentIdx ? 'done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Live status */}
        <div className="track-live-status">
          <span className="tls-icon">{icons[status]}</span>
          <div>
            <div className="tls-text">{labels[status]}</div>
            {status === 'on_way' && <div className="tls-eta">Estimated arrival: <strong>{provider.eta}</strong></div>}
            {status === 'completed' && <div className="tls-done">Service completed successfully! 🎉</div>}
          </div>
        </div>

        {/* Provider card */}
        <div className="track-provider-card">
          <span className="tpc-avatar">{provider.avatar}</span>
          <div className="tpc-info">
            <div className="tpc-name">{provider.name}</div>
            <div className="tpc-id">ID: {provider.id}</div>
            <div className="tpc-rating">★ {provider.rating} · {provider.completedJobs} jobs completed</div>
          </div>
          <a href={`tel:${provider.phone}`} className="tpc-call">📞 Call</a>
        </div>

        {/* Map */}
        <div className="track-map-wrap">
          <iframe src={mapUrl} width="100%" height="200" style={{ border: 0, borderRadius: 12, display: 'block' }} title="Live location" />
          <div className="track-map-overlay-label">📍 {provider.name}'s current location</div>
        </div>

        {status === 'completed' && (
          <div className="track-rate-section">
            <div className="track-rate-title">Rate your experience</div>
            <RatingStars />
          </div>
        )}
      </div>
    </div>
  );
};

const RatingStars: React.FC = () => {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);
  return (
    <div className="rate-stars-row">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          className={`rate-star ${n <= (hover || selected) ? 'lit' : ''}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setSelected(n)}
        >★</button>
      ))}
      {selected > 0 && <span className="rate-thanks">Thanks for rating! ❤️</span>}
    </div>
  );
};

// ─── Main BookingCheckout ──────────────────────────────────────────────────────

const BookingCheckout: React.FC<{
  cartItems: CartItem[];
  categoryId: string;
  onClose: () => void;
  onSuccess: () => void;
  onRemoveItem: (idx: number) => void;
  onUpdateQty: (idx: number, delta: number) => void;
}> = ({ cartItems, categoryId, onClose, onSuccess, onRemoveItem, onUpdateQty }) => {
  const [step, setStep] = useState<Step>('cart');
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [address, setAddress] = useState<SavedAddress | null>(null);
  const [booking, setBooking] = useState<BookingResult | null>(null);
  const [showTracking, setShowTracking] = useState(false);

  const handlePayConfirm = (method: 'cod' | 'razorpay', coupon: string, discount: number, total: number) => {
    const gst = Math.round(total - (total / 1.18));
    const provider = PROVIDERS[Math.floor(Math.random() * PROVIDERS.length)];
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const result: BookingResult = {
      bookingId: genBookingId(), provider, subtotal, discount, gst,
      total, couponCode: coupon, paymentMethod: method,
    };
    // Save booking to localStorage
    const prev: StoredBooking[] = JSON.parse(localStorage.getItem('helperland_bookings') || '[]');
    const stored: StoredBooking = {
      bookingId: result.bookingId,
      createdAt: new Date().toISOString(),
      services: cartItems.map(i => ({ name: i.serviceName, variant: i.variantName, price: i.price * i.quantity })),
      address: address!,
      date: schedule!.date,
      timeSlot: schedule!.slotLabel,
      paymentMethod: method,
      subtotal, discount, gst, total,
      couponCode: coupon,
      status: 'confirmed',
      providerId: provider.id,
      providerName: provider.name,
    };
    localStorage.setItem('helperland_bookings', JSON.stringify([stored, ...prev]));
    setBooking(result);
    setStep('invoice');
  };

  const go = (s: Step) => setStep(s);

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        {/* Header */}
        <div className="checkout-header">
          <span className="checkout-title">
            {step === 'invoice' ? '🎉 Booking Confirmed!' : 'Checkout'}
          </span>
          <button className="checkout-close" onClick={onClose}>✕</button>
        </div>

        {/* Step bar */}
        {step !== 'invoice' && <StepBar current={step} />}

        {/* Cart mini (not on cart step) */}
        {step !== 'cart' && step !== 'invoice' && cartItems.length > 0 && (
          <div className="checkout-cart-mini">
            <span className="ccm-label">🛒 {cartItems.reduce((s, i) => s + i.quantity, 0)} service{cartItems.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}:</span>
            {cartItems.slice(0, 2).map((item, i) => <span key={i} className="ccm-chip">{item.serviceName}</span>)}
            {cartItems.length > 2 && <span className="ccm-more">+{cartItems.length - 2}</span>}
            <span className="ccm-amount">₹{cartItems.reduce((s, i) => s + i.price * i.quantity, 0)}</span>
          </div>
        )}

        {/* Steps */}
        <div className="checkout-body">
          {step === 'cart' && (
            <StepCart
              cartItems={cartItems}
              onNext={() => go('schedule')}
              onRemove={onRemoveItem}
              onUpdateQty={onUpdateQty}
            />
          )}
          {step === 'schedule' && (
            <StepSchedule
              onNext={data => { setSchedule(data); go('auth'); }}
              onBack={() => go('cart')}
            />
          )}
          {step === 'auth' && (
            <StepAuth
              onNext={() => go('address')}
              onBack={() => go('schedule')}
            />
          )}
          {step === 'address' && schedule && (
            <StepAddress
              schedulePinCode={schedule.pinCode}
              onNext={addr => { setAddress(addr); go('payment'); }}
              onBack={() => go('auth')}
            />
          )}
          {step === 'payment' && (
            <StepPayment
              cartItems={cartItems}
              categoryId={categoryId}
              onConfirm={handlePayConfirm}
              onBack={() => go('address')}
            />
          )}
          {step === 'invoice' && booking && schedule && address && (
            <StepInvoice
              booking={booking}
              cartItems={cartItems}
              schedule={schedule}
              address={address}
              onTrack={() => setShowTracking(true)}
              onDone={onSuccess}
            />
          )}
        </div>
      </div>

      {showTracking && booking && (
        <TrackingModal provider={booking.provider} onClose={() => setShowTracking(false)} />
      )}
    </div>
  );
};

export default BookingCheckout;
