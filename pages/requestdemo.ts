import { Page, expect } from '@playwright/test';

export class RequestDemoPage {
  constructor(private page: Page) {}

  async open() {
    const requestDemoButton = this.page.getByRole('link', { name: 'Request demo', exact: true }).first();
    await requestDemoButton.scrollIntoViewIfNeeded();
    await requestDemoButton.click();
  }

  async fillAndSubmitForm(email: string) {
    await this.page.locator('input[name="firstname"][placeholder="First name*"]').waitFor({ state: 'visible' });

    await this.page.locator('input[name="firstname"][placeholder="First name*"]').fill('Andrei');
    await this.page.locator('input[name="lastname"][placeholder="Last name*"]').fill('Tester');
    await this.page.locator('input[name="email"][placeholder="Business email*"]').fill('automation@company.org');
    await this.page.locator('input[name="company"][placeholder="Company*"]').fill('QA Devs');
    await this.page.locator('input[name="jobtitle"][placeholder="Job title*"]').fill('QA Engineer');
    await this.page.locator('input[name="phone"][placeholder="Phone number*"]').fill('+40765555933');
    await this.page.locator('select[name="country"]').selectOption({ label: 'Romania' });
    await this.page.locator('select[name="purchase_category"]').selectOption({ label: 'Consolidation and Financial Planning' });
    await this.page.locator('textarea[name="situation__c"][placeholder="Your message*"]').fill('This is a mock submission for automation task.');
    
    await this.page.locator('input[name="lead_source_detail"][placeholder*="How did you hear about us?"]').fill('Google');
    await this.page.getByLabel('I agree to receive further communications from Lucanet.').check();
    await this.page.getByRole('button', { name: 'Request Demo' }).click();
  }

  async assertNoErrorMessages() {
    await expect(this.page.getByText('Please complete all required fields.')).not.toBeVisible();
  }

  async assertOnlyEmailErrorAppears() {
    await expect(this.page.locator('input[name="email"]')).toHaveClass(/invalid/);
    await expect(this.page.getByText(/Please enter a valid email address./i)).toBeVisible();
    await expect(this.page.getByText('Please complete all required fields.')).not.toBeVisible();
  }
}
