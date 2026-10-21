import { expect, test, type Locator } from "@playwright/test";
import { css, mobile } from "./helpers";

// Pins details measured on the live reference during the visual-fidelity pass.

async function hovered(loc: Locator, prop: string) {
  await loc.scrollIntoViewIfNeeded();
  await loc.hover();
  return expect.poll(() => css(loc, prop));
}

test("only the reference's four Poppins weights are loaded", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const weights = await page.evaluate(() =>
    [...document.fonts].filter((f) => f.family.includes("oppins") && !f.family.includes("Fallback")).map((f) => f.weight),
  );
  expect(new Set(weights)).toEqual(new Set(["400", "500", "600", "700"]));
});

test("LOG IN turns purple with white text on hover", async ({ page }) => {
  await page.goto("/");
  const login = page.locator("header").getByRole("link", { name: "LOG IN" });
  await (await hovered(login, "background-color")).toBe("rgb(177, 64, 236)");
  expect(await css(login, "color")).toBe("rgb(255, 255, 255)");
});

test("preorder buttons lift to magenta on hover", async ({ page }) => {
  await page.goto("/");
  const btn = page.locator("#preorder-2027").getByRole("link", { name: "Preorder for $1 ›" }).first();
  await (await hovered(btn, "background-color")).toBe("rgb(236, 0, 140)");
  expect(await css(btn, "box-shadow")).toContain("rgba(236, 0, 140, 0.45)");
});

test("start-here links and announcement CTA do not change on hover", async ({ page }) => {
  await page.goto("/");
  const start = page.getByTestId("start-here").getByRole("link").first();
  const before = await css(start, "color");
  await (await hovered(start, "color")).toBe(before);
  const cta = page.getByTestId("announcement-bar").getByRole("link");
  const bg = await css(cta, "background-color");
  await (await hovered(cta, "background-color")).toBe(bg);
});

test("footer links turn purple and underline on hover", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("contentinfo").getByRole("link", { name: "Residency" });
  await (await hovered(link, "color")).toBe("rgb(177, 64, 236)");
  expect(await css(link, "text-decoration-line")).toBe("underline");
});

test("start-here dividers are gradient rules inside the middle column", async ({ page }) => {
  await page.goto("/");
  const middle = page.getByTestId("start-here").locator("h3").nth(1).locator("..");
  const [before, after] = await middle.evaluate((el) => [
    getComputedStyle(el, "::before").backgroundImage,
    getComputedStyle(el, "::after").right,
  ]);
  expect(before).toContain("radial-gradient");
  expect(parseFloat(after)).toBeGreaterThan(0);
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });
  test("press logos are left-aligned half-width tiles", async ({ page }) => {
    await page.goto("/");
    const xs = await page
      .getByTestId("as-seen-on")
      .locator("img")
      .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().x)));
    expect(xs[0]).toBe(10);
    expect(xs[2]).toBe(10);
  });
});
