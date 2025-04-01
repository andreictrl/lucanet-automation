import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { SolutionPage } from "../pages/solutionpage";
import { SELECTORS } from "../utils/constants";

test.describe("Lucanet Solutions Navigation Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage and handle cookie consent
    await page.goto("/");
    const allowCookies = page.locator(SELECTORS.allowCookies);
    if (await allowCookies.isVisible()) {
      await allowCookies.click();
    }
  });

  test("Navigate to Consolidation and Financial Planning", async ({ page }) => {
    const home = new HomePage(page);

    // Hover + click on the Solutions > Consolidation and Financial Planning link
    await home.navigateToFinancialConsolidation();

    const solution = new SolutionPage(page);

    // Assert heading is visible and text matches expected
    await expect(solution.heroHeading).toBeVisible();
    const text = await solution.getHeroText();
    expect(text).toContain("Lucanet Consolidation and Financial Planning");
  });
});
