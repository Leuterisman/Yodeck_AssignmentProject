import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { TestData } from "../utils/test-data";

/**
 * This test suite covers various login scenarios. It includes tests for
 * valid and invalid credentials, password recovery functionality, and UI elements like the password
 * visibility toggle and change email option.
 */
test.describe("Email login tests", () => {
  let loginPage: LoginPage;

  /**
   * This hook runs before each test, initializing the LoginPage object and navigating to the login page.
   */
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  /**
   * Test case for logging in with valid credentials. It verifies that the user is redirected to
   * the welcome page upon successful login.
   */
  test("Login with valid credentials", async ({ page }) => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();
    await expect(page).toHaveURL(
      "https://app.yodeck.com/index.html#main/welcome"
    );
  });

  /**
   * Test case for logging in with invalid credentials. It verifies that the "Incorrect Credentials"
   * error message is displayed.
   */
  test("Login with invalid credentials", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.invalidUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  /**
   * Test case for logging in with an unregistered email. It verifies that the "Incorrect Credentials"
   * error message is displayed.
   */
  test("Login with unregistered email", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.unregisteredEmail);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  /**
   * Test case for logging in with a valid email but incorrect password. It verifies that the
   * "Incorrect Credentials" error message is displayed.
   */
  test("Login with a valid email but incorrect password", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.invalidUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  /**
   * Test case for attempting login with an empty email field. It verifies that the "Incorrect
   * Credentials" error message is displayed.
   */
  test("Login with an empty email field", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail("");
    await loginPage.clickContinue();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  /**
   * Test case for attempting login with an empty password field. It verifies that the "Incorrect
   * Credentials" error message is displayed.
   */
  test("Login with an empty password field", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword("");
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  /**
   * Test case for attempting login with an invalid email format. It verifies that the
   * "Incorrect Credentials" error message is displayed.
   */
  test("Login with an invalid email format", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.invalidFormatEmail);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage("Incorrect Credentials");
  });

  /**
   * Test case for verifying the password visibility toggle button. It checks the visibility
   * of the password field when toggling the visibility option.
   */
  test("Verify the password visibility toggle button", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.assertPasswordVisibility(false);
    await loginPage.togglePasswordVisibility();
    await loginPage.assertPasswordVisibility(true);
  });

  /**
   * Test case for verifying the "Forgot your password" functionality. It simulates the process
   * of requesting a password reset and successfully changing the password.
   */
  test("Verify the Forgot your password functionality", async ({ page }) => {
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

  /**
   * Test case for verifying the "Change email" option on the password entry screen.
   * It simulates the process of changing the email address during login.
   */
  test("Verify the Change email option in the password entry screen", async () => {
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.clickChangeEmail();
    await loginPage.enterEmail("testleuteris@hotmail.com");
    await loginPage.clickContinue();
  });
});
