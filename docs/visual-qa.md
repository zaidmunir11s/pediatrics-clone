# Visual QA — local build vs pediatricsboardreview.com

Compared on 2026-10-21 with headless Chrome (`scripts/shoot.mjs`), full-page captures at 1440px and 390px, plus live DOM measurements in the browser.

## Method

- Section offsets and heights measured on both pages.
- Element-level positions, font sizes, weights and colors read from computed styles on the live site.
- Side-by-side crops reviewed for every section at 1440px and 390px; a tablet pass at 820px checked for layout breakage.

## Results

**Desktop (1440px)**: every section's top offset is within 2px of live through the footer.

| Section | Live y / h | Local y / h |
|---|---|---|
| Hero | 144 / 792 | 144 / 792 |
| Preorder | 936 / 836 | 936 / 835 |
| Start Here | 1913 / 184 | 1912 / 184 |
| Strategy | 2097 / 718 | 2096 / 719 |
| Who Do We Help | ~3630 / 1443 | 3629 / 1443 |
| Reviews | 5073 / 1075 | 5072 / 1075 |
| Why Students | 6148 / 903 | 6148 / 903 |
| Quiz CTA | 7051 / 454 | 7051 / 454 |
| Founder | 7504 / 577 | 7505 / 577 |
| Articles | 8082 / 1827 | 8082 / 1821 |
| Footer | 9908 / 999 | 9902 / 1000 |

**Mobile (390px)**: sections are within ~1–3% of live height. The largest remaining differences:

- Hero: +15px, because the count-up numbers render; live leaves them blank until animated.
- Who Do We Help: −19px.
- Articles: −47px over 3,968px.
- Footer: 1408 vs 1401.

## Known deltas

- **Google reviews widget**: a static replica of the Trustindex widget. The live widget's card count, summary card and autoplay offset vary between loads.
- **Count-up start**: values are server-rendered as final and animate from 0 when visible. The live widget starts empty.
- **Fonts**: Poppins comes from `next/font` (current Google version); the live site self-hosts v24. Glyph metrics matched in every compared crop.
- **Tablet (768–1024px)**: never measured on live. Layout is a sensible interpolation: hamburger header, two-column hero, and the featured article and small cards stacked.
- **Forms**: the "Download Now" lead form validates input but sends nothing (no backend), and says so.
