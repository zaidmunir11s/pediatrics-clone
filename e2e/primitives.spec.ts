import { expect, test } from "@playwright/test";
import { css } from "./helpers";

// Shared Button / CheckList primitives, exercised where the homepage uses them.

test("primary button matches reference", async ({ page }) => {
  await page.goto("/");
  const btn = page.getByTestId("hero").getByRole("link", { name: "Get Started" });
  expect(await css(btn, "background-color")).toBe("rgb(177, 64, 236)");
  expect(await css(btn, "border-radius")).toBe("50px");
  expect(await css(btn, "font-weight")).toBe("500");
  await expect(btn.locator("svg")).toBeVisible();
});

test("primary hover darkens to palette1", async ({ page }) => {
  await page.goto("/");
  const btn = page.getByTestId("hero").getByRole("link", { name: "Get Started" });
  await btn.hover();
  await expect.poll(() => css(btn, "background-color")).toBe("rgb(127, 26, 166)");
});

test("check list renders 30px circle icons", async ({ page }) => {
  await page.goto("/");
  const item = page.locator("#who-do-we-help li").first();
  const icon = item.locator("span").first();
  expect(await css(icon, "border-radius")).toBe("50%");
  expect(await css(icon, "width")).toBe("30px");
});
