import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { TEXT, SELECTORS } from "../utils/constants";

test.describe("Lucanet Homepage Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const allowCookies = page.locator(SELECTORS.allowCookies);
    if (await allowCookies.isVisible()) {
      await allowCookies.click();
    }
  });

  test("Hero heading is visible and correct", async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.heroHeading).toBeVisible();
    await expect(home.heroHeading).toHaveText(TEXT.heroHeading);
  });

  test("Navigation menu is visible", async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.navMenu).toBeVisible();
  });

  test("EN Footer contains Privacy Policy and Impressum", async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.footer).toContainText(["Privacy Policy", "Impressum"]);
  });

  test("DE Footer contains Datenschutz and Impressum", async ({ page }) => {
    const home = new HomePage(page);
    await page.goto("/de/");
    await expect(home.footer.filter({ hasText: "Datenschutz" })).toBeVisible();
    await expect(home.footer.filter({ hasText: "Impressum" })).toBeVisible();
  });
});
