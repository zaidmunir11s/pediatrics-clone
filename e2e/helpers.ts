import type { Locator } from "@playwright/test";

export const desktop = { width: 1440, height: 900 };
export const mobile = { width: 390, height: 844 };

export function css(locator: Locator, prop: string): Promise<string> {
  return locator.evaluate(
    (el, p) => getComputedStyle(el).getPropertyValue(p),
    prop,
  );
}
