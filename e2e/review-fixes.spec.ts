import { expect, test } from "@playwright/test";
import { mobile } from "./helpers";

// Regression tests for the final-review findings.

test.describe("mobile menu above fixed bars", () => {
  test.use({ viewport: mobile });
  test("close button and menu CTA are tappable", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Toggle Menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await menu.getByRole("button", { name: "Get Started" }).click({ timeout: 3000 });
    await expect(page.getByRole("dialog", { name: "Welcome to PBR!" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Toggle Menu" })).toBeFocused();
    await page.getByRole("button", { name: "Toggle Menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("button", { name: "Close Menu" }).click({ timeout: 3000 });
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  });
});

test.describe("tablet 768", () => {
  test.use({ viewport: { width: 768, height: 900 } });
  test("footer does not overflow", async ({ page }) => {
    await page.goto("/");
    const w = await page.getByRole("contentinfo").evaluate((f) => f.scrollWidth);
    expect(w).toBeLessThanOrEqual(768);
  });
  test("founder text column is readable", async ({ page }) => {
    await page.goto("/");
    const box = (await page.getByTestId("founder").getByRole("heading", { level: 2 }).boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(300);
  });
  test("ribbon stays compact and is never covered by scroll-to-top", async ({ page }) => {
    await page.goto("/");
    const ribbon = page.getByTestId("funnel-ribbon");
    expect((await ribbon.boundingBox())!.height).toBeLessThanOrEqual(280);
    await page.evaluate(() => window.scrollTo(0, 2000));
    // As on the reference, scroll-to-top stacks below the ribbon rather than on top of it.
    const [r, s] = await Promise.all([
      ribbon.evaluate((e) => Number(getComputedStyle(e).zIndex)),
      page.getByRole("button", { name: "Scroll to top", includeHidden: true }).evaluate((e) => Number(getComputedStyle(e).zIndex)),
    ]);
    expect(s).toBeLessThan(r);
  });
});

test("download modal returns focus to its trigger", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByTestId("funnel-ribbon").getByRole("button", { name: "Download Now" });
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("tab stays inside the get-started dialog", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "GET STARTED", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Welcome to PBR!" });
  for (let i = 0; i < 15; i++) await page.keyboard.press("Tab");
  expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
});

test("count-up values are exposed to assistive tech", async ({ page }) => {
  await page.goto("/");
  const snap = await page.getByTestId("hero-stats").ariaSnapshot();
  expect(snap).toContain("10,000+");
  expect(snap).toContain("99%");
});

test.describe("narrow phone", () => {
  test.use({ viewport: { width: 360, height: 800 } });
  test("announcement CTA stays inside the bar", async ({ page }) => {
    await page.goto("/");
    const bar = (await page.getByTestId("announcement-bar").boundingBox())!;
    const cta = (await page.getByTestId("announcement-bar").getByRole("link").boundingBox())!;
    expect(cta.y + cta.height).toBeLessThanOrEqual(bar.y + bar.height);
  });
});

test.describe("touch device", () => {
  test.use({ viewport: mobile, hasTouch: true, isMobile: true });
  test("review arrows are visible without hover", async ({ page }) => {
    await page.goto("/");
    const arrow = page.getByRole("button", { name: "Next slide" });
    const opacity = await arrow.evaluate((e) => Number(getComputedStyle(e).opacity));
    expect(opacity).toBeGreaterThan(0.5);
  });
});

test("trust autoplay stops after a manual interaction", async ({ page }) => {
  test.setTimeout(20000);
  await page.goto("/");
  const track = page.getByTestId("review-track");
  await track.scrollIntoViewIfNeeded();
  await track.dispatchEvent("pointerdown");
  await page.mouse.move(0, 0);
  const before = await track.evaluate((t) => t.scrollLeft);
  await page.waitForTimeout(7000);
  expect(await track.evaluate((t) => t.scrollLeft)).toBe(before);
});
