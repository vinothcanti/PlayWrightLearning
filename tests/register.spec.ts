import { test } from '../fixtures/baseTest';
import { RegisterPage } from '../pages/RegisterPage';
import { userData } from '../utils/testData';
import { generateUniqueEmail } from '../utils/dataGenerator';

test('User registration', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  const uniqueEmail = generateUniqueEmail();

  await registerPage.open();

  await registerPage.registerUser(
    userData.firstName,
    userData.lastName,
    uniqueEmail,
    userData.phone,
    userData.password
  );

  await registerPage.verifySuccess();
});