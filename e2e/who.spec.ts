import { expect, test } from "@playwright/test";
import { css, mobile } from "./helpers";

test("as seen on shows the three press logos", async ({ page }) => {
  await page.goto("/");
  const section = page.getByTestId("as-seen-on");
  await expect(section.getByRole("heading", { name: "As Seen on" })).toBeVisible();
  await expect(section.locator("img")).toHaveCount(3);
  await expect(section.getByAltText(/PracticeLink logo/)).toBeVisible();
});

test("who do we help has anchor, large and small cards", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#who-do-we-help");
  const large = section.getByTestId("who-card-large");
  await expect(large).toHaveCount(2);
  expect(await css(large.first(), "border-radius")).toBe("33px");
  expect(Math.abs((await large.first().boundingBox())!.width - 628)).toBeLessThanOrEqual(1);
  const small = section.getByTestId("who-card-small");
  await expect(small).toHaveCount(3);
  expect(await css(small.first(), "background-color")).toBe("rgb(250, 250, 250)");
  expect(await css(small.first(), "border-radius")).toBe("30px");
});

test("who do we help buttons keep reference labels and links", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#who-do-we-help");
  await expect(section.getByRole("link", { name: "View Courses" })).toHaveCount(2);
  await expect(section.getByRole("link", { name: "Get Free Guidance" })).toHaveAttribute(
    "href",
    "https://www.pediatricsboardreview.com/residency-discounts/",
  );
  await expect(section.getByRole("link", { name: "Get Resident Discounts" })).toBeVisible();
  await expect(section.getByRole("link", { name: "Get Credits And Rebates" })).toHaveAttribute(
    "href",
    "https://www.pediatricsboardreview.com/cme",
  );
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });
  test("cards stack in one column", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator("#who-do-we-help [data-testid^=who-card]");
    const xs = await cards.evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().x)));
    expect(new Set(xs).size).toBe(1);
  });
});
