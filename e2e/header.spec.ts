import { expect, test } from "@playwright/test";
import { css, mobile } from "./helpers";

test("announcement bar is fixed with preorder link", async ({ page }) => {
  await page.goto("/");
  const bar = page.getByTestId("announcement-bar");
  expect(await css(bar, "position")).toBe("fixed");
  expect(await css(bar, "background-image")).toContain("rgb(76, 29, 149)");
  await expect(bar).toContainText("2027 PREORDER IS LIVE");
  await expect(bar.getByRole("link", { name: "PREORDER FOR $1 →" })).toHaveAttribute(
    "href",
    "#preorder-2027",
  );
});

test("desktop nav lists reference links", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  for (const name of ["Courses", "Testimonials", "Blog", "FAQs", "About", "Contact"]) {
    await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "LOG IN" })).toBeVisible();
  await expect(page.getByRole("button", { name: "GET STARTED" })).toBeVisible();
});

test("courses dropdown opens on hover", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await nav.getByRole("link", { name: "Courses", exact: true }).hover();
  const panel = page.getByTestId("courses-dropdown");
  await expect(panel).toBeVisible();
  const items = panel.getByRole("link");
  await expect(items).toHaveCount(7);
  await expect(items.first()).toHaveText("ABP Initial Certification Exam");
  await expect(items.last()).toHaveText("CME Credits & MOC Points");
  expect(await css(panel, "border-radius")).toBe("13px");
  expect((await panel.boundingBox())?.width).toBe(290);
});

test("courses dropdown works by keyboard", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Expand Courses" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const panel = page.getByTestId("courses-dropdown");
  await expect(panel).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("get started opens the welcome quiz modal", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "GET STARTED" }).click();
  const dialog = page.getByRole("dialog", { name: "Welcome to PBR!" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("radio", { name: /MOCA-Peds/ }).check();
  await expect(dialog.getByRole("link", { name: "Get Started" })).toHaveAttribute(
    "href",
    "https://www.pediatricsboardreview.com/moca-peds-study-guide/",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test.describe("mobile", () => {
  test.use({ viewport: mobile });

  test("hamburger opens full-screen menu", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
    const toggle = page.getByRole("button", { name: "Toggle Menu" });
    await toggle.click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Testimonials" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Log In" })).toBeVisible();
    expect((await menu.boundingBox())?.width).toBe(390);
    await menu.getByRole("button", { name: "Expand Courses" }).click();
    await expect(menu.getByRole("link", { name: "ABP MOCA-Peds" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("bar wraps to two lines", async ({ page }) => {
    await page.goto("/");
    expect((await page.getByTestId("announcement-bar").boundingBox())?.height).toBe(88);
  });
});
