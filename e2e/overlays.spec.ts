import { expect, test } from "@playwright/test";
import { css } from "./helpers";

test("funnel ribbon is fixed to the bottom", async ({ page }) => {
  await page.goto("/");
  const ribbon = page.getByTestId("funnel-ribbon");
  await expect(ribbon).toContainText("Claim Your Two FREE PDF Chapters");
  expect(await css(ribbon, "position")).toBe("fixed");
  expect(await css(ribbon, "bottom")).toBe("0px");
  expect(await css(ribbon, "background-color")).toBe("rgb(28, 23, 99)");
});

test("dismissed ribbon stays hidden for the session", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("funnel-ribbon").getByRole("button", { name: "Close" }).click();
  await expect(page.getByTestId("funnel-ribbon")).toBeHidden();
  await page.reload();
  await expect(page.getByTestId("funnel-ribbon")).toBeHidden();
});

test("ribbon never covers the end of the footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("funnel-ribbon")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const copyright = page.getByText("© 2026 Pediatrics Board Review. All rights reserved.");
  const ribbon = (await page.getByTestId("funnel-ribbon").boundingBox())!;
  const line = (await copyright.boundingBox())!;
  expect(line.y + line.height).toBeLessThanOrEqual(ribbon.y);
});

test("download form validates and never pretends to submit", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("funnel-ribbon").getByRole("button", { name: "Download Now" }).click();
  const dialog = page.getByRole("dialog", { name: /After Failing 5, 6 and Even TEN Times/ });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Submit" }).click();
  await expect(dialog.getByText("This field is required.").first()).toBeVisible();
  await dialog.getByLabel("First").fill("Test");
  await dialog.getByLabel("Last").fill("User");
  await dialog.getByLabel("Email").fill("not-an-email");
  await dialog.getByRole("button", { name: "Submit" }).click();
  await expect(dialog.getByText("Please enter a valid email address.")).toBeVisible();
  await dialog.getByLabel("Email").fill("test@example.com");
  await dialog.getByRole("button", { name: "Submit" }).click();
  await expect(dialog.getByRole("status")).toContainText("not sent");
});

test("scroll-to-top appears after scrolling and returns to top", async ({ page }) => {
  await page.goto("/");
  const btn = page.getByRole("button", { name: "Scroll to top" });
  await expect(btn).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, 1500));
  await expect(btn).toBeVisible();
  await btn.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
