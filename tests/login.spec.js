const { test, expect } = require('@playwright/test');


test.describe('Login Tests', () => {
  const loginUrl = 'https://demo.haroldwaste.com/authentication';
  const email = 'qa@julesai.com';
  const validPassword = 'QaJULES2023!';
  const invalidPassword = 'WrongPassword123!';


  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });


  test('Successful login with valid credentials', async ({ page }) => {
    await page.goto(loginUrl);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', validPassword);
    await page.click('button[type="submit"]');


    await expect(page).toHaveURL('/purchases'); 
   
  });

  test('Failed login with invalid password', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', invalidPassword);
    await page.click('button[type="submit"]');

    
    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Invalid email or password'); 
  });


  test('Failed login with empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');


    const emailError = await page.locator("//div[@data-test-id='input-email']/following::div[1]").textContent();
    const passwordError = await page.locator("//div[@data-test-id='password']/following::div[1]").textContent();
    

    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText('Required'); 


    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText('Required'); 


  });
});