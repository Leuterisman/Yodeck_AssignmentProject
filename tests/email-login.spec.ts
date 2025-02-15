import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { TestData } from "../utils/test-data";

test.describe("Email login tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("QAJIRA_001: Login with valid credentials", async ({ page }) => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();
    await expect(page).toHaveURL(
      "https://app.yodeck.com/index.html#main/welcome"
    );
  });

  test("QAJIRA_002: Login with invalid credentials", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.invalidUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  test("QAJIRA_003: Login with unregistered email", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.unregisteredEmail);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  test("QAJIRA_004: Login with a valid email but incorrect password", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.invalidUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  test("QAJIRA_005: Login with an empty email field", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail("");
    await loginPage.clickContinue();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  test("QAJIRA_006: Login with an empty password field", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword("");
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  test("QAJIRA_007: Login with an invalid email format", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.invalidFormatEmail);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  test("QAJIRA_008: Verify the password visibility toggle button", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.assertPasswordVisibility(false);
    await loginPage.togglePasswordVisibility();
    await loginPage.assertPasswordVisibility(true);
  });

  test("QAJIRA_009: Verify the Forgot your password functionality", async ({
    page,
  }) => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.clickForgotPassword();
    const emailVerification = page.locator('input[name="email"]');
    await emailVerification.fill(TestData.validUser.password);
    await loginPage.clickSendInstructions();
    await page.goto(
      "https://app.yodeck.com/reset_password/NDYxNjgw/cl6f2b-1f49a65d02e9d7324fbf312aa24640e5/"
    );
    const newPasswordInput = page.locator('input[name="new_password1"]');
    await newPasswordInput.fill(TestData.validUser.password);
    const confirmPasswordInput = page.locator('input[name="new_password2"]');
    await confirmPasswordInput.fill(TestData.validUser.password);
    const resetPasswordBtn = page.locator(
      'input[type="submit"].btn-default.login_layout_button'
    );
    await resetPasswordBtn.click();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();
    await expect(page).toHaveURL(
      "https://app.yodeck.com/index.html#main/welcome"
    );
  });

  test("QAJIRA_010: Verify the Change email option in the password entry screen", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.clickChangeEmail();
    await loginPage.enterEmail("testleuteris@hotmail.com");
    await loginPage.clickContinue();
  });
});
