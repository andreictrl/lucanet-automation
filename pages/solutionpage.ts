import { Page, Locator } from '@playwright/test';

export class SolutionPage {
  readonly page: Page;
  readonly heroHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.locator('h1'); // Adjust the selector as needed
  }

  async getHeroText(): Promise<string> {
    return this.heroHeading.innerText();
  }
}
