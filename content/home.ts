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
