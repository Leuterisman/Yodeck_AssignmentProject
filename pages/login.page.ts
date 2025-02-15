import { Page, expect } from "@playwright/test";

export class LoginPage {
  private page: Page;

  // Locators
  private emailInput = "input[name='username']";
  private continueBtn = "button#prelogin_button";
  private passwordInput = "input[placeholder='Insert your Password']";
  private loginBtn = "button#login_button";
  private errorMessage = "h5.error-message.password_error.error";
  private passwordVisibilityToggle = "i#show_pass";
  private forgotPasswordLink = "a.forgot-password-link";
  private changeEmailLink = "a.change-email-link.change_email";
  private cookieButton =
    "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll";
  private sendInstructionsBtn = "button#fake_submit";

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://app.yodeck.com/login");
  }

  async acceptCookies() {
    const cookieButtonLocator = this.page.locator(this.cookieButton);
    await cookieButtonLocator.waitFor({ state: "visible" });
    await cookieButtonLocator.click();
  }

  async enterEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  async clickContinue() {
    await this.page.click(this.continueBtn);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginBtn);
  }

  async assertErrorMessage(message: string) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(message);
  }

  async togglePasswordVisibility() {
    await this.page.click(this.passwordVisibilityToggle);
  }

  async assertPasswordVisibility(visible: boolean) {
    const type = visible ? "text" : "password";
    await expect(this.page.locator(this.passwordInput)).toHaveAttribute(
      "type",
      type
    );
  }

  async clickForgotPassword() {
    await this.page.click(this.forgotPasswordLink);
  }

  async clickChangeEmail() {
    await this.page.click(this.changeEmailLink);
  }

  async clickSendInstructions() {
    await this.page.click(this.sendInstructionsBtn);
  }
}
