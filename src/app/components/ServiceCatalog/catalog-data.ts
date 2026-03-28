export interface ServiceVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration?: string;
}

export interface ServiceExtra {
  id: string;
  name: string;
  icon: string;
  price: number;
  duration?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  rating: number;
  reviewCount: string;
  startingPrice: number;
  originalPrice?: number;
  duration: string;
  shortDesc: string;
  includes: string[];
  variants: ServiceVariant[];
  extras: ServiceExtra[];
  videoEmbed?: string;
}

export interface Coupon {
  code: string;
  discountPct: number;
  description: string;
  minOrder: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  rating: number;
  bookings: string;
  color: string;
  bgColor: string;
  coupons: Coupon[];
  services: ServiceItem[];
}

export const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'FIRST20', discountPct: 20, description: '20% off on first booking', minOrder: 500 },
  { code: 'HELPERLAND10', discountPct: 10, description: '10% off on all services', minOrder: 300 },
  { code: 'CLEAN50', discountPct: 50, description: '50% off on home cleaning', minOrder: 1000 },
  { code: 'SUMMER15', discountPct: 15, description: 'Summer special 15% off', minOrder: 400 },
];

export const SERVICE_CATALOG: ServiceCategory[] = [
  {
    id: 'sofa-carpet',
    name: 'Sofa & Carpet Cleaning',
    icon: '🛋️',
    rating: 4.85,
    bookings: '3.0M',
    color: '#7c3aed',
    bgColor: '#f3e8ff',
    coupons: [
      { code: 'SOFA20', discountPct: 20, description: '20% off on sofa cleaning', minOrder: 500 },
      { code: 'FIRST20', discountPct: 20, description: '20% off on first booking', minOrder: 400 },
    ],
    services: [
      {
        id: 'sofa-cleaning',
        name: 'Sofa Cleaning',
        icon: '🛋️',
        rating: 4.85,
        reviewCount: '491K',
        startingPrice: 449,
        originalPrice: 599,
        duration: '60 mins',
        shortDesc: 'Deep cleaning for all types of sofas using eco-friendly products.',
        includes: [
          'Dry vacuuming to remove crumbs & dirt particles',
          'Wet shampooing on fabric sofa to remove stains & spillages',
          'Hot water extraction for deep cleaning',
          'Deodorizing spray after cleaning',
        ],
        variants: [
          { id: '1-seater', name: '1 Seater', price: 299, originalPrice: 399, duration: '30 mins' },
          { id: '2-seater', name: '2 Seater', price: 449, originalPrice: 599, duration: '45 mins' },
          { id: '3-seater', name: '3 Seater', price: 599, originalPrice: 799, duration: '60 mins' },
          { id: '4-seater', name: '4 Seater', price: 749, originalPrice: 999, duration: '75 mins' },
          { id: '5-seater', name: '5 Seater', price: 899, originalPrice: 1199, duration: '90 mins' },
          { id: 'l-shaped', name: 'L-Shaped', price: 999, originalPrice: 1299, duration: '90 mins' },
          { id: 'recliner', name: 'Recliner (per seat)', price: 249, originalPrice: 349, duration: '30 mins' },
        ],
        extras: [
          { id: 'stain-removal', name: 'Stain Removal', icon: '🧴', price: 199, duration: '+20 mins' },
          { id: 'deodorize', name: 'Deodorize & Sanitize', icon: '✨', price: 149, duration: '+15 mins' },
          { id: 'foam-clean', name: 'Foam Deep Clean', icon: '🫧', price: 249, duration: '+30 mins' },
        ],
        videoEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 'carpet-cleaning',
        name: 'Carpet Cleaning',
        icon: '🪞',
        rating: 4.78,
        reviewCount: '210K',
        startingPrice: 349,
        originalPrice: 499,
        duration: '45 mins',
        shortDesc: 'Professional carpet cleaning with high-powered steam extraction.',
        includes: [
          'Pre-inspection for stains and soiling',
          'Hot water extraction cleaning',
          'Pre-treatment for tough stains',
          'Fast drying technique',
        ],
        variants: [
          { id: '4x6', name: '4×6 ft', price: 349, originalPrice: 499, duration: '30 mins' },
          { id: '6x9', name: '6×9 ft', price: 499, originalPrice: 699, duration: '45 mins' },
          { id: '8x10', name: '8×10 ft', price: 699, originalPrice: 899, duration: '60 mins' },
          { id: '10x12', name: '10×12 ft', price: 899, originalPrice: 1199, duration: '75 mins' },
        ],
        extras: [
          { id: 'stain-guard', name: 'Stain Guard Coating', icon: '🛡️', price: 299 },
          { id: 'deodorize', name: 'Deodorize', icon: '✨', price: 149 },
        ],
      },
      {
        id: 'mattress-cleaning',
        name: 'Mattress Cleaning',
        icon: '🛏️',
        rating: 4.82,
        reviewCount: '185K',
        startingPrice: 399,
        originalPrice: 549,
        duration: '45 mins',
        shortDesc: 'UV sanitization + deep cleaning for a hygienic sleep surface.',
        includes: [
          'UV sanitization to kill bacteria & dust mites',
          'Hot water extraction cleaning',
          'Stain pre-treatment',
          'Deodorizing spray',
        ],
        variants: [
          { id: 'single', name: 'Single', price: 399, originalPrice: 549, duration: '30 mins' },
          { id: 'double', name: 'Double / Queen', price: 549, originalPrice: 749, duration: '40 mins' },
          { id: 'king', name: 'King Size', price: 699, originalPrice: 949, duration: '50 mins' },
        ],
        extras: [
          { id: 'bed-bug', name: 'Bed Bug Treatment', icon: '🐛', price: 499 },
          { id: 'pillow-clean', name: 'Pillow Cleaning (pair)', icon: '🪆', price: 199 },
        ],
      },
    ],
  },

  {
    id: 'home-cleaning',
    name: 'Home Cleaning',
    icon: '🧹',
    rating: 4.80,
    bookings: '5.2M',
    color: '#059669',
    bgColor: '#d1fae5',
    coupons: [
      { code: 'CLEAN50', discountPct: 50, description: '50% off on first home cleaning', minOrder: 999 },
      { code: 'HOME15', discountPct: 15, description: '15% off on home cleaning', minOrder: 500 },
    ],
    services: [
      {
        id: 'full-home',
        name: 'Full Home Cleaning',
        icon: '🏠',
        rating: 4.80,
        reviewCount: '820K',
        startingPrice: 999,
        originalPrice: 1499,
        duration: '2–4 hrs',
        shortDesc: 'Complete home cleaning — kitchen, bathrooms, bedrooms & living areas.',
        includes: [
          'Sweeping and mopping all floors',
          'Dusting all surfaces and ceiling fans',
          'Bathroom scrubbing and disinfection',
          'Kitchen platform and sink cleaning',
          'Trash removal from all rooms',
        ],
        variants: [
          { id: '1bhk', name: '1 BHK', price: 999, originalPrice: 1499, duration: '2 hrs' },
          { id: '2bhk', name: '2 BHK', price: 1499, originalPrice: 1999, duration: '3 hrs' },
          { id: '3bhk', name: '3 BHK', price: 1999, originalPrice: 2499, duration: '4 hrs' },
          { id: '4bhk', name: '4 BHK', price: 2499, originalPrice: 2999, duration: '5 hrs' },
          { id: '5bhk', name: '5 BHK', price: 2999, originalPrice: 3999, duration: '6 hrs' },
        ],
        extras: [
          { id: 'inside-fridge', name: 'Inside Fridge Cleaning', icon: '❄️', price: 299 },
          { id: 'inside-oven', name: 'Inside Oven Cleaning', icon: '🔥', price: 199 },
          { id: 'inside-cabinets', name: 'Inside Cabinets', icon: '🗄️', price: 249 },
          { id: 'laundry', name: 'Laundry Wash & Dry', icon: '👕', price: 349 },
          { id: 'windows', name: 'Interior Windows', icon: '🪟', price: 199 },
        ],
      },
      {
        id: 'kitchen-cleaning',
        name: 'Kitchen Deep Clean',
        icon: '🍳',
        rating: 4.76,
        reviewCount: '320K',
        startingPrice: 599,
        originalPrice: 799,
        duration: '1.5–2 hrs',
        shortDesc: 'Intensive kitchen cleaning — chimney, stovetop, cabinets & sink.',
        includes: [
          'Chimney degreasing',
          'Stovetop & burner scrubbing',
          'Inside cabinet cleaning',
          'Sink de-scaling',
          'Tile & floor mopping',
        ],
        variants: [
          { id: 'small', name: 'Small Kitchen', price: 599, originalPrice: 799, duration: '1.5 hrs' },
          { id: 'medium', name: 'Medium Kitchen', price: 799, originalPrice: 1099, duration: '2 hrs' },
          { id: 'large', name: 'Large/Modular Kitchen', price: 999, originalPrice: 1399, duration: '2.5 hrs' },
        ],
        extras: [
          { id: 'chimney-service', name: 'Chimney Deep Clean', icon: '💨', price: 399 },
          { id: 'fridge-clean', name: 'Refrigerator Cleaning', icon: '🧊', price: 299 },
        ],
      },
      {
        id: 'bathroom-cleaning',
        name: 'Bathroom Deep Clean',
        icon: '🚿',
        rating: 4.74,
        reviewCount: '210K',
        startingPrice: 349,
        originalPrice: 499,
        duration: '45–60 mins',
        shortDesc: 'Tiles, toilet, sink, mirror — everything scrubbed and disinfected.',
        includes: [
          'Tile scrubbing and grout cleaning',
          'Toilet bowl disinfection',
          'Sink and tap descaling',
          'Mirror and glass polishing',
          'Floor mopping with disinfectant',
        ],
        variants: [
          { id: '1-bathroom', name: '1 Bathroom', price: 349, originalPrice: 499, duration: '45 mins' },
          { id: '2-bathrooms', name: '2 Bathrooms', price: 599, originalPrice: 849, duration: '80 mins' },
          { id: '3-bathrooms', name: '3 Bathrooms', price: 849, originalPrice: 1199, duration: '110 mins' },
        ],
        extras: [
          { id: 'anti-fungal', name: 'Anti-fungal Treatment', icon: '🛡️', price: 249 },
          { id: 'geyser-clean', name: 'Geyser Descaling', icon: '♨️', price: 199 },
        ],
      },
    ],
  },

  {
    id: 'fan-service',
    name: 'Fan Service',
    icon: '🌀',
    rating: 4.72,
    bookings: '1.8M',
    color: '#ea580c',
    bgColor: '#ffedd5',
    coupons: [
      { code: 'FAN10', discountPct: 10, description: '10% off on fan service', minOrder: 200 },
    ],
    services: [
      {
        id: 'ceiling-fan-clean',
        name: 'Ceiling Fan Cleaning',
        icon: '🌀',
        rating: 4.72,
        reviewCount: '98K',
        startingPrice: 149,
        originalPrice: 199,
        duration: '15 mins/fan',
        shortDesc: 'Professional ceiling fan cleaning with dust removal and blade polishing.',
        includes: [
          'Blade cleaning with damp microfiber cloth',
          'Regulator & body wipe-down',
          'Fan balanced check',
          'Motor oiling if needed',
        ],
        variants: [
          { id: '1-fan', name: '1 Fan', price: 149, originalPrice: 199, duration: '15 mins' },
          { id: '2-fans', name: '2 Fans', price: 249, originalPrice: 349, duration: '30 mins' },
          { id: '3-fans', name: '3 Fans', price: 349, originalPrice: 499, duration: '45 mins' },
          { id: '4-fans', name: '4 Fans', price: 449, originalPrice: 649, duration: '60 mins' },
          { id: '5-fans', name: '5 Fans', price: 549, originalPrice: 799, duration: '75 mins' },
        ],
        extras: [
          { id: 'regulator-repair', name: 'Regulator Repair', icon: '🔧', price: 149 },
          { id: 'capacitor-replace', name: 'Capacitor Replacement', icon: '⚡', price: 199 },
        ],
      },
      {
        id: 'fan-installation',
        name: 'Fan Installation',
        icon: '🔩',
        rating: 4.68,
        reviewCount: '45K',
        startingPrice: 249,
        originalPrice: 349,
        duration: '30 mins',
        shortDesc: 'Safe and quick ceiling fan installation with all fittings included.',
        includes: [
          'Mounting and wiring',
          'Hook installation if needed',
          'Test run and balancing',
          'Old fan removal (if applicable)',
        ],
        variants: [
          { id: 'standard', name: 'Standard Fan', price: 249, originalPrice: 349, duration: '30 mins' },
          { id: 'high-speed', name: 'High Speed / BLDC', price: 349, originalPrice: 499, duration: '45 mins' },
        ],
        extras: [
          { id: 'fan-removal', name: 'Old Fan Removal', icon: '🗑️', price: 99 },
          { id: 'hook-fitting', name: 'Hook Fitting', icon: '🪝', price: 149 },
        ],
      },
      {
        id: 'exhaust-fan',
        name: 'Exhaust Fan Service',
        icon: '💨',
        rating: 4.65,
        reviewCount: '32K',
        startingPrice: 199,
        originalPrice: 299,
        duration: '30 mins',
        shortDesc: 'Cleaning and servicing of kitchen and bathroom exhaust fans.',
        includes: [
          'Blade and grille cleaning',
          'Motor lubrication',
          'Airflow test',
          'Installation check',
        ],
        variants: [
          { id: '1-exhaust', name: '1 Exhaust Fan', price: 199, originalPrice: 299, duration: '30 mins' },
          { id: '2-exhausts', name: '2 Exhaust Fans', price: 349, originalPrice: 499, duration: '50 mins' },
        ],
        extras: [
          { id: 'motor-replace', name: 'Motor Replacement', icon: '⚙️', price: 399 },
        ],
      },
    ],
  },

  {
    id: 'ac-service',
    name: 'AC Service',
    icon: '❄️',
    rating: 4.77,
    bookings: '4.1M',
    color: '#0891b2',
    bgColor: '#cffafe',
    coupons: [
      { code: 'COOL15', discountPct: 15, description: '15% off on AC service', minOrder: 500 },
    ],
    services: [
      {
        id: 'ac-service-clean',
        name: 'AC Service & Cleaning',
        icon: '❄️',
        rating: 4.77,
        reviewCount: '540K',
        startingPrice: 449,
        originalPrice: 599,
        duration: '60 mins',
        shortDesc: 'Complete AC service — filter cleaning, coil wash & performance check.',
        includes: [
          'Filter cleaning and wash',
          'Indoor unit coil cleaning',
          'Outdoor unit cleaning',
          'Drain pipe cleaning',
          'Performance and cooling test',
        ],
        variants: [
          { id: '1ton', name: '1 Ton', price: 449, originalPrice: 599, duration: '60 mins' },
          { id: '1.5ton', name: '1.5 Ton', price: 549, originalPrice: 749, duration: '70 mins' },
          { id: '2ton', name: '2 Ton', price: 649, originalPrice: 899, duration: '80 mins' },
          { id: 'cassette', name: 'Cassette AC', price: 899, originalPrice: 1199, duration: '90 mins' },
        ],
        extras: [
          { id: 'gas-refill', name: 'Gas Refill (R32/R22)', icon: '💨', price: 1499 },
          { id: 'deep-clean', name: 'Jet Spray Deep Clean', icon: '🚿', price: 399 },
        ],
      },
      {
        id: 'ac-installation',
        name: 'AC Installation',
        icon: '🔧',
        rating: 4.70,
        reviewCount: '180K',
        startingPrice: 1299,
        originalPrice: 1699,
        duration: '2–3 hrs',
        shortDesc: 'Professional AC installation with copper piping and bracket fitting.',
        includes: [
          'Indoor and outdoor unit mounting',
          'Copper pipe connection',
          'Electrical wiring',
          'Drain pipe fitting',
          'Test run and handover',
        ],
        variants: [
          { id: 'split-1ton', name: 'Split AC (up to 1.5T)', price: 1299, originalPrice: 1699, duration: '2 hrs' },
          { id: 'split-2ton', name: 'Split AC (2T)', price: 1499, originalPrice: 1999, duration: '2.5 hrs' },
          { id: 'window-ac', name: 'Window AC', price: 999, originalPrice: 1399, duration: '1.5 hrs' },
        ],
        extras: [
          { id: 'stabilizer', name: 'Stabilizer Installation', icon: '⚡', price: 299 },
          { id: 'copper-pipe-extra', name: 'Extra Copper Pipe (per ft)', icon: '🔩', price: 99 },
        ],
      },
      {
        id: 'ac-gas-refill',
        name: 'AC Gas Refill',
        icon: '💨',
        rating: 4.73,
        reviewCount: '220K',
        startingPrice: 1499,
        originalPrice: 1999,
        duration: '60 mins',
        shortDesc: 'Top up AC refrigerant gas for optimal cooling performance.',
        includes: [
          'Gas pressure check',
          'Leak detection',
          'Gas refilling (R32/R410A/R22)',
          'Cooling performance test',
        ],
        variants: [
          { id: 'r32', name: 'R32 Gas Refill', price: 1499, originalPrice: 1999 },
          { id: 'r410a', name: 'R410A Gas Refill', price: 1699, originalPrice: 2299 },
          { id: 'r22', name: 'R22 Gas Refill', price: 1299, originalPrice: 1799 },
        ],
        extras: [
          { id: 'leak-seal', name: 'Leak Sealing', icon: '🛡️', price: 499 },
        ],
      },
    ],
  },

  {
    id: 'plumbing',
    name: 'Plumbing Service',
    icon: '🔧',
    rating: 4.68,
    bookings: '2.3M',
    color: '#1d4ed8',
    bgColor: '#dbeafe',
    coupons: [
      { code: 'PLUMB10', discountPct: 10, description: '10% off on plumbing', minOrder: 300 },
    ],
    services: [
      {
        id: 'tap-repair',
        name: 'Tap / Faucet Repair',
        icon: '🚰',
        rating: 4.68,
        reviewCount: '120K',
        startingPrice: 199,
        originalPrice: 299,
        duration: '30 mins',
        shortDesc: 'Fix leaking or dripping taps quickly with genuine spare parts.',
        includes: ['Tap inspection', 'Washer replacement', 'Leak fix', 'Test run'],
        variants: [
          { id: 'tap-repair-1', name: '1 Tap', price: 199, originalPrice: 299 },
          { id: 'tap-repair-2', name: '2 Taps', price: 349, originalPrice: 499 },
          { id: 'tap-replace', name: 'Tap Replacement', price: 399, originalPrice: 549 },
        ],
        extras: [
          { id: 'mixer-fix', name: 'Mixer Tap Repair', icon: '🔩', price: 249 },
        ],
      },
      {
        id: 'drain-clean',
        name: 'Drain Cleaning',
        icon: '🪣',
        rating: 4.65,
        reviewCount: '85K',
        startingPrice: 299,
        originalPrice: 449,
        duration: '45 mins',
        shortDesc: 'Unblock clogged drains with professional jetting and rodding tools.',
        includes: [
          'CCTV drain inspection',
          'High-pressure jetting',
          'Chemical descaling',
          'Post-clean test',
        ],
        variants: [
          { id: 'sink', name: 'Sink Drain', price: 299, originalPrice: 449 },
          { id: 'bathroom-drain', name: 'Bathroom Drain', price: 349, originalPrice: 499 },
          { id: 'main-drain', name: 'Main Pipeline', price: 599, originalPrice: 849 },
        ],
        extras: [
          { id: 'chemical-treatment', name: 'Chemical Treatment', icon: '🧪', price: 199 },
        ],
      },
      {
        id: 'pipe-repair',
        name: 'Pipe Repair / Replacement',
        icon: '🔩',
        rating: 4.62,
        reviewCount: '65K',
        startingPrice: 399,
        originalPrice: 549,
        duration: '45–90 mins',
        shortDesc: 'Fix leaking or burst pipes with durable CPVC/PVC fittings.',
        includes: ['Leak detection', 'Pipe cutting & fitting', 'Joint sealing', 'Water flow test'],
        variants: [
          { id: 'small-leak', name: 'Small Leak Fix', price: 399, originalPrice: 549 },
          { id: 'pipe-section', name: 'Pipe Section Replace', price: 599, originalPrice: 799 },
          { id: 'full-line', name: 'Full Line Replacement', price: 1199, originalPrice: 1599 },
        ],
        extras: [
          { id: 'wall-repair', name: 'Wall Patch After Pipe', icon: '🏗️', price: 299 },
        ],
      },
    ],
  },

  {
    id: 'electrical',
    name: 'Electrical Service',
    icon: '⚡',
    rating: 4.70,
    bookings: '1.9M',
    color: '#ca8a04',
    bgColor: '#fef9c3',
    coupons: [
      { code: 'ELEC10', discountPct: 10, description: '10% off on electrical', minOrder: 300 },
    ],
    services: [
      {
        id: 'switch-socket',
        name: 'Switch & Socket Repair',
        icon: '🔌',
        rating: 4.70,
        reviewCount: '95K',
        startingPrice: 149,
        originalPrice: 199,
        duration: '30 mins',
        shortDesc: 'Fix faulty switches, sockets and MCBs safely.',
        includes: ['Safety check', 'Faulty part replacement', 'Live wire testing', 'Earthing check'],
        variants: [
          { id: '1-switch', name: '1 Switch/Socket', price: 149, originalPrice: 199 },
          { id: '2-switches', name: '2 Switches/Sockets', price: 249, originalPrice: 349 },
          { id: 'mcb-replace', name: 'MCB Replacement', price: 349, originalPrice: 499 },
        ],
        extras: [
          { id: 'earthing-check', name: 'Full Earthing Check', icon: '🌍', price: 199 },
        ],
      },
      {
        id: 'light-installation',
        name: 'Light / Fixture Installation',
        icon: '💡',
        rating: 4.72,
        reviewCount: '78K',
        startingPrice: 199,
        originalPrice: 299,
        duration: '30 mins',
        shortDesc: 'Install ceiling lights, chandeliers, LED strips and more.',
        includes: ['Wiring check', 'Fixture mounting', 'Connection and test', 'Disposal of old fixture'],
        variants: [
          { id: '1-light', name: '1 Light', price: 199, originalPrice: 299 },
          { id: '2-lights', name: '2 Lights', price: 349, originalPrice: 499 },
          { id: 'chandelier', name: 'Chandelier / Heavy Fixture', price: 599, originalPrice: 799 },
          { id: 'led-strip', name: 'LED Strip (per 5m)', price: 299, originalPrice: 399 },
        ],
        extras: [
          { id: 'dimmer', name: 'Dimmer Switch Install', icon: '🎚️', price: 249 },
        ],
      },
      {
        id: 'wiring-repair',
        name: 'Home Wiring Repair',
        icon: '🔌',
        rating: 4.65,
        reviewCount: '42K',
        startingPrice: 499,
        originalPrice: 699,
        duration: '1–2 hrs',
        shortDesc: 'Detect and fix wiring faults, short circuits and tripping issues.',
        includes: ['Fault detection', 'Wire repair/replacement', 'Safety testing', 'Load balancing check'],
        variants: [
          { id: 'single-room', name: 'Single Room', price: 499, originalPrice: 699 },
          { id: 'full-home', name: 'Full Home (1–2 BHK)', price: 999, originalPrice: 1399 },
          { id: 'full-home-large', name: 'Full Home (3+ BHK)', price: 1499, originalPrice: 1999 },
        ],
        extras: [
          { id: 'surge-protector', name: 'Surge Protector Install', icon: '⚡', price: 349 },
        ],
      },
    ],
  },

  {
    id: 'pest-control',
    name: 'Pest Control',
    icon: '🐛',
    rating: 4.65,
    bookings: '2.7M',
    color: '#b91c1c',
    bgColor: '#fee2e2',
    coupons: [
      { code: 'PEST20', discountPct: 20, description: '20% off on pest control', minOrder: 800 },
    ],
    services: [
      {
        id: 'cockroach-control',
        name: 'Cockroach Control',
        icon: '🪳',
        rating: 4.65,
        reviewCount: '310K',
        startingPrice: 699,
        originalPrice: 999,
        duration: '45–60 mins',
        shortDesc: 'Gel-based cockroach treatment with 3-month warranty.',
        includes: ['Gel bait application in kitchen cracks', 'Spray treatment for bathroom', '3-month re-treatment guarantee', 'Child & pet-safe products'],
        variants: [
          { id: 'roach-1bhk', name: '1 BHK', price: 699, originalPrice: 999 },
          { id: 'roach-2bhk', name: '2 BHK', price: 899, originalPrice: 1199 },
          { id: 'roach-3bhk', name: '3 BHK', price: 1099, originalPrice: 1499 },
          { id: 'roach-4bhk', name: '4+ BHK', price: 1399, originalPrice: 1799 },
        ],
        extras: [
          { id: 'ant-treatment', name: 'Ant Treatment', icon: '🐜', price: 249 },
          { id: 'spider-treatment', name: 'Spider Treatment', icon: '🕷️', price: 199 },
        ],
      },
      {
        id: 'termite-control',
        name: 'Termite Treatment',
        icon: '🐜',
        rating: 4.60,
        reviewCount: '145K',
        startingPrice: 1499,
        originalPrice: 1999,
        duration: '2–3 hrs',
        shortDesc: 'Anti-termite drilling and chemical treatment with 1-year warranty.',
        includes: [
          'Pre-construction or post-construction treatment',
          'Drilling and chemical injection',
          'Soil treatment',
          '1-year warranty with free re-treatment',
        ],
        variants: [
          { id: 'termite-1bhk', name: '1 BHK', price: 1499, originalPrice: 1999 },
          { id: 'termite-2bhk', name: '2 BHK', price: 1999, originalPrice: 2699 },
          { id: 'termite-3bhk', name: '3 BHK', price: 2499, originalPrice: 3299 },
          { id: 'termite-villa', name: 'Villa / Bungalow', price: 3999, originalPrice: 4999 },
        ],
        extras: [
          { id: 'wood-treatment', name: 'Wood Furniture Treatment', icon: '🪵', price: 499 },
        ],
      },
      {
        id: 'mosquito-control',
        name: 'Mosquito Control',
        icon: '🦟',
        rating: 4.62,
        reviewCount: '180K',
        startingPrice: 799,
        originalPrice: 1099,
        duration: '60 mins',
        shortDesc: 'Indoor fogging + spray to eliminate mosquitoes for 3 months.',
        includes: [
          'Indoor residual spray',
          'Thermal fogging',
          'Breeding site identification',
          '3-month warranty',
        ],
        variants: [
          { id: 'mosq-1bhk', name: '1 BHK', price: 799, originalPrice: 1099 },
          { id: 'mosq-2bhk', name: '2 BHK', price: 999, originalPrice: 1299 },
          { id: 'mosq-3bhk', name: '3 BHK', price: 1199, originalPrice: 1599 },
        ],
        extras: [
          { id: 'dengue-control', name: 'Dengue/Malaria Package', icon: '🛡️', price: 399 },
        ],
      },
    ],
  },

  {
    id: 'appliance-repair',
    name: 'Appliance Repair',
    icon: '🔩',
    rating: 4.63,
    bookings: '3.1M',
    color: '#6d28d9',
    bgColor: '#ede9fe',
    coupons: [
      { code: 'APPL10', discountPct: 10, description: '10% off on appliance repair', minOrder: 500 },
    ],
    services: [
      {
        id: 'washing-machine',
        name: 'Washing Machine Repair',
        icon: '🫧',
        rating: 4.63,
        reviewCount: '240K',
        startingPrice: 349,
        originalPrice: 499,
        duration: '60 mins',
        shortDesc: 'Expert repair for all washing machine brands and types.',
        includes: ['Diagnosis and fault detection', 'Part repair or replacement', 'Test run', '30-day warranty on repair'],
        variants: [
          { id: 'top-load', name: 'Top Load (diagnosis)', price: 349, originalPrice: 499 },
          { id: 'front-load', name: 'Front Load (diagnosis)', price: 399, originalPrice: 549 },
          { id: 'semi-auto', name: 'Semi-Automatic', price: 299, originalPrice: 449 },
        ],
        extras: [
          { id: 'board-repair', name: 'PCB / Board Repair', icon: '🖥️', price: 599 },
          { id: 'motor-repair', name: 'Motor Repair', icon: '⚙️', price: 499 },
        ],
      },
      {
        id: 'refrigerator-repair',
        name: 'Refrigerator Repair',
        icon: '🧊',
        rating: 4.60,
        reviewCount: '195K',
        startingPrice: 399,
        originalPrice: 549,
        duration: '60 mins',
        shortDesc: 'Fix cooling issues, compressor problems and ice maker faults.',
        includes: ['Cooling check', 'Gas pressure check', 'Thermostat testing', '30-day warranty'],
        variants: [
          { id: 'single-door', name: 'Single Door', price: 399, originalPrice: 549 },
          { id: 'double-door', name: 'Double Door', price: 499, originalPrice: 699 },
          { id: 'side-by-side', name: 'Side by Side / French Door', price: 699, originalPrice: 949 },
        ],
        extras: [
          { id: 'gas-top-up', name: 'Gas Top-Up', icon: '💨', price: 799 },
          { id: 'condenser-clean', name: 'Condenser Cleaning', icon: '🧹', price: 249 },
        ],
      },
      {
        id: 'geyser-repair',
        name: 'Geyser / Water Heater',
        icon: '♨️',
        rating: 4.68,
        reviewCount: '88K',
        startingPrice: 299,
        originalPrice: 399,
        duration: '45 mins',
        shortDesc: 'Repair or installation of electric and gas geysers.',
        includes: ['Safety inspection', 'Element check', 'Thermostat test', 'Leak check'],
        variants: [
          { id: 'storage', name: 'Storage Geyser', price: 299, originalPrice: 399 },
          { id: 'instant', name: 'Instant Geyser', price: 249, originalPrice: 349 },
          { id: 'gas-geyser', name: 'Gas Geyser', price: 349, originalPrice: 499 },
          { id: 'install', name: 'New Installation', price: 449, originalPrice: 599 },
        ],
        extras: [
          { id: 'element-replace', name: 'Heating Element Replace', icon: '🔥', price: 299 },
        ],
      },
    ],
  },

  {
    id: 'painting',
    name: 'Painting',
    icon: '🎨',
    rating: 4.55,
    bookings: '980K',
    color: '#be185d',
    bgColor: '#fce7f3',
    coupons: [
      { code: 'PAINT15', discountPct: 15, description: '15% off on painting', minOrder: 2000 },
    ],
    services: [
      {
        id: 'interior-paint',
        name: 'Interior Painting',
        icon: '🖌️',
        rating: 4.55,
        reviewCount: '78K',
        startingPrice: 1499,
        originalPrice: 1999,
        duration: 'Per day',
        shortDesc: 'Professional wall painting with premium emulsion and putty finish.',
        includes: [
          'Wall putty application',
          'Primer coat',
          '2 coats of emulsion paint',
          'Edge finishing',
          'Floor protection',
        ],
        variants: [
          { id: '1-room', name: '1 Room', price: 1499, originalPrice: 1999 },
          { id: '2-rooms', name: '2 Rooms', price: 2799, originalPrice: 3799 },
          { id: '1bhk-full', name: '1 BHK (full)', price: 4999, originalPrice: 6999 },
          { id: '2bhk-full', name: '2 BHK (full)', price: 7999, originalPrice: 10999 },
          { id: '3bhk-full', name: '3 BHK (full)', price: 10999, originalPrice: 14999 },
        ],
        extras: [
          { id: 'texture', name: 'Texture Paint (per room)', icon: '✨', price: 1499 },
          { id: 'waterproof', name: 'Waterproof Coating', icon: '🛡️', price: 999 },
        ],
      },
      {
        id: 'exterior-paint',
        name: 'Exterior Painting',
        icon: '🏠',
        rating: 4.50,
        reviewCount: '32K',
        startingPrice: 8999,
        originalPrice: 11999,
        duration: '3–5 days',
        shortDesc: 'Durable exterior painting with weather-resistant finish.',
        includes: ['Wall scraping and repair', 'Weather Shield primer', '2 coats of exterior paint', 'Scaffolding if required'],
        variants: [
          { id: 'small-apt', name: 'Small Apartment', price: 8999, originalPrice: 11999 },
          { id: 'mid-house', name: 'Mid-size House', price: 14999, originalPrice: 19999 },
          { id: 'villa', name: 'Villa / Bungalow', price: 24999, originalPrice: 34999 },
        ],
        extras: [
          { id: 'anti-algae', name: 'Anti-algae Treatment', icon: '🛡️', price: 1999 },
        ],
      },
    ],
  },

  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: '🪚',
    rating: 4.60,
    bookings: '1.2M',
    color: '#78350f',
    bgColor: '#fef3c7',
    coupons: [
      { code: 'CARP10', discountPct: 10, description: '10% off on carpentry', minOrder: 400 },
    ],
    services: [
      {
        id: 'furniture-repair',
        name: 'Furniture Repair',
        icon: '🪑',
        rating: 4.60,
        reviewCount: '65K',
        startingPrice: 299,
        originalPrice: 449,
        duration: '45–60 mins',
        shortDesc: 'Fix broken furniture — hinges, handles, joints and more.',
        includes: ['Damage assessment', 'Part repair or replacement', 'Polish and finish', 'Delivery back if needed'],
        variants: [
          { id: 'hinge-fix', name: 'Hinge / Handle Fix', price: 299, originalPrice: 449 },
          { id: 'joint-fix', name: 'Joint / Leg Fix', price: 349, originalPrice: 499 },
          { id: 'door-fix', name: 'Wardrobe / Door Fix', price: 499, originalPrice: 699 },
        ],
        extras: [
          { id: 'polish', name: 'Polish & Refinish', icon: '✨', price: 499 },
        ],
      },
      {
        id: 'door-repair',
        name: 'Door Repair & Fitting',
        icon: '🚪',
        rating: 4.58,
        reviewCount: '48K',
        startingPrice: 349,
        originalPrice: 499,
        duration: '45 mins',
        shortDesc: 'Fix stuck doors, broken locks, and door frame issues.',
        includes: ['Door alignment', 'Lock/handle replacement', 'Hinge replacement', 'Weather strip fitting'],
        variants: [
          { id: 'door-align', name: 'Door Alignment', price: 349, originalPrice: 499 },
          { id: 'lock-replace', name: 'Lock Replacement', price: 449, originalPrice: 649 },
          { id: 'door-install', name: 'New Door Installation', price: 999, originalPrice: 1399 },
        ],
        extras: [
          { id: 'door-stopper', name: 'Door Stopper Fitting', icon: '🔩', price: 149 },
        ],
      },
    ],
  },

  {
    id: 'bed-service',
    name: 'Bed Service',
    icon: '🛏️',
    rating: 4.70,
    bookings: '890K',
    color: '#0f766e',
    bgColor: '#ccfbf1',
    coupons: [
      { code: 'BED15', discountPct: 15, description: '15% off on bed service', minOrder: 400 },
    ],
    services: [
      {
        id: 'bed-assembly',
        name: 'Bed Assembly',
        icon: '🛏️',
        rating: 4.70,
        reviewCount: '52K',
        startingPrice: 349,
        originalPrice: 499,
        duration: '60 mins',
        shortDesc: 'Quick and sturdy bed assembly for all types and brands.',
        includes: ['Unboxing', 'Full assembly', 'Alignment check', 'Screw tightening'],
        variants: [
          { id: 'single-bed', name: 'Single Bed', price: 349, originalPrice: 499 },
          { id: 'double-bed', name: 'Double / Queen Bed', price: 449, originalPrice: 649 },
          { id: 'king-bed', name: 'King Size Bed', price: 599, originalPrice: 849 },
          { id: 'bunk-bed', name: 'Bunk Bed', price: 699, originalPrice: 999 },
        ],
        extras: [
          { id: 'headboard', name: 'Headboard Fitting', icon: '🔩', price: 199 },
          { id: 'storage-fit', name: 'Hydraulic Storage Fitting', icon: '📦', price: 299 },
        ],
      },
      {
        id: 'mattress-cleaning',
        name: 'Mattress Sanitization',
        icon: '🧹',
        rating: 4.68,
        reviewCount: '88K',
        startingPrice: 399,
        originalPrice: 549,
        duration: '40 mins',
        shortDesc: 'UV + steam cleaning to kill bacteria, mites and allergens.',
        includes: ['UV sterilization', 'Hot steam treatment', 'Deodorizing', 'Flip and align'],
        variants: [
          { id: 'single-matt', name: 'Single', price: 399, originalPrice: 549 },
          { id: 'double-matt', name: 'Double / Queen', price: 549, originalPrice: 749 },
          { id: 'king-matt', name: 'King Size', price: 699, originalPrice: 949 },
        ],
        extras: [
          { id: 'bed-bug-treat', name: 'Bed Bug Treatment', icon: '🐛', price: 499 },
          { id: 'pillow-clean', name: 'Pillow Pair Cleaning', icon: '🪆', price: 199 },
        ],
      },
    ],
  },

  {
    id: 'ceiling-service',
    name: 'Ceiling Service',
    icon: '🔝',
    rating: 4.55,
    bookings: '540K',
    color: '#0369a1',
    bgColor: '#e0f2fe',
    coupons: [
      { code: 'CEIL10', discountPct: 10, description: '10% off on ceiling service', minOrder: 500 },
    ],
    services: [
      {
        id: 'false-ceiling',
        name: 'False Ceiling Installation',
        icon: '🏗️',
        rating: 4.55,
        reviewCount: '28K',
        startingPrice: 1499,
        originalPrice: 1999,
        duration: 'Per day',
        shortDesc: 'Professional gypsum and POP false ceiling installation.',
        includes: ['Frame installation', 'Gypsum/POP board fitting', 'Concealed wiring', 'LED cove lighting', 'Final finishing'],
        variants: [
          { id: 'per-sqft', name: 'Gypsum (per sq ft)', price: 75, originalPrice: 95 },
          { id: 'pop-sqft', name: 'POP (per sq ft)', price: 55, originalPrice: 75 },
          { id: 'full-room', name: 'Full Room (12×12 ft)', price: 10800, originalPrice: 13680 },
        ],
        extras: [
          { id: 'led-cove', name: 'LED Cove Lighting', icon: '💡', price: 999 },
          { id: 'smoke-sensor', name: 'Smoke Sensor Fit', icon: '🔥', price: 699 },
        ],
      },
      {
        id: 'ceiling-cleaning',
        name: 'Ceiling Cleaning',
        icon: '🧹',
        rating: 4.60,
        reviewCount: '35K',
        startingPrice: 499,
        originalPrice: 699,
        duration: '1–2 hrs',
        shortDesc: 'Professional ceiling cleaning including fans, lights and cobweb removal.',
        includes: ['Cobweb removal', 'Stain treatment', 'Fan and fixture cleaning', 'Light fixture cleaning'],
        variants: [
          { id: 'single-room-ceil', name: '1 Room Ceiling', price: 499, originalPrice: 699 },
          { id: '2room-ceil', name: '2 Room Ceilings', price: 899, originalPrice: 1199 },
          { id: 'full-home-ceil', name: 'Full Home (2 BHK)', price: 1499, originalPrice: 1999 },
        ],
        extras: [
          { id: 'damp-treat', name: 'Damp/Mould Treatment', icon: '🛡️', price: 599 },
        ],
      },
    ],
  },
];

export interface CartItem {
  categoryId: string;
  categoryName: string;
  serviceId: string;
  serviceName: string;
  variantId: string;
  variantName: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  extras: { id: string; name: string; price: number }[];
}

// ─── Enhanced Coupon System ───────────────────────────────────────────────────

export interface CouponEntry {
  code: string;
  discountPct: number;
  maxDiscount?: number;            // cap on discount amount in ₹
  description: string;
  minOrder: number;
  applicableCategoryIds?: string[]; // undefined/empty = all categories
  expiryDate: string;              // ISO date string
  isActive: boolean;
}

export const COUPON_DATABASE: CouponEntry[] = [
  { code: 'FIRST20',       discountPct: 20,  description: '20% off on your first booking',              minOrder: 500,  expiryDate: '2026-12-31', isActive: true },
  { code: 'HELPERLAND10',  discountPct: 10,  description: '10% off on all services',                   minOrder: 300,  expiryDate: '2026-12-31', isActive: true },
  { code: 'SUMMER15',      discountPct: 15,  description: 'Summer special — 15% off',                  minOrder: 400,  expiryDate: '2026-07-31', isActive: true },
  { code: 'CLEAN50',       discountPct: 50,  maxDiscount: 500, description: '50% off on home cleaning (max ₹500)', minOrder: 999, applicableCategoryIds: ['home-cleaning'], expiryDate: '2026-06-30', isActive: true },
  { code: 'SOFA20',        discountPct: 20,  description: '20% off on sofa & carpet cleaning',         minOrder: 400,  applicableCategoryIds: ['sofa-carpet'], expiryDate: '2026-12-31', isActive: true },
  { code: 'COOL15',        discountPct: 15,  description: '15% off on AC service',                     minOrder: 500,  applicableCategoryIds: ['ac-service'], expiryDate: '2026-09-30', isActive: true },
  { code: 'PEST20',        discountPct: 20,  description: '20% off on pest control',                   minOrder: 800,  applicableCategoryIds: ['pest-control'], expiryDate: '2026-12-31', isActive: true },
  { code: 'FAN10',         discountPct: 10,  description: '10% off on fan service',                    minOrder: 200,  applicableCategoryIds: ['fan-service'], expiryDate: '2026-12-31', isActive: true },
  { code: 'BED15',         discountPct: 15,  description: '15% off on bed service',                    minOrder: 400,  applicableCategoryIds: ['bed-service'], expiryDate: '2026-12-31', isActive: true },
  { code: 'PAINT15',       discountPct: 15,  description: '15% off on painting services',              minOrder: 2000, applicableCategoryIds: ['painting'], expiryDate: '2026-12-31', isActive: true },
  { code: 'APPL10',        discountPct: 10,  description: '10% off on appliance repair',               minOrder: 500,  applicableCategoryIds: ['appliance-repair'], expiryDate: '2026-12-31', isActive: true },
  { code: 'CARP10',        discountPct: 10,  description: '10% off on carpentry',                      minOrder: 400,  applicableCategoryIds: ['carpentry'], expiryDate: '2026-12-31', isActive: true },
  { code: 'CEIL10',        discountPct: 10,  description: '10% off on ceiling service',                minOrder: 500,  applicableCategoryIds: ['ceiling-service'], expiryDate: '2026-12-31', isActive: true },
  { code: 'ELEC10',        discountPct: 10,  description: '10% off on electrical service',             minOrder: 300,  applicableCategoryIds: ['electrical'], expiryDate: '2026-12-31', isActive: true },
  { code: 'PLUMB10',       discountPct: 10,  description: '10% off on plumbing',                       minOrder: 300,  applicableCategoryIds: ['plumbing'], expiryDate: '2026-12-31', isActive: true },
];

export interface CouponValidationResult {
  valid: boolean;
  coupon?: CouponEntry;
  discount: number;
  message: string;
}

export function validateCoupon(
  code: string,
  categoryId: string,
  subtotal: number
): CouponValidationResult {
  const coupon = COUPON_DATABASE.find(c => c.code === code.trim().toUpperCase());
  if (!coupon) return { valid: false, discount: 0, message: '❌ Invalid coupon code. Please check and try again.' };
  if (!coupon.isActive) return { valid: false, discount: 0, message: '❌ This coupon is no longer active.' };
  if (new Date(coupon.expiryDate) < new Date()) return { valid: false, discount: 0, message: '❌ This coupon has expired.' };
  if (coupon.applicableCategoryIds && coupon.applicableCategoryIds.length > 0 && !coupon.applicableCategoryIds.includes(categoryId)) {
    const applicable = COUPON_DATABASE.filter(c => c.applicableCategoryIds?.includes(categoryId) && c.isActive);
    const hint = applicable.length ? ` Try: ${applicable.map(c => c.code).join(', ')}` : '';
    return { valid: false, discount: 0, message: `❌ Coupon not applicable for this service category.${hint}` };
  }
  if (subtotal < coupon.minOrder) {
    return { valid: false, discount: 0, message: `❌ Minimum order of ₹${coupon.minOrder} required for this coupon.` };
  }
  let discount = Math.round(subtotal * coupon.discountPct / 100);
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  return { valid: true, coupon, discount, message: `✅ "${coupon.code}" applied — ${coupon.discountPct}% off! You save ₹${discount}.` };
}

// ─── Saved Address ────────────────────────────────────────────────────────────

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  pinCode: string;
  landmark?: string;
  isDefault?: boolean;
}

// ─── Stored Booking ───────────────────────────────────────────────────────────

export interface StoredBooking {
  bookingId: string;
  createdAt: string;
  services: { name: string; variant: string; price: number }[];
  address: SavedAddress;
  date: string;
  timeSlot: string;
  paymentMethod: 'cod' | 'razorpay';
  subtotal: number;
  discount: number;
  gst: number;
  total: number;
  couponCode: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  providerId: string;
  providerName: string;
}
