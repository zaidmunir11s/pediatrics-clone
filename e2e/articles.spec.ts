import { expect, test } from "@playwright/test";
import { css, mobile } from "./helpers";

const SITE = "https://www.pediatricsboardreview.com";

test("featured article card matches reference styling", async ({ page }) => {
  await page.goto("/");
  const card = page.getByTestId("featured-article");
  expect(await css(card, "background-color")).toBe("rgb(253, 250, 230)");
  expect(await css(card, "border-radius")).toBe("60px");
  await expect(card.getByRole("link", { name: /PEDIATRIC BOARD EXAM RESULTS FOR 2025/ })).toHaveAttribute(
    "href",
    `${SITE}/pediatric-board-exam-results-2024`,
  );
});

test("video loads only after clicking play", async ({ page }) => {
  await page.goto("/");
  const card = page.getByTestId("featured-article");
  await expect(card.locator("iframe")).toHaveCount(0);
  await card.getByRole("button", { name: "Play video" }).click();
  await expect(card.locator("iframe")).toHaveAttribute("src", /youtube\.com\/embed\/xXJjQodcM9c/);
});

test("grid lists six articles in reference order", async ({ page }) => {
  await page.goto("/");
  const titles = page.getByTestId("article-card").locator("h3 a");
  await expect(titles).toHaveText([
    "So You Failed The Pediatric Boards? Use A Recovery Plan That Works!",
    "Why AAP PREP Questions Are NOT The Best Study Questions For the Pediatric Board Exam",
    "How Many AAP Prep Questions Should I Do to Pass the Pediatric Boards?",
    "Test-Taking Strategies for Medical Board Exams",
    "Compare 2026 Pediatric Board Review Courses",
    "Creating Memorable Pediatric Mnemonics",
  ]);
  await expect(titles.first()).toHaveAttribute("href", `${SITE}/failed-pediatric-boards`);
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });
  test("article grid is one column", async ({ page }) => {
    await page.goto("/");
    const xs = await page
      .getByTestId("article-card")
      .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().x)));
    expect(new Set(xs).size).toBe(1);
  });
});
