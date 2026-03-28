import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StoredBooking } from './catalog-data';
import Navbar from '../navbar';
import SecondFooter from '../secondfooter';

const STATUS_LABELS: Record<StoredBooking['status'], string> = {
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STATUS_COLORS: Record<StoredBooking['status'], string> = {
  confirmed: '#2563eb',
  in_progress: '#d97706',
  completed: '#16a34a',
  cancelled: '#ef4444',
};

const BookingHistory: React.FC = () => {
  const history = useHistory();
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [filter, setFilter] = useState<'all' | StoredBooking['status']>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('helperland_bookings') || '[]') as StoredBooking[];
    setBookings(stored);
  }, []);

  const user = JSON.parse(localStorage.getItem('helperland_user') || 'null');

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  const printBooking = (b: StoredBooking) => {
    const dateLabel = new Date(b.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>Invoice ${b.bookingId}</title>
    <style>
      body{font-family:Arial,sans-serif;padding:32px;color:#1e293b}
      h2{color:#2563eb} table{width:100%;border-collapse:collapse;margin:16px 0}
      th,td{border:1px solid #e2e8f0;padding:10px;text-align:left} th{background:#f1f5f9}
      .row{display:flex;justify-content:space-between;padding:5px 0}
      .total{font-weight:800;font-size:18px;border-top:2px solid #e2e8f0;padding-top:8px}
    </style></head><body>
    <h2>🏠 Helperland — Invoice</h2>
    <p><strong>Booking ID:</strong> ${b.bookingId} &nbsp;|&nbsp; <strong>Status:</strong> ${STATUS_LABELS[b.status]}</p>
    <p><strong>Date:</strong> ${dateLabel} &nbsp;|&nbsp; <strong>Time:</strong> ${b.timeSlot}</p>
    <p><strong>Address:</strong> ${b.address.addressLine}, ${b.address.city} — ${b.address.pinCode}</p>
    <table><thead><tr><th>Service</th><th>Option</th><th>Amount</th></tr></thead>
    <tbody>${b.services.map(s => `<tr><td>${s.name}</td><td>${s.variant}</td><td>₹${s.price}</td></tr>`).join('')}</tbody>
    </table>
    <div class="row"><span>Subtotal</span><span>₹${b.subtotal}</span></div>
    ${b.discount > 0 ? `<div class="row"><span>Coupon (${b.couponCode})</span><span>−₹${b.discount}</span></div>` : ''}
    <div class="row"><span>GST (18%)</span><span>₹${b.gst}</span></div>
    <div class="row total"><span>Total Paid</span><span>₹${b.total}</span></div>
    <p><strong>Payment:</strong> ${b.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay'}</p>
    <p><strong>Provider:</strong> ${b.providerName} (${b.providerId})</p>
    </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <>
      <Navbar />
      <div className="bh-root">
        <div className="bh-header">
          <div className="bh-header-left">
            <button className="bh-back-btn" onClick={() => history.goBack()}>← Back</button>
            <div>
              <h1 className="bh-title">My Bookings</h1>
              <p className="bh-sub">
                {user ? `Welcome, ${user.name || user.email}` : 'Your booking history'} · {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button className="bh-book-btn" onClick={() => history.push('/bookservice')}>
            + Book New Service
          </button>
        </div>

        {/* Filter tabs */}
        <div className="bh-filters">
          {(['all', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const).map(f => (
            <button key={f} className={`bh-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : STATUS_LABELS[f as StoredBooking['status']]}
              {f === 'all' && <span className="bh-filter-count">{bookings.length}</span>}
              {f !== 'all' && <span className="bh-filter-count">{bookings.filter(b => b.status === f).length}</span>}
            </button>
          ))}
        </div>

        {/* Booking list */}
        {filtered.length === 0 ? (
          <div className="bh-empty">
            <div className="bh-empty-icon">📋</div>
            <div className="bh-empty-title">No bookings found</div>
            <div className="bh-empty-sub">
              {filter === 'all' ? "You haven't booked any services yet." : `No ${STATUS_LABELS[filter as StoredBooking['status']].toLowerCase()} bookings.`}
            </div>
            <button className="bh-book-btn" onClick={() => history.push('/bookservice')}>
              Book Your First Service
            </button>
          </div>
        ) : (
          <div className="bh-list">
            {filtered.map(booking => {
              const isExpanded = expandedId === booking.bookingId;
              const dateLabel = new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
              return (
                <div key={booking.bookingId} className={`bh-card ${isExpanded ? 'expanded' : ''}`}>
                  {/* Card header */}
                  <div className="bh-card-header" onClick={() => setExpandedId(isExpanded ? null : booking.bookingId)}>
                    <div className="bh-card-left">
                      <div className="bh-card-id">#{booking.bookingId}</div>
                      <div className="bh-card-services">
                        {booking.services.slice(0, 2).map((s, i) => <span key={i} className="bh-service-chip">{s.name}</span>)}
                        {booking.services.length > 2 && <span className="bh-service-chip-more">+{booking.services.length - 2} more</span>}
                      </div>
                      <div className="bh-card-meta">
                        📅 {dateLabel} &nbsp;·&nbsp; ⏰ {booking.timeSlot} &nbsp;·&nbsp;
                        💳 {booking.paymentMethod === 'cod' ? 'COD' : 'Razorpay'}
                      </div>
                    </div>
                    <div className="bh-card-right">
                      <div className="bh-card-amount">₹{booking.total}</div>
                      <div
                        className="bh-card-status"
                        style={{ background: STATUS_COLORS[booking.status] + '22', color: STATUS_COLORS[booking.status] }}
                      >
                        {STATUS_LABELS[booking.status]}
                      </div>
                      <div className="bh-card-chevron">{isExpanded ? '▲' : '▼'}</div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="bh-card-body">
                      <div className="bh-detail-grid">
                        <div className="bh-detail-section">
                          <div className="bh-detail-label">Services Booked</div>
                          <table className="bh-services-table">
                            <thead><tr><th>Service</th><th>Option</th><th>Amount</th></tr></thead>
                            <tbody>
                              {booking.services.map((s, i) => (
                                <tr key={i}><td>{s.name}</td><td>{s.variant}</td><td>₹{s.price}</td></tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="bh-detail-section">
                          <div className="bh-detail-label">Address</div>
                          <div className="bh-detail-addr">
                            <strong>{booking.address.name}</strong><br />
                            {booking.address.phone}<br />
                            {booking.address.addressLine}<br />
                            {booking.address.city} — {booking.address.pinCode}
                            {booking.address.landmark && <><br />Near: {booking.address.landmark}</>}
                          </div>
                        </div>

                        <div className="bh-detail-section">
                          <div className="bh-detail-label">Bill Summary</div>
                          <div className="bh-bill">
                            <div className="bh-bill-row"><span>Subtotal</span><span>₹{booking.subtotal}</span></div>
                            {booking.discount > 0 && (
                              <div className="bh-bill-row green"><span>Coupon ({booking.couponCode})</span><span>−₹{booking.discount}</span></div>
                            )}
                            <div className="bh-bill-row"><span>GST (18%)</span><span>₹{booking.gst}</span></div>
                            <div className="bh-bill-row total"><span>Total</span><span>₹{booking.total}</span></div>
                          </div>
                        </div>

                        <div className="bh-detail-section">
                          <div className="bh-detail-label">Service Professional</div>
                          <div className="bh-provider-card">
                            <span className="bh-prov-avatar">👨‍🔧</span>
                            <div>
                              <div className="bh-prov-name">{booking.providerName}</div>
                              <div className="bh-prov-id">ID: {booking.providerId}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bh-card-actions">
                        <button className="bh-action-btn print" onClick={() => printBooking(booking)}>
                          🖨️ Print Invoice
                        </button>
                        {booking.status === 'confirmed' && (
                          <button className="bh-action-btn cancel" onClick={() => {
                            const updated = bookings.map(b => b.bookingId === booking.bookingId ? { ...b, status: 'cancelled' as const } : b);
                            setBookings(updated);
                            localStorage.setItem('helperland_bookings', JSON.stringify(updated));
                          }}>
                            ✕ Cancel Booking
                          </button>
                        )}
                        <button className="bh-action-btn rebook" onClick={() => history.push('/bookservice')}>
                          🔄 Book Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <SecondFooter />
    </>
  );
};

export default BookingHistory;
