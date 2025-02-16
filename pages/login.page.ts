import { Page, expect } from "@playwright/test";

/**
 * This class includes actions related to logging into the application, including
 * entering login credentials, handling error messages, and navigating through password
 * recovery options. It provides methods to interact with the login page elements.
 */
export class LoginPage {
  private page: Page;

  // Login Locators
  private emailInput = "input[name='username']";
  private continueBtn = "button#prelogin_button";
  private passwordInput = "input[placeholder='Insert your Password']";
  private loginBtn = "button#login_button";
  private errorMessage = "h5.error-message.password_error.error";
  private passwordLabel = "label[for='password']";
  private passwordVisibilityToggle = "i#show_pass";
  private forgotPasswordLink = "a.forgot-password-link";
  private changeEmailLink = "a.change-email-link.change_email";
  private cookieButton =
    "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll";
  private sendInstructionsBtn = "button#fake_submit";

  /**
   * Initializes a new instance of the LoginPage class.
   *
   * @param page - The Playwright Page object used to interact with the webpage.
   */
  constructor(page: Page) {
    this.page = page;
  }

  // Login Methods

  /**
   * Navigates to the login page of the application.
   */
  async navigate() {
    await this.page.goto("https://app.yodeck.com/login");
  }

  /**
   * Accepts the cookies by clicking the cookie consent button.
   */
  async acceptCookies() {
    const cookieButtonLocator = this.page.locator(this.cookieButton);
    await cookieButtonLocator.waitFor({ state: "visible" });
    await cookieButtonLocator.click();
  }

  /**
   * Enters the specified email into the email input field.
   *
   * @param email - The email to be entered in the email input field.
   */
  async enterEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  /**
   * Clicks the continue button after entering the email.
   */
  async clickContinue() {
    await this.page.click(this.continueBtn);
  }

  /**
   * Enters the specified password into the password input field.
   *
   * @param password - The password to be entered in the password input field.
   */
  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Clicks the login button to submit the login form.
   */
  async clickLogin() {
    await this.page.click(this.loginBtn);
  }

  /**
   * Asserts that an error message is displayed on the page when incorrect credentials are entered.
   *
   * @param message - The expected error message to be checked.
   */
  async assertErrorMessage(message: string) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(message);
  }

  /**
   * Toggles the visibility of the password input field.
   */
  async togglePasswordVisibility() {
    await this.page.click(this.passwordVisibilityToggle);
  }

  /**
   * Asserts that the password input field's type is either 'text' or 'password'
   * based on the specified visibility status.
   *
   * @param visible - A boolean indicating whether the password should be visible (true) or hidden (false).
   */
  async assertPasswordVisibility(visible: boolean) {
    const type = visible ? "text" : "password";
    await expect(this.page.locator(this.passwordInput)).toHaveAttribute(
      "type",
      type
    );
  }

  async assertPasswordLabelIsNotVisible() {
    await expect(this.page.locator(this.passwordLabel)).toBeHidden();
  }

  /**
   * Clicks the "Forgot Password" link to navigate to the password recovery page.
   */
  async clickForgotPassword() {
    await this.page.click(this.forgotPasswordLink);
  }

  /**
   * Clicks the "Change Email" link to navigate back to "Enter the email" step.
   */
  async clickChangeEmail() {
    await this.page.click(this.changeEmailLink);
  }

  /**
   * Clicks the "Send Instructions" button on the forgot password page to send
   * instructions for password recovery.
   */
  async clickSendInstructions() {
    await this.page.click(this.sendInstructionsBtn);
  }
}
