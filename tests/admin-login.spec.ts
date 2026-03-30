import { test, expect } from '@playwright/test';

test('admin login flow should succeed and redirect to dashboard', async ({ page }) => {
  // 1. Go to the login page
  await page.goto('/en/admin');

  // 2. Verify we are on the login form
  await expect(page.locator('text=Admin Secure Login')).toBeVisible();

  // 3. Fill the password
  await page.fill('input[name="password"]', 'ADMIN');

  // 4. Submit the form
  await page.click('button[type="submit"]');

  // Wait for the API call to complete
  await page.waitForResponse(response => response.url().includes('/api/admin/login') && response.status() === 200);

  // 5. Verify cookies to see if admin_auth was set BEFORE waiting for redirect
  const cookies = await page.context().cookies();
  console.log("Cookies just after submit:", cookies);
  
  // 6. Wait for the page to update after reload
  // We expect "Rewards Management" to become visible instead of the login form
  await expect(page.locator('text=Rewards Management')).toBeVisible({ timeout: 10000 });

  const authCookie = cookies.find(c => c.name === 'admin_auth');
  
  expect(authCookie).toBeDefined();
  expect(authCookie?.value).toBe('ADMIN');
});
