import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads
    await expect(page).toHaveTitle(/Tom Melloul/);
    
    // Check if the main title is visible
    await expect(page.locator('#home h1')).toContainText('Tom Melloul');
    
    // Check if the subtitle is visible
    await expect(page.locator('#home h3')).toContainText('Architect & Creative Coder');
    
    // Check if the About button is visible
    await expect(page.locator('#home .flex a[href="#about"]')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Click on About button
    await page.click('#home .flex a[href="#about"]');
    
    // Wait for scroll to complete
    await page.waitForTimeout(1000);
    
    // Check if we're in the about section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('should have working menu', async ({ page }) => {
    await page.goto('/');
    
    // Click on menu button
    await page.click('#Pages');
    
    // Check if menu is visible
    await expect(page.locator('#hiddenMenu')).toBeVisible();
    
    // Check if projects are listed
    await expect(page.locator('.menuItem')).toHaveCount(9);
    
    // Click on first project
    await page.click('.menuItem:first-child');
    
    // Check if menu closes
    await expect(page.locator('#hiddenMenu')).not.toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if content is still visible
    await expect(page.locator('#home h1')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check if content is still visible
    await expect(page.locator('#home h1')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check if content is still visible
    await expect(page.locator('#home h1')).toBeVisible();
  });
});
