import { test, expect } from "@playwright/test";
import { ImagePage } from "../pages/image.page";
import { LoginPage } from "../pages/login.page";
import { TestData } from "../utils/test-data";

test.describe("Image Upload Tests", () => {
  let imagePage: ImagePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    imagePage = new ImagePage(page);

    // Navigate to login page and perform login steps
    await loginPage.navigate();
    await loginPage.acceptCookies();
    await loginPage.enterEmail(TestData.validUser.email);
    await loginPage.clickContinue();
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLogin();

    // After login, navigate to the image page
    await imagePage.openAddImageModal();
    await imagePage.switchToUrlImport();
  });

  test("QAJIRA_006: Upload image with valid URL", async () => {
    // Enter single valid URL
    await imagePage.enterImageUrl(TestData.validUrls[0]);
    await imagePage.clickUpload();

    // Fill required fields and save
    await imagePage.fillRequiredFields(TestData.validName);
    await imagePage.clickSave();
  });

  test("QAJIRA_007: Upload multiple images with valid URLs", async () => {
    // Add multiple URL fields
    await imagePage.addUrlField();

    // Enter URLs in all fields
    await imagePage.enterImageUrl(TestData.validUrls[0], 0);
    await imagePage.enterImageUrl(TestData.validUrls[1], 1);

    await imagePage.clickUpload();
    await imagePage.clickSave();
  });

  test("QAJIRA_008: Upload image with invalid URL", async () => {
    await imagePage.enterImageUrl(TestData.invalidUrl);
    await imagePage.clickUpload();
    await imagePage.fillRequiredFields(TestData.validName);
    await imagePage.clickSave();
    //await imagePage.assertErrorMessage("Invalid image URL");
  });

  // Add similar test blocks for QAJIRA_003 to QAJIRA_008
});
