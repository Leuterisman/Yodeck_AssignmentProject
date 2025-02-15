import { Page, expect } from "@playwright/test";

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

  // Image-settings Locators
  private durationInput =
    'input.suffix-spinner.spinner-input.form-control[role="spinbutton"]';
  private addDescriptionBtn = "div.add-description-toggle.form-group";
  private descriptionInput =
    'textarea#c528_description.form-control[name="description"]';
  private tagsInput =
    'input#tags.tm-input.tm-input-typeahead.tt-input[name="tags"]';
  private availabilityToggle =
    'input#toggle_availability.boolean.ace.ace-switch[name="toggle_availability"]';
  private fromDate =
    'input.form-control.date-picker[placeholder="Set start Date | Time"]';
  private toDate =
    'input.form-control.date-picker[placeholder="Set expire Date | Time"]';
  private emptyKeywordErrorMessage = "div[data-error='stock-image']";

  constructor(page: Page) {
    this.page = page;
  }

  async openAddImageModal() {
    await this.page.click(this.mediaDropdown);
    await this.page.click(this.imagesDropdown);
    await this.page.click(this.addImageBtn);
  }

  async switchToUrlImport() {
    await this.page.click(this.urlTab);
  }

  async enterImageUrl(url: string, index = 0) {
    const inputs = await this.page.$$(this.urlInput);
    await inputs[index].fill(url);
  }

  async addUrlField() {
    await this.page.click(this.addUrlBtn);
  }

  async clickUpload() {
    await this.page.click(this.uploadBtn);
  }

  async fillRequiredFields(name: string) {
    await this.page.fill(this.nameInput, name);
  }

  async clickSave() {
    await this.page.click(this.saveBtn);
  }

  async switchToStockImages() {
    await this.page.click(this.stockTab);
  }

  async searchStockImages(keyword: string) {
    await this.page.fill(this.searchInput, keyword);
    await this.page.click(this.searchBtn);
  }

  async clickFilterBtn() {
    await this.page.click(this.filterBtn);
  }

  async applyFilters() {
    await this.page.click(this.providerDropdown);
    await this.page.click(this.providerOption);
    await this.page.click(this.orientationDropdown);
    await this.page.click(this.orientationOption);
  }

  async clickImageResults() {
    await this.page.click(this.imageResults);
  }

  async clickSelectBtn() {
    await this.page.click(this.selectBtn);
  }

  async assertErrorVisible(message: string) {
    await expect(this.page.locator(this.emptyKeywordErrorMessage)).toHaveText(
      message
    );
  }

  // Add more methods for other components
}
