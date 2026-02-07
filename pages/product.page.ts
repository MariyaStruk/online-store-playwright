import { Locator, Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async getProductTitle(): Promise<string | null> {
    return this.page.locator('h1').textContent();
  }
}
