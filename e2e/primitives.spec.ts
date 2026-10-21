import { expect, test } from "@playwright/test";
import { css } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/dev/primitives");
});

test("primary button matches reference", async ({ page }) => {
  const btn = page.getByTestId("btn-primary");
  expect(await css(btn, "background-color")).toBe("rgb(177, 64, 236)");
  expect(await css(btn, "border-radius")).toBe("50px");
  expect(await css(btn, "font-weight")).toBe("500");
  await expect(btn.locator("svg")).toBeVisible();
});

test("preorder button is heavy pill", async ({ page }) => {
  const btn = page.getByTestId("btn-preorder");
  expect(await css(btn, "font-weight")).toBe("800");
  expect(await css(btn, "background-color")).toBe("rgb(109, 40, 217)");
});

test("primary hover darkens to palette1", async ({ page }) => {
  const btn = page.getByTestId("btn-primary");
  await btn.hover();
  await expect
    .poll(() => css(btn, "background-color"))
    .toBe("rgb(127, 26, 166)");
});

test("check list renders circle icons", async ({ page }) => {
  const items = page.getByTestId("checklist").locator("li");
  await expect(items).toHaveCount(2);
  const icon = items.first().locator("span").first();
  expect(await css(icon, "border-radius")).toBe("50%");
  expect(await css(icon, "width")).toBe("30px");
});
