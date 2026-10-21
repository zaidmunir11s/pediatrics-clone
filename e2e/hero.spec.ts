import { expect, test } from "@playwright/test";
import { css, mobile } from "./helpers";

test("hero h1 matches desktop type", async ({ page }) => {
  await page.goto("/");
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveText("Pass Your Pediatric Boards With Confidence");
  expect(await css(h1, "font-size")).toBe("52px");
  expect(await css(h1, "font-weight")).toBe("500");
});

test("hero get started links to who-do-we-help", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByTestId("hero").getByRole("link", { name: "Get Started" }),
  ).toHaveAttribute("href", "#who-do-we-help");
});

test.describe("without javascript", () => {
  test.use({ javaScriptEnabled: false });
  test("stats render final values", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByTestId("hero");
    await expect(hero).toContainText("10,000+");
    await expect(hero).toContainText("99%");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("stats show final values immediately", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("hero")).toContainText("10,000+", { timeout: 500 });
  });
});

test("count-up animates to the final value", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("hero")).toContainText("10,000+", { timeout: 5000 });
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });

  test("h1 shrinks to 27px", async ({ page }) => {
    await page.goto("/");
    expect(await css(page.getByRole("heading", { level: 1 }), "font-size")).toBe("27px");
  });

  test("blocks reorder like the reference", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByTestId("hero");
    const ys = await Promise.all(
      [
        hero.getByRole("heading", { level: 1 }),
        hero.getByRole("link", { name: "Get Started" }),
        hero.getByTestId("guarantee"),
        hero.getByTestId("hero-copy"),
        hero.getByTestId("hero-stats"),
        hero.getByTestId("hero-image"),
      ].map(async (l) => (await l.boundingBox())!.y),
    );
    expect([...ys].sort((a, b) => a - b)).toEqual(ys);
  });
});
