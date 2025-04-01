import { Page, expect } from "@playwright/test";

/**
 * Page Object Model for the "Request Demo" page.
 * Handles navigation to the page, form filling, submission, and validation.
 */
export class RequestDemoPage {
  constructor(private page: Page) {}

  /**
   * Opens the Request Demo form by clicking the "Request demo" link.
   * Scrolls into view before clicking to avoid element interception.
   */
  async open() {
    const requestDemoButton = this.page
      .getByRole("link", { name: "Request demo", exact: true })
      .first();
    await requestDemoButton.scrollIntoViewIfNeeded();
    await requestDemoButton.click();
  }

  /**
   * Fills out the demo request form with mock data and submits it.
   * @param email The email address to use in the form.
   */
  async fillAndSubmitForm(email: string) {
    const page = this.page;

    await page.locator('input[name="firstname"][placeholder="First name*"]').waitFor({ state: "visible" });
    await page.locator('input[name="firstname"][placeholder="First name*"]').fill("Andrei");
    await page.locator('input[name="lastname"][placeholder="Last name*"]').fill("Tester");
    await page.locator('input[name="email"][placeholder="Business email*"]').fill("automation@company.org");
    await page.locator('input[name="company"][placeholder="Company*"]').fill("QA Devs");
    await page.locator('input[name="jobtitle"][placeholder="Job title*"]').fill("QA Engineer");
    await page.locator('input[name="phone"][placeholder="Phone number*"]').fill("+40765555933");
    await page.locator('select[name="country"]').selectOption({ label: "Romania" });
    await page.locator('select[name="purchase_category"]').selectOption({ label: "Consolidation and Financial Planning" });
    await page.locator('textarea[name="situation__c"][placeholder="Your message*"]').fill("This is a mock submission for automation task.");
    await page.locator('input[name="lead_source_detail"][placeholder*="How did you hear about us?"]').fill("Google");
    await page.getByLabel("I agree to receive further communications from Lucanet.").check();
    await page.getByRole("button", { name: "Request Demo" }).click();
  }

  /**
   * Asserts that no general error message appears after submission.
   */
  async assertNoErrorMessages() {
    await expect(
      this.page.getByText("Please complete all required fields.")
    ).not.toBeVisible();
  }

  /**
   * Validates that only the email field shows an error (e.g. when invalid).
   */
  async assertOnlyEmailErrorAppears() {
    await expect(this.page.locator('input[name="email"]')).toHaveClass(/invalid/);
    await expect(this.page.getByText(/Please enter a valid email address./i)).toBeVisible();
    await expect(this.page.getByText("Please complete all required fields.")).not.toBeVisible();
  }
}
