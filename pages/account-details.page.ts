import { Locator, Page } from '@playwright/test';

export class AccountDetailsPage {
  constructor(private readonly page: Page) {}

  private get saveChangesButton(): Locator {
    return this.page.getByRole('button', { name: 'Save changes' });
  }

  private get firstNameField(): Locator {
    return this.page.locator('#account_first_name');
  }

  private get lastNameField(): Locator {
    return this.page.locator('#account_last_name');
  }

  async visit(): Promise<void> {
    await this.page.goto('/my-account/edit-account/');
    await this.firstNameField.waitFor({ state: 'visible' });
  }

  async getFirstName(): Promise<string> {
    return this.firstNameField.inputValue();
  }

  async getLastName(): Promise<string> {
    return this.lastNameField.inputValue();
  }

  async updateName(firstName: string, lastName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.saveChanges();
  }

  async saveChanges(): Promise<void> {
    await this.saveChangesButton.click();
    await this.page.waitForLoadState('load');
  }
}
