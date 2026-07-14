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
  address: "E-109, LGF, Amar Colony, Lajpat Nagar 4, New Delhi 24",
  phones: ["7210-123-123", "9910-171-197", "9560-44-6667"],
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
  { label: "Case Studies", href: "/CaseStudies" },
  { label: "About", href: "/About" },
  { label: "Contact", href: "/contact" },
] as const;

export type Stat = {
  value?: number;
  prefix?: string;
  suffix?: string;
  /** "in" formats with Indian digit grouping (e.g. 5,00,000) */
  format?: "in" | "plain";
  /** Static display text used instead of an animated counter (e.g. "Millions") */
  text?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Brands" },
  { value: 15, suffix: "+", label: "Years" },
  { value: 1000, suffix: "+", label: "Campaigns" },
  { text: "Millions", label: "Consumers engaged" },
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
    { value: "100+", label: "Brands" },
    { value: "15+", label: "Years" },
    { value: "1,000+", label: "Campaigns" },
    { value: "Millions", label: "Consumers engaged" },
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

/* ───────────────────────── Consumer Promotions — landing page ───────────────────────── */

export const consumerPromotionsPage = {
  eyebrow: "Consumer Promotions",
  title: "Consumer Promotion Agency in India",
  highlight: ["Agency", "India"],
  intro:
    "Mobikonnect is a Consumer Promotion Agency in India helping brands turn shoppers into participants — through Scratch & Win, Scan & Win, WhatsApp and QR promotions, instant cashback and consumer reward programs, engineered and run end to end.",
  solutions: [
    {
      no: "01",
      title: "Scratch & Win Campaigns",
      desc: "Physical and digital scratch cards that reveal instant prizes — printed, in-app or on pack, with fraud-proof, auditable odds.",
    },
    {
      no: "02",
      title: "Scan & Win Promotions",
      desc: "QR and barcode scans on-pack or in-store that unlock instant rewards, entries and gratification in one tap.",
    },
    {
      no: "03",
      title: "Purchase & Win Campaigns",
      desc: "Every receipt or invoice becomes an entry — verified via upload, QR or missed call, at retail or e-commerce scale.",
    },
    {
      no: "04",
      title: "WhatsApp Promotions",
      desc: "Conversational campaigns that run entirely inside WhatsApp — entry, verification and reward delivery without an app download.",
    },
    {
      no: "05",
      title: "Cashback & Reward Programs",
      desc: "Instant cashback, vouchers and gift disbursement that make gratification feel immediate and almost like cash.",
    },
    {
      no: "06",
      title: "QR Code Campaigns",
      desc: "Dynamic, secure QR codes on packaging and collateral that connect every scan to a trackable, fraud-proof campaign.",
    },
  ],
  whyChoose: [
    {
      no: "01",
      title: "Gratification-led Mechanics",
      desc: "Win-and-earn campaigns designed for gratification, not just participation — rewards with an almost-cash perception that shoppers act on immediately.",
    },
    {
      no: "02",
      title: "Fraud-proof & Auditable",
      desc: "Secure QR, unique codes and randomiser logic mean every scratch, scan and draw is verifiable and audit-ready.",
    },
    {
      no: "03",
      title: "Omnichannel Reach",
      desc: "Scratch & Win, Scan & Win, WhatsApp, QR, IVR and web — we run the mechanic wherever your consumer already is.",
    },
    {
      no: "04",
      title: "Reward Fulfilment, End to End",
      desc: "From reward sourcing to last-mile gift disbursement, one team owns the entire journey — no handoffs, no black boxes.",
    },
    {
      no: "05",
      title: "Measurable Sales Lift",
      desc: "Every entry, redemption and rupee is tracked to participation and ROI — so you know exactly what the promotion delivered.",
    },
  ],
  faqs: [
    {
      q: "What is a consumer promotion campaign?",
      a: "A consumer promotion is a marketing mechanic — like Scratch & Win, Scan & Win or Cashback — that rewards shoppers directly for purchase, participation or engagement, driving trial, repeat purchase and brand recall.",
    },
    {
      q: "What types of consumer promotions does Mobikonnect run?",
      a: "We run Scratch & Win, Scan & Win, Purchase & Win, WhatsApp Promotions, QR Code Campaigns, Instant Cashback, Lucky Draws, Digital Coupon Campaigns and Referral Programs — tailored to your category and audience.",
    },
    {
      q: "How do you ensure winner selection is fair and auditable?",
      a: "Every campaign runs on auditable randomiser logic with a documented, verifiable process — from entry to winner declaration to gift disbursement — so results hold up to audit and legal scrutiny.",
    },
    {
      q: "Can consumer promotions run on WhatsApp and QR codes?",
      a: "Yes — WhatsApp Promotions and QR Code Campaigns are two of our most-used mechanics, letting consumers enter, verify purchase and receive rewards without downloading an app.",
    },
    {
      q: "Which industries do you run consumer promotions for?",
      a: "FMCG, consumer durables, automobile, paints, retail, banking, telecom and more — the mechanic and reward economics are tailored to each category.",
    },
    {
      q: "How is reward fulfilment handled?",
      a: "We manage reward sourcing and last-mile gift disbursement ourselves — tracked end to end so every winner actually receives their reward, on time.",
    },
  ],
} as const;

/* ───────────────────────── Martech Platform — landing page ───────────────────────── */

export const martechPlatformPage = {
  eyebrow: "Martech Platform",
  title: "Marketing Technology Platform for Promotions, Loyalty & Customer Engagement",
  highlight: ["Technology", "Engagement"],
  intro:
    "One platform, endless marketing possibilities. Mobikonnect's Marketing Technology Platform helps brands manage consumer promotions, trade schemes, loyalty programs, rewards, customer engagement and campaign analytics — connected to your existing CRM, ERP and DMS for complete visibility and control.",
  cta: { label: "Request a Platform Demo", href: "/contact" },
  capabilities: [
    "Consumer Promotion Management",
    "Trade Promotion Management",
    "Loyalty Program Management",
    "Rewards & Redemption Engine",
    "WhatsApp Campaigns",
    "QR Code Campaigns",
    "SMS & IVR Campaigns",
    "Campaign Analytics Dashboard",
  ],
  keyFeatures: [
    "Omnichannel campaign management",
    "WhatsApp Business API integration",
    "QR code & unique code validation",
    "Rewards & coupon management",
    "Cashback automation",
    "Real-time dashboards",
    "Fraud detection & secure validation",
    "Multi-language support",
  ],
  integrations: [
    "SAP",
    "Salesforce",
    "Zoho CRM",
    "Microsoft Dynamics",
    "Oracle",
    "ERP Systems",
    "DMS Platforms",
    "Payment Gateways",
  ],
  whyChoose: [
    {
      no: "01",
      title: "One Platform for All Engagement Programs",
      desc: "Promotions, loyalty, trade schemes, rewards and analytics run from a single integrated platform — not five different vendors.",
    },
    {
      no: "02",
      title: "Enterprise-grade Security",
      desc: "Every campaign and reward transaction is handled with enterprise-grade security, encryption and access control.",
    },
    {
      no: "03",
      title: "Scalable Architecture",
      desc: "Built to run pan-India, multi-language campaigns at volume without compromising speed or uptime.",
    },
    {
      no: "04",
      title: "API-first Integrations",
      desc: "Connects cleanly with your existing CRM, ERP, DMS and payment gateways instead of forcing a rip-and-replace.",
    },
    {
      no: "05",
      title: "Real-time Analytics & Reporting",
      desc: "Live dashboards on participation, redemption and ROI — so decisions are made on current data, not last month's report.",
    },
    {
      no: "06",
      title: "Faster Campaign Deployment",
      desc: "Pre-built mechanics and reward logic mean campaigns launch in days, not months.",
    },
    {
      no: "07",
      title: "Pan-India Support",
      desc: "Execution and support that reaches every market you run campaigns in, not just the metros.",
    },
    {
      no: "08",
      title: "End-to-end Implementation",
      desc: "We don't just license the software — we implement, support and run it with you.",
    },
  ],
  industries: [
    "FMCG",
    "Consumer Durables",
    "Retail",
    "Paints",
    "Building Materials",
    "Automotive",
    "Telecom",
    "BFSI",
    "Electronics",
  ],
  howItWorks: {
    steps: ["Configure", "Launch", "Engage", "Reward", "Analyse"],
    desc: "Our platform simplifies campaign management, automates rewards and provides actionable insights to help brands make better marketing decisions.",
  },
  relatedSolutions: [
    { label: "Consumer Promotions", href: "/consumer-promotions" },
    { label: "Trade Promotions", href: "/trade-promotions" },
    { label: "Loyalty Programs", href: "/loyalty-programs" },
    { label: "Customer Engagement", href: "/customer-engagement" },
    { label: "Employee Engagement", href: "/what-we-do" },
  ],
  faqs: [
    {
      q: "Can the platform integrate with our existing ERP and CRM?",
      a: "Yes — the platform is built API-first and integrates with major ERP and CRM systems including SAP, Salesforce, Zoho CRM, Microsoft Dynamics and Oracle, along with DMS platforms and payment gateways.",
    },
    {
      q: "Is the platform suitable for nationwide campaigns?",
      a: "Yes — it's built for enterprise scale and runs pan-India campaigns across multiple languages, channels and geographies simultaneously.",
    },
    {
      q: "Can multiple campaigns run simultaneously?",
      a: "Yes — the platform is designed to manage multiple concurrent campaigns across promotions, loyalty, trade and engagement programs from a single dashboard.",
    },
    {
      q: "Does Mobikonnect provide implementation and support?",
      a: "Yes — every deployment includes end-to-end implementation and ongoing support, not just the software. We don't just license technology, we help you run it.",
    },
    {
      q: "Is the platform secure and scalable?",
      a: "Yes — the platform is built on enterprise-grade security and a scalable architecture designed to handle high-volume, nationwide campaigns without compromising performance.",
    },
  ],
} as const;

/* ───────────────────────── Trade Promotions — landing page ───────────────────────── */

export const tradePromotionsPage = {
  eyebrow: "Trade Promotions",
  title: "Trade Promotion Agency in India",
  highlight: ["Agency", "India"],
  intro:
    "Primary sales may fill distributor warehouses, but sustained growth comes from strong secondary sales. Mobikonnect helps brands design and execute trade promotion programs that motivate dealers, retailers, distributors and influencers to sell more, stay engaged and build long-term loyalty — from dealer incentives and retailer rewards to painter, plumber, electrician and mechanic loyalty initiatives.",
  cta: { label: "Talk to Our Trade Promotion Experts", href: "/contact" },
  metaTitle: "Trade Promotion Agency India | Dealer & Retailer Loyalty Programs | Mobikonnect",
  metaDescription:
    "Drive sell-out with dealer loyalty, retailer incentive programs, channel partner rewards, trade promotions and incentive management solutions by Mobikonnect.",
  solutions: [
    { no: "01", title: "Dealer Loyalty Programs", desc: "Point-based and tiered loyalty that rewards dealers for sell-out, not just stock-in." },
    { no: "02", title: "Retailer Loyalty Programs", desc: "Incentive schemes that keep retailers pushing your brand at the point of sale." },
    { no: "03", title: "Distributor Incentive Programs", desc: "Slab-wise incentive structures that reward distributors for hitting and exceeding targets." },
    { no: "04", title: "Channel Partner Rewards", desc: "Multi-tier reward programs that engage every layer of your channel under one scheme." },
    { no: "05", title: "Painter, Plumber & Mechanic Loyalty Programs", desc: "Tradesperson loyalty that builds recall at the point where buying decisions are actually influenced." },
    { no: "06", title: "Sales Incentive Programs", desc: "Contest and incentive mechanics that turn targets into a game your sales force wants to win." },
  ],
  whyChoose: [
    { no: "01", title: "End-to-end Trade Promotion Management", desc: "From scheme design to reward fulfilment, one team manages the entire trade promotion lifecycle." },
    { no: "02", title: "Flexible Incentive Structures", desc: "Slab-wise, tier-based or flat incentives — reward logic that fits your channel structure." },
    { no: "03", title: "Real-time Sales Tracking", desc: "Live visibility into scheme performance and sell-out as it happens, not at month-end." },
    { no: "04", title: "Digital Rewards & Redemption", desc: "Points, vouchers and cashback redeemable digitally, with no manual reconciliation." },
    { no: "05", title: "WhatsApp & Mobile-first Platform", desc: "Enrolment, tracking and redemption designed for how dealers and retailers actually use their phones." },
    { no: "06", title: "Dealer & Retailer Engagement Dashboards", desc: "Partner-facing dashboards that keep your channel informed on standing, targets and rewards." },
    { no: "07", title: "Nationwide Reward Fulfilment", desc: "Reward sourcing and last-mile delivery handled pan-India, tracked end to end." },
    { no: "08", title: "ERP & DMS Integration", desc: "Connects cleanly with your existing ERP and DMS instead of running as a disconnected side system." },
  ],
  industries: [
    "FMCG",
    "Consumer Durables",
    "Paints",
    "Building Materials",
    "Electricals",
    "Plumbing",
    "Automotive",
    "Cement",
    "Telecom",
  ],
  howItWorks: {
    steps: ["Design", "Enrol", "Track", "Reward", "Analyse"],
    desc: "We manage the complete lifecycle — from scheme design and participant onboarding to reward fulfilment and performance analytics.",
  },
  relatedSolutions: [
    { label: "Dealer Meets", href: "/what-we-do" },
    { label: "Retailer Meets", href: "/what-we-do" },
    { label: "Loyalty Programs", href: "/loyalty-programs" },
    { label: "Consumer Promotions", href: "/consumer-promotions" },
    { label: "Employee Incentive Programs", href: "/what-we-do" },
  ],
  faqs: [
    { q: "How quickly can a trade promotion be launched?", a: "Pre-built scheme templates and reward logic mean most trade promotions can launch in weeks, not months." },
    { q: "Can the platform integrate with our DMS or ERP?", a: "Yes — the platform is API-first and integrates with major DMS and ERP systems to sync sell-out and redemption data." },
    { q: "What reward options are available?", a: "Points, vouchers, gift cards, cashback and physical gifts — reward economics tailored to your channel and budget." },
    { q: "Can we run different schemes for dealers and retailers?", a: "Yes — separate schemes, tiers and reward pools can run simultaneously for each channel tier under one platform." },
    { q: "Can we launch a pilot in one region?", a: "Yes — schemes can be piloted in a single region or channel tier before a full national rollout." },
  ],
  finalCtaTitle: "Build a High-Performing Channel Network",
  finalCtaDesc:
    "Whether you're launching a seasonal incentive scheme or a year-long channel loyalty program, Mobikonnect helps you increase channel engagement, improve sell-out, and strengthen partner relationships.",
  finalCtaLabel: "Speak with Our Trade Promotion Specialists",
} as const;

/* ───────────────────────── Loyalty Programs — landing page ───────────────────────── */

export const loyaltyProgramsPage = {
  eyebrow: "Loyalty Programs",
  title: "Loyalty Program Solutions That Build Long-Term Customer & Channel Relationships",
  highlight: ["Customer", "Relationships"],
  intro:
    "Acquiring customers is expensive — retaining them is where real business growth happens. Mobikonnect helps brands build customer, dealer and channel loyalty programs that encourage repeat purchases, increase engagement and strengthen long-term relationships, with points-based rewards, tiered memberships, digital redemption and real-time analytics in one platform.",
  cta: { label: "Talk to Our Loyalty Experts", href: "/contact" },
  metaTitle: "Loyalty Program Company India | Customer & Channel Loyalty Solutions | Mobikonnect",
  metaDescription:
    "Build customer, dealer and channel loyalty with points-based rewards, tier programs, digital redemption and loyalty management solutions by Mobikonnect.",
  solutions: [
    { no: "01", title: "Customer Loyalty Programs", desc: "Points, tiers and rewards that turn one-time buyers into repeat customers." },
    { no: "02", title: "Dealer Loyalty Programs", desc: "Incentive structures that reward dealers for sell-out, not just stock-in." },
    { no: "03", title: "Retailer Loyalty Programs", desc: "Point-of-sale loyalty that keeps retailers pushing your brand over the competition." },
    { no: "04", title: "Channel Partner Loyalty", desc: "Multi-tier programs that engage distributors, retailers and influencers under one scheme." },
    { no: "05", title: "Employee Rewards Programs", desc: "The same rewards engine, tuned for recognition and performance inside your own teams." },
    { no: "06", title: "Points & Tier-Based Memberships", desc: "Structured earn-and-burn logic with tiers that reward your best customers and partners more." },
  ],
  keyFeatures: [
    "Points-based earning and redemption",
    "Tiered membership programs",
    "Digital reward catalogue",
    "Gift cards, vouchers & cashback",
    "WhatsApp-enabled engagement",
    "Real-time dashboards & analytics",
    "Automated reward fulfilment",
    "CRM & ERP integration",
  ],
  whyChoose: [
    { no: "01", title: "One Platform for Customer and Channel Loyalty", desc: "Consumer, dealer and employee loyalty run from the same integrated platform — not separate tools stitched together." },
    { no: "02", title: "Custom Programme Design", desc: "Points, tiers and reward logic designed around your business model, not a generic template." },
    { no: "03", title: "Flexible Reward Structures", desc: "Cashback, vouchers, gifts or points — reward economics that flex to your budget and audience." },
    { no: "04", title: "Nationwide Reward Fulfilment", desc: "Reward sourcing and last-mile delivery handled pan-India, tracked end to end." },
    { no: "05", title: "Mobile-first Loyalty Experience", desc: "Enrolment, earning and redemption designed for how members actually use their phones." },
    { no: "06", title: "Advanced Reporting & Analytics", desc: "Live dashboards on enrolment, redemption and retention — not a monthly export." },
    { no: "07", title: "Secure and Scalable Technology", desc: "Built to handle high enrolment volumes securely, without slowing down redemption." },
    { no: "08", title: "Fast Implementation", desc: "Pre-built program logic means your loyalty platform launches in weeks, not quarters." },
  ],
  industries: [
    "FMCG",
    "Consumer Durables",
    "Paints",
    "Building Materials",
    "Electrical",
    "Automotive",
    "Telecom",
    "Retail & E-commerce",
    "BFSI",
  ],
  howItWorks: {
    steps: ["Enroll", "Earn", "Engage", "Redeem", "Retain"],
    desc: "We help you design, launch and manage loyalty programs that increase repeat purchases while providing actionable customer insights.",
  },
  relatedSolutions: [
    { label: "Consumer Promotions", href: "/consumer-promotions" },
    { label: "Trade Promotions", href: "/trade-promotions" },
    { label: "Employee Engagement", href: "/what-we-do" },
    { label: "Customer Engagement", href: "/customer-engagement" },
    { label: "Martech Platform", href: "/martech-platform" },
  ],
  faqs: [
    { q: "What types of loyalty programs can Mobikonnect build?", a: "Customer, dealer, retailer, channel partner and employee loyalty programs — points-based, tiered or hybrid, tailored to your business model." },
    { q: "Can the platform support dealers and customers together?", a: "Yes — the same platform runs consumer and channel loyalty simultaneously, with separate schemes, tiers and reward pools for each." },
    { q: "Can loyalty points be redeemed instantly?", a: "Yes — points convert to vouchers, gift cards or cashback through a digital reward catalogue with instant redemption." },
    { q: "Does the platform integrate with our CRM and ERP?", a: "Yes — the platform is API-first and integrates with major CRM and ERP systems to sync purchase, member and redemption data." },
    { q: "How quickly can a loyalty program be launched?", a: "Pre-built program logic and reward catalogues mean most loyalty programs can launch in weeks, not quarters." },
  ],
  finalCtaTitle: "Ready to Build Customer Loyalty That Lasts?",
  finalCtaDesc:
    "Whether you're rewarding customers, dealers or channel partners, Mobikonnect helps you create loyalty programs that increase retention, drive repeat purchases and deliver measurable business growth.",
  finalCtaLabel: "Speak with Our Loyalty Program Specialists",
} as const;

/* ───────────────────────── Experiential Marketing — landing page ───────────────────────── */

export const experientialMarketingPage = {
  eyebrow: "Experiential Marketing",
  title: "Experiential Marketing That Creates Memorable Brand Experiences",
  highlight: ["Memorable", "Experiences"],
  intro:
    "Consumers don't just buy products — they remember experiences. Mobikonnect is an Experiential Marketing Agency in India designing brand activations, product sampling, roadshows and retail experiences — backed by technology that captures consumer data and measures every campaign's ROI.",
  cta: { label: "Plan Your Next Brand Activation", href: "/contact" },
  metaTitle: "Experiential Marketing Agency India | Brand Activation & Roadshows | Mobikonnect",
  metaDescription:
    "Create memorable brand experiences with mall activations, roadshows, product sampling, retail promotions, campus campaigns and experiential marketing solutions by Mobikonnect.",
  solutions: [
    { no: "01", title: "Brand Activations", desc: "Immersive on-ground activations that put your brand directly in front of consumers, at city or national scale." },
    { no: "02", title: "Mall Activations", desc: "High-footfall engagement inside the malls where your shoppers already spend their time." },
    { no: "03", title: "Product Sampling Campaigns", desc: "Trial-driven sampling that puts the product directly in the consumer's hands." },
    { no: "04", title: "Roadshows & Mobile Activations", desc: "Activations that travel to your audience — market to market, city to city." },
    { no: "05", title: "Retail & In-store Promotions", desc: "Shopper-marketing moments at the point of purchase, where the buying decision is actually made." },
    { no: "06", title: "College & Campus Activations", desc: "Campus-wide engagement that reaches a young, high-influence audience directly." },
    { no: "07", title: "RWA & Community Activations", desc: "Neighbourhood-level activations that build trust and trial inside residential communities." },
    { no: "08", title: "Meet & Greet Experiences", desc: "Celebrity and influencer meet-and-greet formats that turn footfall into a talked-about moment." },
  ],
  whyChoose: [
    { no: "01", title: "End-to-end Campaign Execution", desc: "From concept and production to on-ground delivery, one team runs the entire activation." },
    { no: "02", title: "Pan-India Activation Network", desc: "Execution capability that reaches every city, mall, campus and community you need." },
    { no: "03", title: "Technology-enabled Consumer Engagement", desc: "Every activation is wired with digital mechanics, not just a stall and a banner." },
    { no: "04", title: "QR & WhatsApp Lead Capture", desc: "Footfall converts into a compliant, structured data set captured on the spot." },
    { no: "05", title: "Real-time Reporting & Analytics", desc: "Live visibility into footfall, participation and lead capture as the activation runs." },
    { no: "06", title: "Experienced Promoter Management", desc: "Trained, managed on-ground teams that represent your brand consistently, everywhere." },
    { no: "07", title: "Creative Concepts & Production", desc: "Activation concepts and production designed to be memorable, not generic." },
    { no: "08", title: "Measurable Campaign ROI", desc: "Every activation is tracked to footfall, participation and lead conversion — not just attendance." },
  ],
  industries: [
    "FMCG",
    "Consumer Durables",
    "Food & Beverage",
    "Personal Care",
    "Paints & Building Materials",
    "Electronics",
    "Automotive",
    "Telecom",
    "Retail",
  ],
  howItWorks: {
    steps: ["Plan", "Activate", "Engage", "Capture", "Analyse"],
    desc: "From concept creation and venue execution to lead capture and performance reporting, Mobikonnect manages every stage of your experiential campaign.",
  },
  relatedSolutions: [
    { label: "Consumer Promotions", href: "/consumer-promotions" },
    { label: "Meet & Greet Events", href: "/what-we-do" },
    { label: "Customer Engagement", href: "/customer-engagement" },
    { label: "Influencer Marketing", href: "/what-we-do" },
    { label: "Loyalty Programs", href: "/loyalty-programs" },
  ],
  faqs: [
    { q: "Can Mobikonnect execute activations across multiple cities?", a: "Yes — we run activations pan-India, across metros, tier-2 cities, malls, campuses and communities, with consistent execution and reporting." },
    { q: "Do you provide promoters and event staff?", a: "Yes — trained, managed on-ground promoters and event staff are part of every activation we run." },
    { q: "Can consumer data be captured digitally?", a: "Yes — QR and WhatsApp-based lead capture turn footfall into a compliant, structured first-party data set." },
    { q: "How do you measure campaign success?", a: "Footfall, participation, lead capture and conversion are tracked in real time and reported per activation." },
    { q: "Can activations be integrated with loyalty or consumer promotions?", a: "Yes — activations are often run alongside consumer promotion or loyalty mechanics for a combined on-ground and always-on engagement strategy." },
  ],
  finalCtaTitle: "Ready to Create Experiences That Drive Engagement?",
  finalCtaDesc:
    "Whether you're launching a new product, increasing brand awareness or driving product trials, Mobikonnect helps you create memorable brand experiences backed by measurable business outcomes.",
  finalCtaLabel: "Speak with Our Experiential Marketing Experts",
} as const;

/* ───────────────────────── Customer Engagement — landing page ───────────────────────── */

export const customerEngagementPage = {
  eyebrow: "Customer Engagement",
  title: "Customer Engagement Solutions That Keep Customers Coming Back",
  highlight: ["Coming", "Back"],
  intro:
    "Today's customers expect more than one-way communication — they want experiences that are engaging, rewarding and interactive. Mobikonnect delivers Customer Engagement Solutions in India through gamification, contests, quizzes, surveys, referrals and reward-based campaigns that increase participation, strengthen loyalty and capture first-party consumer insights.",
  cta: { label: "Talk to Our Engagement Experts", href: "/contact" },
  metaTitle: "Customer Engagement Solutions India | Gamification & Interactive Campaigns | Mobikonnect",
  metaDescription:
    "Increase customer engagement with gamification, quizzes, spin-the-wheel, contests, surveys and interactive digital campaigns powered by Mobikonnect.",
  solutions: [
    { no: "01", title: "Gamification Campaigns", desc: "Game mechanics layered onto any campaign, turning participation into something people actually enjoy." },
    { no: "02", title: "Spin the Wheel", desc: "Instant-gratification game mechanics that make engagement feel like play, not a form to fill." },
    { no: "03", title: "Quiz & Trivia Campaigns", desc: "Fast, shareable formats that turn brand knowledge into a game worth playing." },
    { no: "04", title: "Polls & Surveys", desc: "Structured feedback formats that capture insight while keeping participation high." },
    { no: "05", title: "Refer & Earn Programs", desc: "Referral loops that turn engaged customers into acquisition channels." },
    { no: "06", title: "Instant Win Games", desc: "Immediate gratification mechanics that reward participation the moment it happens." },
    { no: "07", title: "Leaderboards & Challenges", desc: "Competition mechanics that keep audiences coming back to check their rank." },
    { no: "08", title: "Digital Contest Campaigns", desc: "End-to-end contest management, from entry to auditable winner declaration." },
  ],
  whyChoose: [
    { no: "01", title: "Mobile-first Engagement Platform", desc: "Every mechanic is designed and built for how consumers actually engage — on their phone, first." },
    { no: "02", title: "WhatsApp, QR & Web-based Participation", desc: "Entry and participation wherever your audience already is — no app download required." },
    { no: "03", title: "Custom Gamification Mechanics", desc: "Game design tailored to your brand and audience, not an off-the-shelf template." },
    { no: "04", title: "Real-time Analytics & Dashboards", desc: "Live visibility into participation, completion and repeat-play as the campaign runs." },
    { no: "05", title: "Reward & Loyalty Integration", desc: "Engagement mechanics connect directly into reward wallets and loyalty tiers." },
    { no: "06", title: "First-party Data Collection", desc: "Every interaction builds a compliant, structured view of your audience." },
    { no: "07", title: "Secure Campaign Management", desc: "Auditable entry, participation and winner-selection logic, built to hold up to scrutiny." },
    { no: "08", title: "Fast Campaign Deployment", desc: "Pre-built mechanics mean engagement campaigns launch in days, not months." },
  ],
  industries: [
    "FMCG",
    "Consumer Durables",
    "Food & Beverage",
    "Personal Care",
    "Retail & E-commerce",
    "Telecom",
    "BFSI",
    "Automotive",
    "Paints & Building Materials",
  ],
  howItWorks: {
    steps: ["Engage", "Interact", "Reward", "Retain", "Analyse"],
    desc: "We design interactive campaigns that encourage repeat participation while helping brands capture insights and improve customer retention.",
  },
  relatedSolutions: [
    { label: "Consumer Promotions", href: "/consumer-promotions" },
    { label: "Loyalty Programs", href: "/loyalty-programs" },
    { label: "Experiential Marketing", href: "/experiential-marketing" },
    { label: "Martech Platform", href: "/martech-platform" },
    { label: "Influencer Marketing", href: "/what-we-do" },
  ],
  faqs: [
    { q: "What types of games and engagement campaigns can Mobikonnect build?", a: "Spin-the-wheel, quizzes, trivia, polls, surveys, refer-and-earn, instant-win games and digital contests — tailored to your brand, audience and channel." },
    { q: "Can campaigns run on WhatsApp and QR codes?", a: "Yes — most of our engagement mechanics run entirely on WhatsApp, QR or web, with no app download needed." },
    { q: "Can customer engagement campaigns integrate with loyalty programs?", a: "Yes — engagement mechanics connect directly into reward wallets and loyalty tiers for a combined engagement-and-retention strategy." },
    { q: "How is campaign performance measured?", a: "Participation, completion, repeat-play and referral rates are tracked live and reported per campaign." },
    { q: "Can rewards be distributed instantly?", a: "Yes — instant-win and cashback mechanics are built for real-time reward disbursement at the moment of participation." },
  ],
  finalCtaTitle: "Ready to Engage Customers Beyond Their First Purchase?",
  finalCtaDesc:
    "Whether you're looking to increase participation, collect customer insights or improve retention, Mobikonnect helps you create interactive campaigns that keep your audience engaged.",
  finalCtaLabel: "Speak with Our Customer Engagement Specialists",
} as const;
