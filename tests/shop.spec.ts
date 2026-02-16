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

  test('use category filtering', async () => {
    // Step 1: Check that shop page have products with different categories
    const allTitles = await shopPage.getAllProductTitles();
    const htmlTitles = await shopPage.getProductTitlesByCategory('html');
    const jsTitles = await shopPage.getProductTitlesByCategory('javascript');
    expect(htmlTitles.length).toBeGreaterThan(0);
    expect(jsTitles.length).toBeGreaterThan(0);
    expect(htmlTitles.length + jsTitles.length).toBeLessThanOrEqual(allTitles.length);

    // Step 2: Click on HTML category
    await shopPage.clickCategoryFilter('HTML');

    // Step 3: Check that all products have HTML category
    const displayedAfterHtml = await shopPage.getAllProductTitles();
    expect(displayedAfterHtml).toEqual(expect.arrayContaining(htmlTitles));
    expect(displayedAfterHtml.length).toBe(htmlTitles.length);

    // Step 4: Check that not displayed products does not have HTML category
    const notDisplayedHtml = allTitles.filter((t) => !displayedAfterHtml.includes(t));
    for (const title of notDisplayedHtml) {
      expect(htmlTitles).not.toContain(title);
    }

    // Step 5: Click on JavaScript category
    await shopPage.visit();
    await shopPage.clickCategoryFilter('JavaScript');

    // Step 6: Check that all products have JavaScript category
    const displayedAfterJs = await shopPage.getAllProductTitles();
    expect(displayedAfterJs).toEqual(expect.arrayContaining(jsTitles));
    expect(displayedAfterJs.length).toBe(jsTitles.length);

    // Step 7: Check that not displayed products does not have JavaScript category
    const notDisplayedJs = allTitles.filter((t) => !displayedAfterJs.includes(t));
    for (const title of notDisplayedJs) {
      expect(jsTitles).not.toContain(title);
    }
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
