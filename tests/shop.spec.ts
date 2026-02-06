import { expect, test } from '@playwright/test';
import { ShopPage } from '../pages/shop.page';

let shopPage: ShopPage;

test.describe('Shop', () => {
  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    await shopPage.visit();
  });

  test('opens a product from shop and shows only selected product details', async ({ page }) => {
    await shopPage.checkFirstProductTitle();
  });
});
