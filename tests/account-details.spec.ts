import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountDetailsPage } from '../pages/account-details.page';
import users from '../fixtures/users.json';

let loginPage: LoginPage;
let accountDetailsPage: AccountDetailsPage;

test.describe('Account Details', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();

    const { userName, password } = users.valid;
    await loginPage.login(userName, password);
    await page.waitForTimeout(1000);

    accountDetailsPage = new AccountDetailsPage(page);
  })

  test('updates user credentials', async () => {
    const newFirstName = 'Mariia';
    const newLastName = 'Struk';

    await accountDetailsPage.visit();
    const originalFirstName = await accountDetailsPage.getFirstName();
    const originalLastName = await accountDetailsPage.getLastName();

    await accountDetailsPage.updateName(newFirstName, newLastName);

    await accountDetailsPage.visit();
    expect.soft(await accountDetailsPage.getFirstName()).toBe(newFirstName);
    expect.soft(await accountDetailsPage.getLastName()).toBe(newLastName);

    await accountDetailsPage.updateName(originalFirstName, originalLastName);
  })
})
