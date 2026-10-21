# Reference Spec — pediatricsboardreview.com homepage

Inspected live on 2026-10-21 with the in-app browser at 1440×900 (desktop) and 390×844 (mobile).
Source is a WordPress 7.1 site built with Kadence Blocks. Measurements are computed styles at 1440px unless noted.

---

## 1. Section inventory (in page order)

| # | Section | Desktop y / height | Background |
|---|---------|-------------------|------------|
| 0 | **Announcement bar** (fixed top, z 99990) | 0 / 63 (88 on mobile, wraps to 2 lines) | `linear-gradient(90deg,#4C1D95,#6D28D9)` |
| 1 | **Header** (not sticky; page has 50px top padding under the fixed bar) | 50 / 94 | white |
| 2 | **Hero** | 144 / 792 | white |
| 3 | **2027 Preorders** | 936 / 836 | `linear-gradient(#F3EEFF 0, #FFF 100%)` |
| 4 | **Trusted by top doctors** (institution strip) | 1773 / 141 | white |
| 5 | **Start-here strip** (3 columns) | 1913 / 184 | `#E9D3F5` |
| 6 | **"What if passing isn't about what you study…"** | 2097 / 718 | `#DDF6FC` |
| 7 | **Trusted by 10,000+ Pediatricians** heading | 2816 / 153 | `#FAFAFA` |
| 8 | **Google reviews carousel** (Trustindex widget) | 2968 / ~330 | `#FAFAFA` |
| 9 | **As Seen on** logos | 3055 / 228 | `#100B47` |
| 10 | **Who Do We Help?** (2 large + 3 small cards) | 3282 / 1443 | white |
| 11 | **Reviews** (testimonial carousel) | 4726 / 1075 | `#E9D3F5` |
| 12 | **Why Students Love Us:** (6 feature cards) | 5800 / 903 | `#FAFAFA` |
| 13 | **Not sure where to start?** quiz CTA | 6703 / 454 | `#100B47` |
| 14 | **Meet our founder, ASHISH GOYAL** | 7157 / 577 | `#DDF6FC` |
| 15 | **Popular Articles** (featured + 6-card grid) | 7735 / 1827 | white |
| 16 | **Footer** (lazy-rendered; CTA + 5 link columns + socials + legal) | ~9908 / 999 | `#100B47` |
| — | **Free-chapters funnel ribbon** (fixed bottom, z 9999, desktop + mobile) | 197 tall desktop / 262 mobile | `#1C1763` |
| — | Scroll-to-top button (fixed bottom-right, 41px circle, purple outline) | — | transparent |

Total height: about 10,900px desktop and about 17,850px mobile.

### Exact copy per section

**0 Announcement bar:** "**2027 PREORDER IS LIVE**  •  Save up to 75% when you lock in now" + pill button "PREORDER FOR $1 →" (links to `#preorder-2027`).

**1 Header:** Logo (`pediatrics-board-review-logo.webp`, 235×74). Nav: Courses ▾ · Testimonials · Blog · FAQs · About · Contact. Buttons: "LOG IN" (light lavender pill), "GET STARTED" (purple pill).
Courses dropdown: ABP Initial Certification Exam · Test-Taking Strategies · Small Group Discounts · Residency Partnerships · ABP MOCA-Peds · ABP MOC Exam · CME Credits & MOC Points.

**2 Hero:**
- H1 "Pass Your / Pediatric Boards With Confidence"
- Paragraph "Thousands of pediatricians (even those who've failed multiple times) have passed their board exams with our proven Pediatrics Board Review® system. Whether it's your first time or your tenth, our resources and strategies help you pass with confidence. Join them and take the next step toward exam success!"
- 3 stats, each with a lavender check-circle icon:
  - "Board certification in a" / **SINGLE ATTEMPT**
  - "Tried and tested courses used by" / **10,000+** PEDIATRICIANS
  - "First-time pass rates estimated at" / **99%**
- Button "Get Started ›"
- Guarantee box: badge image + "FIRST-TIME PASS GUARANTEE, / OR **YOUR MONEY BACK!**" (purple accent), on a cream rounded box
- Right side: `Meet-Your-Coach – Dr. Ashish Goyal` image (562×695). The speech bubble and "Meet Your Coach" text are baked into the image.

**3 Preorders:**
- Kicker "2027 EDITION PREORDERS" (22px, `#6D28D9`, letter-spacing 1px, orange `#F59E0B` underline bar)
- H2 "Preorder for Only $1 Now & **Save Up to 75%**" (the accent part is purple `#A855F7`-ish)
- Pill "Get online access instantly for only **$1**" ($1 in orange)
- Two cards:
  - **Initial Certification**: "Estimated Release Date: **December 15, 2026**", image `aap-no-brainer-1.webp`, button "Preorder for $1 ›", footer "✔ 100% Money-Back First Time Pass Guarantee"
  - **MOCA-Peds**: same layout, image `aap-moca-bundle-1.webp`, footer "✔ 100% Money-Back Quarterly Pass Guarantee"
  - Both buttons link to `/preorder-now/`

**4 Trusted strip:** Left: "Trusted by top doctors who have practiced at renowned institutions:" (21px/600). Right (teal `#008195`, 20px/700): "Johns Hopkins Medicine · Cleveland Clinic · Mayo Clinic · Massachusetts General Hospital · University of Michigan Medicine", separated by small grey dots.

**5 Start-here strip:** 3 columns with vertical dividers on desktop:
- "First-time or repeat board taker?" / "Initial Certification Exam"
- "Need to recertify quickly?" / "MOC & MOCA-Peds"
- "Institutional partnerships" / "Help your residents pass with confidence at scale"

Each column has a "Start Here ↗" link in purple.

**6 Strategy:** H2 "What if passing isn't about *what* you study, **but how you study?**" ("what" in italics; the last phrase is bold navy `#100B47`). 4 paragraphs (see full text in the inspection log). The last one is bold: "Join thousands of pediatricians who've found a smarter way to pass." Button "Get Started ›". Right: `Thinking-Doctor.webp` (625×548, speech bubbles baked in).

**7–8 Trusted by 10,000+ / Google reviews:** H2 "Trusted by **10,000+** Pediatricians" ("10,000+" in purple, at a lighter weight). The Trustindex widget has these parts:
- Header row: Google logo, "5.0", ★★★★★, "Top Rated Service", and a green "Verified by Trustindex ⓘ" badge
- 4 visible cards (1440px) / 1 card (mobile). The first card is a "Review summary · Based on 17 reviews" AI summary card.
- Cards: avatar, name, date, Google G icon, 5 stars + blue verified tick, text clamped to 4 lines, "Read more"
- Card style: white, 1px dark border, about 8px radius, dotted pattern background on the top-right
- Desktop has prev/next arrows (white circles); mobile has a progress scrollbar indicator instead
- Reviewers in order: Bina Adigopula (Jan 14 2026), Jackie Guinn (Dec 26 2025), Maria Liverpool (Dec 16 2025), Juan Snijder (Dec 6 2025), Rosalind Lopez (Aug 13 2025), Xithor22 (Jun 19 2025), Kataretya Jenkins (Feb 21 2025), Sabrina Haniff (Feb 18 2025), Simone R.N Higgins (Feb 18 2025), Cari Rayborn (Feb 12 2025)

**9 As Seen on:** "As Seen on" (20px/600, `#DDF6FC`) + PracticeLink, NBC, familyeducation white logos in one row (wraps on mobile).

**10 Who Do We Help?:** H2 "Who Do We **Help?**" ("Help?" purple). Sub-text "Our high-yield study resources and proven strategies help pediatricians pass their board exams with confidence." `pbr-vector.webp` arches decorate the top right.
- Row 1, two large cards (628×682, radius 33):
  - **Initial Certification Exam** (bg `#E9D3F5`, top photo `confident-pediatrician…webp`). 3 check bullets. "View Courses" button.
  - **MOCA-Peds** (bg `#DDF6FC`, top photo `moca-pbr-collaborative-prep…webp`). 3 check bullets. "View Courses" button.
- Row 2, three cards (413×424, bg `#FAFAFA`, radius 30, padding 30):
  - **Residency Partnerships** → "Get Free Guidance"
  - **Small Group** Discounts → "Get Resident Discounts"
  - **CME Specials** → "Get Credits And Rebates"
- Bullet copy is verbatim from the inspection (see the full text dump).

**11 Reviews:** H2 "Reviews" (centered, navy `#100B47`, 44px/500). The carousel shows one slide at a time, centered, with dark translucent square arrows (32×48, `rgba(0,0,0,.8)`, radius 3) at the far left and right. Each slide has:
- Photo (460×345, radius ~20)
- Title (48px/700/72px line height, `#100B47`)
- 5 purple stars
- Quote (16px, centered, max width about 460)
- Name (bold) / "Board Certified Pediatrician" (bold)

The 4 slides are Nicole Mathis, Varsha Raghavan, Katherine Wu and Jessie Maxwell (titles and quotes are in the text dump). No autoplay was observed.

**12 Why Students Love Us:** H2 "Why Students **Love Us:**" ("Love Us:" bold navy). There are 6 white cards in a 3×2 grid (417×315, radius 30, padding 25, about 10px gap). Each card has a centered 66px icon on a lavender circle, a title (20px/700 `#252525`) and a body (16px/26px `#575050`).

**13 Quiz CTA:** H2 "**Not sure** where / to start?" (51px/400; "Not sure" lavender `#E9D3F5`, the rest white). "Take our quiz and get started" (20px/600, white). Button "Get Started ›". Right: `female-pediatrician-pointing-and-guiding-1.webp` (619×439) with a translucent rounded rect and white arch lines behind it.

**14 Founder:**
- Left: `ashish-goyal-pbr-founder.webp` (432×517)
- Right, kicker "We help pediatricians pass the boards, even if they've been struggling for years." (21px/600)
- H2 "Meet our founder, / **ASHISH GOYAL**" (the name is teal `#3A8296`-ish and bold)
- Body (17px/27.2px)
- Button "Get Started ›"

**15 Popular Articles:**
- H2 "Popular **Articles**" (purple accent)
- Featured card: cream `#FDFAE6`, radius 60, 1270×562
  - Left: video thumbnail (635×357, radius ~16) with a red YouTube-style play pill (96×64 `#E53935`) and a "FEATURED ARTICLE" tag (`#63DAED`, radius 8)
  - Right: title "PEDIATRIC BOARD EXAM RESULTS FOR 2025 AND INSIGHTS FOR 2026" (28px/700), body, category chip "PASSING THE BOARDS" (`#FAF2C0`), and the author row (gravatar 48px, "Dr. Ashish Goyal", "December 2, 2025")
- Grid: 3 columns × 2 rows, each 390px wide, separated by thin vertical rules. Each card has an image (390×260), a title (16px/700) and an excerpt (13px/20.8px).

**16 Footer:**
- Navy band with concentric arch decoration (`pbr.webp` background)
- H2 "Get Started" (50px/700, `#E9D3F5`) + "Take the first step toward passing your boards - with clarity, confidence, and a proven system." + purple pill "Get Started" with a circular arrow chip
- 5 link columns, headings 20px `#E9D3F5`:
  - **Quick Links:** Residency, Initial Certification, MOC & MOCA-Peds, CME/MOC, Login
  - **Products:** All Access Pass, Test-Taking Strategies, MOC & MOCA-Peds, CME & MOC Credits, All Products
  - **Resources:** Blog, Testimonials, Community Forum, Tools to Help You Pass, 100% Pass Guarantee, Refund Policy
  - **Article:** Failed Pediatric Boards, Passing The Boards, American Board of Pediatrics, Pediatric Mnemonics, Roadmap To Success, Study Schedule & Tips
  - **Company:** About, Contact, FAQ, Terms and Conditions, Privacy
- Bottom row: white logo (left, `Pediatrics-Board-Review-Logo-White…webp` 220×68); right: 3 social squares (48px, `face.png`, `twt.png`, `in.png`), "All rights reserved | *Terms & Conditions Apply | Privacy Policy", "© 2026 Pediatrics Board Review. All rights reserved."

**Funnel ribbon (fixed bottom):**
- Two mini book cards: "FREE CHAPTER PDF / GASTROENTEROLOGY" and "FREE CHAPTER PDF / DERMATOLOGY" (images `free-chapter-1/2.webp` + `pbr-logo.webp`)
- "Claim Your Two FREE PDF Chapters & MP3 Audio Study Guides Now" (white, bold)
- "EASY TO READ…EASY TO READ…EASY TO READ…" (purple)
- Purple "Download Now" pill and a × close button
- "Download Now" opens a Kadence modal with a Gravity Form.

---

## 2. Design tokens

**Font:** Poppins only (400/500/600/700, plus 800 in the preorder block). Self-hosted Google Fonts → use `next/font/google` Poppins.

**Colors**

| Token | Value | Use |
|-------|-------|-----|
| purple-cta | `#B140EC` (rgb 177,64,236) | primary buttons, links ("Start Here") |
| purple-deep | `#6D28D9` | preorder headings, buttons, kicker |
| violet-dark | `#4C1D95` | announcement gradient start |
| lavender | `#E9D3F5` | strip bg, LOG IN button, Reviews bg, footer headings |
| sky | `#DDF6FC` | strategy / founder bg, MOCA card |
| navy | `#100B47` | As Seen on, quiz CTA, footer, accent headings |
| navy-ribbon | `#1C1763` | funnel ribbon |
| amber | `#F59E0B` | announcement button, kicker underline |
| cream-pill | `#FFF6E0` + border `#F2A900` | "Get online access" pill |
| cream-feature | `#FDFAE6` | featured article card |
| chip-yellow | `#FAF2C0` | category chip |
| cyan-tag | `#63DAED` | FEATURED ARTICLE tag |
| teal-text | `#008195` | institution names |
| gray-bg | `#FAFAFA` | trust / why / small cards |
| text | `#000`, `#252525`, `#575050` (body grey), `#1E1B2E` (preorder H2), `#2A2540` |
| card-border | `#ECE9F5` | preorder cards |

**Type scale (desktop → mobile)**

| Element | Desktop | Mobile |
|---------|---------|--------|
| H1 | 52px / 500 / 64px | 27px / 39px |
| Section H2 | 44px / 500 / 55px | ~28px (estimate) |
| Strategy / founder H2 | 39px / 500 / 47px | — |
| Quiz H2 | 51px / 400 / 64px | — |
| Preorder H2 | 40px / 800 / 45.6px | — |
| Preorder card H3 | 27px / 800 | — |
| Who-card H3 | 25px / 600 (large), 22px / 600 (small) | — |
| Review slide title | 48px / 700 / 72px | ~28px (estimate) |
| Body | 16px / 25.6px | — |
| Founder / featured body | 17px / 27.2px | — |
| Article excerpt | 13px / 20.8px | — |
| Nav | 16px / 400 | — |
| Buttons | 16px / 500, capitalize (header buttons uppercase) | — |

**Shape**
- Buttons: radius 50px, padding 12–14px × 25px, height 50–54px. Preorder buttons: 999px radius, 14×36 padding, 18px/800.
- Card radii: preorder 18 (shadow `0 10px 30px rgba(76,29,149,.08)`, 1px `#ECE9F5` border); who-large 33; who-small / why 30; featured article 60; dropdown 13 (shadow `0 10px 30px -2px rgba(0,0,0,.1)`).

**Layout**
- Content container is 1290px (`kb-theme-content-width`), with inner padding giving content x = 85 → 1355 (1270px) at 1440.
- Section vertical padding is about 60–80px.
- Hero columns: text 689px / image 562px.

---

## 3. Asset inventory

All assets live under `https://www.pediatricsboardreview.com/wp-content/uploads/`. Plan: download into `public/images/` (filenames kept).

| Section | File |
|---------|------|
| Header logo | `pediatrics-board-review-logo.webp` |
| Hero | `Meet-Your-Coach-–-Dr.-Ashish-Goyal-827x1024.webp`, `Ashish-mobile-Banner.webp` (mobile variant), `Guarantee-Badge.webp` |
| Preorder | `aap-no-brainer-1.webp`, `aap-moca-bundle-1.webp` |
| Strategy | `Thinking-Doctor.webp` |
| As Seen on | `Practice-Link-Logo.webp`, `NBC-Logo.webp`, `Family-Education-Logo.webp` |
| Who we help | `pbr-vector.webp`, `confident-pediatrician-after-board-success-1024x454.webp`, `moca-pbr-collaborative-prep-1024x454.webp` |
| Reviews | `dr-nicole-mathis-testimonial.webp`, `testimonial-varsha-raghavan.webp`, `dr-katherine-wu-pbr-success-testimonial.webp`, `dr-jessie-maxwell-testimonial.webp` |
| Why icons | `Concise-Content-icon-1.webp`, `Made-Simple-icon-1.webp`, `Effectiveness-icon-1.webp`, `Guarantee-icon-1.webp`, `Learning-icon-1.webp`, `Mastery-icon-1.webp` |
| Quiz CTA | `female-pediatrician-pointing-and-guiding-1.webp` |
| Founder | `ashish-goyal-pbr-founder.webp` |
| Articles | `Pediatric-Board-Exam-Results-for-2024-thumbnail.webp`, `pediatrics-board-review-failed.webp`, `Are-AAP-Prep-Questions-Good-to-Study.webp`, `How-Many-AAP-Prep-Questions-for-Board-Review-1.webp`, `Use-Test-Taking-Strategy-to-Help-You-Pass.webp`, `Pros-and-Cons-of-Pediatric-Board-Review-Course-1.webp`, `Great-Mnemonics-Can-Make-Passing-Much-Easier.webp` |
| Footer | `pbr.webp` (arch bg), `Pediatrics-Board-Review-Logo-White-1-scaled-e1764928355422.webp`, `face.png`, `twt.png`, `in.png` |
| Funnel | `free-chapter-1.webp`, `free-chapter-2.webp`, `pbr-logo.webp` |

**Third-party assets**
- Trustindex: `cdn.trustindex.io/assets/platform/Google/logo.svg`, `.../Google/icon.svg`, `.../Google/star/f.svg`, `.../img/widget-pattern-dottie.svg`, `.../icon/ti-verified.svg`
- Reviewer avatars from `lh3.googleusercontent.com` (URLs recorded in the inspection)
- Author gravatar: `secure.gravatar.com/avatar/824b111a…?s=64`
- Featured video: `https://www.youtube.com/embed/xXJjQodcM9c?autoplay=1&rel=0&modestbranding=1`

---

## 4. Responsive behavior

**Breakpoints (Kadence):** ≤1024px tablet, ≤767px mobile.

**Header**
- ≤1024: the tablet header replaces the desktop one: logo left, purple rounded-square hamburger right, height 81.
- The off-canvas menu is a full-screen white panel with the logo, ✕ close, a stacked nav (Courses as an accordion ▾), and full-width "LOG IN" and "GET STARTED" pills pinned to the bottom.

**Announcement bar:** wraps to 2 lines on mobile (88px tall); the button stays inline.

**Hero (mobile order):**
1. H1 (27px)
2. Get Started
3. Guarantee box (full width)
4. Paragraph
5. Stats stacked vertically (icon left)
6. Ashish image (mobile banner image)

**Other sections on mobile**
- Preorder: cards stack.
- Start-here strip: columns stack, centered, separated by horizontal gradient rules.
- Strategy: text first, then the image.
- Trustindex: 1 card with a scroll indicator; the header block stacks.
- As Seen on: logos wrap 2 + 1.
- Who-help and Why cards: single column, with centered text in the Why cards.
- Reviews: same carousel, with the image narrower.
- Quiz CTA: text, then the image below.
- Founder: kicker and H2 above the image, then body and button (order changes).
- Articles: the featured card stacks (image on top); the grid is single column.
- Footer: 2-column link grid, centered socials and legal, logo at the bottom.

**Fixed elements:** announcement bar (top, both viewports), funnel ribbon (bottom, both viewports, dismissible), scroll-to-top (bottom right).

---

## 5. Interactions

| Element | Behavior |
|---------|----------|
| Courses nav | Hover opens the dropdown (white, 290px, radius 13, 20px padding, soft shadow, chevron) |
| Mobile hamburger | Opens the full-screen off-canvas menu; ✕ closes it; Courses expands as an accordion |
| Hero stats | Count-up animation when scrolled into view (10,000+ animates from a low number; 99% likewise) |
| Trustindex carousel | Arrows scroll the cards; "Read more" expands a review |
| Reviews carousel | Prev/next arrows, one slide, loops (no autoplay observed) |
| Featured video | Click the thumbnail to swap in the YouTube iframe (autoplay) |
| Funnel ribbon | × hides it; "Download Now" opens a modal with an email form |
| Scroll-to-top | Appears after scrolling and smooth-scrolls to the top |
| Buttons | Hover state (exact styles not captured; likely a darker purple) |
| "Get Started" buttons | Link to `javascript:;` (open the quiz/funnel modal on the live site) |

---

## 6. Uncertainties and exclusions

- **Cookie notice** ("We Value Your Privacy", Cookiees) and analytics or ad pixels: third-party; **not reproduced**.
- **Trustindex widget:** third-party live data; it will be rebuilt as a static replica using the observed 10 reviews plus the summary card. Exact internal spacing is approximate.
- **"Get Started" / quiz modal and the Download Now Gravity Form:** behind `javascript:;` and modal content not fully inspected. Plan: open a simple modal shell or keep the links inert. No real form submission.
- **Hover styles, transition timings and the count-up start values** were not measured precisely.
- **Mobile type sizes** beyond the H1 are visual estimates from screenshots.
- **Lavender arch decorations** behind the hero image may be part of the image or a CSS background; to be confirmed when assets are downloaded.
- **Some mobile images lazy-loaded blank in the capture** (Who-help card photos); assumed identical to desktop.
- **Featured article** title says 2025 but the thumbnail is named 2024; the copy is kept verbatim.
