import { Page } from "@playwright/test";

/**
 * Page Object Model for the Lucanet Home Page.
 * Encapsulates commonly accessed elements and navigation actions.
 */
export class HomePage {
  constructor(private page: Page) {}

  /** Hero heading text at the top of the homepage */
  get heroHeading() {
    return this.page.locator("div.hero-advanced__headline.hero-advanced__headline--default");
  }

  /** Top navigation menu element */
  get navMenu() {
    return this.page.locator("nav");
  }

  /** All footer links (e.g., Privacy Policy, Impressum) */
  get footer() {
    return this.page.locator("footer a");
  }

  /**
   * Navigates from homepage to the "Consolidation and Financial Planning" solution page
   * by hovering over "Solutions" and clicking the appropriate link.
   */
  async navigateToFinancialConsolidation() {
    await this.page.getByRole("link", { name: "Solutions", exact: true }).hover();
    await this.page.getByRole("link", { name: "Consolidation and Financial Planning" }).first().click();
  }
}
