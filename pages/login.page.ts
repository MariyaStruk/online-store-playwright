import { Locator, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

    private get loginBlock(): Locator {
      return this.page.locator('#customer_login .login');
    }

    private get userNameField(): Locator {
      return this.loginBlock.getByLabel('Username or email address');
    }

    private get passwordField(): Locator {
      return this.loginBlock.getByLabel('Password');
    }

    async visit(): Promise<void> {
      await this.page.goto('/');
      await this.page.getByRole('link', { name: 'My Account' }).click();
    }

    async login(userName: string, password: string): Promise<void> {
      await this.userNameField.fill(userName);
      await this.passwordField.fill(password);
      await this.loginBlock.getByRole('button', { name: 'Login' }).click();
    }
}