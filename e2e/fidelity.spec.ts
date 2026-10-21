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

test.describe("mobile overlays", () => {
  test.use({ viewport: mobile });

  test("ribbon close icon sits in the corner, clear of the title", async ({ page }) => {
    await page.goto("/");
    const ribbon = page.getByTestId("funnel-ribbon");
    const r = (await ribbon.boundingBox())!;
    const close = (await ribbon.getByRole("button", { name: "Close" }).boundingBox())!;
    const title = (await ribbon.locator("strong").boundingBox())!;
    expect([Math.round(close.x - r.x), Math.round(close.y - r.y), close.width]).toEqual([361, 10, 14]);
    expect(title.y).toBeGreaterThanOrEqual(close.y + close.height);
    expect(title.x + title.width).toBeLessThanOrEqual(close.x);
  });

  test("ticker dots are 8px and centred on the text", async ({ page }) => {
    await page.goto("/");
    const [dot, word] = await page.evaluate(() => {
      const ticker = document.querySelector("[class*=marquee]")!;
      const d = ticker.querySelector("span.rounded-full")!.getBoundingClientRect();
      const t = ticker.querySelectorAll(".whitespace-nowrap")[1].getBoundingClientRect();
      return [{ h: d.height, mid: d.top + d.height / 2 }, { mid: t.top + t.height / 2 }];
    });
    expect(dot.h).toBe(8);
    expect(Math.abs(dot.mid - word.mid)).toBeLessThanOrEqual(1);
  });

  test("scroll-to-top is not shown on phones", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect(page.getByRole("button", { name: "Scroll to top", includeHidden: true })).toBeHidden();
  });
});

test("Courses label turns purple while its dropdown is open", async ({ page }) => {
  await page.goto("/");
  const courses = page.locator("header nav").getByRole("link", { name: "Courses", exact: true });
  await courses.hover();
  await expect(courses).toHaveCSS("color", "rgb(177, 64, 236)");
});

test("get-started modal uses the reference icon and radio states", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "GET STARTED", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Welcome to PBR!" });
  await expect(dialog.locator("img")).toHaveAttribute("src", /Home-popup-Icon\.webp/);
  await dialog.getByRole("radio", { name: /MOCA-Peds/ }).check();
  const dot = dialog.locator("label", { hasText: "MOCA-Peds" }).locator("span[aria-hidden]");
  await expect(dot).toHaveCSS("background-color", "rgb(17, 172, 101)");
});
