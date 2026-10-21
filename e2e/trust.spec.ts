import { expect, test } from "@playwright/test";
import { mobile } from "./helpers";

test("trusted heading highlights 10,000+", async ({ page }) => {
  await page.goto("/");
  const h2 = page.getByRole("heading", { name: /Trusted by\s+10,000\+\s+Pediatricians/ });
  await expect(h2).toBeVisible();
});

test("google reviews widget shows header and four cards", async ({ page }) => {
  await page.goto("/");
  const widget = page.getByTestId("trust-reviews");
  await expect(widget).toContainText("Top Rated Service");
  await expect(widget).toContainText("Verified by Trustindex");
  const cards = widget.getByTestId("review-card");
  await expect(cards).toHaveCount(10);
  const inView = await widget.getByTestId("review-track").evaluate((track) => {
    const box = track.getBoundingClientRect();
    return [...track.children].filter((c) => {
      const r = c.getBoundingClientRect();
      return r.left >= box.left - 1 && r.right <= box.right + 1;
    }).length;
  });
  expect(inView).toBe(4);
});

test("next arrow reveals the next review", async ({ page }) => {
  await page.goto("/");
  const widget = page.getByTestId("trust-reviews");
  await widget.scrollIntoViewIfNeeded();
  await expect(widget.getByText("Rosalind Lopez")).not.toBeInViewport();
  await widget.getByRole("button", { name: "Next review" }).click();
  await expect(widget.getByText("Rosalind Lopez")).toBeInViewport();
});

test("read more expands a clamped review", async ({ page }) => {
  await page.goto("/");
  const card = page.getByTestId("review-card").first();
  const text = card.getByTestId("review-text");
  const before = (await text.boundingBox())!.height;
  await card.getByRole("button", { name: "Read more" }).click();
  expect((await text.boundingBox())!.height).toBeGreaterThan(before);
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });
  test("shows one review card at a time", async ({ page }) => {
    await page.goto("/");
    const track = page.getByTestId("review-track");
    const first = (await page.getByTestId("review-card").first().boundingBox())!;
    const box = (await track.boundingBox())!;
    expect(first.width).toBeGreaterThan(box.width * 0.85);
  });
});
