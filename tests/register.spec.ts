import { test, expect } from '@playwright/test';

// Add this to maximize window
test.use({
  launchOptions: {
    args: ['--start-maximized']
  }
});

test('Verify My Account and Register button', async ({ page }) => {
  await page.goto(
    'https://tutorialsninja.com/demo/index.php?route=account/register',
    { timeout: 60000, waitUntil: 'domcontentloaded' }
    
  );

  // Click header My Account only
  await page.locator('header, nav').first()
    .getByRole('link', { name: /My Account/i })
    .click();

  // Verify Register visible
  await expect(
    page.getByRole('link', { name: 'Register' }).first()
  ).toBeVisible();

   // Click Login from dropdown
  await page.locator('#top-links')
    .getByRole('link', { name: 'Login' })
    .click();

  // Enter login detail
  await page.getByLabel('E-Mail Address').fill('vinoth123test@gmail.com');
  await page.getByLabel('Password').fill('Vinoth@3532');

  // Click Login buttons
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login success
  await expect(
    page.getByRole('heading', { name: 'My Account' })
  ).toBeVisible();

  
  // Verify login success
  await expect(
    page.getByRole('heading', { name: 'My Account' })
  ).toBeVisible();
  
});