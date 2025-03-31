// lucanet-automation/tests/solutions.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { SolutionPage } from '../pages/solutionpage';
import { SELECTORS } from '../utils/constants';

test.describe('Lucanet Solutions Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const allowCookies = page.locator(SELECTORS.allowCookies);
    if (await allowCookies.isVisible()) {
      await allowCookies.click();
    }
  });

  test('Navigate to Consolidation and Financial Planning', async ({ page }) => {
    const home = new HomePage(page);
    await home.navigateToFinancialConsolidation();

    const solution = new SolutionPage(page);
    await expect(solution.heroHeading).toBeVisible();
    const text = await solution.getHeroText();
    expect(text).toContain('Lucanet Consolidation and Financial Planning');
  });
});
