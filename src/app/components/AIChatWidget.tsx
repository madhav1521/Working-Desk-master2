import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────────
   KNOWLEDGE BASE
   ───────────────────────────────────────────────────────────────────────────── */

const SERVICES_KB = [
  { id: 'home_cleaning',  name: 'Home Cleaning',     icon: '🧹', price: '₹500/hr',  minHours: 3, desc: 'Deep cleaning for every room — kitchen, bedroom, living room, bathroom', keywords: ['home','house','room','clean','deep','kitchen','bedroom','bathroom','living','sweep','mop'] },
  { id: 'fan_service',    name: 'Fan Service',        icon: '🌀', price: '₹300/hr',  minHours: 1, desc: 'Ceiling fan cleaning, repair & installation', keywords: ['fan','ceiling fan','exhaust','blade','rotate','wobble','fan cleaning'] },
  { id: 'cupboard',       name: 'Cupboard Service',   icon: '🗄️', price: '₹400/hr',  minHours: 1, desc: 'Cupboard deep cleaning & organisation', keywords: ['cupboard','wardrobe','almirah','cabinet','shelf','organis','closet'] },
  { id: 'bed',            name: 'Bed Service',         icon: '🛏️', price: '₹350/hr',  minHours: 1, desc: 'Mattress cleaning & bed bug treatment', keywords: ['bed','mattress','bed bug','linen','pillow','sleep','sheet'] },
  { id: 'ceiling',        name: 'Ceiling Service',    icon: '🔝', price: '₹600/hr',  minHours: 2, desc: 'Ceiling cleaning, painting & false ceiling repair', keywords: ['ceiling','false ceiling','roof','pop','plaster'] },
  { id: 'electrical',     name: 'Electrical Service', icon: '⚡', price: '₹400/hr',  minHours: 1, desc: 'Wiring repair, switch/socket fix & light installation', keywords: ['electric','wire','switch','socket','light','bulb','fitting','mcb','short circuit','power'] },
  { id: 'plumbing',       name: 'Plumbing Service',   icon: '🔧', price: '₹450/hr',  minHours: 1, desc: 'Pipe repair, tap installation & drain cleaning', keywords: ['plumb','pipe','tap','drain','leak','toilet','flush','sink','water','sewage'] },
  { id: 'ac',             name: 'AC Service',          icon: '❄️', price: '₹700/hr',  minHours: 1, desc: 'AC cleaning, repair, gas refill & installation', keywords: ['ac','air condition','cooling','split','window ac','gas','refrigerant','cooling unit'] },
  { id: 'appliance',      name: 'Appliance Repair',   icon: '🔩', price: '₹500/hr',  minHours: 1, desc: 'Washing machine, fridge, microwave, geyser repair', keywords: ['appliance','washing machine','fridge','refrigerator','microwave','geyser','oven','dishwasher','dryer'] },
  { id: 'pest',           name: 'Pest Control',       icon: '🐛', price: '₹800',     minHours: 2, desc: 'Cockroach, termite, mosquito & rodent control', keywords: ['pest','cockroach','termite','mosquito','rat','rodent','insect','spider','ant','bed bug','lizard'] },
  { id: 'painting',       name: 'Painting',           icon: '🎨', price: '₹1000/hr', minHours: 4, desc: 'Interior, exterior & texture painting', keywords: ['paint','painting','colour','color','wall','interior','exterior','texture','polish'] },
  { id: 'carpentry',      name: 'Carpentry',          icon: '🪚', price: '₹500/hr',  minHours: 1, desc: 'Furniture repair, door fix & cabinet making', keywords: ['carpent','furniture','door','wood','hinge','lock','chair','table','repair furniture'] },
];

const TIPS_KB: Record<string, string[]> = {
  fan: [
    '🌀 Always turn off and let the fan completely stop before cleaning.',
    '🧽 Wipe each blade with a damp microfiber cloth — it traps dust perfectly.',
    '🪣 Mix mild dish soap + warm water for stubborn grease on blades.',
    '⏰ Clean ceiling fans every 2–4 weeks to prevent dust buildup.',
    '🔧 Wobbling fan? Tighten the blade bracket screws — usually solves it.',
    '🛡️ Use a pillowcase over each blade to catch falling dust while wiping.',
  ],
  kitchen: [
    '🍳 Wipe the stovetop after every use — prevents grease buildup.',
    '🧴 Mix white vinegar + baking soda to clean your sink naturally.',
    '🎯 Clean microwave: heat a bowl of lemon water for 3 mins, then wipe.',
    '🧊 Defrost your fridge every 6 months for better efficiency.',
    '💨 Wash the kitchen exhaust hood filter monthly in hot soapy water.',
    '🧂 Sprinkle baking soda in the oven, spray vinegar, leave overnight, wipe clean.',
  ],
  bathroom: [
    '🚿 Spray tiles with white vinegar, wait 5 minutes, then scrub effortlessly.',
    '🪥 Pour baking soda + vinegar into the toilet bowl weekly — keeps it fresh.',
    '💧 Prevent mould by leaving the bathroom fan on for 15 mins after a shower.',
    '🪣 Use a squeegee on glass shower doors after every use — no water marks.',
    '🧽 Disinfect tap handles and light switches — high-touch germ hotspots.',
    '🧴 Unclog a slow drain: pour baking soda, then vinegar, wait, flush hot water.',
  ],
  general: [
    '🪟 Clean windows on a cloudy day — sunlight dries the solution too fast.',
    '🧺 Always vacuum before mopping for the best floor results.',
    '🌿 Place indoor plants like Peace Lily to naturally improve air quality.',
    '📅 Schedule a professional deep clean every 3 months for a healthy home.',
    '🧴 Use microfiber cloths — they capture 99% more bacteria than cotton.',
    '🎧 Put on a playlist and clean room by room — much less overwhelming!',
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */

interface ChatMessage {
  id: string;
  from: 'user' | 'ai';
  text: string;
  time: Date;
  chips?: string[];
  navAction?: string;
}

type Intent =
  | 'greeting' | 'bye' | 'services' | 'specific_service' | 'pricing'
  | 'booking' | 'cancel' | 'partner' | 'contact' | 'payment'
  | 'availability' | 'tips' | 'track' | 'rating' | 'about' | 'unknown';

/* ─────────────────────────────────────────────────────────────────────────────
   INTENT DETECTION
   ───────────────────────────────────────────────────────────────────────────── */

function detectIntent(msg: string): Intent {
  const m = msg.toLowerCase();
  if (/\b(hi|hello|hey|howdy|hii|helo|namaste|good morning|good evening|good afternoon|start)\b/.test(m)) return 'greeting';
  if (/\b(bye|goodbye|thank you|thanks|see you|tata|cya|done|ok bye)\b/.test(m)) return 'bye';
  if (/\b(tip|tips|advice|how to clean|trick|tricks|suggestion|diy|myself)\b/.test(m)) return 'tips';
  if (/\b(track|status|where|my booking|order status|is it confirmed)\b/.test(m)) return 'track';
  if (/\b(rate|rating|review|feedback|experience|stars|star)\b/.test(m)) return 'rating';
  if (/\b(about|who are you|what is helperland|helperland|company|founded|history)\b/.test(m)) return 'about';
  if (/\b(price|cost|how much|charges|fee|rate|rates|expensive|cheap|affordable|budget)\b/.test(m)) return 'pricing';
  if (/\b(book|booking|schedule|appointment|hire|want|need|get|order)\b/.test(m)) return 'booking';
  if (/\b(cancel|cancellation|reschedule|change|modify|postpone|refund|money back)\b/.test(m)) return 'cancel';
  if (/\b(partner|join|service provider|register|work with|apply|become|career|job|freelance)\b/.test(m)) return 'partner';
  if (/\b(contact|phone|call|email|support|agent|human|talk|chat|reach)\b/.test(m)) return 'contact';
  if (/\b(pay|payment|upi|card|razorpay|netbanking|wallet|cash|online pay)\b/.test(m)) return 'payment';
  if (/\b(area|available|city|postcode|postal|location|serve|coverage|pincode|region)\b/.test(m)) return 'availability';
  if (/\b(service|services|offer|provide|what|which|list|available service)\b/.test(m)) return 'services';
  if (matchService(m)) return 'specific_service';
  return 'unknown';
}

function matchService(msg: string) {
  const lower = msg.toLowerCase();
  return SERVICES_KB.find((s) => s.keywords.some((k) => lower.includes(k)));
}

function matchTip(msg: string): string[] {
  const m = msg.toLowerCase();
  if (m.includes('fan')) return TIPS_KB.fan;
  if (m.includes('kitchen') || m.includes('stovetop') || m.includes('microwave') || m.includes('fridge')) return TIPS_KB.kitchen;
  if (m.includes('bathroom') || m.includes('toilet') || m.includes('shower') || m.includes('tile')) return TIPS_KB.bathroom;
  return TIPS_KB.general;
}

/* ─────────────────────────────────────────────────────────────────────────────
   RESPONSE GENERATOR
   ───────────────────────────────────────────────────────────────────────────── */

interface AIResponse {
  text: string;
  chips?: string[];
  navAction?: string;
}

function generateResponse(msg: string): AIResponse {
  const intent = detectIntent(msg);
  const service = matchService(msg);

  switch (intent) {
    case 'greeting':
      return {
        text: "Hey there! 👋 I'm **Helpa**, your AI home services assistant from Helperland.\n\nI can help you explore our **12 home services**, check pricing, get pro cleaning tips, or guide you through booking. What do you need today?",
        chips: ['Show all services', 'Book a service', 'Pricing info', 'Cleaning tips'],
      };

    case 'bye':
      return {
        text: "Thanks for chatting! 😊 Remember — your home deserves the best care. I'm here **24/7** whenever you need help.\n\nHave a clean and happy day! 🏠✨",
        chips: ['Book a service', 'View prices'],
      };

    case 'about':
      return {
        text: "**Helperland** is India's trusted home services platform 🏠\n\nWe connect homeowners with **500+ vetted professionals** across 15+ cities. From deep cleaning to AC repair, pest control to painting — we've got your home covered.\n\n✅ **10,000+ happy customers**\n⭐ **4.8/5 average rating**\n🏆 **Certified & insured professionals**",
        chips: ['View all services', 'Book now', 'Pricing'],
      };

    case 'services':
      return {
        text: "We offer **12 professional home services** 🏠\n\n🧹 Home Cleaning &nbsp; 🌀 Fan Service\n🗄️ Cupboard Service &nbsp; 🛏️ Bed Service\n🔝 Ceiling Service &nbsp; ⚡ Electrical\n🔧 Plumbing &nbsp; ❄️ AC Service\n🔩 Appliance Repair &nbsp; 🐛 Pest Control\n🎨 Painting &nbsp; 🪚 Carpentry\n\nAsk me about any of these and I'll give you full details!",
        chips: ['Home Cleaning', 'Fan Service', 'AC Service', 'Pest Control'],
        navAction: '/bookservice',
      };

    case 'specific_service':
      if (service) {
        return {
          text: `Great choice! Here's everything about **${service.name}**:\n\n${service.icon} **${service.name}**\n💰 Starting at **${service.price}**\n⏱️ Minimum **${service.minHours} hour(s)**\n\n📋 ${service.desc}\n\n✅ Certified professionals\n✅ Fully equipped with tools & supplies\n✅ Background-verified & insured\n\n🎁 **20% off** on your first booking!`,
          chips: [`Book ${service.name}`, 'Pricing info', 'Other services', 'Cleaning tips'],
          navAction: '/bookservice',
        };
      }
      return generateResponse('services');

    case 'pricing':
      if (service) {
        return {
          text: `**${service.name}** — Pricing Details:\n\n${service.icon} Starting at **${service.price}**\n⏱️ Minimum ${service.minHours} hour(s)\n🎁 **20% off** on first booking!\n✅ Transparent billing — no hidden charges\n💳 Pay online (UPI, card, netbanking) or cash`,
          chips: [`Book ${service.name}`, 'See all prices', 'Other services'],
          navAction: '/prices',
        };
      }
      return {
        text: "Here's our **pricing overview** 💰\n\n🧹 Home Cleaning — ₹500/hr\n🌀 Fan Service — ₹300/hr\n🗄️ Cupboard Service — ₹400/hr\n🛏️ Bed Service — ₹350/hr\n🔝 Ceiling Service — ₹600/hr\n⚡ Electrical — ₹400/hr\n🔧 Plumbing — ₹450/hr\n❄️ AC Service — ₹700/hr\n🔩 Appliance Repair — ₹500/hr\n🐛 Pest Control — ₹800\n🎨 Painting — ₹1000/hr\n🪚 Carpentry — ₹500/hr\n\n🎁 **20% off** on your first booking! No hidden charges.",
        chips: ['Book a service', 'Home Cleaning', 'AC Service', 'Pest Control'],
        navAction: '/prices',
      };

    case 'booking':
      return {
        text: "Booking with Helperland is **super easy** 🚀\n\n**Step 1 📍** Enter your postal code — we check instant availability\n**Step 2 📋** Choose service, date, time & add-ons (e.g. inside fridge, laundry)\n**Step 3 💳** Pay securely — UPI, card, net banking or wallet\n**Step 4 🏠** Sit back! Our professional arrives on time.\n\n⏱️ Takes less than **3 minutes** to book. Ready to go?",
        chips: ['Book now →', 'View prices first', 'Which services?', 'Contact support'],
        navAction: '/bookservice',
      };

    case 'cancel':
      return {
        text: "To **cancel or reschedule** a booking:\n\n1️⃣ Log in to your account\n2️⃣ Go to **Upcoming Services**\n3️⃣ Click the booking → select **Cancel** or **Reschedule**\n\n⚠️ **Cancellation policy:**\n• Cancel 4+ hrs before: Full refund ✅\n• Cancel within 4 hrs: 50% cancellation charge\n\nNeed urgent help? Contact our support team directly.",
        chips: ['Contact support', 'Book new service', 'View prices'],
      };

    case 'partner':
      return {
        text: "🤝 Join our team as a **Service Partner!**\n\nWhy partner with Helperland?\n💼 **Flexible schedule** — work when you want\n💰 **Great earnings** — weekly direct payouts\n📈 **Grow your business** — loyal customer base\n🛡️ **Full support** — training + insurance coverage\n📱 **Easy app** — manage jobs from your phone\n\n**500+ partners** already earning with us!\nAverage partner earns ₹25,000–₹50,000/month 💰",
        chips: ['Apply as partner →', 'Contact us', 'View services', 'Pricing info'],
        navAction: '/pro',
      };

    case 'contact':
      return {
        text: "Our team is happy to help! 💬\n\n📧 **Email:** support@helperland.com\n📞 **Phone:** +91 77730 86677\n⏰ **Hours:** Mon–Sat, 9AM–7PM\n\n💬 You're already chatting with **Helpa AI** (me!) — I can resolve most queries instantly.\n\nFor urgent booking issues, please call us directly.",
        chips: ['Book a service', 'Pricing info', 'Cleaning tips', 'About Helperland'],
        navAction: '/contact',
      };

    case 'payment':
      return {
        text: "We support **all major payment methods** 💳\n\n📱 **UPI** — GPay, PhonePe, Paytm, BHIM\n💳 **Credit / Debit Card** — Visa, Mastercard, RuPay\n🌐 **Net Banking** — all major banks\n👜 **Digital Wallets** — Paytm, Amazon Pay\n💵 **Cash on Delivery** (select areas)\n\n🔒 All online payments are powered by **Razorpay** — bank-grade security. Your card info is never stored on our servers.",
        chips: ['Book now', 'Pricing info', 'Other questions?'],
      };

    case 'availability':
      return {
        text: "We serve **15+ cities** across India 📍\n\nCurrently available in:\n🏙️ Surat &nbsp; Mumbai &nbsp; Ahmedabad\n🏙️ Pune &nbsp; Bangalore &nbsp; Delhi\n🏙️ Hyderabad &nbsp; Chennai &nbsp; Jaipur\n🏙️ Surat &nbsp; Vadodara &nbsp; Rajkot\n\n📌 **More cities added every month!**\n\nTo check if we serve your specific area, enter your **postal code** when booking — takes 5 seconds.",
        chips: ['Book a service', 'Check pricing', 'Contact us'],
        navAction: '/bookservice',
      };

    case 'track':
      return {
        text: "To **track your booking** 📦\n\n1️⃣ Log in to your account\n2️⃣ Go to **Upcoming Services** to see active bookings\n3️⃣ Go to **Service History** to see past bookings\n\nYou'll also receive **email & SMS notifications** at every status change:\n✅ Booking Confirmed\n✅ Service Provider Assigned\n✅ Professional On the Way\n✅ Service Completed",
        chips: ['Book a service', 'Contact support', 'Rate my experience'],
      };

    case 'rating':
      return {
        text: "We love hearing from you! ⭐\n\nTo **rate & review** your experience:\n\n1️⃣ Go to **Service History**\n2️⃣ Click the completed booking\n3️⃣ Give a **1–5 star rating** and write a review\n\nYour feedback helps our professionals improve and helps other customers choose wisely!\n\n📊 Current average: **4.8/5 stars** from 10,000+ reviews",
        chips: ['Book again', 'View services', 'Contact support'],
      };

    case 'tips': {
      const tips = matchTip(msg);
      const picked = [...tips].sort(() => Math.random() - 0.5).slice(0, 4);
      return {
        text: `Here are **pro cleaning tips** from our experts 🧹✨\n\n${picked.join('\n')}\n\n💡 Want guaranteed professional results? Book our experts today!`,
        chips: ['Book cleaning', 'More tips (fan)', 'More tips (kitchen)', 'View all services'],
      };
    }

    default:
      return {
        text: "Hmm, I didn't quite catch that 😊 I'm best at helping with:\n\n🏠 **Services & Pricing** — what we offer and how much\n📅 **Booking** — how to schedule a service\n🧹 **Cleaning Tips** — expert DIY advice\n❓ **FAQs** — cancellations, payments, availability\n🤝 **Partnerships** — join our service provider network\n\nWhat would you like to know?",
        chips: ['Show all services', 'Pricing info', 'How to book', 'Cleaning tips'],
      };
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — convert **bold** and \n to HTML (safe — AI controls content)
   ───────────────────────────────────────────────────────────────────────────── */

function renderText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  // Greeting when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        const r = generateResponse('hello');
        setMessages([
          {
            id: '0',
            from: 'ai',
            text: r.text,
            time: new Date(),
            chips: r.chips,
            navAction: r.navAction,
          },
        ]);
      }, 900);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input after open animation
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isOpen]);

  const pushAI = useCallback((text: string, chips?: string[], navAction?: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: 'ai', text, time: new Date(), chips, navAction },
    ]);
  }, []);

  const handleSend = useCallback(
    (msg: string) => {
      if (!msg.trim()) return;
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), from: 'user', text: msg.trim(), time: new Date() },
      ]);
      setInput('');
      setIsTyping(true);

      // Realistic variable delay
      const delay = 750 + Math.random() * 650;
      setTimeout(() => {
        setIsTyping(false);
        const res = generateResponse(msg);
        pushAI(res.text, res.chips, res.navAction);
      }, delay);
    },
    [pushAI]
  );

  const handleChip = (chip: string, navAction?: string) => {
    // Navigation chips go directly — no need to echo them as messages
    const lower = chip.toLowerCase();
    if (lower.includes('book now') || lower.startsWith('book ')) {
      history.push('/bookservice');
      return;
    }
    if (lower.includes('view prices') || lower.includes('see all prices') || lower.includes('pricing info')) {
      history.push('/prices');
      return;
    }
    if (lower.includes('apply as partner') || lower.includes('become our service partner')) {
      history.push('/pro');
      return;
    }
    if (lower.includes('contact support') || lower.includes('contact us')) {
      history.push('/contact');
      return;
    }
    // All others → send as message
    handleSend(chip);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const toggleChat = () => {
    setIsOpen((o) => !o);
    setHasUnread(false);
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        className={`helpa-fab ${isOpen ? 'helpa-fab--open' : ''} ${hasUnread && !isOpen ? 'helpa-fab--pulse' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat Support'}
        title={isOpen ? 'Close chat' : 'Chat with Helpa AI'}
      >
        <span className="helpa-fab-icon">{isOpen ? '✕' : '💬'}</span>
        {hasUnread && !isOpen && <span className="helpa-fab-badge">1</span>}
      </button>

      {/* ── Chat window ── */}
      <div className={`helpa-window ${isOpen ? 'helpa-window--open' : ''}`} aria-hidden={!isOpen}>
        {/* Header */}
        <div className="helpa-header">
          <div className="helpa-header-avatar">
            <span>🤖</span>
            <span className="helpa-online-dot" title="Online"></span>
          </div>
          <div className="helpa-header-text">
            <h4 className="helpa-header-name">Helpa AI</h4>
            <p className="helpa-header-status">Your Home Services Assistant · Always Online</p>
          </div>
          <button className="helpa-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>
        </div>

        {/* Welcome bar */}
        <div className="helpa-welcome-bar">
          ⚡ Instant answers · 🏠 12 services · 📍 15+ cities
        </div>

        {/* Messages */}
        <div className="helpa-messages" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`helpa-msg helpa-msg--${msg.from}`}>
              {msg.from === 'ai' && (
                <div className="helpa-msg-avatar" aria-hidden="true">🤖</div>
              )}
              <div className="helpa-msg-body">
                <div
                  className="helpa-bubble"
                  dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
                />
                {/* Action chips */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="helpa-chips">
                    {msg.chips.map((chip) => (
                      <button
                        key={chip}
                        className="helpa-chip"
                        onClick={() => handleChip(chip, msg.navAction)}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="helpa-msg helpa-msg--ai">
              <div className="helpa-msg-avatar" aria-hidden="true">🤖</div>
              <div className="helpa-msg-body">
                <div className="helpa-typing" aria-label="Helpa is typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested starters (only before first user message) */}
        {messages.length <= 1 && !isTyping && (
          <div className="helpa-starters">
            {['What services do you offer?', 'How much does AC service cost?', 'Give me cleaning tips', 'How do I book?'].map((q) => (
              <button key={q} className="helpa-starter-chip" onClick={() => handleSend(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="helpa-input-row">
          <input
            ref={inputRef}
            type="text"
            className="helpa-input"
            placeholder="Ask me anything about home services..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            maxLength={300}
            aria-label="Chat message input"
          />
          <button
            className="helpa-send-btn"
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            aria-label="Send"
          >
            ➤
          </button>
        </div>

        <div className="helpa-footer">
          Powered by <strong>Helpa AI</strong> 🤖 · Helperland
        </div>
      </div>
    </>
  );
}

export default AIChatWidget;
