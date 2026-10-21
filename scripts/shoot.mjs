// Visual QA helper: full-page screenshots of the local build and the live reference.
// Usage: node scripts/shoot.mjs <local|live> <width> [outDir]
// Hides the reference's third-party cookie notice and the fixed funnel ribbon on both,
// and waits for lazy content by scrolling the page once.
import { chromium } from "@playwright/test";

const [target = "local", width = "1440", outDir = ".superpowers/visual"] = process.argv.slice(2);
const url = target === "live" ? "https://www.pediatricsboardreview.com/" : "http://localhost:3000/";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 },
  reducedMotion: "reduce",
});
await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 }).catch(() => {});
await page.addStyleTag({
  content:
    ".cookies-popup,.home-funnel,[data-testid=funnel-ribbon],.kadence-scroll-to-top,[data-testid=scroll-top],nextjs-portal{display:none!important}",
});
for (let y = 0; y < 20000; y += 700) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(150);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);
const file = `${outDir}/${target}-${width}.png`;
await page.screenshot({ path: file, fullPage: true });
console.log(file, await page.evaluate(() => document.documentElement.scrollHeight));
await browser.close();
