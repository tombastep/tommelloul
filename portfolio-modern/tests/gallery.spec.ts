import { test, expect } from '@playwright/test';

test.describe('Gallery', () => {
  test('should open and close gallery modal', async ({ page }) => {
    await page.goto('/#animism');
    await page.waitForTimeout(1000);
    
    // Click on gallery thumbnail
    await page.click('#animism .grid .cursor-pointer:first-child');
    
    // Check if gallery modal is visible
    await expect(page.locator('.fixed.inset-0.bg-black\\/90')).toBeVisible();
    
    // Check if image is visible
    await expect(page.locator('.fixed.inset-0.bg-black\\/90 img[alt*="ANIMISM image"]')).toBeVisible();
    
    // Close gallery
    await page.click('button:has-text("×")');
    
    // Check if gallery modal is hidden
    await expect(page.locator('.fixed.inset-0.bg-black\\/90')).not.toBeVisible();
  });

  test('should navigate through gallery images', async ({ page }) => {
    await page.goto('/#animism');
    await page.waitForTimeout(1000);
    
    // Open gallery
    await page.click('#animism .grid .cursor-pointer:first-child');
    
    // Check if navigation arrows are visible
    await expect(page.locator('button:has-text("‹")')).toBeVisible();
    await expect(page.locator('button:has-text("›")')).toBeVisible();
    
    // Navigate to next image
    await page.click('button:has-text("›")');
    await page.waitForTimeout(500);
    
    // Check if image counter is updated
    await expect(page.locator('text=2 /')).toBeVisible();
    
    // Navigate to previous image
    await page.click('button:has-text("‹")');
    await page.waitForTimeout(500);
    
    // Check if image counter is back to 1
    await expect(page.locator('text=1 /')).toBeVisible();
  });

  test('should support keyboard navigation in gallery', async ({ page }) => {
    await page.goto('/#animism');
    await page.waitForTimeout(1000);
    
    // Open gallery
    await page.click('#animism .grid .cursor-pointer:first-child');
    
    // Press right arrow to go to next image
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    // Check if image counter is updated
    await expect(page.locator('text=2 /')).toBeVisible();
    
    // Press left arrow to go to previous image
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    
    // Check if image counter is back to 1
    await expect(page.locator('text=1 /')).toBeVisible();
    
    // Press Escape to close gallery
    await page.keyboard.press('Escape');
    
    // Check if gallery modal is hidden
    await expect(page.locator('.fixed.inset-0.bg-black\\/90')).not.toBeVisible();
  });
});
