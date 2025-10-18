import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all project sections', async ({ page }) => {
    await page.goto('/');
    
    const projects = [
      'animism',
      'wendy',
      'evo',
      'eaaa',
      'mist',
      'umaguti',
      'clear-studio',
      'hs-building',
      'neot-shamir'
    ];
    
    for (const projectId of projects) {
      // Navigate to project section
      await page.goto(`/#${projectId}`);
      await page.waitForTimeout(1000);
      
      // Check if project section is visible
      const projectSection = page.locator(`#${projectId}`);
      await expect(projectSection).toBeInViewport();
      
      // Check if project title is visible
      await expect(projectSection.locator('h1')).toBeVisible();
    }
  });

  test('should have working keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Press arrow down to go to next section
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    
    // Check if we're in the about section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
    
    // Press arrow up to go back to home
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(1000);
    
    // Check if we're back at home
    const homeSection = page.locator('#home');
    await expect(homeSection).toBeInViewport();
  });

  test('should update URL hash when navigating', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to about section
    await page.click('a[href="#about"]');
    await page.waitForTimeout(1000);
    
    // Check if URL hash is updated
    expect(page.url()).toContain('#about');
    
    // Navigate to a project
    await page.goto('/#animism');
    await page.waitForTimeout(1000);
    
    // Check if URL hash is updated
    expect(page.url()).toContain('#animism');
  });
});
