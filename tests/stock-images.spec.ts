import { test, expect } from "@playwright/test";
import { ImagePage } from "../pages/image.page";
import { LoginPage } from "../pages/login.page";
import { TestData } from "../utils/test-data";

test.describe("Stock Images Tests", () => {
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

    await imagePage.openAddImageModal();
    await imagePage.switchToStockImages();
  });

  test("QAJIRA_009: Search and upload with valid keyword", async () => {
    await imagePage.searchStockImages(TestData.searchKeyword);
    await imagePage.clickImageResults();
    await imagePage.clickSelectBtn();
    await imagePage.clickUpload();
    await imagePage.clickSave();
  });

  test("QAJIRA_010: Search with filters", async () => {
    await imagePage.clickFilterBtn();
    await imagePage.applyFilters();
    await imagePage.clickImageResults();
    await imagePage.clickSelectBtn();
    await imagePage.searchStockImages(TestData.searchKeyword);
    await imagePage.clickUpload();
    await imagePage.clickSave();
  });

  test("QAJIRA_011: Search with empty keyword", async () => {
    await imagePage.searchStockImages("");
    await imagePage.assertErrorVisible(
      TestData.searchErrorMessages.emptyKeyword
    );
  });
});
