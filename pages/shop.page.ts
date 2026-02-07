import { Locator, Page } from '@playwright/test';

export class ShopPage {
  constructor(private readonly page: Page) {}

  private get firstProduct(): Locator {
    return this.page.locator('.product').first();
  }

  private get filterButton(): Locator {
    return this.page.locator('.price_slider_amount button');
  }

  async visit(): Promise<void> {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Shop' }).click();
  }

  async getFirstProductTitle(): Promise<string | null> {
    return this.firstProduct.locator('h3').textContent();
  }

  async clickFirstProduct(): Promise<void> {
    await this.firstProduct.click();
  }

  async adjustPriceFilter(minPrice: number, maxPrice: number): Promise<void> {
    await this.page.locator('.price_slider_wrapper').scrollIntoViewIfNeeded();

    // Set the hidden input values for the price filter via JavaScript
    // (the inputs are not directly interactable as they are managed by the jQuery UI slider)
    await this.page.evaluate(
      ({ min, max }) => {
        const minInput = document.querySelector('#min_price') as HTMLInputElement;
        const maxInput = document.querySelector('#max_price') as HTMLInputElement;
        if (minInput) minInput.value = String(min);
        if (maxInput) maxInput.value = String(max);
      },
      { min: minPrice, max: maxPrice },
    );
  }

  async clickFilterButton(): Promise<void> {
    await this.filterButton.click();
    await this.page.waitForLoadState('load');
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.product .price .woocommerce-Price-amount').allTextContents();
    return priceTexts.map((text) => parseFloat(text.replace(/[^\d.]/g, '')));
  }
}
