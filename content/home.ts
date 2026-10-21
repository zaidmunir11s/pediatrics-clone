// Verbatim homepage copy and asset paths from docs/reference-spec.md.
// Destinations point at the live site because only the homepage is reproduced here.

export const SITE = "https://www.pediatricsboardreview.com";
const site = (path: string) => `${SITE}${path}`;
const img = (file: string) => `/images/${file}`;

export const logo = {
  src: img("pediatrics-board-review-logo.webp"),
  alt: "Pediatrics Board Review",
  width: 300,
  height: 95,
};

export const announcement = {
  text: "2027 PREORDER IS LIVE  •  Save up to 75% when you lock in now",
  cta: { label: "PREORDER FOR $1 →", href: "#preorder-2027" },
};

export const nav = {
  courses: {
    label: "Courses",
    items: [
      { label: "ABP Initial Certification Exam", href: site("/pediatric-initial-certification") },
      { label: "Test-Taking Strategies", href: site("/full-test-taking-strategies-course") },
      { label: "Small Group Discounts", href: site("/group-discount") },
      { label: "Residency Partnerships", href: site("/residency-discounts") },
      { label: "ABP MOCA-Peds", href: site("/moca-peds-study-guide") },
      { label: "ABP MOC Exam", href: site("/maintenance-of-certification") },
      { label: "CME Credits & MOC Points", href: site("/cme") },
    ],
  },
  links: [
    { label: "Testimonials", href: site("/testimonials/") },
    { label: "Blog", href: site("/blog-articles/") },
    { label: "FAQs", href: site("/frequently-asked-questions-abp/") },
    { label: "About", href: site("/about/") },
    { label: "Contact", href: site("/contact/") },
  ],
  login: { label: "LOG IN", href: "https://courses.pediatricsboardreview.com/pages/home" },
  getStarted: "GET STARTED",
};

export const getStartedQuiz = {
  title: "Welcome to PBR!",
  intro: "Let’s find the right prep for you. What are you here to tackle?",
  options: [
    {
      title: "Initial Certification Exam",
      body: "I’m preparing for the American Board of Pediatrics Initial Certification exam.",
      href: site("/pediatric-initial-certification/"),
    },
    {
      title: "MOCA-Peds",
      body: "I need resources to meet my Maintenance of Certification (MOCA-Peds) requirements.",
      href: site("/moca-peds-study-guide/"),
    },
    {
      title: "Institutional Buyer",
      body: "I’m representing a hospital, residency program, or other institution looking to purchase for a group.",
      href: site("/residency-discounts/"),
    },
    {
      title: "Small Groups",
      body: "I’m seeking Continuing Medical Education (CME) credits.",
      href: site("/group-discount/"),
    },
    {
      title: "Easy CME/MOC and a $1000 Rebate",
      body: "I’m part of a professional or study group exploring bulk discounts or group access.",
      href: site("/preorder-now/"),
    },
  ],
  cta: "Get Started",
};

export const hero = {
  titleLines: ["Pass Your", "Pediatric Boards With Confidence"],
  copy: "Thousands of pediatricians (even those who’ve failed multiple times) have passed their board exams with our proven Pediatrics Board Review® system. Whether it’s your first time or your tenth, our resources and strategies help you pass with confidence. Join them and take the next step toward exam success!",
  stats: [
    { label: "Board certification in a", value: "SINGLE ATTEMPT" },
    { label: "Tried and tested courses used by", count: 10000, suffix: "+", caption: "Pediatricians" },
    { label: "First-time pass rates estimated at", count: 99, suffix: "%" },
  ],
  cta: { label: "Get Started", href: "#who-do-we-help" },
  guarantee: {
    badge: { src: img("Guarantee-Badge.webp"), alt: "Guarantee Badge" },
    line1: "FIRST-TIME PASS GUARANTEE,",
    line2Lead: "OR ",
    line2Accent: "YOUR MONEY BACK!",
  },
  image: {
    desktop: img("meet-your-coach-ashish-goyal.webp"),
    mobile: img("Ashish-mobile-Banner.webp"),
    alt: "Dr. Ashish Goyal introduces himself as your board exam coach, offering guidance and support through the Pediatrics Board Review system.",
  },
};

export const preorder = {
  kicker: "2027 Edition Preorders",
  title: "Preorder for Only $1 Now & ",
  titleAccent: "Save Up to 75%",
  pillLead: "Get online access instantly for only ",
  pillAccent: "$1",
  releaseLabel: "Estimated Release Date: ",
  releaseDate: "December 15, 2026",
  cta: "Preorder for $1 ›",
  cards: [
    {
      title: "Initial Certification",
      image: { src: img("aap-no-brainer-1.webp"), alt: "PBR No Brainer Bundle", width: 700, height: 277 },
      href: site("/preorder-now/"),
      guarantee: "100% Money-Back First Time Pass Guarantee",
    },
    {
      title: "MOCA-Peds",
      image: { src: img("aap-moca-bundle-1.webp"), alt: "MOCA-PBR Bundle", width: 700, height: 560 },
      href: site("/moca-peds-study-guide"),
      guarantee: "100% Money-Back Quarterly Pass Guarantee",
    },
  ],
};

export const trustedStrip = {
  lead: "Trusted by top doctors who have practiced at renowned institutions:",
  institutions: [
    "Johns Hopkins Medicine",
    "Cleveland Clinic",
    "Mayo Clinic",
    "Massachusetts General Hospital",
    "University of Michigan Medicine",
  ],
};

export const startHere = [
  { title: "First-time or repeat board taker?", body: "Initial Certification Exam", href: site("/pediatric-initial-certification/") },
  { title: "Need to recertify quickly?", body: "MOC & MOCA-Peds", href: site("/moca-peds-study-guide/") },
  { title: "Institutional partnerships", body: "Help your residents pass with confidence at scale", href: site("/residency-discounts/") },
];

export const strategy = {
  paragraphs: [
    "You’re not alone. Even brilliant doctors fail when they rely on the wrong approach.",
    "Board review isn’t just about cramming more content. It’s about how you study. It’s about the strategy you use, the structure you follow, and the support you get.",
    "We help you master all three, so you don’t just study harder. You study smarter.",
  ],
  closing: "Join thousands of pediatricians who’ve found a smarter way to pass.",
  cta: { label: "Get Started", href: "#who-do-we-help" },
  image: {
    src: img("Thinking-Doctor.webp"),
    alt: "A thoughtful physician contemplates common misconceptions about medical board exam prep — underestimating the importance of strategy and over-relying on study materials.",
  },
};
