import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import users from '../fixtures/users.json';

let loginPage: LoginPage;

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  })

  test('Login with incorrect user name and password', async ({ page }) => {
    const { userName, password, error: notRegisteredError } = users.invalid;
    await loginPage.login(userName, password);
    await page.waitForTimeout(1000);
    await expect(page.locator('.woocommerce-error')).toContainText(notRegisteredError);
  })

  test('Login with correct user name and password', async ({ page }) =>{
    const { userName, password} = users.valid;
    await loginPage.login(userName, password);
    await page.waitForTimeout(1000);
  })
})
