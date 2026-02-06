import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import users from '../fixtures/users.json';

let loginPage: LoginPage;

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  })

  test('shows an error for invalid login credentials', async ({ page }) => {
    const { userName, password, error: notRegisteredError } = users.invalid;
    await loginPage.login(userName, password);
    await page.waitForTimeout(1000);
    await expect(page.locator('.woocommerce-error')).toContainText(notRegisteredError);
  })

  test('logs in successfully with valid credentials', async ({ page }) =>{
    const { userName, password} = users.valid;
    await loginPage.login(userName, password);
    await page.waitForTimeout(1000);
  })
})
