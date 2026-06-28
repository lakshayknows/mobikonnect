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
  email: "Sales@mobikonnect.com",
  linkedin: "https://www.linkedin.com/company/mobikonnect/mycompany/",
  socials: {
    facebook: "https://www.facebook.com/MobiKonnect",
    instagram: "https://www.instagram.com/mobikonnect/",
    twitter: "https://twitter.com/Mobikonnect",
  },
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
  { label: "What We Do", href: "/what-we-do" },
  { label: "Case Studies", href: "/case-studies" },
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
    bg: "#0999D5",
    dot: "#D05E62",
  },
  {
    title: "REWARD",
    desc: "Application development, microsites and engagement journeys — while sourcing rewards at scale and on budget.",
    label: "2nd",
    bg: "#0a7bac",
    dot: "#F8EBD3",
  },
  {
    title: "RETAIN",
    desc: "Auditable winner selection, managed end to end — with last-mile gift disbursement and loyalty that brings audiences back.",
    label: "3rd",
    bg: "#06547a",
    dot: "#D05E62",
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
  /** Optional real campaign media (gif/video) — overrides the placeholder hero panel when present. */
  media?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "perk-play-and-win",
    brand: "Cadbury Perk",
    title: "Play & Win",
    category: "Gamified Consumer Promotion",
    media: "/case-studies/perk-play-and-win.mp4",
    summary:
      "A 90-day obstacle-dodging game joined by missed call or microsite, with leaderboard scoring and a ₹10 lakh mega prize.",
    challenge:
      "Drive mass engagement and repeat purchase for Perk with a low-friction, high-reach game.",
    objective: "Turn every pack into entry to a game worth playing daily.",
    solution:
      "Players joined via a missed call or microsite to play an obstacle-dodging game; leaderboard scores decided the winners.",
    techUsed: ["Missed-call platform", "Microsite", "Leaderboard"],
    results: ["₹10 lakh mega prize", "1,200 voucher winners", "90-day campaign"],
    metrics: [
      { value: "₹10 lakh", label: "Mega prize" },
      { value: "1,200", label: "Winners" },
    ],
    accent: "blue",
  },
  {
    slug: "dabur-dant-rakshak",
    brand: "Dabur",
    title: "Dant Rakshak Sampling",
    category: "Missed-call Sampling",
    media: "/case-studies/dabur-dant-rakshak.mp4",
    summary:
      "A 45-day sampling drive: a missed call triggered an SMS link to claim a free Dant Rakshak sample, building a first-party database.",
    challenge: "Drive trial of a new oral-care product at national scale with verified fulfilment.",
    objective: "Put a sample in hand and capture first-party data.",
    solution:
      "A missed-call number sent an SMS link for sample registration and delivery, with the responding database captured.",
    techUsed: ["Missed-call gateway", "SMS delivery", "Fulfilment"],
    results: ["2.5 lakh missed calls", "1,00,000 samples distributed", "First-party database built"],
    metrics: [
      { value: "2.5L", label: "Missed calls" },
      { value: "1,00,000", label: "Samples" },
    ],
    accent: "coral",
  },
  {
    slug: "shri-lal-mahal-festival-dhamaka",
    brand: "Shri Lal Mahal",
    title: "Festival Dhamaka",
    category: "Code-based Promotion",
    summary:
      "A 45-day festive rice-brand promotion with Mobikwik: scratch-card codes texted in for cash rewards, with a Swift Dzire grand prize.",
    challenge: "Lift festive-season visibility and sales for the rice brand.",
    objective: "Reward purchase with instant cash and an aspirational grand prize.",
    solution:
      "Consumers texted scratch-card codes to redeem Mobikwik cash, entering a draw for a Maruti Swift Dzire.",
    techUsed: ["SMS redemption", "Mobikwik wallet"],
    results: ["Swift Dzire grand prize", "Mobikwik cash rewards", "Higher brand visibility"],
    metrics: [
      { value: "Swift Dzire", label: "Grand prize" },
      { value: "45 days", label: "Duration" },
    ],
    accent: "blue",
  },
  {
    slug: "panasonic-tambola",
    brand: "Panasonic",
    title: "Mahaphoneutsav Tambola",
    category: "Loyalty Game",
    summary:
      "A weekly Tambola game where every product purchase earned a ticket for Sunday games — sustaining engagement across the campaign.",
    challenge: "Sustain repeat purchase and weekly engagement around a product range.",
    objective: "Make each purchase a ticket to a recurring, live game.",
    solution:
      "Buyers registered tickets per purchase and joined weekly Sunday Tambola games for prizes.",
    techUsed: ["Phone registration", "Game platform"],
    results: ["10,000+ registered users", "₹8.5 lakh in prizes", "Weekly live games"],
    metrics: [
      { value: "10,000+", label: "Registered users" },
      { value: "₹8.5L", label: "Total prizes" },
    ],
    accent: "coral",
  },
  {
    slug: "mirinda-mobikwik-cashback",
    brand: "Mirinda",
    title: "Mobikwik Cashback Offer",
    category: "Cashback Promotion",
    summary:
      "A 90-day beverage promotion: label codes redeemed for ₹10–₹30 Mobikwik wallet cashback, at massive scale.",
    challenge: "Drive volume and repeat purchase across a wide beverage audience.",
    objective: "Reward every purchase with instant, low-friction cashback.",
    solution:
      "Consumers redeemed under-the-label codes for Mobikwik wallet cashback via a voucher platform.",
    techUsed: ["Voucher platform", "Wallet integration"],
    results: ["40 lakh+ participants", "₹10 crore in gift vouchers", "90-day campaign"],
    metrics: [
      { value: "40L+", label: "Participants" },
      { value: "₹10 cr", label: "Vouchers" },
    ],
    accent: "blue",
  },
  {
    slug: "britannia-bread-better",
    brand: "Britannia",
    title: "Bread Better toh Offer Better",
    category: "Code-based Promotion",
    summary:
      "A 30-day bread promotion: unique pack codes entered for a daily draw of 50 gold coins, with ₹10 Paytm cashback for everyone.",
    challenge: "Grow bread sales with a daily reason to buy.",
    objective: "Guarantee a reward for all while dangling a daily gold prize.",
    solution:
      "Consumers entered pack codes for assured ₹10 Paytm cashback and a daily draw for gold coins.",
    techUsed: ["Code entry", "Paytm integration"],
    results: ["25% growth in sales", "Daily gold-coin winners", "₹10 cashback for all"],
    metrics: [
      { value: "25%", label: "Sales growth" },
      { value: "30 days", label: "Duration" },
    ],
    accent: "coral",
  },
  {
    slug: "mattel-toy-blast",
    brand: "Mattel",
    title: "Toy Blast",
    category: "Code-based Promotion",
    summary:
      "A 60-day toy campaign: packaging codes submitted for daily hampers and a Volkswagen Polo grand prize — winner of two Gold Awards at ACEF 2020.",
    challenge: "Boost toy sales and stand out with an award-worthy mechanic.",
    objective: "Reward purchase daily while building toward a flagship prize.",
    solution:
      "Consumers submitted packaging codes for daily gift hampers and a grand-prize car draw.",
    techUsed: ["Code entry", "Cashback redemption"],
    results: ["Volkswagen Polo grand prize", "Daily ₹9,999 hampers", "2 Gold Awards · ACEF 2020"],
    metrics: [
      { value: "VW Polo", label: "Grand prize" },
      { value: "2 Gold", label: "ACEF 2020 awards" },
    ],
    accent: "blue",
  },
  {
    slug: "panasonic-shout-to-win",
    brand: "Panasonic",
    title: "Shout To Win",
    category: "Voice Engagement",
    summary:
      "A 60-day in-store campaign: a missed call triggered a callback where participants shouted “Panasonic” — the loudest each day won.",
    challenge: "Create a memorable, shareable in-store moment across multi-brand outlets.",
    objective: "Turn a store visit into a playful, competitive moment.",
    solution:
      "A missed call triggered a callback that captured the shout; the loudest entrant each day won a hamper.",
    techUsed: ["Missed-call & callback", "Voice platform"],
    results: ["Near-universal store-visitor participation", "Daily gift hampers", "60-day campaign"],
    metrics: [
      { value: "Daily", label: "Winners" },
      { value: "60 days", label: "Duration" },
    ],
    accent: "coral",
  },
  {
    slug: "fortune-vivo-hba1c",
    brand: "Fortune Vivo",
    title: "HbA1c Test",
    category: "Health Activation",
    summary:
      "A 60-day health promotion across Delhi NCR and Mumbai with Healthians: product codes redeemed for free HbA1c diabetes tests.",
    challenge: "Build relevance for a health-positioned oil through tangible benefit.",
    objective: "Convert purchase into a meaningful health action.",
    solution:
      "Consumers redeemed product codes for free HbA1c tests via a Healthians partnership.",
    techUsed: ["Code redemption", "Partner integration"],
    results: ["4,000+ HbA1c tests conducted", "Delhi NCR & Mumbai", "Healthians partnership"],
    metrics: [
      { value: "4,000+", label: "Health tests" },
      { value: "2 metros", label: "Regions" },
    ],
    accent: "blue",
  },
  {
    slug: "royal-stag-biggest-fan",
    brand: "Royal Stag",
    title: "Are You the Biggest Fan?",
    category: "Voice + IVR Quiz",
    summary:
      "A concert promotion in Delhi and Mumbai: a missed call led to an IVR quiz of three artist questions, with tickets via lucky draw.",
    challenge: "Drive concert buzz and reward genuine fans.",
    objective: "Qualify the most engaged fans for free tickets.",
    solution:
      "A missed call opened an IVR quiz; correct entrants went into a lucky draw for concert tickets.",
    techUsed: ["Missed-call gateway", "IVR quiz"],
    results: ["10,000+ users registered", "500 free concert tickets", "Delhi & Mumbai"],
    metrics: [
      { value: "10,000+", label: "Registrations" },
      { value: "500", label: "Concert tickets" },
    ],
    accent: "coral",
  },
  {
    slug: "britannia-khao-world-cup-jao",
    brand: "Britannia",
    title: "Khao World Cup Jao",
    category: "SMS Engagement",
    summary:
      "A 2019 Cricket World Cup campaign: pack codes texted in accumulated “runs”, with centuries earning vouchers and World Cup tickets.",
    challenge: "Ride World Cup fever to drive repeat purchase at huge scale.",
    objective: "Reward accumulation and gratify with cricket-themed prizes.",
    solution:
      "Consumers texted pack codes to build “runs”; milestones unlocked vouchers, with tickets and durables as top prizes.",
    techUsed: ["SMS code submission", "Reward engine"],
    results: ["2.7 million registered users", "120 World Cup tickets", "TVs & motorcycles awarded"],
    metrics: [
      { value: "2.7M", label: "Registered users" },
      { value: "120", label: "World Cup tickets" },
    ],
    accent: "blue",
  },
  {
    slug: "oreo-red-velvet-launch",
    brand: "OREO",
    title: "Red Velvet India Launch",
    category: "Retailer Activation",
    summary:
      "A metro retailer launch: retailers registered on a microsite to receive automated, personalised animated videos to share.",
    challenge: "Land a new variant with retailer advocacy in metro markets.",
    objective: "Turn retailers into amplifiers at launch.",
    solution:
      "Retailers registered on a microsite that auto-generated personalised animated videos for social sharing.",
    techUsed: ["Microsite portal", "Personalised video"],
    results: ["3,500+ retailers registered", "Personalised video at scale", "Metro rollout"],
    metrics: [
      { value: "3,500+", label: "Retailers" },
      { value: "Metros", label: "Coverage" },
    ],
    accent: "coral",
  },
  {
    slug: "emami-gold-rush",
    brand: "Emami Fair and Handsome",
    title: "Gold Rush",
    category: "Retailer Loyalty",
    summary:
      "A 60-day retailer-exclusive promotion: scratch-card codes from product boxes texted in for gold and silver coin rewards.",
    challenge: "Secure retailer push and shelf priority for the brand.",
    objective: "Reward the trade for stocking and selling.",
    solution:
      "Retailers texted scratch-card codes from boxes to win gold and silver coins.",
    techUsed: ["SMS entry", "Reward fulfilment"],
    results: ["24,700+ retailers registered", "200 gold + 600 silver coins", "60-day campaign"],
    metrics: [
      { value: "24,700+", label: "Retailers" },
      { value: "800", label: "Coin winners" },
    ],
    accent: "blue",
  },
  {
    slug: "maggi-pazzta-trips",
    brand: "Nestlé Maggi",
    title: "Pazzta — Trip to Italy & Spain",
    category: "SMS Engagement",
    summary:
      "Two consecutive 60-day campaigns: batch codes from packs texted in for all-expenses-paid trips to Italy and Spain, plus merchandise.",
    challenge: "Drive trial and repeat for Pazzta with aspirational travel.",
    objective: "Make pasta packs a passport to Europe.",
    solution:
      "Consumers texted batch codes to enter for international trips and merchandise; the concept was relaunched on its success.",
    techUsed: ["SMS gateway", "Reward engine"],
    results: ["All-expenses trips to Italy & Spain", "Relaunched on success", "Merchandise prizes"],
    metrics: [
      { value: "Italy & Spain", label: "Mega prizes" },
      { value: "2 × 60 days", label: "Campaigns" },
    ],
    accent: "coral",
  },
  {
    slug: "mahindra-bolero-super-stars",
    brand: "Mahindra",
    title: "Bolero Super Stars Award Programme 2019",
    category: "Rural Recognition",
    summary:
      "A rural recognition programme (starting in Rajasthan) selecting standout tractor owners via survey data — honoured at village, block and state levels.",
    challenge: "Deepen loyalty among rural Bolero owners in remote regions.",
    objective: "Recognise and celebrate exemplary owners at scale.",
    solution:
      "Pre-filled survey data identified award-worthy owners, recognised across three tiers, with JWT and PwC as partners.",
    techUsed: ["Survey systems", "Data analytics"],
    results: ["Village-to-state recognition", "Partnered with JWT & PwC", "Stronger customer loyalty"],
    metrics: [
      { value: "3 tiers", label: "Recognition levels" },
      { value: "Rajasthan+", label: "Rollout" },
    ],
    accent: "blue",
  },
  {
    slug: "jack-and-jones-inflight",
    brand: "Jack & Jones",
    title: "Inflight Promotion",
    category: "WhatsApp Engagement",
    summary:
      "A 30-day in-flight magazine campaign: readers messaged a promoted WhatsApp number to receive a ₹500 discount coupon.",
    challenge: "Convert a captive, premium in-flight audience into store visits.",
    objective: "Bridge a print touchpoint to a digital reward.",
    solution:
      "A magazine ad prompted a WhatsApp message that delivered a ₹500 discount coupon.",
    techUsed: ["WhatsApp messaging", "Digital vouchers"],
    results: ["~10,000 users targeted", "₹500 discount coupons", "30-day campaign"],
    metrics: [
      { value: "~10,000", label: "Users targeted" },
      { value: "₹500", label: "Coupon value" },
    ],
    accent: "coral",
  },
  {
    slug: "kohinoor-asli-bharosa",
    brand: "Kohinoor Rice",
    title: "Asli Bharose Ka Asli Tyohaar",
    category: "Code-based Promotion",
    summary:
      "A 60-day Gujarat-focused loyalty campaign: pack codes texted in for auditor-selected wins including ₹1 lakh solitaire pendants and daily gold coins.",
    challenge: "Build festive trust and loyalty in a key regional market.",
    objective: "Reward purchase with credible, audited prizes.",
    solution:
      "Consumers texted pack codes; an external auditor selected winners of solitaire pendants and daily gold coins.",
    techUsed: ["SMS code submission", "Audited draws"],
    results: ["15,000+ registered participants", "₹1 lakh solitaire pendants", "Daily gold coins"],
    metrics: [
      { value: "15,000+", label: "Participants" },
      { value: "₹1 lakh", label: "Top prize" },
    ],
    accent: "blue",
  },
  {
    slug: "nescafe-buy-and-fly",
    brand: "Nescafé",
    title: "Buy and Fly Bonanza",
    category: "SMS Engagement",
    summary:
      "A 60-day pan-India campaign: 200g pack codes texted to an external auditor for trips to Thailand and Paris, plus iPhones, TVs and more.",
    challenge: "Drive volume on larger packs nationwide.",
    objective: "Reward bigger baskets with aspirational travel.",
    solution:
      "Consumers texted 200g pack codes to an audited draw for international trips and premium gadgets.",
    techUsed: ["SMS redemption", "External audit"],
    results: ["8 lakh+ registered users", "Trips to Thailand & Paris", "iPhones, TVs & gold coins"],
    metrics: [
      { value: "8L+", label: "Registered users" },
      { value: "Thailand & Paris", label: "Mega trips" },
    ],
    accent: "coral",
  },
  {
    slug: "fortune-selfie-with-akshay",
    brand: "Fortune Sunflower Oil",
    title: "Selfie With Akshay",
    category: "WhatsApp Activation",
    summary:
      "A 30-day Kolkata campaign: consumers sent a selfie with the product via WhatsApp for a chance to meet Akshay Kumar.",
    challenge: "Spark regional engagement with star power.",
    objective: "Turn purchase into shareable, celebrity-led participation.",
    solution:
      "Consumers WhatsApp'd a selfie with the product to enter for a meet-and-greet with the star.",
    techUsed: ["WhatsApp entry", "Verification"],
    results: ["3,500 registered participants", "Meet-and-greet with the star", "Kolkata focus"],
    metrics: [
      { value: "3,500", label: "Participants" },
      { value: "30 days", label: "Duration" },
    ],
    accent: "blue",
  },
  {
    slug: "bournvita-breakfast-in-paris",
    brand: "Cadbury Bournvita",
    title: "Breakfast in Paris",
    category: "SMS Engagement",
    summary:
      "A 60-day pan-India campaign: pack codes texted to an external auditor for a trip to Paris, with daily TVS Jupiter scooter giveaways.",
    challenge: "Drive household repeat purchase at national scale.",
    objective: "Reward daily with a flagship travel grand prize.",
    solution:
      "Consumers texted pack codes to an audited draw for a Paris trip, with daily scooter winners along the way.",
    techUsed: ["SMS redemption", "External audit"],
    results: ["1.2 million+ registered users", "Trip to Paris grand prize", "Daily TVS Jupiter scooters"],
    metrics: [
      { value: "1.2M+", label: "Registered users" },
      { value: "Paris", label: "Grand prize" },
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

/* ───────────────────────── About page ───────────────────────── */

export const aboutPage = {
  eyebrow: "About Mobikonnect",
  title: "We engineer engagement people remember — and act on.",
  highlight: ["engagement", "act"],
  intro:
    "For 20+ years we've helped India's biggest brands turn audiences into participants — blending experiential marketing with engagement technology built end to end, in-house.",
  /** Long paragraph rendered with the gradient scroll-reveal. */
  story:
    "Mobikonnect is India's experiential marketing and customer engagement technology platform. We design and run measurable campaigns that engage, reward and retain consumers, channel partners and employees. From the first creative idea to the last gift delivered, we build the mechanic, the martech and the rewards in one place — so every interaction is trackable, every winner is auditable, and every rupee ties back to ROI. We don't just launch promotions. We build experiences people remember, powered by technology that proves it worked.",
  values: [
    {
      title: "Experiences",
      desc: "Engagement people remember — and act on — across physical and digital touchpoints.",
    },
    {
      title: "Technology",
      desc: "Omnichannel martech built in-house, end to end — voice, WhatsApp, QR, video and AI.",
    },
    {
      title: "Measurable",
      desc: "Every interaction tracked to participation, redemption and ROI — no black boxes.",
    },
    {
      title: "Ownership",
      desc: "One team from mechanic to fulfilment — strategy, build, rewards and last-mile delivery.",
    },
  ],
  /** About-specific proof points (independent of the homepage stats). */
  milestones: [
    { value: "20+", label: "Years engineering engagement" },
    { value: "100+", label: "Brands & campaigns delivered" },
    { value: "15L+", label: "Participants reached in a single campaign" },
    { value: "End-to-end", label: "Strategy · martech · rewards · fulfilment" },
  ],
} as const;

/* ───────────────────────── Founders ───────────────────────── */

export type Founder = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const founders: Founder[] = [
  {
    name: "Abhishek Khurana",
    role: "Co-Founder",
    bio: "A commerce graduate with a management degree and 18+ years across strategic alliances, brand partnerships and enterprise sales — he leads how Mobikonnect builds and scales engagement programs for India's biggest brands.",
    image: "/team/founder-1.jpg",
  },
  {
    name: "Shubhranshu Ahuja",
    role: "Co-Founder",
    bio: "An IMT MBA who has worked with Dabur, Godfrey Phillips, Nestlé, Johnson & Johnson and ITC — he shapes the CRM, loyalty and consumer-engagement platforms at the core of every campaign.",
    image: "/team/founder-2.jpg",
  },
];

/* ───────────────────────── Team photos (about gallery) ───────────────────────── */

export const teamPhotos: string[] = Array.from(
  { length: 31 },
  (_, i) => `/team/team-${String(i + 1).padStart(2, "0")}.jpg`,
);

/* ───────────────────────── FAQs (folded into About) ───────────────────────── */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What exactly does Mobikonnect do?",
    a: "We design and run experiential marketing and customer-engagement campaigns — promotions, loyalty, gamification and activations — powered by engagement technology we build in-house. From the first idea to the last gift delivered, it's one team, end to end.",
  },
  {
    q: "Who do your campaigns engage?",
    a: "Consumers, channel partners (dealers, retailers, distributors), influencers and tradespeople, and employees. We tailor the mechanic and reward economics to each audience.",
  },
  {
    q: "Do you only handle the technology, or the whole campaign?",
    a: "The whole campaign. Strategy and creative, the martech platform, reward sourcing and fulfilment, winner declaration and last-mile delivery — all under one roof, fully measurable.",
  },
  {
    q: "How do you measure results?",
    a: "Every campaign ships with live dashboards. We track participation, redemption and ROI in real time — no black boxes, and winner selection is auditable.",
  },
  {
    q: "Which channels can a campaign run across?",
    a: "Voice and IVR, WhatsApp, SMS, QR and unique codes, microsites and apps, interactive video, AR/WebAR — wired to a reward engine and analytics so the experience is omnichannel.",
  },
  {
    q: "How do we get started?",
    a: "Tell us the business outcome you're after — more repeat purchase, a stronger launch, rewarded partners, motivated teams. We'll engineer the experience that gets you there.",
  },
];
