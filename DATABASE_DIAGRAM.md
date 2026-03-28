# Helperland — MongoDB Database Diagram Design

> 13 Collections | 3 User Roles | 12 Service Categories | Full Booking Lifecycle

---

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram

    users ||--o{ addresses : "has many"
    users ||--o{ bookings : "places (customer)"
    users ||--o{ bookings : "serves (SP)"
    users ||--o{ reviews : "writes"
    users ||--o{ reviews : "receives"
    users ||--o{ notifications : "receives"
    users ||--o{ blocked_customers : "blocks (SP)"
    users ||--o{ blocked_customers : "is blocked (customer)"
    users }o--o{ service_categories : "specializes in (SP)"
    users ||--o{ coupon_usages : "redeems"

    service_categories ||--o{ services : "contains"
    service_categories ||--o{ service_categories : "has sub-categories"
    service_categories }o--o{ service_areas : "available in"
    service_categories ||--o{ bookings : "booked for"
    service_categories ||--o{ faqs : "related to"

    bookings ||--o| payments : "paid via"
    bookings ||--o| reviews : "reviewed in"
    bookings }o--o| coupons : "uses"
    bookings ||--o{ coupon_usages : "tracked in"

    coupons ||--o{ coupon_usages : "redeemed as"

    users {
        ObjectId _id PK
        String firstName
        String lastName
        String email UK
        String mobile
        String password
        String role "customer | service_provider | admin"
        String status "active | inactive | blocked"
        String avatar
        String gender
        Date dateOfBirth
        String preferredLanguage
        String bio "SP only"
        Number experience "SP only"
        Array serviceCategories "SP only → service_categories"
        Array serviceAreas "SP only → postal codes"
        Number averageRating "SP only"
        Number totalCompletedJobs "SP only"
        Array blockList "SP only → users"
        Object address "SP embedded address"
        Date createdAt
        Date updatedAt
    }

    service_categories {
        ObjectId _id PK
        String name "Fan Service, Home Cleaning, etc."
        String slug UK "fan-service"
        String description
        String icon
        String image
        ObjectId parentCategory FK "null = top-level"
        Number basePrice "per hour in INR"
        Number discountPercent
        Number estimatedDuration
        Boolean isActive
        Number sortOrder
        Date createdAt
        Date updatedAt
    }

    services {
        ObjectId _id PK
        ObjectId categoryId FK "→ service_categories"
        String name "Inside Cabinet Cleaning"
        String description
        Number price
        String priceType "per_hour | fixed | per_unit"
        Number duration "estimated minutes"
        Boolean isAddon
        Boolean isActive
        String image
        Date createdAt
        Date updatedAt
    }

    addresses {
        ObjectId _id PK
        ObjectId userId FK "→ users"
        String label "Home | Office | Other"
        String houseNumber
        String streetName
        String city
        String state
        String postalCode
        String mobileNumber
        Number latitude
        Number longitude
        Boolean isDefault
        Date createdAt
        Date updatedAt
    }

    bookings {
        ObjectId _id PK
        Number bookingNumber UK "human-readable ID"
        ObjectId customerId FK "→ users"
        ObjectId serviceProviderId FK "→ users"
        ObjectId categoryId FK "→ service_categories"
        Array selectedServices "embedded service items"
        Date scheduledDate
        String scheduledTime
        Number serviceHours
        Number totalTime
        Object serviceAddress "embedded address snapshot"
        Number subtotal
        Number discountPercent
        Number discountAmount
        ObjectId couponId FK "→ coupons"
        String couponCode
        Number totalAmount
        String comments
        Boolean hasPets
        Array photos "uploaded URLs"
        String status "new | accepted | in_progress | completed | cancelled"
        Array statusHistory "status change log"
        String cancellationReason
        ObjectId cancelledBy FK
        String rescheduleNotes
        Object rescheduledFrom
        Number rating "1-5"
        String review
        Date ratedAt
        Date createdAt
        Date updatedAt
    }

    payments {
        ObjectId _id PK
        ObjectId bookingId FK "→ bookings"
        ObjectId customerId FK "→ users"
        String orderId "Razorpay order ID"
        String paymentId UK "Razorpay payment ID"
        String signature "Razorpay signature"
        Number amount
        String currency "INR"
        String method "card | upi | netbanking | wallet | cod"
        String status "pending | completed | failed | refunded"
        String refundId
        Number refundAmount
        String refundReason
        Object metadata "raw gateway response"
        Date createdAt
        Date updatedAt
    }

    coupons {
        ObjectId _id PK
        String code UK "WELCOME20"
        Number discountPercent "1-100"
        Number maxDiscountAmount
        Number minOrderAmount
        Number maxUsage
        Number usedCount
        Number perUserLimit
        Array applicableCategories "→ service_categories"
        Boolean isActive
        Date startsAt
        Date expiresAt
        ObjectId createdBy FK "→ users admin"
        Date createdAt
        Date updatedAt
    }

    coupon_usages {
        ObjectId _id PK
        ObjectId couponId FK "→ coupons"
        ObjectId userId FK "→ users"
        ObjectId bookingId FK "→ bookings"
        Number discountAmount
        Date usedAt
    }

    reviews {
        ObjectId _id PK
        ObjectId bookingId FK "→ bookings"
        ObjectId customerId FK "→ users reviewer"
        ObjectId serviceProviderId FK "→ users reviewed"
        ObjectId categoryId FK "→ service_categories"
        Number rating "1-5"
        String comment
        String spReply
        Date spRepliedAt
        Boolean isVisible
        Date createdAt
        Date updatedAt
    }

    service_areas {
        ObjectId _id PK
        String postalCode UK "395010"
        String city "Surat"
        String state "Gujarat"
        Boolean isActive
        Array availableCategories "→ service_categories"
        Date createdAt
        Date updatedAt
    }

    notifications {
        ObjectId _id PK
        ObjectId userId FK "→ users"
        String type "booking_confirmed | payment_received | etc."
        String title
        String message
        String channel "email | sms | push | in_app"
        String status "sent | delivered | failed | read"
        ObjectId relatedBookingId FK
        Object metadata
        Date readAt
        Date createdAt
    }

    faqs {
        ObjectId _id PK
        String question
        String answer
        ObjectId categoryId FK "→ service_categories"
        Number sortOrder
        Boolean isActive
        Date createdAt
        Date updatedAt
    }

    blocked_customers {
        ObjectId _id PK
        ObjectId serviceProviderId FK "→ users SP"
        ObjectId customerId FK "→ users customer"
        String reason
        Date createdAt
        Date updatedAt
    }
```

---

## 2. Booking Lifecycle — State Machine

```mermaid
stateDiagram-v2
    [*] --> New : Customer creates booking

    New --> Accepted : SP accepts
    New --> Cancelled : Customer cancels

    Accepted --> InProgress : SP starts work
    Accepted --> Cancelled : Customer/SP cancels
    Accepted --> Rescheduled : Admin reschedules

    InProgress --> Completed : SP finishes work

    Completed --> Rated : Customer gives rating

    Rescheduled --> Accepted : SP re-accepts
    Rescheduled --> Cancelled : Either party cancels

    Cancelled --> [*]
    Rated --> [*]
```

---

## 3. Service Category Hierarchy

```mermaid
graph TD
    ROOT["🏠 Helperland Services"]

    ROOT --> HC["🧹 Home Cleaning<br/>₹500/hr"]
    ROOT --> FS["🌀 Fan Service<br/>₹300/hr"]
    ROOT --> CS["🗄️ Cupboard Service<br/>₹400/hr"]
    ROOT --> BS["🛏️ Bed Service<br/>₹350/hr"]
    ROOT --> CL["🔝 Ceiling Service<br/>₹600/hr"]
    ROOT --> ES["⚡ Electrical Service<br/>₹400/hr"]
    ROOT --> PS["🔧 Plumbing Service<br/>₹450/hr"]
    ROOT --> AC["❄️ AC Service<br/>₹700/hr"]
    ROOT --> AR["🔩 Appliance Repair<br/>₹500/hr"]
    ROOT --> PC["🐛 Pest Control<br/>₹800/hr"]
    ROOT --> PT["🎨 Painting<br/>₹1000/hr"]
    ROOT --> CP["🪚 Carpentry<br/>₹500/hr"]

    HC --> HC1["Room Cleaning"]
    HC --> HC2["Kitchen Cleaning"]
    HC --> HC3["Bathroom Cleaning"]
    HC --> HC4["Deep Cleaning"]

    FS --> FS1["Ceiling Fan Clean"]
    FS --> FS2["Exhaust Fan Repair"]
    FS --> FS3["Fan Installation"]

    CS --> CS1["Cupboard Cleaning"]
    CS --> CS2["Organization"]
    CS --> CS3["Wardrobe Deep Clean"]

    BS --> BS1["Mattress Cleaning"]
    BS --> BS2["Bed Bug Treatment"]
    BS --> BS3["Linen Change"]

    CL --> CL1["Ceiling Cleaning"]
    CL --> CL2["Ceiling Painting"]
    CL --> CL3["False Ceiling Repair"]

    ES --> ES1["Wiring Repair"]
    ES --> ES2["Switch/Socket Fix"]
    ES --> ES3["Light Installation"]

    PS --> PS1["Pipe Repair"]
    PS --> PS2["Tap Installation"]
    PS --> PS3["Drain Cleaning"]

    AC --> AC1["AC Cleaning"]
    AC --> AC2["AC Repair"]
    AC --> AC3["AC Gas Refill"]
    AC --> AC4["AC Installation"]

    AR --> AR1["Washing Machine"]
    AR --> AR2["Refrigerator"]
    AR --> AR3["Microwave"]
    AR --> AR4["Geyser"]

    PC --> PC1["Cockroach"]
    PC --> PC2["Termite"]
    PC --> PC3["Mosquito"]
    PC --> PC4["Rodent"]

    PT --> PT1["Interior Painting"]
    PT --> PT2["Exterior Painting"]
    PT --> PT3["Texture Painting"]

    CP --> CP1["Furniture Repair"]
    CP --> CP2["Door Fix"]
    CP --> CP3["Cabinet Making"]

    style ROOT fill:#1a237e,color:#fff,stroke:#0d47a1
    style HC fill:#2e7d32,color:#fff
    style FS fill:#e65100,color:#fff
    style CS fill:#4527a0,color:#fff
    style BS fill:#c62828,color:#fff
    style CL fill:#00838f,color:#fff
    style ES fill:#f9a825,color:#000
    style PS fill:#1565c0,color:#fff
    style AC fill:#00695c,color:#fff
    style AR fill:#6a1b9a,color:#fff
    style PC fill:#bf360c,color:#fff
    style PT fill:#ad1457,color:#fff
    style CP fill:#795548,color:#fff
```

---

## 4. User Role Data Flow

```mermaid
graph LR
    subgraph CUSTOMER["👤 Customer (role=customer)"]
        C1["Register/Login"]
        C2["Manage Addresses"]
        C3["Browse Categories"]
        C4["Book Service"]
        C5["Make Payment"]
        C6["Rate & Review"]
    end

    subgraph SP["🔧 Service Provider (role=service_provider)"]
        S1["Register/Login"]
        S2["Set Service Areas"]
        S3["View New Requests"]
        S4["Accept/Reject"]
        S5["Complete Service"]
        S6["Block Customers"]
    end

    subgraph ADMIN["🛡️ Admin (role=admin)"]
        A1["Manage Users"]
        A2["Manage Categories"]
        A3["Manage Coupons"]
        A4["Reschedule Bookings"]
        A5["View Analytics"]
        A6["Manage FAQs"]
    end

    subgraph DB["🗄️ MongoDB Collections"]
        users[(users)]
        addresses[(addresses)]
        service_categories[(service_categories)]
        services[(services)]
        bookings[(bookings)]
        payments[(payments)]
        reviews[(reviews)]
        coupons[(coupons)]
        coupon_usages[(coupon_usages)]
        service_areas[(service_areas)]
        notifications[(notifications)]
        faqs[(faqs)]
        blocked_customers[(blocked_customers)]
    end

    C1 --> users
    C2 --> addresses
    C3 --> service_categories
    C3 --> services
    C4 --> bookings
    C5 --> payments
    C6 --> reviews

    S1 --> users
    S2 --> service_areas
    S3 --> bookings
    S4 --> bookings
    S5 --> bookings
    S6 --> blocked_customers

    A1 --> users
    A2 --> service_categories
    A2 --> services
    A3 --> coupons
    A4 --> bookings
    A5 --> bookings
    A5 --> payments
    A6 --> faqs

    bookings --> notifications
    payments --> notifications
```

---

## 5. Booking Data Flow — Complete Journey

```mermaid
sequenceDiagram
    participant C as 👤 Customer
    participant FE as 🖥️ Frontend
    participant API as ⚙️ Backend API
    participant DB as 🗄️ MongoDB
    participant PG as 💳 Razorpay
    participant N as 📧 Notifications

    C->>FE: Select Category & Services
    FE->>API: GET /api/service-categories
    API->>DB: service_categories.find()
    DB-->>API: categories list
    API-->>FE: categories + services

    C->>FE: Enter Postal Code
    FE->>API: GET /api/service-areas?code=395010
    API->>DB: service_areas.findOne({postalCode})
    DB-->>API: area with available categories
    API-->>FE: area confirmed

    C->>FE: Pick Date, Time, Extras, Address
    FE->>API: POST /api/bookings
    API->>DB: bookings.insertOne({status:"new"})
    DB-->>API: booking created
    API->>N: Send confirmation email + SMS
    API-->>FE: booking response

    C->>FE: Apply Coupon "WELCOME20"
    FE->>API: POST /api/coupons/validate
    API->>DB: coupons.findOne({code})
    DB-->>API: coupon valid, 20% off
    API-->>FE: discount calculated

    C->>FE: Click Pay Now
    FE->>API: POST /api/payments/create-order
    API->>PG: razorpay.orders.create()
    PG-->>API: order_id
    API->>DB: payments.insertOne({status:"pending"})
    API-->>FE: order_id + key

    FE->>PG: Razorpay Checkout
    PG-->>FE: payment_id + signature
    FE->>API: POST /api/payments/verify
    API->>DB: payments.updateOne({status:"completed"})
    API->>DB: coupon_usages.insertOne()
    API->>DB: coupons.updateOne({usedCount +1})
    API->>N: Send payment receipt
    API-->>FE: payment confirmed

    Note over DB: SP sees new booking in their postal code

    participant SP as 🔧 Service Provider
    SP->>API: GET /api/bookings/available
    API->>DB: bookings.find({status:"new", postalCode})
    API->>DB: blocked_customers check
    DB-->>API: filtered bookings
    API-->>SP: available bookings

    SP->>API: PATCH /api/bookings/:id/accept
    API->>DB: bookings.updateOne({status:"accepted", spId})
    API->>N: Notify customer
    API-->>SP: booking accepted

    SP->>API: PATCH /api/bookings/:id/complete
    API->>DB: bookings.updateOne({status:"completed"})
    API->>DB: users.updateOne({totalCompletedJobs +1})
    API->>N: Notify customer to rate
    API-->>SP: completed

    C->>API: PATCH /api/bookings/:id/rate
    API->>DB: reviews.insertOne({rating, comment})
    API->>DB: users.updateOne({averageRating recalc})
    API->>N: Notify SP of review
    API-->>C: rating submitted
```

---

## 6. Collection Relationship Map (Visual)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HELPERLAND — MongoDB Schema                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐    1:N     ┌────────────┐    1:N     ┌──────────────┐        │
│  │  users   │───────────▶│  addresses │            │ notifications│        │
│  │          │            └────────────┘            └──────────────┘        │
│  │ customer │◀───────────────────────────────────────────┐                  │
│  │ SP       │    1:N     ┌────────────┐                  │ 1:N              │
│  │ admin    │───────────▶│  bookings  │─────────────────▶│                  │
│  │          │            │            │                                      │
│  │          │◀───SP──────│ customerId │    1:1     ┌──────────┐             │
│  │          │            │ SPId       │───────────▶│ payments │             │
│  │          │            │ categoryId │            └──────────┘             │
│  │          │            │ couponId   │                                      │
│  │          │            │            │    1:1     ┌──────────┐             │
│  │          │            │            │───────────▶│ reviews  │             │
│  └─────┬────┘            └─────┬──────┘            └──────────┘             │
│        │                       │                                             │
│        │ 1:N                   │ N:1                                         │
│        ▼                       ▼                                             │
│  ┌──────────────┐     ┌────────────────────┐    1:N    ┌──────────┐        │
│  │   blocked    │     │ service_categories │──────────▶│ services │        │
│  │  customers   │     │                    │           └──────────┘        │
│  └──────────────┘     │  Home Cleaning     │                                │
│                        │  Fan Service       │    N:M    ┌───────────────┐   │
│                        │  Cupboard Service  │◀────────▶│ service_areas │   │
│  ┌──────────┐         │  Bed Service       │           └───────────────┘   │
│  │  faqs    │────────▶│  Ceiling Service   │                                │
│  └──────────┘   N:1   │  Electrical        │                                │
│                        │  Plumbing          │                                │
│  ┌──────────┐         │  AC Service        │                                │
│  │ coupons  │         │  Appliance Repair  │                                │
│  │          │  1:N    │  Pest Control      │                                │
│  │          │────────▶│  Painting          │                                │
│  └────┬─────┘         │  Carpentry         │                                │
│       │ 1:N           └────────────────────┘                                │
│       ▼                                                                      │
│  ┌──────────────┐                                                           │
│  │coupon_usages │                                                           │
│  └──────────────┘                                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Index Strategy

```
COLLECTION              INDEX                                    TYPE
─────────────────────────────────────────────────────────────────────────
users                   { email: 1 }                             unique
users                   { role: 1, status: 1 }                   compound
users                   { serviceAreas: 1 }                      multikey

service_categories      { slug: 1 }                              unique
service_categories      { parentCategory: 1 }                    single
service_categories      { isActive: 1 }                          single

services                { categoryId: 1 }                        single
services                { isAddon: 1, isActive: 1 }              compound

addresses               { userId: 1 }                            single
addresses               { postalCode: 1 }                        single

bookings                { customerId: 1, status: 1 }             compound
bookings                { serviceProviderId: 1, status: 1 }      compound
bookings                { "serviceAddress.postalCode": 1 }       nested
bookings                { scheduledDate: 1 }                     single
bookings                { bookingNumber: 1 }                     unique

payments                { bookingId: 1 }                         single
payments                { paymentId: 1 }                         unique
payments                { customerId: 1 }                        single

coupons                 { code: 1 }                              unique
coupons                 { isActive: 1, expiresAt: 1 }            compound

coupon_usages           { couponId: 1, userId: 1 }               compound

reviews                 { serviceProviderId: 1, rating: 1 }      compound
reviews                 { customerId: 1 }                        single
reviews                 { categoryId: 1 }                        single

service_areas           { postalCode: 1 }                        unique
service_areas           { city: 1 }                              single

notifications           { userId: 1, readAt: 1 }                 compound
notifications           { createdAt: -1 }                        descending

faqs                    { isActive: 1, sortOrder: 1 }            compound

blocked_customers       { serviceProviderId: 1, customerId: 1 }  unique compound
```

---

## 8. Migration Summary: db.json → MongoDB

```
  OLD (db.json)                    NEW (MongoDB)
  ─────────────                    ─────────────
  ┌──────────────┐                 ┌──────────────────┐
  │ user[]       │ ──────────────▶ │ users             │
  │ (22 records) │                 │ (normalized)      │
  └──────────────┘                 └──────────────────┘

  ┌──────────────┐                 ┌──────────────────┐
  │ postalCode[] │ ──────────────▶ │ service_areas     │
  │ (6 records)  │                 │ (+ city, state)   │
  └──────────────┘                 └──────────────────┘

  ┌──────────────┐                 ┌──────────────────┐
  │ Bookservice[]│ ──────────────▶ │ bookings          │
  │ (10 records) │                 │ + payments        │
  │              │                 │ + reviews         │
  └──────────────┘                 └──────────────────┘

  ┌──────────────┐                 ┌──────────────────┐
  │ Address[]    │ ──────────────▶ │ addresses         │
  │ (9 records)  │                 │ (+ label, geo)    │
  └──────────────┘                 └──────────────────┘

  ┌──────────────┐                 ┌──────────────────┐
  │ (hardcoded)  │ ──────────────▶ │ service_categories│
  │ ExtraService │                 │ services          │
  │ $20/hr rate  │                 │ (12 categories)   │
  └──────────────┘                 └──────────────────┘

  ┌──────────────┐                 ┌──────────────────┐
  │  (none)      │ ──────────────▶ │ notifications     │
  │              │                 │ coupon_usages     │
  │              │                 │ blocked_customers │
  └──────────────┘                 └──────────────────┘
```

---

## 9. Collection Statistics (Expected)

| # | Collection | Est. Records | Avg Doc Size | Growth Rate |
|---|---|---|---|---|
| 1 | users | 100s–1000s | ~1 KB | Moderate |
| 2 | service_categories | 50–100 | ~0.5 KB | Low (admin-managed) |
| 3 | services | 100–200 | ~0.5 KB | Low (admin-managed) |
| 4 | addresses | 500–5000 | ~0.3 KB | Moderate |
| 5 | bookings | 1000s–100K+ | ~2 KB | High |
| 6 | payments | 1000s–100K+ | ~1 KB | High (1:1 with bookings) |
| 7 | coupons | 10–100 | ~0.5 KB | Low |
| 8 | coupon_usages | 100s–10K | ~0.2 KB | Moderate |
| 9 | reviews | 100s–50K | ~0.5 KB | Moderate |
| 10 | service_areas | 50–500 | ~0.3 KB | Low |
| 11 | notifications | 10K–1M+ | ~0.5 KB | Very High (TTL recommended) |
| 12 | faqs | 20–100 | ~0.5 KB | Low |
| 13 | blocked_customers | 10–500 | ~0.2 KB | Low |
