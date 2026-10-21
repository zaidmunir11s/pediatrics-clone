import { expect, test } from "@playwright/test";
import { css } from "./helpers";

const visibleTitle = (page: import("@playwright/test").Page) =>
  page.getByTestId("reviews").locator("[aria-hidden=false] h3");

test("reviews carousel opens on the reference slide", async ({ page }) => {
  await page.goto("/");
  const title = visibleTitle(page);
  await expect(title).toHaveText("PBR literally saved my butt!");
  expect(await css(title, "font-size")).toBe("48px");
  expect(await css(title, "color")).toBe("rgb(16, 11, 71)");
});

test("next and previous arrows move one slide and wrap", async ({ page }) => {
  await page.goto("/");
  const section = page.getByTestId("reviews");
  await section.getByRole("button", { name: "Next slide" }).click();
  await expect(visibleTitle(page)).toHaveText("Loved it!");
  await section.getByRole("button", { name: "Next slide" }).click();
  await expect(visibleTitle(page)).toHaveText("I was able to pass comfortably!");
  await section.getByRole("button", { name: "Previous slide" }).click();
  await expect(visibleTitle(page)).toHaveText("Loved it!");
});

test("arrows match the reference size", async ({ page }) => {
  await page.goto("/");
  const box = (await page.getByRole("button", { name: "Next slide" }).boundingBox())!;
  expect([box.width, box.height]).toEqual([32, 48]);
});
