import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async visit(): Promise<void> {
    await this.page.goto('/basket/');
  }

  private async getAmount(selector: string): Promise<number> {
    const text = await this.page.locator(selector).textContent();
    return parseFloat(text!.replace(/[^\d.]/g, ''));
  }

  async getSubtotal(): Promise<number> {
    return this.getAmount('.cart-subtotal .amount');
  }

  async getTotal(): Promise<number> {
    return this.getAmount('.order-total .amount');
  }
}
