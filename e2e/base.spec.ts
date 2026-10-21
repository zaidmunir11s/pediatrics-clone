import { expect, test } from "@playwright/test";
import { css } from "./helpers";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Pediatrics Board Review | PBR");
});

test("uses Poppins", async ({ page }) => {
  await page.goto("/");
  expect(await css(page.locator("body"), "font-family")).toMatch(/poppins/i);
});

test("assets present", async ({ request }) => {
  const res = await request.get("/images/pediatrics-board-review-logo.webp");
  expect(res.status()).toBe(200);
});
