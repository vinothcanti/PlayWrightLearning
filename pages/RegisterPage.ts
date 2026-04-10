import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly telephone: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly privacyPolicy: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');
    this.email = page.getByLabel('E-Mail');
    this.telephone = page.getByLabel('Telephone');
    this.password = page.getByLabel('Password', { exact: true });
    this.confirmPassword = page.getByLabel('Password Confirm', { exact: true });
    this.privacyPolicy = page.locator('input[name="agree"]');
    this.submitButton = page.getByRole('button', { name: 'Continue' });
  }

  async open() {
    await this.page.goto('/demo/index.php?route=account/register', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await this.page.waitForLoadState('networkidle');
  }

  async registerUser(
    first: string,
    last: string,
    email: string,
    phone: string,
    password: string
  ) {
    await expect(this.firstName).toBeVisible({ timeout: 30000 });

    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.email.fill(email);
    await this.telephone.fill(phone);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.privacyPolicy.check();
    await this.submitButton.click();
  }

  async verifySuccess() {
    await expect(this.page).toHaveURL(/account\/success/);
    await expect(
      this.page.getByText('Your Account Has Been Created!')
    ).toBeVisible();
  }
}