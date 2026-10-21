import { expect, test } from "@playwright/test";
import { css } from "./helpers";

test("preorder section has anchor id and two cards", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#preorder-2027");
  await expect(section).toContainText("2027 EDITION PREORDERS", { useInnerText: true });
  const cards = section.getByTestId("preorder-card");
  await expect(cards).toHaveCount(2);
  expect(await css(cards.first(), "border-radius")).toBe("18px");
  expect(await css(cards.first(), "box-shadow")).toContain("rgba(76, 29, 149, 0.08)");
});

test("preorder buttons use reference destinations", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("#preorder-2027").getByRole("link", { name: "Preorder for $1 ›" });
  await expect(links).toHaveCount(2);
  await expect(links.nth(0)).toHaveAttribute("href", "https://www.pediatricsboardreview.com/preorder-now/");
  await expect(links.nth(1)).toHaveAttribute("href", "https://www.pediatricsboardreview.com/moca-peds-study-guide");
});

test("anchor jump keeps the kicker below the fixed bar", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("announcement-bar").getByRole("link").click();
  await page.waitForTimeout(1200);
  const bar = (await page.getByTestId("announcement-bar").boundingBox())!;
  const kicker = (await page.getByText("2027 Edition Preorders").boundingBox())!;
  expect(kicker.y).toBeGreaterThanOrEqual(bar.y + bar.height);
});
