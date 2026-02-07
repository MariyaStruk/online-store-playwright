import { expect, test } from '@playwright/test';
import { ShopPage } from '../pages/shop.page';
import { ProductPage } from '../pages/product.page';

let shopPage: ShopPage;
let productPage: ProductPage;

test.describe('Shop', () => {
  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productPage = new ProductPage(page);
    await shopPage.visit();
  });

  test('opens a product from shop and shows only selected product details', async () => {
    const expectedTitle = await shopPage.getFirstProductTitle();
    await shopPage.clickFirstProduct();
    const actualTitle = await productPage.getProductTitle();
    expect(actualTitle).toBe(expectedTitle);
  });

  test('filters products by price range 200 to 300', async () => {
    const minPrice = 200;
    const maxPrice = 300;

    await shopPage.adjustPriceFilter(minPrice, maxPrice);
    await shopPage.clickFilterButton();

    const prices = await shopPage.getAllProductPrices();

    expect(prices.length).toBeGreaterThan(0);
    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(minPrice);
      expect(price).toBeLessThanOrEqual(maxPrice);
    }
  });
});
