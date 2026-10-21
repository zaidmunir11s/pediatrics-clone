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

export const trustHeading = { lead: "Trusted by ", accent: "10,000+", tail: "Pediatricians" };

export const asSeenOn = {
  title: "As Seen on",
  logos: [
    {
      src: img("Practice-Link-Logo.webp"),
      width: 251,
      height: 68,
      alt: "PracticeLink logo in white with the slogan The Career Advancement Resource for Physicians on a black background conveying opportunities and resources for healthcare professionals.",
    },
    {
      src: img("NBC-Logo.webp"),
      width: 234,
      height: 56,
      alt: "NBC logo with a stylized peacock design in white symbolizing the renowned American television network known for delivering news entertainment and iconic shows to audiences.",
    },
    {
      src: img("Family-Education-Logo.webp"),
      width: 276,
      height: 33,
      alt: "Logo displaying the words family education in lowercase white text on a dark background emphasizing resources and support for family learning and parenting guidance.",
    },
  ],
};

export const whoHelp = {
  titleLead: "Who Do We ",
  titleAccent: "Help?",
  intro: "Our high-yield study resources and proven strategies help pediatricians pass their board exams with confidence.",
  vector: img("pbr-vector.webp"),
  large: [
    {
      title: "Initial Certification Exam",
      tone: "bg-lavender",
      image: {
        src: img("confident-pediatrician-after-board-success-1024x454.webp"),
        alt: "Smiling male pediatrician with a stethoscope, representing confidence and success in board exam preparation.",
      },
      bullets: [
        "For first-time or repeat test-takers, even after multiple failed attempts",
        "Discover your risk of failing and get a tailored path to success",
        "Learn the pediatric board review strategies that separates those who pass from those who don’t",
      ],
      cta: { label: "View Courses", href: site("/pediatric-initial-certification/") },
    },
    {
      title: "MOCA-Peds",
      tone: "bg-sky",
      image: {
        src: img("moca-pbr-collaborative-prep-1024x454.webp"),
        alt: "Confident medical professionals representing the success and camaraderie built through PBR’s MOCA-Peds study system.",
      },
      bullets: [
        "Already certified? Prepare for quarterly recertification exams with ease.",
        "High-yield, low-stress review system optimized for your test days",
        "Study smarter, pass MOCA-Peds in just three years, and get a two-year break",
      ],
      cta: { label: "View Courses", href: site("/moca-peds-study-guide/") },
    },
  ],
  small: [
    {
      titleBold: "Residency Partnerships",
      titleRest: "",
      bullets: [
        "Bulk access for residency programs (4 to 120+ residents)",
        "Equip your residents with a proven, structured system",
        "Work with an expert partner to improve board pass rates",
      ],
      cta: { label: "Get Free Guidance", href: site("/residency-discounts/") },
    },
    {
      titleBold: "Small Group",
      titleRest: " Discounts",
      bullets: [
        "Friends or colleagues buying together for group discounts",
        "Access the full PBR system and save when you team up",
        "Prepare together, pass together",
      ],
      cta: { label: "Get Resident Discounts", href: site("/group-discount/") },
    },
    {
      titleBold: "CME Specials",
      titleRest: "",
      bullets: [
        "Earn CME and MOC credits while preparing for the boards or for recertification",
        "Fast and easy claims process for over 200 credits",
        "Ideal for busy professionals with employer-funded education",
      ],
      cta: { label: "Get Credits And Rebates", href: site("/cme") },
    },
  ],
};

export const trustReviews = {
  rating: "5.0",
  label: "Top Rated Service",
  verified: "Verified by Trustindex",
  reviews: [
    {
      name: "Bina Adigopula",
      date: "January 14, 2026",
      avatar: img("avatars/bina-adigopula.jpg"),
      text: "I became an Moc candidate after being a Moca Peds member in 2025.This was a very humbling experience as I had already been recertified and was in danger of losing my certification My family saw me struggle to qualify again for certified status and stuck by me ,through hours of study buddy zooms , irritability and almost despair! When I passed the boards they described a sudden or immediate change of personality to \"more myself\" They heard me singing and whistling in the kitchen ,sharing their favorite shows ,returning to more cooking and entertaining In preparation . I read the Pbr guide almost 5-6 times and did the mp3 audio podcasts about 6 times The weekends were taken up with Q banks and I did 100 questions/day and scores 84-90% each time. i also attended the live test taking strategy course , and learned about POE and other test taking strategies from Ashish and crew .its funny that the language of the question and the ASk was so important to focus on not always the paragraph, which Ashish playfully referred to as block\" My study buddies that I gathered via the links provided by Ashish were very supportive .One study buddy Jully who was taking her initial certification exam and passed this year is definitely a life long friend . She urged me not to give up hope and I also egged her on .Together we discovered each others study weaknesses .Helpful comments like from me ~ you do not know jack about cardiology and she telling me that I was sabotaging myself and that \" I was like along distance runner who stopped to tie my shoe in the middle of the race came along the way I was encouraged by the face book crew ,who seemed to understand how important it was to cheer us all on ,after such grueling study The Abp sites provided by team PBR were helpful to me the week before the exam as I really understood the highlight feature and also familiarized myself with \"Finish and Flag\" We mercilessly quizzed each other on Board vitals ,Med study Ross review exam Q banks Chat Gpt was instrumental in generating tables after tables after tables for difficult differential diagnosis of tick paralysis vs epidural abscesses statistical formula , Board pearls etc. Mnemonics created by us were the only way to remember all the various types of leukodystrophy Armed with all this knowledge , I was very satisfied to take the exam Opening the email ( very harrowing) happened to me by accident., To be fair I was chatting with my daughter and it suddenly opened with the welcome \"Congratulations\" message I will always be grateful for Ashish Goyal's mentorship and Team PBR's ( Joanna, Carlos, Yvette) consistent stewardship for my success",
    },
    {
      name: "Jackie Guinn",
      date: "December 26, 2025",
      avatar: img("avatars/jackie-guinn.jpg"),
      text: "I have been using MOCA-PBR to pass my boards and maintain certification. It is by far the best on-line learning tool and I have tried many tools! All medical topics are organized by importance of information which is not only helpful for test taking but use in practice. This organization really wants you to do well on these exams. It is an investment well worth taking.",
    },
    {
      name: "Maria Liverpool",
      date: "December 16, 2025",
      avatar: img("avatars/maria-liverpool.jpg"),
      text: "I completely, without reservation recommend PBR. Ashish is committed to pediatricians passing the boards and I don't know that I could have done so without PBR. The resources are A1 and his techniques WORK! It's worth the investment!",
    },
    {
      name: "Juan Snijder",
      date: "December 6, 2025",
      avatar: img("avatars/juan-snijder.jpg"),
      text: "Long overdue review. It's great, IMO better than MedStudy!",
    },
    {
      name: "Rosalind Lopez",
      date: "August 13, 2025",
      avatar: img("avatars/rosalind-lopez.jpg"),
      text: "Ashish, thank you for all your hard work and dedication to help create materials that really help! I've benefited from PBR in passing my Boards the 2nd try, and now I have been doing consistently well on my MOC quizzes, all thanks to your resources and materials! I appreciate you, and I share your passion when I teach medical students and residents.",
    },
    {
      name: "Xithor22",
      date: "June 19, 2025",
      avatar: img("avatars/xithor22.jpg"),
      text: "So happy to share that I passed my boards on my 3rd attempt after becoming a VIP member. I scored a 212!! My score went up an entire 38 points and I think it had everything to do with attending the test taking strategies course with you. The previous year I had gone through all the material 4 times but being a part of the test taking strategy and your insights in how to tackle questions pushed me over the edge! Along with my study question partner, your study guide was my bible this summer and I'm happy to say that I am a board certified pediatrician thanks to you!",
    },
    {
      name: "Kataretya Jenkins",
      date: "February 21, 2025",
      avatar: img("avatars/kataretya-jenkins.jpg"),
      text: "Amazing board support materials. I used for the Pediatrics Boards AND for MOCA Peds. My favorite feature is the searchable online text which you can use anytime for any of the included topics and is streamlined enough to use even between questions. I am very impressed by the brevity of the topics and the ease at which you can consume the information despite being a busy practicing physician. I give it 5 stars. If you are thinking of getting it, you should. You won't regret it. Also the customer service is the best, extremely responsive.",
    },
    {
      name: "Sabrina Haniff",
      date: "February 18, 2025",
      avatar: img("avatars/sabrina-haniff.jpg"),
      text: "Really great program that helped me and my partner better prepare for our exams. Format stands out from traditional board prep with a combination of high yield content in book form, audio form and video form. Test taking strategies are an excellent tool for understanding how test questions are written for better critical thinking",
    },
    {
      name: "Simone R.N Higgins",
      date: "February 18, 2025",
      avatar: img("avatars/simone-higgins.jpg"),
      text: "It was my 3rd time taking the exam. I am not a great test taker. But I believe the PBR strategies worked for me. If you follow the plan, I believe you will succeed. Give it a try.",
    },
    {
      name: "Cari Rayborn",
      date: "February 12, 2025",
      avatar: img("avatars/cari-rayborn.jpg"),
      text: "5 stars aren't enough! PBR is THE key to passing boards. Many companies advertise products to help with initial Peds certification, but the content is often too dense. As someone who likes things to the point, the PBR system was concise enough to give me just what I needed without wasting time or energy. The test taking strategies course is also a game changer. If you struggle with board exams or just want the blueprint, look no further. First time board pass.",
    },
  ],
};
