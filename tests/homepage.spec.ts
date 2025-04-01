import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { RequestDemoPage } from "../pages/requestdemo";
import { TEXT, SELECTORS } from "../utils/constants";

// API route to mock form submission
const FORM_ENDPOINT = "**/request-demo**";

test.describe("Lucanet Homepage Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto("/");

    // Accept cookies if the banner is visible
    const allowCookies = page.locator(SELECTORS.allowCookies);
    if (await allowCookies.isVisible()) {
      await allowCookies.click();
    }
  });

  test("Hero heading is visible and correct", async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.heroHeading).toBeVisible();
    await expect(home.heroHeading).toHaveText("Empowering modern finance leaders to lead with ease");
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

  test("Mocked form submission for Request Demo", async ({ page }) => {
    // Mock API response to simulate form success
    await page.route(FORM_ENDPOINT, (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
    );

    const form = new RequestDemoPage(page);

    await form.open();
    await form.fillAndSubmitForm("neteduandrei14@gmail.com");
    await form.assertNoErrorMessages();
    await form.assertOnlyEmailErrorAppears(); // This checks the email validation error specifically
  });
});
