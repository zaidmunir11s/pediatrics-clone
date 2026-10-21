# PBR Homepage Reproduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reproduce the live pediatricsboardreview.com homepage as a pixel-close Next.js page, at 1440px and 390px.

**Architecture:**
- `app/page.tsx` is a server component that stacks one component per section from `components/sections/`.
- All copy lives verbatim in `content/home.ts`.
- Only interactive pieces are client components, in `components/interactive/`: the menu, count-up, carousels, video, ribbon and scroll-top.
- Original images are downloaded once into `public/images/` and rendered with `next/image`.

**Tech Stack:** Next.js 16.4.2 (App Router, Turbopack, `cacheComponents`), React 19.3, Tailwind v4 (`@theme` tokens in `app/globals.css`), `next/font/google` Poppins, Playwright for e2e and visual tests. Package manager is Yarn 1.

**Spec:** `docs/reference-spec.md`

## Global Constraints

- Before writing Next code, read the relevant guide in `node_modules/next/dist/docs/` (per AGENTS.md); heed deprecations.
- Copy is verbatim from the spec, including typography quirks ("’", "…", "®", "›", "↗").
- No invented sections, imagery or interactions. Excluded: the cookie notice, analytics and pixels, and live Trustindex/Gravity Forms.
- Font is Poppins only: weights 400, 500, 600, 700 and 800.
- Breakpoints: mobile ≤767px, tablet ≤1024px. Content width is 1270px at 1440 (x 85→1355).
- Colors come only from the spec's token table, defined once in `@theme` in `app/globals.css`.
- Asset filenames are kept as on the source, under `public/images/`. No hotlinking except YouTube, inside the click-to-load iframe.
- Every image has explicit width and height matching the spec dimensions.
- No horizontal page scroll at any width from 360px to 1920px.

## Review Focus

1. **Tablet widths (768–1024):** the tablet header shows and no section overflows horizontally. Pinned by the overflow test in Task 14.
2. **Fixed announcement bar covering content:** jumping to `#preorder-2027` must land with the heading visible below the 63/88px bar. Pinned in Task 5 with `scroll-margin-top`.
3. **No JS or reduced motion:** the count-up must render its final values ("10,000+", "99%") in the server HTML and skip animation under `prefers-reduced-motion`. Pinned in Task 4.
4. **Keyboard users:** Courses opens on focus and Enter, Escape closes the dropdown and off-canvas menu, and focus returns to the trigger. Pinned in Task 3.
5. **Dismissed ribbon reappearing / covering the footer:** after ×, the ribbon stays hidden for the session and the footer's last line is reachable. Pinned in Task 13.

---

## File Structure

```
app/layout.tsx              Poppins font, metadata, html/body
app/page.tsx                section composition only
app/globals.css             Tailwind import + @theme tokens + few shared utilities
content/home.ts             all verbatim copy + asset paths, typed (one export per section)
components/ui/Button.tsx    pill CTA (variants: primary | lavender | preorder | amber), optional chevron
components/ui/CheckList.tsx check-circle bullet list
components/sections/*.tsx   one file per spec section (server components)
components/interactive/*.tsx client components: SiteMenu, CountUp, TrustCarousel,
                            ReviewsCarousel, VideoEmbed, FunnelRibbon, ScrollToTop
scripts/fetch-assets.mjs    downloads the spec §3 asset list into public/images/
e2e/*.spec.ts               Playwright tests, one per task
e2e/visual.spec.ts          full-page screenshots at 1440 and 390
playwright.config.ts
```

Shared test helper, created in Task 1, in `e2e/helpers.ts`:
- `desktop = { width: 1440, height: 900 }`
- `mobile = { width: 390, height: 844 }`
- `css(locator, prop): Promise<string>`

---

### Task 1: Tooling, tokens, font, assets

**Files:**
- Create: `playwright.config.ts`, `e2e/helpers.ts`, `e2e/base.spec.ts`, `scripts/fetch-assets.mjs`
- Modify: `package.json`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`

**Interfaces:**
- Produces:
  - Tailwind color tokens `purple-cta`, `purple-deep`, `violet-dark`, `lavender`, `sky`, `navy`, `navy-ribbon`, `amber`, `cream-pill`, `cream-feature`, `chip-yellow`, `cyan-tag`, `teal-text`, `gray-bg`, `ink-900` (#1E1B2E), `ink-700` (#252525), `ink-500` (#575050), `card-border`
  - `.container-pbr` (max-width 1290px, inline padding 20px → content 1270)
  - Images at `/images/<original-filename>`

- [ ] **Step 1:** `yarn add -D @playwright/test && npx playwright install chromium`. Add scripts `"test:e2e": "playwright test"` and `"assets": "node scripts/fetch-assets.mjs"`. Config: `webServer: yarn dev` on port 3000, chromium only.
- [ ] **Step 2: Write failing test** in `e2e/base.spec.ts`:
  - `has title`: `expect(page).toHaveTitle('Pediatrics Board Review | PBR')`
  - `uses Poppins`: `css(page.locator('body'), 'font-family')` contains `Poppins`
  - `assets present`: `request.get('/images/pediatrics-board-review-logo.webp')` returns status 200
- [ ] **Step 3:** Run `yarn test:e2e e2e/base.spec.ts`. Expected: FAIL (title is "Create Next App").
- [ ] **Step 4:** Write `scripts/fetch-assets.mjs`.
  - It holds a hard-coded array of every filename in spec §3 (uploads base URL), the 5 Trustindex SVGs, the 10 reviewer avatars and the gravatar.
  - Save remote filenames under `public/images/` (Trustindex and avatars under `public/images/trustindex/` and `public/images/avatars/<slug>.jpg`).
  - Skip files that already exist and exit non-zero on any non-200.
  - **Get user approval before running the download.**
- [ ] **Step 5:** Run `yarn assets`. Expected: about 60 files and no errors. Commit them.
- [ ] **Step 6:** Update the layout:
  - `layout.tsx`: Poppins with `weight: ['400','500','600','700','800']`, variable `--font-poppins`. Metadata title is "Pediatrics Board Review | PBR".
  - `globals.css`: replace the starter with `@theme` tokens and `--font-sans: var(--font-poppins)`. Remove the Arial body rule and dark-mode vars. Set `body { color:#000; background:#fff }`.
  - Reset `page.tsx` to an empty `<main>`.
- [ ] **Step 7:** Run the tests. Expected: PASS. Then run `yarn lint && yarn build`.
- [ ] **Step 8:** Commit "chore: tooling, design tokens, Poppins, original assets".

### Task 2: Content module and UI primitives

**Files:**
- Create: `content/home.ts`, `components/ui/Button.tsx`, `components/ui/CheckList.tsx`, `e2e/primitives.spec.ts`, `app/dev/primitives/page.tsx` (test fixture page; deleted in Task 14)

**Interfaces:**
- Produces:
  - `Button({ href, children, variant='primary', chevron=false, className })`, which renders an `<a>`
    - primary: bg `purple-cta`, radius 50px, padding 12×25, 16px/500, capitalize
    - lavender: bg `lavender`, black text, uppercase
    - preorder: bg `purple-deep`, radius 999px, padding 14×36, 18px/800
    - amber: bg `amber`, ink-900 text, padding 7×20, 17px/800
  - `CheckList({ items: string[], tone?: 'light'|'dark' })`, a list of 26px lavender check circles
  - `content/home.ts` exports one typed const per section: `announcement`, `nav`, `hero`, `preorder`, `trustedStrip`, `startHere`, `strategy`, `trustReviews`, `asSeenOn`, `whoHelp`, `reviews`, `whyLove`, `quiz`, `founder`, `articles`, `footer`, `funnel`. Text is copied verbatim from spec §1.

- [ ] **Step 1: Failing test.** `/dev/primitives` renders each Button variant. Assert:
  - primary: `background-color` = `rgb(177, 64, 236)` and `border-radius` = `50px`
  - preorder: `font-weight` = `800`
- [ ] **Step 2:** Run it. Expected: FAIL (404).
- [ ] **Step 3:** Implement `Button` and `CheckList`, and write `content/home.ts` with every section's copy filled in. The full-text dump in the spec is the source of truth.
- [ ] **Step 4:** Run it. Expected: PASS. Commit "feat: content module and UI primitives".

### Task 3: Announcement bar + header (desktop dropdown, mobile off-canvas)

**Files:**
- Create: `components/sections/AnnouncementBar.tsx`, `components/sections/Header.tsx`, `components/interactive/SiteMenu.tsx`, `e2e/header.spec.ts`

**Interfaces:**
- Consumes: `announcement`, `nav`, `Button`
- Produces: `<AnnouncementBar/>`, `<Header/>`. Layout gives `body` `padding-top: 50px` (desktop) to match the source.

- [ ] **Step 1: Failing tests:**
  - `bar is fixed`: the bar has `position: fixed` and a gradient background containing `rgb(76, 29, 149)`. Its text includes "2027 PREORDER IS LIVE". The "PREORDER FOR $1 →" link has `href="#preorder-2027"`.
  - `desktop nav`: at 1440, the link names are Courses, Testimonials, Blog, FAQs, About, Contact, LOG IN, GET STARTED.
  - `courses dropdown`: hover Courses shows 7 items, starting with "ABP Initial Certification Exam" and ending with "CME Credits & MOC Points". The panel has `border-radius: 13px` and a width of 290.
  - `dropdown keyboard`: focus Courses, press Enter, and the panel is visible. Press Escape and it is hidden, with focus on Courses.
  - `mobile menu`: at 390, the desktop nav is hidden. Click "Toggle Menu" and a full-screen panel shows the links plus LOG IN / GET STARTED. Escape closes it and returns focus to the toggle.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.0–1.1, §4 Header and §5. Details:
  - Header height 94 (padding 10).
  - Nav 16px/400 with 8px link padding.
  - Buttons 54px tall.
  - The hamburger shows at ≤1024 (purple rounded square). Tablet header height is 81.
  - The bar wraps to 2 lines at ≤767 (88px tall).
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: announcement bar and header".

### Task 4: Hero with count-up stats

**Files:**
- Create: `components/sections/Hero.tsx`, `components/interactive/CountUp.tsx`, `e2e/hero.spec.ts`

**Interfaces:**
- Consumes: `hero`, `Button`
- Produces: `CountUp({ to: number, suffix: string, format?: 'comma' })`
  - SSR renders the final value.
  - When the IntersectionObserver fires, it animates from 0 to `to` over about 2s.
  - It is a no-op when `matchMedia('(prefers-reduced-motion: reduce)')` matches.

- [ ] **Step 1: Failing tests:**
  - `h1 desktop`: the h1 text is "Pass Your Pediatric Boards With Confidence" at font-size 52px and weight 500.
  - `h1 mobile`: font-size is 27px.
  - `stats final values`: with `javaScriptEnabled: false`, the page contains "10,000+" and "99%".
  - `reduced motion`: with `reducedMotion: 'reduce'`, "10,000+" shows immediately after load.
  - `mobile order`: at 390, the boxes are ordered by y: h1 < Get Started < guarantee box < paragraph < stats < image.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.2.
  - Desktop has a 689px text column and a 562×695 image (`Meet-Your-Coach…`). Mobile uses `Ashish-mobile-Banner.webp` via `<picture>` / art direction.
  - The guarantee box is cream with the 89×88 badge.
  - The mobile reorder uses CSS `order`.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: hero".

### Task 5: 2027 Preorders

**Files:**
- Create: `components/sections/Preorder.tsx`, `e2e/preorder.spec.ts`

- [ ] **Step 1: Failing tests:**
  - The section has `id="preorder-2027"`.
  - There are 2 cards with `border-radius: 18px` and a box-shadow containing `rgba(76, 29, 149, 0.08)`.
  - Both buttons are "Preorder for $1 ›" with `href="/preorder-now/"`.
  - `anchor clear of bar`: click the bar's "PREORDER FOR $1 →". The section's kicker top is at least the bar's height.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.3.
  - Gradient background `#F3EEFF → #FFF`.
  - The kicker has an amber underline bar.
  - The pill has a 1.5px `#F2A900` border.
  - Cards are 527 wide with padding 28/24/26.
  - The section gets `scroll-margin-top: 90px`.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: preorder section".

### Task 6: Trusted strip, start-here strip, strategy

**Files:**
- Create: `components/sections/TrustedStrip.tsx`, `StartHere.tsx`, `Strategy.tsx`, `e2e/mid1.spec.ts`

- [ ] **Step 1: Failing tests:**
  - The institutions text color is `rgb(0, 129, 149)`.
  - There are 3 "Start Here" links, each with color `rgb(177, 64, 236)`.
  - The strip background is `rgb(233, 211, 245)`.
  - The strategy h2 contains an `<em>` with text "what".
  - The strategy section background is `rgb(221, 246, 252)`.
  - At 390, the start-here columns stack (each one's x equals the first one's x).
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.4–1.6.
  - Vertical dividers on desktop; horizontal gradient rules on mobile.
  - `Thinking-Doctor.webp` is 625×548.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: trusted, start-here, strategy sections".

### Task 7: Trusted by 10,000+ and Google reviews replica

**Files:**
- Create: `components/sections/TrustReviews.tsx`, `components/interactive/TrustCarousel.tsx`, `e2e/trust.spec.ts`

**Interfaces:**
- Consumes: `trustReviews` = `{ summary, reviews: { name, date, avatar, text }[] }`. There are 10 reviews, in spec order.

- [ ] **Step 1: Failing tests:**
  - At 1440, 4 cards are visible. The first one contains "Review summary".
  - Clicking next makes "Juan Snijder" visible.
  - "Read more" on Bina's card expands it, so the text height increases.
  - At 390, 1 card is visible.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.7–1.8.
  - Use CSS scroll-snap with arrow buttons that call `scrollBy`.
  - Text is clamped to 4 lines with `line-clamp`.
  - Card details: 1px dark border, dotted SVG background.
  - Header row: Google logo, 5.0, stars, and a green "Verified by Trustindex" badge.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: trust reviews replica".

### Task 8: As Seen On + Who Do We Help

**Files:**
- Create: `components/sections/AsSeenOn.tsx`, `WhoHelp.tsx`, `e2e/who.spec.ts`

- [ ] **Step 1: Failing tests:**
  - There are 3 logos with the alts from spec §3.
  - The large cards have `border-radius: 33px` and are about 628 wide at 1440.
  - The small cards have background `rgb(250, 250, 250)` and radius 30px.
  - The button labels are "View Courses" ×2, "Get Free Guidance", "Get Resident Discounts" and "Get Credits And Rebates".
  - At 390, all 5 cards are single-column.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.9–1.10. `pbr-vector.webp` is decorative (empty alt) and absolutely positioned at the top right.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: as seen on and who we help".

### Task 9: Reviews carousel

**Files:**
- Create: `components/sections/Reviews.tsx`, `components/interactive/ReviewsCarousel.tsx`, `e2e/reviews.spec.ts`

**Interfaces:**
- Consumes: `reviews` = `{ title, quote, name, photo }[]`, 4 items in spec order.

- [ ] **Step 1: Failing tests:**
  - The first visible title is "I was able to pass comfortably!".
  - Next shows "I couldn’t have gotten my score without it!".
  - Prev from the first slide wraps to "Loved it!".
  - Each slide title is 48px/700 in `rgb(16, 11, 71)`.
  - The arrows are 32×48.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.11.
  - Single slide, translateX transition, looping index.
  - No autoplay.
  - Photo 460×345.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: reviews carousel".

### Task 10: Why Students Love Us, quiz CTA, founder

**Files:**
- Create: `components/sections/WhyLove.tsx`, `QuizCta.tsx`, `Founder.tsx`, `e2e/mid2.spec.ts`

- [ ] **Step 1: Failing tests:**
  - There are 6 why-cards, each white with radius 30px. Their titles are in spec order.
  - The quiz section background is `rgb(16, 11, 71)`, and the h2 "Not sure" span color is `rgb(233, 211, 245)`.
  - The founder h2 contains "ASHISH GOYAL".
  - At 390, the founder kicker y is less than the founder image y.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.12–1.14. Card sizes:
  - Why cards: 417×315, padding 25, 66px icons.
  - Quiz image: 619×439.
  - Founder image: 432×517.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: why, quiz, founder sections".

### Task 11: Popular Articles with click-to-play video

**Files:**
- Create: `components/sections/Articles.tsx`, `components/interactive/VideoEmbed.tsx`, `e2e/articles.spec.ts`

**Interfaces:**
- Produces: `VideoEmbed({ thumb, alt, embedUrl })`. It shows the thumbnail and the play pill until clicked, then renders an `<iframe src={embedUrl}>`.

- [ ] **Step 1: Failing tests:**
  - The featured card background is `rgb(253, 250, 230)` with radius 60px.
  - There is no iframe before the click. After clicking the play button, the iframe `src` contains `youtube.com/embed/xXJjQodcM9c`.
  - The grid has 6 article titles in spec order, with hrefs from the spec.
  - At 390, the grid is 1 column.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.15. Grid cards are 390 wide with images at 390×260 and thin vertical rules between columns.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: popular articles".

### Task 12: Footer

**Files:**
- Create: `components/sections/Footer.tsx`, `e2e/footer.spec.ts`

- [ ] **Step 1: Failing tests:**
  - The 5 column headings are "Quick Links", "Products", "Resources", "Article" and "Company", in color `rgb(233, 211, 245)`.
  - There are 27 nav links with the spec hrefs.
  - "© 2026 Pediatrics Board Review. All rights reserved." is present.
  - At 390, the link columns form 2 per row and the logo comes after the copyright.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1.16.
  - Navy background with the `pbr.webp` arch behind the CTA.
  - The "Get Started" pill has a circular arrow chip.
  - Social squares are 48px.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: footer".

### Task 13: Funnel ribbon and scroll-to-top

**Files:**
- Create: `components/interactive/FunnelRibbon.tsx`, `components/interactive/ScrollToTop.tsx`, `e2e/overlays.spec.ts`

- [ ] **Step 1: Failing tests:**
  - The ribbon is `position: fixed; bottom: 0` with background `rgb(28, 23, 99)` and contains "Claim Your Two FREE PDF Chapters".
  - Click "×" and the ribbon is hidden. Reload and it is still hidden (sessionStorage key `pbr-funnel-dismissed`).
  - After dismissal, scroll to the bottom and the © line is in the viewport, not covered.
  - Scroll-to-top is hidden at the top. After scrolling 1000px it is visible, and clicking it brings `scrollY` back to 0.
- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement to spec §1 funnel and §5.
  - "Download Now" opens a minimal modal shell with the funnel heading and a close button. There is no real form submission (spec §6).
  - Add `padding-bottom` to `body` equal to the ribbon height while it is shown, so nothing is covered.
- [ ] **Step 4:** Run the tests. Expected: PASS. Commit "feat: funnel ribbon and scroll-to-top".

### Task 14: Visual QA against the live site

**Files:**
- Create: `e2e/visual.spec.ts`, `e2e/layout.spec.ts`, `docs/visual-qa.md`
- Delete: `app/dev/primitives/`

- [ ] **Step 1: Write the layout test.** `no horizontal overflow` at widths [360, 390, 768, 1024, 1280, 1440, 1920] checks `document.documentElement.scrollWidth <= innerWidth`. Also assert that section order on the page matches spec §1 by heading text.
- [ ] **Step 2:** Run it, fix any failures, and rerun until it passes.
- [ ] **Step 3:** In `visual.spec.ts`, capture full-page screenshots of the local page and the live URL at 1440 and 390.
  - Live captures hide `.cookies-popup` and `.home-funnel`; local captures hide the ribbon equivalently.
  - Save them to `test-results/visual/`.
- [ ] **Step 4:** Compare section by section. Fix any delta over about 4px in position or size, or any visible color or weight mismatch. Record the remaining known deltas in `docs/visual-qa.md`.
- [ ] **Step 5:** Run `yarn lint && yarn build && yarn test:e2e`. Expected: all pass.
- [ ] **Step 6:** Commit "test: visual QA and layout guards".
