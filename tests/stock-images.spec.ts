import { test, expect } from "@playwright/test";
import { ImagePage } from "../pages/image.page";
import { LoginPage } from "../pages/login.page";
import { TestData } from "../utils/test-data";

/**
 * This test suite is focused on testing stock image search and upload functionality.
 * It includes tests for searching with valid keywords, applying filters, and handling empty keyword searches.
 */
test.describe("Stock Images Tests", () => {
  let imagePage: ImagePage;
  let loginPage: LoginPage;

  /**
   * This hook runs before each test, initializing the LoginPage and ImagePage objects,
   * logging in to the application, and navigating to the stock image section to perform search and upload actions.
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
    await imagePage.openAddImageModal();
    await imagePage.switchToStockImages();
  });

  /**
   * Test case for testing the scenario where a valid keyword is used to search for stock images.
   * After the search, an image is selected, uploaded, and saved successfully.
   */
  test("Search and upload with valid keyword", async () => {
    await imagePage.searchStockImages(TestData.searchKeyword);
    await imagePage.clickImageResults();
    await imagePage.clickSelectBtn();
    await imagePage.clickUpload();
    await imagePage.clickSave();
  });

  /**
   * Test case for testing the scenario where stock image search is performed with filters applied.
   * After applying filters and searching with a valid keyword, an image is selected, uploaded, and saved.
   */
  test("Search with filters", async () => {
    await imagePage.clickFilterBtn();
    await imagePage.applyFilters();
    await imagePage.clickImageResults();
    await imagePage.clickSelectBtn();
    await imagePage.searchStockImages(TestData.searchKeyword);
    await imagePage.clickUpload();
    await imagePage.clickSave();
  });

  /**
   * Test case for testing the scenario where the stock image search is performed with an empty keyword.
   * The system should display an error message indicating the absence of a keyword.
   */
  test("Search with empty keyword", async () => {
    await imagePage.searchStockImages("");
    await imagePage.assertErrorVisible(
      TestData.searchErrorMessages.emptyKeyword
    );
  });
});
