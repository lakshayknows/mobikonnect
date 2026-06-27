/**
 * Single source of truth for all site content.
 *
 * Mobikonnect — India's Experiential Marketing & Customer Engagement Technology
 * Platform. We create measurable customer, channel-partner and employee
 * engagement experiences powered by technology.
 */

export const site = {
  name: "Mobikonnect",
  legal: "Parv Communications Pvt. Ltd.",
  domain: "mobikonnect.com",
  email: "team@mobikonnect.com",
  // NOTE: phone numbers in the source deck were not machine-readable — update before launch.
  phones: ["+91 99000 77997", "+91 95004 47777"],
  positioning:
    "Experiential Marketing · Consumer Promotions · Loyalty · Rewards · Customer Engagement Platform",
  tagline: "Engage. Reward. Retain. Grow.",
  promise:
    "We create measurable customer, channel-partner and employee engagement experiences powered by technology.",
  intro:
    "We build technology-driven engagement experiences that increase sales, loyalty and participation — blending promotions, loyalty, gamification and martech into campaigns that move brands.",
  about:
    "Mobikonnect is India's experiential marketing & customer engagement technology platform. For 20+ years we've helped brands engage, reward, motivate and retain consumers, customers, dealers, retailers, influencers and employees through technology-powered experiences — end to end, and measurable.",
} as const;

export const nav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** "in" formats with Indian digit grouping (e.g. 5,00,000) */
  format?: "in" | "plain";
  label: string;
};

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "Years engineering engagement" },
  { value: 500000, suffix: "+", format: "in", label: "Entries in a single campaign" },
  { value: 50, prefix: "₹", suffix: "L+", label: "Rewards pool disbursed" },
  { value: 90000, suffix: "+", format: "in", label: "Free samples delivered" },
];

/* ───────────────────────── Services — the 6 pillars ───────────────────────── */

export type Service = {
  no: string;
  title: string;
  blurb: string;
  points: string[];
};

export const services: Service[] = [
  {
    no: "01",
    title: "Consumer Promotions",
    blurb: "Win-and-earn mechanics that turn shoppers into participants — and purchases into data.",
    points: [
      "Scratch & Win",
      "Scan & Win",
      "Purchase & Win",
      "Instant Cashback & Rewards",
      "Lucky Draws & Festival Promotions",
      "Receipt Upload, QR & WhatsApp campaigns",
      "Coupon & Referral campaigns",
    ],
  },
  {
    no: "02",
    title: "Trade Promotions",
    blurb: "Channel and influencer loyalty that moves sell-out across dealers, retailers and tradespeople.",
    points: [
      "Dealer, Retailer & Distributor loyalty",
      "Painter, Plumber, Electrician & Mechanic programs",
      "Architect programs & channel rewards",
      "Sales-team incentives",
      "Tier-based incentives & leaderboards",
      "Performance tracking",
    ],
  },
  {
    no: "03",
    title: "Loyalty Programs",
    blurb: "Retention engines for customers and partners — points, tiers, wallets and fulfilment.",
    points: [
      "Points, Tier & Membership programs",
      "Coalition & Subscription loyalty",
      "Gamified & Referral rewards",
      "Employee & Dealer loyalty",
      "Customer rewards wallet",
      "Digital reward catalogue & gift fulfilment",
    ],
  },
  {
    no: "04",
    title: "Experiential Marketing",
    blurb: "Brand activations that fuse the physical and the digital into memorable experiences.",
    points: [
      "Brand activations & roadshows",
      "Mall & college campaigns",
      "Sampling & product launches",
      "Digital + physical / hybrid campaigns",
      "Interactive experiences & event engagement",
      "AR experiences & interactive kiosks",
    ],
  },
  {
    no: "05",
    title: "Customer Engagement",
    blurb: "Gamification and interactive learning that keep audiences playing, sharing and coming back.",
    points: [
      "Quizzes, Trivia & Polls",
      "Spin the Wheel, Memory & Puzzle games",
      "Surveys & challenges",
      "Badges & leaderboards",
      "Digital certificates",
      "Interactive learning",
    ],
  },
  {
    no: "06",
    title: "Martech & Engagement Technology",
    blurb: "Our strongest differentiator — the omnichannel platform powering every campaign.",
    points: [
      "Interactive Video Response (IVR 2.0) & interactive videos",
      "QR platform, microsites & landing pages",
      "PWAs, mobile apps & WhatsApp automation",
      "SMS, Voice, VMN, IVR & missed-call platforms",
      "Email automation, chatbots & digital coupons",
      "Reward engine, analytics & real-time reporting",
      "API / Webhook / CRM / CDP integrations & AI campaign engine",
    ],
  },
];

/**
 * Homepage "What we do" summary cards. Kept as a distinct export so the homepage
 * grid stays a quick 8-up overview while /services carries the full 6-pillar detail.
 */
export type Expertise = {
  no: string;
  title: string;
  blurb: string;
  points: string[];
};

export const expertise: Expertise[] = [
  {
    no: "01",
    title: "Consumer Promotions",
    blurb: "Win & earn mechanics that turn shoppers into participants.",
    points: ["Scratch / Scan / Purchase & Win", "Instant cashback & rewards", "QR · WhatsApp · receipt upload"],
  },
  {
    no: "02",
    title: "Trade Promotions",
    blurb: "Channel & influencer loyalty that moves sell-out.",
    points: ["Dealer & retailer loyalty", "Painter / plumber / electrician programs", "Leaderboards & incentives"],
  },
  {
    no: "03",
    title: "Loyalty Programs",
    blurb: "Retention engines for customers and partners.",
    points: ["Points, tiers & memberships", "Rewards wallet & catalogue", "Gift fulfilment"],
  },
  {
    no: "04",
    title: "Experiential Marketing",
    blurb: "Activations that fuse physical and digital.",
    points: ["Brand activations & roadshows", "Sampling & product launches", "AR & interactive kiosks"],
  },
  {
    no: "05",
    title: "Customer Engagement",
    blurb: "Gamification that keeps audiences coming back.",
    points: ["Quizzes, polls & surveys", "Spin the wheel & games", "Badges & leaderboards"],
  },
  {
    no: "06",
    title: "Martech Platform",
    blurb: "The omnichannel tech powering every campaign.",
    points: ["IVR 2.0 & interactive video", "WhatsApp, SMS & voice", "Analytics & AI campaign engine"],
  },
  {
    no: "07",
    title: "Influencer & Creator",
    blurb: "Creator-led storytelling across video-first platforms.",
    points: ["Store & e-commerce promotions", "Instagram · YouTube · Facebook", "Reviews & UGC"],
  },
  {
    no: "08",
    title: "Employee Engagement",
    blurb: "Performance and occasion-based rewards for teams.",
    points: ["Performance-linked rewards", "Occasion gratification", "Referral rewards"],
  },
];

/* ───────────────────────── Solutions — business problems ───────────────────────── */

export type Solution = { no: string; title: string; desc: string };

export const solutions: Solution[] = [
  { no: "01", title: "Increase Repeat Purchase", desc: "Loyalty and win-back mechanics that lift purchase frequency." },
  { no: "02", title: "Launch a New Product", desc: "Trial, sampling and interactive launches that drive first purchase." },
  { no: "03", title: "Acquire New Customers", desc: "Promotions and referrals that turn reach into first-party data." },
  { no: "04", title: "Reward Retailers & Dealers", desc: "Channel loyalty that moves sell-out and secures shelf." },
  { no: "05", title: "Engage Influencers", desc: "Creator and tradesperson programs that amplify advocacy." },
  { no: "06", title: "Employee Engagement", desc: "Performance and occasion rewards that energise teams." },
  { no: "07", title: "Run a Sales Contest", desc: "Gamified leaderboards that turn targets into a game worth winning." },
  { no: "08", title: "Generate Leads", desc: "Interactive campaigns that capture intent and qualify at scale." },
  { no: "09", title: "Retail Audits", desc: "Field data capture with verification and live dashboards." },
  { no: "10", title: "Training & Certification", desc: "Gamified learning with digital badges and certificates." },
  { no: "11", title: "Festival & Rural Activation", desc: "Seasonal and on-ground campaigns that meet audiences where they are." },
  { no: "12", title: "Digital Brand Activation", desc: "Omnichannel experiences across QR, WhatsApp, web and voice." },
];

/* ───────────────────────── Industries ───────────────────────── */

export const industries = [
  "FMCG",
  "Consumer Durables",
  "Automobile",
  "Building Materials",
  "Paints",
  "Electrical",
  "Retail",
  "Telecom",
  "Banking",
  "Insurance",
  "Healthcare",
  "Pharma",
  "E-commerce",
  "Real Estate",
  "Education",
  "Travel",
  "Hospitality",
] as const;

/* ───────────────────────── Campaign types ───────────────────────── */

export const campaignTypes = [
  "Scan QR & Win",
  "Buy & Win",
  "Refer & Earn",
  "Scratch & Win",
  "Predict & Win",
  "Photo Upload",
  "Video Upload",
  "Selfie Contest",
  "Receipt Upload",
  "Spin the Wheel",
  "Treasure Hunt",
  "Quiz",
  "Survey",
  "Instant Cashback",
  "Coupon Redemption",
  "Loyalty Program",
  "Referral Program",
  "Digital Passport",
  "Interactive Product Launch",
] as const;

/* ───────────────────────── Technology capabilities (orbit) ───────────────────────── */

export type Capability = {
  id: string;
  title: string;
  desc: string;
};

export const capabilities: Capability[] = [
  { id: "01", title: "Voice Platform", desc: "IVR 2.0, OBD & missed-call engagement at national scale." },
  { id: "02", title: "Loyalty Engine", desc: "Points, tiers and redemptions for consumers & channels." },
  { id: "03", title: "QR & Unique Codes", desc: "Secure, fraud-proof codes and dynamic QR for packs & coupons." },
  { id: "04", title: "Reward Platform", desc: "Instant gratification — wallets, vouchers & gifts." },
  { id: "05", title: "Interactive Video", desc: "Personalised, AI-generated video at the user level." },
  { id: "06", title: "Analytics & Reporting", desc: "Live dashboards on participation and ROI." },
  { id: "07", title: "Database & CDP", desc: "Compliant first-party data with CRM / CDP integration." },
  { id: "08", title: "AI Campaign Engine", desc: "Auditable randomisers, chatbots and conversational marketing." },
];

/* ───────────────────────── New technology offerings ───────────────────────── */

export const techOfferings = [
  "Interactive Video Response",
  "AI Personalised Videos",
  "AI Quiz Engine",
  "WhatsApp AI Campaigns",
  "Voice AI & Conversational Marketing",
  "Dynamic QR Codes",
  "Digital Twin Campaigns",
  "Gamified Learning & Digital Badges",
  "Digital Certificates",
  "Geo-fencing & Beacon Campaigns",
  "AR / WebAR Campaigns",
  "Interactive & Smart Packaging",
  "Digital Collectibles",
  "Video Commerce & Live Commerce",
  "Short Video Campaigns",
] as const;

export const process = [
  { no: "01", title: "Conceptualization", desc: "Strategy, mechanic and the big creative idea." },
  { no: "02", title: "Platform Selection", desc: "The right tech stack for the campaign goal." },
  { no: "03", title: "Reward Design", desc: "Reward logic, odds and gratification design." },
  { no: "04", title: "Gifts Procurement", desc: "Sourcing rewards at scale and on budget." },
  { no: "05", title: "Application Development", desc: "Microsites, apps and engagement journeys." },
  { no: "06", title: "Winner Declaration", desc: "Auditable selection and winner management." },
  { no: "07", title: "Gift Disbursement", desc: "Last-mile delivery, tracked end to end." },
] as const;

export type HowWeWorkStep = {
  title: string;
  desc: string;
  label: string;
  bg: string;
  dot: string;
};

export const howWeWork: HowWeWorkStep[] = [
  {
    title: "ENGAGE",
    desc: "Strategy, mechanic and the big creative idea — paired with the right tech stack, reward logic, and gratification design.",
    label: "1st",
    bg: "#36678C",
    dot: "#FFA704",
  },
  {
    title: "REWARD",
    desc: "Application development, microsites and engagement journeys — while sourcing rewards at scale and on budget.",
    label: "2nd",
    bg: "#FFA704",
    dot: "#C95933",
  },
  {
    title: "RETAIN",
    desc: "Auditable winner selection, managed end to end — with last-mile gift disbursement and loyalty that brings audiences back.",
    label: "3rd",
    bg: "#C95933",
    dot: "#FFA704",
  },
];

export type Benefit = { no: string; title: string; desc: string };

export const benefits: Benefit[] = [
  {
    no: "01",
    title: "Gratification",
    desc: "An instant impression, relevant to the target group — rewards with an almost-cash perception.",
  },
  {
    no: "02",
    title: "Top of Mind Recall",
    desc: "Once gratified, your audience doesn't forget the brand in a hurry.",
  },
  {
    no: "03",
    title: "Measurable Sales Lift",
    desc: "When the word spreads, sell-out follows — and every rupee is tracked to ROI.",
  },
  {
    no: "04",
    title: "Loyalty & Retention",
    desc: "Better odds of going viral, retaining old customers and acquiring new ones via referrals.",
  },
  {
    no: "05",
    title: "First-party Data",
    desc: "Every interaction builds a compliant, structured view of your audience.",
  },
];

/* ───────────────────────── Case studies ───────────────────────── */

export type CaseStudy = {
  slug: string;
  brand: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  objective: string;
  solution: string;
  techUsed: string[];
  results: string[];
  metrics: { value: string; label: string }[];
  accent: "blue" | "coral";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cadbury-oreo-pokemon",
    brand: "Cadbury Oreo",
    title: "Pokémon Collect Quest",
    category: "Gamified Consumer Promotion",
    summary:
      "Shoppers scanned cookies on a microsite to collect 16 Pokémon characters — unlocking a trip to Japan and more.",
    challenge:
      "Drive trial and repeat purchase among young shoppers in a crowded biscuit category.",
    objective: "Turn each pack into a reason to come back and collect.",
    solution:
      "A QR-led microsite game where scanning packs revealed collectible characters, gamifying repeat purchase toward a mega prize.",
    techUsed: ["QR platform", "Microsite / PWA", "Reward engine"],
    results: ["High repeat-scan rate", "Strong organic sharing", "Mega-prize trip awarded"],
    metrics: [
      { value: "16", label: "Characters to collect" },
      { value: "Japan", label: "Mega prize trip" },
    ],
    accent: "blue",
  },
  {
    slug: "mcdonalds-collect-quest",
    brand: "McDonald's",
    title: "Collect Quest",
    category: "App-led Loyalty",
    summary:
      "A one-month, app-native collect-and-win journey, simplified to a few taps — driving repeat footfall.",
    challenge: "Convert app installs into repeat restaurant visits within a tight window.",
    objective: "Reward frequency and make returning effortless.",
    solution:
      "An in-app collect-and-win mechanic reducing entry to a few taps, with instant rewards driving the next visit.",
    techUsed: ["Mobile app", "Loyalty engine", "Reward platform"],
    results: ["35,000+ customers engaged", "Lift in repeat footfall", "One-month sprint"],
    metrics: [
      { value: "35,000+", label: "Customers engaged" },
      { value: "1 month", label: "Campaign duration" },
    ],
    accent: "coral",
  },
  {
    slug: "perk-take-it-light",
    brand: "Perk",
    title: "Take It Light",
    category: "Missed-call Gamification",
    summary:
      "A missed call unlocked a bespoke microsite game collecting Perk chocolates — crowning a ₹10 lac mega winner.",
    challenge: "Reach a wide, feature-phone audience with a low-friction entry.",
    objective: "Maximise participation with a zero-cost first step.",
    solution:
      "A missed call triggered a personalised microsite game, blending voice reach with a gamified collect mechanic.",
    techUsed: ["Missed-call platform", "Microsite", "Randomizer"],
    results: ["1.25L+ entries", "1,601 winners", "₹10 lac mega winner"],
    metrics: [
      { value: "1.25L+", label: "Entries" },
      { value: "1,601", label: "Winners" },
    ],
    accent: "blue",
  },
  {
    slug: "itc-race-2-vegas",
    brand: "ITC · Dream Ride",
    title: "Race 2 Vegas",
    category: "Gaming Engagement",
    summary: "A thrilling racing game with a simplified entry flow — the grand prize a trip to Vegas.",
    challenge: "Stand out with an engagement format that rewards skill and time-on-experience.",
    objective: "Drive deep, repeatable play toward an aspirational prize.",
    solution: "A browser racing game with leaderboard mechanics and a streamlined entry path.",
    techUsed: ["HTML5 game", "Leaderboard", "Reward engine"],
    results: ["50,000+ players", "High session depth", "Grand Vegas trip awarded"],
    metrics: [
      { value: "50,000+", label: "Players" },
      { value: "Vegas", label: "Mega prize" },
    ],
    accent: "coral",
  },
  {
    slug: "panasonic-shout-to-win",
    brand: "Panasonic",
    title: "Shout To Win",
    category: "Voice + OBD",
    summary:
      "Callers shouted “PANASONIC” to score a live decibel reading — the day's loudest won daily prizes. Managed end to end.",
    challenge: "Create a memorable, shareable voice experience for a product launch.",
    objective: "Turn a phone call into a playful, competitive moment.",
    solution: "A voice/OBD platform measured caller decibels in real time and ranked daily winners.",
    techUsed: ["Voice platform", "OBD / IVR", "Analytics dashboard"],
    results: ["17,500 valid entries", "Daily winners", "End-to-end managed"],
    metrics: [
      { value: "17,500", label: "Valid entries" },
      { value: "Daily", label: "Winners" },
    ],
    accent: "blue",
  },
  {
    slug: "dabur-dant-rakshak",
    brand: "Dabur",
    title: "Dant Rakshak Sampling",
    category: "Missed-call Sampling",
    summary:
      "A missed call exchanged old toothpaste for a Dant Rakshak sample, delivered within 15 days across India.",
    challenge: "Drive switching trial at national scale with verified fulfilment.",
    objective: "Put a sample in hand and capture first-party data.",
    solution:
      "A missed-call sampling flow with address capture and tracked last-mile delivery across India.",
    techUsed: ["Missed-call platform", "Database management", "Fulfilment / logistics"],
    results: ["15L missed calls", "90,000 samples shipped", "15-day delivery"],
    metrics: [
      { value: "15L", label: "Missed calls" },
      { value: "90,000", label: "Samples shipped" },
    ],
    accent: "coral",
  },
];

/** Homepage "Selected work" grid reads the same source as /case-studies. */
export const work = caseStudies;

/* ───────────────────────── Testimonials (placeholder) ───────────────────────── */

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Mobikonnect turned a routine promotion into a campaign people actually talked about — and the ROI was right there in the dashboard.",
    name: "Brand Marketing Lead",
    role: "Leading FMCG brand",
  },
  {
    quote:
      "From mechanic to fulfilment, they ran the whole thing in-house. One team, no handoffs, fully measurable.",
    name: "Head of Trade Marketing",
    role: "Consumer durables brand",
  },
  {
    quote:
      "Their martech stack let us engage dealers across voice, WhatsApp and app — at a scale we couldn't have managed alone.",
    name: "National Sales Manager",
    role: "Building materials brand",
  },
];

/* ───────────────────────── Resources (placeholder) ───────────────────────── */

export type Resource = { type: string; title: string; desc: string };

export const resources: Resource[] = [
  { type: "Blog", title: "The state of experiential marketing in India", desc: "Where engagement is headed — AI, omnichannel and instant rewards." },
  { type: "Whitepaper", title: "Loyalty that actually retains", desc: "Designing programs that move repeat purchase, not just sign-ups." },
  { type: "Guide", title: "The trade promotion playbook", desc: "Dealer, retailer and influencer programs that move sell-out." },
  { type: "Guide", title: "Gamification mechanics that convert", desc: "Spin, scratch, quiz and collect — when to use which." },
  { type: "Report", title: "Engagement benchmarks 2026", desc: "Participation, redemption and ROI benchmarks across categories." },
  { type: "Calculator", title: "Campaign ROI calculator", desc: "Estimate reach, participation and reward cost before you launch." },
];

export const clients = [
  "Cadbury",
  "Oreo",
  "McDonald's",
  "ITC",
  "Britannia",
  "GreenPly",
  "Tops",
  "Jack & Jones",
  "Mattel",
  "Dabur",
  "Fortune",
  "Panasonic",
  "Royal Stag",
  "Fena",
  "Perk",
] as const;
