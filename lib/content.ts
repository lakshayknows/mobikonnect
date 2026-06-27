/**
 * Single source of truth for all site content.
 * Extracted from the official Mobikonnect company deck (Mobikonnect 2.4).
 */

export const site = {
  name: "Mobikonnect",
  legal: "Parv Communications Pvt. Ltd.",
  domain: "mobikonnect.com",
  email: "team@mobikonnect.com",
  // NOTE: phone numbers in the source deck were not machine-readable — update before launch.
  phones: ["+91 99000 77997", "+91 95004 47777"],
  tagline: "We breathe & live mobile.",
  intro:
    "A full-service mobile marketing & advertising agency. We engineer consumer promotions, loyalty programs, partnerships and contests — blending rewards, technology and consumer insight into campaigns that move brands.",
  about:
    "Mobikonnect is a dedicated marketing and promotions agency specializing in Consumer Promotions, Loyalty Programs, Partnerships and Contests. We leverage a blend of rewards, technology and deep insight into consumer behaviour to deliver exceptional, measurable results — end to end.",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Technology", href: "#technology" },
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
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
  { value: 15, suffix: "+", label: "Marquee brands engaged" },
  { value: 500000, suffix: "+", format: "in", label: "Entries in a single campaign" },
  { value: 50, prefix: "₹", suffix: "L+", label: "Rewards pool disbursed" },
  { value: 90000, suffix: "+", format: "in", label: "Free samples delivered" },
];

export type Expertise = {
  no: string;
  title: string;
  blurb: string;
  points: string[];
};

export const expertise: Expertise[] = [
  {
    no: "01",
    title: "Sales & Trade Promotion",
    blurb: "Sell-out spikes engineered for festive windows and trade channels.",
    points: ["Festive promotions", "Trade promotions", "Instant gratification"],
  },
  {
    no: "02",
    title: "Consumer Promotion",
    blurb: "Acquisition and trial mechanics that turn shoppers into customers.",
    points: ["New customer acquisition", "Product launch & sampling", "Gift with purchase"],
  },
  {
    no: "03",
    title: "Loyalty Programs",
    blurb: "Retention engines for customers and channel partners alike.",
    points: ["Customer loyalty", "Channel loyalty", "CRM & referral programs"],
  },
  {
    no: "04",
    title: "Alliance & Partnership",
    blurb: "Co-marketing that multiplies reach across brands and franchises.",
    points: ["Cross promotion", "Joint marketing", "Movie associations & offers"],
  },
  {
    no: "05",
    title: "Employee Engagement",
    blurb: "Performance and occasion-based rewards that energise teams.",
    points: ["Performance-linked rewards", "Occasion gratification", "Referral rewards"],
  },
  {
    no: "06",
    title: "Influencer Marketing",
    blurb: "Creator-led storytelling across every video-first platform.",
    points: ["Store promotions", "Facebook · Instagram · YouTube", "E-commerce reviews"],
  },
  {
    no: "07",
    title: "Contests & Sweepstakes",
    blurb: "Gamified, on-pack and online contests built to go viral.",
    points: ["Online contests", "On-pack / in-pack", "Sweepstakes & prize wins"],
  },
  {
    no: "08",
    title: "Other Expertise",
    blurb: "The digital plumbing behind every campaign we run.",
    points: ["Chatbots", "Surveys & feedback", "Web development & custom apps"],
  },
];

export type Capability = {
  id: string;
  title: string;
  desc: string;
};

export const capabilities: Capability[] = [
  { id: "01", title: "Voice Platform", desc: "IVR, OBD & missed-call engagement at national scale." },
  { id: "02", title: "Loyalty Engine", desc: "Points, tiers and redemptions for consumers & channels." },
  { id: "03", title: "Unique Code Generation", desc: "Secure, fraud-proof codes for packs and coupons." },
  { id: "04", title: "Reward Platform", desc: "Instant gratification — wallets, vouchers & gifts." },
  { id: "05", title: "Video Platform", desc: "Personalised, auto-generated video at the user level." },
  { id: "06", title: "Analytics & Reporting", desc: "Live dashboards on participation and ROI." },
  { id: "07", title: "Database Management", desc: "Compliant, structured first-party consumer data." },
  { id: "08", title: "Randomizer", desc: "Auditable, transparent winner selection." },
];

export const process = [
  { no: "01", title: "Conceptualization", desc: "Strategy, mechanic and the big creative idea." },
  { no: "02", title: "Selection of Platform", desc: "The right tech stack for the campaign goal." },
  { no: "03", title: "Scratch Card", desc: "Reward logic, odds and gratification design." },
  { no: "04", title: "Gifts Procurement", desc: "Sourcing rewards at scale and on budget." },
  { no: "05", title: "Application Development", desc: "Microsites, apps and engagement journeys." },
  { no: "06", title: "Winner Declaration", desc: "Auditable selection and winner management." },
  { no: "07", title: "Gift Disbursement", desc: "Last-mile delivery, tracked end to end." },
] as const;

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
    title: "A Boost to Sales",
    desc: "When the word spreads, sell-out follows — measurably.",
  },
  {
    no: "04",
    title: "Loyalty",
    desc: "Better odds of going viral, retaining old customers and acquiring new ones via referrals.",
  },
  {
    no: "05",
    title: "Visibility",
    desc: "Amplified exposure across media properties and social platforms.",
  },
];

export type CaseStudy = {
  brand: string;
  title: string;
  category: string;
  summary: string;
  metrics: { value: string; label: string }[];
  accent: "blue" | "coral";
};

export const work: CaseStudy[] = [
  {
    brand: "Cadbury Oreo",
    title: "Pokémon Collect Quest",
    category: "Gamified Consumer Promotion",
    summary:
      "Shoppers scanned cookies on a microsite to collect 16 Pokémon characters — unlocking a trip to Japan and more.",
    metrics: [
      { value: "16", label: "Characters to collect" },
      { value: "Japan", label: "Mega prize trip" },
    ],
    accent: "blue",
  },
  {
    brand: "McDonald's",
    title: "Collect Quest",
    category: "App-led Loyalty",
    summary:
      "A one-month, app-native collect-and-win journey, simplified to a few taps — driving repeat footfall.",
    metrics: [
      { value: "35,000+", label: "Customers engaged" },
      { value: "1 month", label: "Campaign duration" },
    ],
    accent: "coral",
  },
  {
    brand: "Perk",
    title: "Take It Light",
    category: "Missed-call Gamification",
    summary:
      "A missed call unlocked a bespoke microsite game collecting Perk chocolates — crowning a ₹10 lac mega winner.",
    metrics: [
      { value: "1.25L+", label: "Entries" },
      { value: "1,601", label: "Winners" },
    ],
    accent: "blue",
  },
  {
    brand: "ITC · Dream Ride",
    title: "Race 2 Vegas",
    category: "Gaming Engagement",
    summary:
      "A thrilling racing game with a simplified entry flow — the grand prize a trip to Vegas.",
    metrics: [
      { value: "50,000+", label: "Players" },
      { value: "Vegas", label: "Mega prize" },
    ],
    accent: "coral",
  },
  {
    brand: "Panasonic",
    title: "Shout To Win",
    category: "Voice + OBD",
    summary:
      "Callers shouted “PANASONIC” to score a live decibel reading — the day's loudest won daily prizes. Managed end to end.",
    metrics: [
      { value: "17,500", label: "Valid entries" },
      { value: "Daily", label: "Winners" },
    ],
    accent: "blue",
  },
  {
    brand: "Dabur",
    title: "Dant Rakshak Sampling",
    category: "Missed-call Sampling",
    summary:
      "A missed call exchanged old toothpaste for a Dant Rakshak sample, delivered within 15 days across India.",
    metrics: [
      { value: "15L", label: "Missed calls" },
      { value: "90,000", label: "Samples shipped" },
    ],
    accent: "coral",
  },
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
