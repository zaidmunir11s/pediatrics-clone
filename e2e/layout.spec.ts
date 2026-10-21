import { expect, test } from "@playwright/test";

for (const width of [360, 390, 768, 1024, 1280, 1440, 1920]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("sections follow the reference order", async ({ page }) => {
  await page.goto("/");
  const headings = await page.locator("main h1, main h2, footer h2").allInnerTexts();
  expect(headings.map((h) => h.replace(/\s+/g, " ").trim())).toEqual([
    "Pass Your Pediatric Boards With Confidence",
    "Preorder for Only $1 Now & Save Up to 75%",
    "What if passing isn’t about what you study, but how you study?",
    "Trusted by 10,000+ Pediatricians",
    "As Seen on",
    "Who Do We Help?",
    "Reviews",
    "Why Students Love Us:",
    "Not sure where to start?",
    "Meet our founder, ASHISH GOYAL",
    "Popular Articles",
    "Get Started",
  ]);
});

test.describe("tablet", () => {
  test.use({ viewport: { width: 900, height: 1000 } });
  test("uses the hamburger header", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Toggle Menu" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
  });
});
