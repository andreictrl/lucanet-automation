import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  get heroHeading() {
    return this.page.locator("nav.main-nav");
  }

  get navMenu() {
    return this.page.locator("nav"); 
  }

  get footer() {
    return this.page.locator("footer a");
  }
}
