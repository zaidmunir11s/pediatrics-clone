import { expect, test } from "@playwright/test";
import { css, mobile } from "./helpers";

test("institutions use teal text", async ({ page }) => {
  await page.goto("/");
  const list = page.getByTestId("institutions");
  await expect(list).toContainText("Johns Hopkins Medicine");
  expect(await css(list, "color")).toBe("rgb(0, 129, 149)");
});

test("start-here strip has three purple links on lavender", async ({ page }) => {
  await page.goto("/");
  const strip = page.getByTestId("start-here");
  expect(await css(strip, "background-color")).toBe("rgb(233, 211, 245)");
  const links = strip.getByRole("link", { name: "Start Here" });
  await expect(links).toHaveCount(3);
  expect(await css(links.first(), "color")).toBe("rgb(177, 64, 236)");
  await expect(links.nth(2)).toHaveAttribute("href", "https://www.pediatricsboardreview.com/residency-discounts/");
});

test("strategy heading italicises 'what' on sky background", async ({ page }) => {
  await page.goto("/");
  const section = page.getByTestId("strategy");
  expect(await css(section, "background-color")).toBe("rgb(221, 246, 252)");
  await expect(section.getByRole("heading", { level: 2 }).locator("em")).toHaveText("what");
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });
  test("start-here columns stack", async ({ page }) => {
    await page.goto("/");
    const cols = page.getByTestId("start-here").locator("h3");
    const boxes = await Promise.all([0, 1, 2].map(async (i) => (await cols.nth(i).boundingBox())!));
    expect(boxes[1].y).toBeGreaterThan(boxes[0].y + boxes[0].height);
    expect(boxes[2].y).toBeGreaterThan(boxes[1].y + boxes[1].height);
  });
});
