import React, { useState, useCallback } from 'react';
import { SERVICE_CATALOG, ServiceCategory, ServiceItem, ServiceVariant, ServiceExtra, CartItem } from './catalog-data';
import BookingCheckout from './BookingCheckout';

// ─── Star Rating ────────────────────────────────────────────────────────────────

const StarRating: React.FC<{ rating: number; small?: boolean }> = ({ rating, small }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const size = small ? 11 : 13;
  return (
    <span className="svc-stars" style={{ fontSize: size }}>
      {Array.from({ length: full }).map((_, i) => <span key={i} style={{ color: '#f59e0b' }}>★</span>)}
      {half && <span style={{ color: '#f59e0b' }}>★</span>}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => <span key={i} style={{ color: '#d1d5db' }}>★</span>)}
    </span>
  );
};

// ─── Service Detail Panel ──────────────────────────────────────────────────────

const ServiceDetailPanel: React.FC<{
  category: ServiceCategory;
  service: ServiceItem;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}> = ({ category, service, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState<ServiceVariant>(service.variants[0]);
  const [selectedExtras, setSelectedExtras] = useState<ServiceExtra[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [showAllIncludes, setShowAllIncludes] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const toggleExtra = (extra: ServiceExtra) => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id) ? prev.filter(e => e.id !== extra.id) : [...prev, extra]
    );
  };

  const totalPrice = selectedVariant.price + selectedExtras.reduce((s, e) => s + e.price, 0);

  const handleAddToCart = () => {
    onAddToCart({
      categoryId: category.id,
      categoryName: category.name,
      serviceId: service.id,
      serviceName: service.name,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      price: totalPrice,
      originalPrice: selectedVariant.originalPrice,
      extras: selectedExtras.map(e => ({ id: e.id, name: e.name, price: e.price })),
    });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1800);
  };

  const discPct = selectedVariant.originalPrice
    ? Math.round((1 - selectedVariant.price / selectedVariant.originalPrice) * 100)
    : 0;

  return (
    <div className="svc-detail-panel">
      {/* Hero */}
      <div className="svc-detail-hero">
        {!showVideo ? (
          <div className="svc-detail-img" style={{ background: `linear-gradient(135deg, ${category.bgColor} 0%, ${category.color}33 100%)` }}>
            <span className="svc-detail-hero-icon">{service.icon}</span>
            {service.videoEmbed && (
              <button className="svc-play-btn" onClick={() => setShowVideo(true)}>▶ Watch Demo</button>
            )}
          </div>
        ) : (
          <div className="svc-detail-video">
            <iframe src={service.videoEmbed} title="Service demo" allow="autoplay; encrypted-media" allowFullScreen />
            <button className="svc-close-video" onClick={() => setShowVideo(false)}>✕ Close</button>
          </div>
        )}
      </div>

      {/* Header row */}
      <div className="svc-detail-header">
        <div>
          <h2 className="svc-detail-name">{service.name}</h2>
          <div className="svc-detail-meta">
            <StarRating rating={service.rating} />
            <span className="svc-detail-rating-num">{service.rating}</span>
            <span className="svc-detail-reviews">({service.reviewCount} reviews)</span>
            <span className="svc-detail-sep">·</span>
            <span className="svc-detail-duration">⏱ {service.duration}</span>
          </div>
        </div>
        <div className="svc-detail-price-box">
          <span className="svc-detail-price">₹{selectedVariant.price}</span>
          {selectedVariant.originalPrice && <span className="svc-detail-orig">₹{selectedVariant.originalPrice}</span>}
          {discPct > 0 && <span className="svc-detail-disc">{discPct}% OFF</span>}
        </div>
      </div>

      <p className="svc-detail-desc">{service.shortDesc}</p>

      {/* Applicable coupons */}
      {category.coupons.length > 0 && (
        <div className="svc-coupons-block">
          <div className="svc-coupons-title">🏷️ Applicable Coupons</div>
          <div className="svc-coupons-row">
            {category.coupons.map(c => (
              <div key={c.code} className="svc-coupon-tag">
                <span className="coupon-code">{c.code}</span>
                <span className="coupon-desc">{c.discountPct}% off</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Includes */}
      <div className="svc-includes-block">
        <div className="svc-includes-title">✅ What's Included</div>
        <ul className="svc-includes-list">
          {(showAllIncludes ? service.includes : service.includes.slice(0, 3)).map((inc, i) => (
            <li key={i}>{inc}</li>
          ))}
        </ul>
        {service.includes.length > 3 && (
          <button className="svc-see-more" onClick={() => setShowAllIncludes(!showAllIncludes)}>
            {showAllIncludes ? 'See less ▲' : `+${service.includes.length - 3} more ▼`}
          </button>
        )}
      </div>

      {/* Variants */}
      <div className="svc-variants-block">
        <div className="svc-variants-title">Select Option</div>
        <div className="svc-variants-grid">
          {service.variants.map(v => (
            <button
              key={v.id}
              className={`svc-variant-btn ${selectedVariant.id === v.id ? 'selected' : ''}`}
              onClick={() => setSelectedVariant(v)}
              style={selectedVariant.id === v.id ? { borderColor: category.color, background: category.bgColor } : {}}
            >
              <span className="var-name">{v.name}</span>
              <span className="var-price" style={selectedVariant.id === v.id ? { color: category.color } : {}}>₹{v.price}</span>
              {v.originalPrice && <span className="var-orig">₹{v.originalPrice}</span>}
              {v.duration && <span className="var-dur">{v.duration}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Extras */}
      {service.extras.length > 0 && (
        <div className="svc-extras-block">
          <div className="svc-extras-title">🛎️ Add-on Services</div>
          <div className="svc-extras-list">
            {service.extras.map(extra => {
              const isSelected = selectedExtras.some(e => e.id === extra.id);
              return (
                <div key={extra.id} className={`svc-extra-item ${isSelected ? 'selected' : ''}`}>
                  <span className="extra-icon">{extra.icon}</span>
                  <div className="extra-info">
                    <span className="extra-name">{extra.name}</span>
                    {extra.duration && <span className="extra-dur">{extra.duration}</span>}
                  </div>
                  <span className="extra-price">+₹{extra.price}</span>
                  <button
                    className={`extra-add-btn ${isSelected ? 'added' : ''}`}
                    onClick={() => toggleExtra(extra)}
                    style={isSelected ? { background: category.color, borderColor: category.color } : {}}
                  >
                    {isSelected ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add to cart bar */}
      <div className="svc-add-cart-bar">
        <div className="svc-cart-total">
          <span className="cart-total-label">Total</span>
          <span className="cart-total-val">₹{totalPrice}</span>
          {selectedExtras.length > 0 && <span className="cart-total-extras">(incl. {selectedExtras.length} add-on{selectedExtras.length > 1 ? 's' : ''})</span>}
        </div>
        <button
          className={`svc-add-cart-btn ${addedFlash ? 'flash' : ''}`}
          onClick={handleAddToCart}
          style={{ background: addedFlash ? '#16a34a' : undefined }}
        >
          {addedFlash ? '✓ Added to Cart!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ─── Cart Panel ────────────────────────────────────────────────────────────────

const CartPanel: React.FC<{
  cartItems: CartItem[];
  onRemove: (idx: number) => void;
  onUpdateQty: (idx: number, delta: number) => void;
  onCheckout: () => void;
}> = ({ cartItems, onRemove, onUpdateQty, onCheckout }) => {
  const subtotal = cartItems.reduce((s, item) => s + item.price * item.quantity, 0);
  const count = cartItems.reduce((s, i) => s + i.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-panel cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <div className="cart-empty-title">Your cart is empty</div>
        <div className="cart-empty-sub">Add services to get started</div>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <span className="cart-title">🛒 My Cart</span>
        <span className="cart-count">{count} item{count !== 1 ? 's' : ''}</span>
      </div>
      <div className="cart-items">
        {cartItems.map((item, idx) => (
          <div key={idx} className="cart-item">
            <div className="cart-item-top">
              <div className="cart-item-info">
                <div className="cart-item-name">{item.serviceName}</div>
                <div className="cart-item-variant">{item.categoryName} · {item.variantName}</div>
                {item.extras.length > 0 && <div className="cart-item-extras">+ {item.extras.map(e => e.name).join(', ')}</div>}
              </div>
              <button className="cart-remove" onClick={() => onRemove(idx)} title="Remove">✕</button>
            </div>
            <div className="cart-item-bottom">
              <div className="cart-qty-ctrl">
                <button onClick={() => onUpdateQty(idx, -1)} disabled={item.quantity <= 1}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQty(idx, 1)}>+</button>
              </div>
              <div className="cart-item-price">
                ₹{item.price * item.quantity}
                {item.originalPrice && item.quantity === 1 && <span className="cart-item-orig">₹{item.originalPrice}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-subtotal"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="cart-discount-note">💡 Coupons & discounts applied at checkout</div>
        <button className="cart-checkout-btn" onClick={onCheckout}>Proceed to Checkout →</button>
        <p className="cart-safe-note">🔒 Secure booking · Free cancellation</p>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const ServiceBookingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(SERVICE_CATALOG[0]);
  const [activeService, setActiveService] = useState<ServiceItem>(SERVICE_CATALOG[0].services[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const selectCategory = (cat: ServiceCategory) => {
    setActiveCategory(cat);
    setActiveService(cat.services[0]);
  };

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const idx = prev.findIndex(c => c.serviceId === item.serviceId && c.variantId === item.variantId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = (idx: number) => setCartItems(prev => prev.filter((_, i) => i !== idx));
  const updateQty = (idx: number, delta: number) => setCartItems(prev =>
    prev.map((item, i) => i !== idx ? item : item.quantity + delta <= 0 ? item : { ...item, quantity: item.quantity + delta })
  );

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

    return (
    <div className="sbp-root">

      {/* Mobile cart fab */}
      {cartCount > 0 && (
        <button className="sbp-mobile-cart-fab" onClick={() => setShowMobileCart(true)}>
          🛒 {cartCount} item{cartCount !== 1 ? 's' : ''} — View Cart
        </button>
      )}

      {/* Mobile cart drawer */}
      {showMobileCart && (
        <div className="sbp-mobile-cart-overlay" onClick={() => setShowMobileCart(false)}>
          <div className="sbp-mobile-cart-drawer" onClick={e => e.stopPropagation()}>
            <button className="sbp-mobile-cart-close" onClick={() => setShowMobileCart(false)}>✕ Close</button>
            <CartPanel
              cartItems={cartItems}
              onRemove={removeFromCart}
              onUpdateQty={updateQty}
              onCheckout={() => { setShowMobileCart(false); setShowCheckout(true); }}
            />
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="sbp-page-header">
        <div className="sbp-header-inner">
          <h1 className="sbp-page-title">Our Services</h1>
          <p className="sbp-page-sub">Professional home services at your doorstep — all prices in ₹ INR</p>
        </div>
      </div>

      <div className="sbp-layout">
        {/* LEFT sidebar */}
        <aside className="sbp-left">
          <div className="sbp-cat-label">Categories</div>
          {SERVICE_CATALOG.map(cat => (
            <button
              key={cat.id}
              className={`sbp-cat-btn ${activeCategory.id === cat.id ? 'active' : ''}`}
              onClick={() => selectCategory(cat)}
              style={activeCategory.id === cat.id ? { borderColor: cat.color, background: cat.bgColor, color: cat.color } : {}}
            >
              <span className="sbp-cat-icon">{cat.icon}</span>
              <span className="sbp-cat-name">{cat.name}</span>
              <span className="sbp-cat-rating">
                <StarRating rating={cat.rating} small />
                <span>{cat.rating}</span>
              </span>
              <span className="sbp-cat-bookings">{cat.bookings} bookings</span>
            </button>
          ))}
        </aside>

        {/* CENTER */}
        <main className="sbp-center">
          {/* Service pills */}
          <div className="sbp-service-pills">
            {activeCategory.services.map(svc => {
              const discPct = svc.originalPrice ? Math.round((1 - svc.startingPrice / svc.originalPrice) * 100) : 0;
              return (
                <button
                  key={svc.id}
                  className={`sbp-pill ${activeService.id === svc.id ? 'active' : ''}`}
                  onClick={() => setActiveService(svc)}
                  style={activeService.id === svc.id ? { borderColor: activeCategory.color, color: activeCategory.color } : {}}
                >
                  {svc.icon} {svc.name}
                  {discPct > 0 && <span className="pill-disc" style={{ background: activeCategory.color }}>{discPct}% off</span>}
                </button>
              );
            })}
          </div>

          <ServiceDetailPanel
            key={activeService.id}
            category={activeCategory}
            service={activeService}
            onAddToCart={addToCart}
          />
        </main>

        {/* RIGHT cart */}
        <aside className="sbp-right">
          <CartPanel
            cartItems={cartItems}
            onRemove={removeFromCart}
            onUpdateQty={updateQty}
            onCheckout={() => setShowCheckout(true)}
          />
        </aside>
      </div>

      {/* Checkout */}
      {showCheckout && (
        <BookingCheckout
          cartItems={cartItems}
          categoryId={activeCategory.id}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => { setCartItems([]); setShowCheckout(false); }}
          onRemoveItem={removeFromCart}
          onUpdateQty={updateQty}
        />
      )}
    </div>
  );
};

export default ServiceBookingPage;
