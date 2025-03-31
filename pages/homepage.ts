import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  get heroHeading() {
    return this.page.locator('div.hero-advanced__headline.hero-advanced__headline--default');
  }

  get navMenu() {
    return this.page.locator("nav"); 
  }

  get footer() {
    return this.page.locator("footer a");
  }

  async navigateToFinancialConsolidation() {
    await this.page.getByRole('link', { name: 'Solutions', exact: true }).hover();
    await this.page.getByRole('link', { name: 'Consolidation and Financial Planning' }).first().click();
  }
}
