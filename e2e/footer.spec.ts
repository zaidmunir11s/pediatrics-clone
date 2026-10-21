import { expect, test } from "@playwright/test";
import { css, mobile } from "./helpers";

test("footer has five lavender column headings", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  const headings = footer.getByTestId("footer-heading");
  await expect(headings).toHaveText(["Quick Links", "Products", "Resources", "Article", "Company"]);
  expect(await css(headings.first(), "color")).toBe("rgb(233, 211, 245)");
});

test("footer link columns carry all 27 links", async ({ page }) => {
  await page.goto("/");
  const links = page.getByRole("contentinfo").getByTestId("footer-links").getByRole("link");
  await expect(links).toHaveCount(27);
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Refund Policy" })).toHaveAttribute(
    "href",
    "https://www.pediatricsboardreview.com/refund-policies",
  );
});

test("footer shows legal line and socials", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer).toContainText("© 2026 Pediatrics Board Review. All rights reserved.");
  await expect(footer.getByRole("link", { name: "Facebook" })).toHaveAttribute(
    "href",
    "https://www.facebook.com/pediatricsboardreview",
  );
});

test("footer get started opens the welcome quiz", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("button", { name: "Get Started" }).click();
  await expect(page.getByRole("dialog", { name: "Welcome to PBR!" })).toBeVisible();
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });
  test("link columns pair up two per row", async ({ page }) => {
    await page.goto("/");
    const headings = page.getByRole("contentinfo").getByTestId("footer-heading");
    const a = (await headings.nth(0).boundingBox())!;
    const b = (await headings.nth(1).boundingBox())!;
    const c = (await headings.nth(2).boundingBox())!;
    expect(Math.abs(a.y - b.y)).toBeLessThan(2);
    expect(c.y).toBeGreaterThan(a.y + 50);
  });
});
