import { Page, expect } from "@playwright/test";

/**
 * This class represents the image-related actions on a webpage, including uploading images
 * from a URL, searching for stock images, and applying filters. It encapsulates the locators
 * and methods to interact with the image upload and stock image functionalities.
 */
export class ImagePage {
  private page: Page;

  // Media-upload Locators
  private mediaDropdown = "a.dropdown-toggle .menu-text";
  private imagesDropdown = 'a[href="#main/image"] .menu-text';
  private addImageBtn = "button.openGallery.primary-button.button-mrg-right";
  private urlTab =
    "a.nav-link[data-target='#import_image_from_url'][role='tab']";
  private urlInput =
    'input.form-control.import-url-input[name="import-image-url"]';
  private addUrlBtn = 'span.bbf-add.add-new-url-input[data-rel="tooltip"]';
  private uploadBtn =
    'button.primary-button.button-mrg-left[data-bb-handler="confirm"]';
  private saveBtn = "button.submit-model.primary-button";
  private nameInput =
    "input.form-control[name='name'][placeholder='Enter Name']";

  // Stock-images Locators
  private stockTab =
    "label#stock_image_label.source-button.image-source-button.btn.images.btn-primary.stock-image-gallery";
  private searchInput =
    'input.form-control.photo-search-query.inline[placeholder="Keywords"]';
  private searchBtn = 'button:has-text("Search")';
  private filterBtn = "span.filter-button";
  private providerDropdown = "span.select2-selection.select2-selection--single";
  private providerOption = "li#select2-p2la-result-4g3x-pexels";
  private orientationDropdown =
    'span.select2-selection__rendered#select2-vln2-container[role="textbox"][title="Any Orientation"]';
  private orientationOption =
    'li.select2-results__option.select2-results__option--highlighted[id^="select2-"][id$="-result-dq8x-landscape"]';
  private imageResults = "div.title:has-text('Entering another dimension...')";
  private selectBtn =
    'button.tertiary-button-light.button-mrg-right[data-button-handler="select"]';
  private emptyKeywordErrorMessage = "div[data-error='stock-image']";

  /**
   * Initializes a new instance of the ImagePage class.
   *
   * @param page - The Playwright Page object used to interact with the webpage.
   */
  constructor(page: Page) {
    this.page = page;
  }

  // Media-upload Methods

  /**
   * Opens the modal to add a new image by navigating through the dropdowns.
   */
  async openAddImageModal() {
    await this.page.click(this.mediaDropdown);
    await this.page.click(this.imagesDropdown);
    await this.page.click(this.addImageBtn);
  }

  /**
   * Switches the interface to the URL import tab for uploading images from a URL.
   */
  async switchToUrlImport() {
    await this.page.click(this.urlTab);
  }

  /**
   * Enters the specified image URL into the input field for URL-based image upload.
   *
   * @param url - The image URL to be entered.
   * @param index - The index of the input field (default is 0).
   */
  async enterImageUrl(url: string, index = 0) {
    const inputs = await this.page.$$(this.urlInput);
    await inputs[index].fill(url);
  }

  /**
   * Adds a new URL input field by clicking the button.
   */
  async addUrlField() {
    await this.page.click(this.addUrlBtn);
  }

  /**
   * Clicks the upload button to upload the image.
   */
  async clickUpload() {
    await this.page.click(this.uploadBtn);
  }

  /**
   * Fills the required name input field with the specified name.
   *
   * @param name - The name to be entered in the 'name' input field.
   */
  async fillRequiredFields(name: string) {
    await this.page.fill(this.nameInput, name);
  }

  /**
   * Clicks the save button to save the uploaded image.
   */
  async clickSave() {
    await this.page.click(this.saveBtn);
  }

  // Stock-images Methods

  /**
   * Switches to the stock images tab for selecting stock images.
   */
  async switchToStockImages() {
    await this.page.click(this.stockTab);
  }

  /**
   * Searches for stock images by entering the specified keyword.
   *
   * @param keyword - The keyword used to search for stock images.
   */
  async searchStockImages(keyword: string) {
    await this.page.fill(this.searchInput, keyword);
    await this.page.click(this.searchBtn);
  }

  /**
   * Clicks the filter button to apply filters on stock images.
   */
  async clickFilterBtn() {
    await this.page.click(this.filterBtn);
  }

  /**
   * Applies the selected filters for provider and orientation on the stock images.
   */
  async applyFilters() {
    await this.page.click(this.providerDropdown);
    await this.page.click(this.providerOption);
    await this.page.click(this.orientationDropdown);
    await this.page.click(this.orientationOption);
  }

  /**
   * Clicks on a specific image result.
   */
  async clickImageResults() {
    await this.page.click(this.imageResults);
  }

  /**
   * Clicks the select button to choose the current image.
   */
  async clickSelectBtn() {
    await this.page.click(this.selectBtn);
  }

  /**
   * Asserts that an error message is displayed when the keyword field is left empty.
   *
   * @param message - The expected error message.
   */
  async assertErrorVisible(message: string) {
    await expect(this.page.locator(this.emptyKeywordErrorMessage)).toHaveText(
      message
    );
  }
}
