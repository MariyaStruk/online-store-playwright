import { expect, test } from '@playwright/test';
import { ShopPage } from '../pages/shop.page';
import { CartPage } from '../pages/cart.page';

let shopPage: ShopPage;
let cartPage: CartPage;

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    cartPage = new CartPage(page);
    await shopPage.visit();
  });

  test('adds two products to cart and verifies cart total', async () => {
    const price1 = await shopPage.getProductPrice(0);
    await shopPage.addProductToCart(0);

    const price2 = await shopPage.getProductPrice(1);
    await shopPage.addProductToCart(1);

    await cartPage.visit();
    const subtotal = await cartPage.getSubtotal();

    expect(subtotal).toBeCloseTo(price1 + price2, 2);
  });
});
