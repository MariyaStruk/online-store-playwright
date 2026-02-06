import { expect, Locator, Page } from '@playwright/test';

export class ShopPage {
  constructor(private readonly page: Page) {}

  async visit(): Promise<void> {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Shop' }).click();
  }

  async checkFirstProductTitle(): Promise<void> {
    const firstProduct = await this.page.locator('.product').first();
    const productTitle = await firstProduct.locator('h3').textContent();
    await firstProduct.click();
    const openedProductTitle = await this.page.locator('h1').textContent();
    expect(openedProductTitle).toBe(productTitle);
  }
}
