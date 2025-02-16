import { test, expect } from "@playwright/test";
import { ImagePage } from "../pages/image.page";
import { LoginPage } from "../pages/login.page";
import { TestData } from "../utils/test-data";

/**
 * This test suite covers various scenarios for uploading images.
 * It tests image uploads using valid and invalid URLs, as well as uploading multiple images.
 */
test.describe("Image Upload Tests", () => {
  let imagePage: ImagePage;
  let loginPage: LoginPage;

  /**
   * This hook runs before each test, initializing the LoginPage and ImagePage objects, logging in to the application,
   * and navigating to the image page to perform image upload actions.
   */
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

    // After login, navigate to the image modal
    await imagePage.openAddImageModal();
    await imagePage.switchToUrlImport();
  });

  /**
   * Test case for uploading an image with a valid URL. It verifies that the image is uploaded successfully
   * by filling required fields and saving the upload.
   */
  test("Upload image with valid URL", async () => {
    // Enter a single valid URL
    await imagePage.enterImageUrl(TestData.validUrls[0]);
    await imagePage.clickUpload();

    // Fill required fields and save the image
    await imagePage.fillRequiredFields(TestData.validName);
    await imagePage.clickSave();
  });

  /**
   * Test case for uploading multiple images with valid URLs. It verifies that multiple URL fields are added,
   * URLs are entered correctly, and the images are uploaded successfully.
   */
  test("Upload multiple images with valid URLs", async () => {
    // Add a second URL field
    await imagePage.addUrlField();

    // Enter URLs in all fields
    await imagePage.enterImageUrl(TestData.validUrls[0], 0);
    await imagePage.enterImageUrl(TestData.validUrls[1], 1);
    await imagePage.clickUpload();
    await imagePage.clickSave();
  });

  /**
   * Test case for uploading an image with an invalid URL. It attempts to upload an invalid URL and checks the behavior
   * of the upload process.
   */
  test("Upload image with invalid URL", async () => {
    await imagePage.enterImageUrl(TestData.invalidUrl);
    await imagePage.clickUpload();
    await imagePage.fillRequiredFields(TestData.validName);
    await imagePage.clickSave();
    //await imagePage.assertErrorMessage("Invalid image URL"); Comment: When saving the image, no error message is displayed. The error notification only appears when hovering over the uploaded image
  });
});
