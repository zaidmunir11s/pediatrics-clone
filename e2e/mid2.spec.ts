import { expect, test } from "@playwright/test";
import { css, mobile } from "./helpers";

test("six why-cards in reference order", async ({ page }) => {
  await page.goto("/");
  const cards = page.getByTestId("why-card");
  await expect(cards).toHaveCount(6);
  expect(await css(cards.first(), "border-radius")).toBe("30px");
  expect(await css(cards.first(), "background-color")).toBe("rgb(255, 255, 255)");
  const titles = await cards.locator("h3").allInnerTexts();
  expect(titles.map((t) => t.replace(/\s+/g, " "))).toEqual([
    "Concise Content",
    "Complex Topics, Made Simple",
    "Proven Effectiveness",
    "100% Pass Guarantee",
    "Multimodal Learning",
    "Built for Mastery",
  ]);
});

test("quiz cta is navy with lavender 'Not sure'", async ({ page }) => {
  await page.goto("/");
  const quiz = page.getByTestId("quiz-cta");
  expect(await css(quiz, "background-color")).toBe("rgb(16, 11, 71)");
  expect(await css(quiz.getByText("Not sure"), "color")).toBe("rgb(233, 211, 245)");
});

test("founder names Ashish Goyal in teal", async ({ page }) => {
  await page.goto("/");
  const name = page.getByTestId("founder").getByText("ASHISH GOYAL", { exact: true });
  expect(await css(name, "color")).toBe("rgb(0, 129, 149)");
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });
  test("founder heading sits above the photo", async ({ page }) => {
    await page.goto("/");
    const founder = page.getByTestId("founder");
    const heading = (await founder.getByRole("heading", { level: 2 }).boundingBox())!;
    const photo = (await founder.getByRole("img").boundingBox())!;
    expect(heading.y).toBeLessThan(photo.y);
  });
});
