import { Locator, Page } from '@playwright/test';

export class ShopPage {
  constructor(private readonly page: Page) {}

  private get firstProduct(): Locator {
    return this.page.locator('.product').first();
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
}
