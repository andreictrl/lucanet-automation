import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for a Solution page (e.g. Consolidation and Financial Planning).
 * Encapsulates access to the main heading and related interactions.
 */
export class SolutionPage {
  readonly page: Page;
  readonly heroHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // Hero <h1> heading, assumed to be the main title on the page
    this.heroHeading = page.locator("h1"); // Adjust the selector if needed
  }

  /**
   * Retrieves the text content of the main <h1> heading.
   * Useful for asserting the correct page is loaded.
   */
  async getHeroText(): Promise<string> {
    return this.heroHeading.innerText();
  }
}
