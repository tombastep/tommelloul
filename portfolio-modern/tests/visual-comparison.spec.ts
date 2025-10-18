import { test, expect } from '@playwright/test';
import { projects } from '../src/lib/data';

const viewports = [
  { width: 375, height: 667, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1920, height: 1080, name: 'desktop' }
];

const sections = [
  { name: 'home', url: '/#home' },
  { name: 'about', url: '/#about' },
  ...projects.map(project => ({ name: project.id, url: `/#${project.id}` }))
];

test.describe('Visual Comparison', () => {
  viewports.forEach(viewport => {
    test.describe(`${viewport.name} viewport`, () => {
      sections.forEach(section => {
        test(`${section.name} section should match baseline`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.goto(section.url, { waitUntil: 'networkidle' });
          
          // Wait for animations to complete
          await page.waitForTimeout(2000);
          
          // Take screenshot and compare with baseline
          await expect(page).toHaveScreenshot(`${section.name}-${viewport.name}.png`, {
            fullPage: true,
            animations: 'disabled',
            threshold: 0.1, // 0.1% pixel difference threshold
            maxDiffPixels: 1000 // Allow up to 1000 different pixels
          });
        });
      });
    });
  });

  test.describe('Interactive states', () => {
    test('menu open state should match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      
      // Open menu
      await page.click('#Pages');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('menu-open-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        threshold: 0.1
      });
    });

    test('gallery lightbox should match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/#animism');
      
      // Open gallery
      await page.click('#animism .grid .cursor-pointer:first-child');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('gallery-lightbox-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        threshold: 0.1
      });
    });

    test('about accordion expanded should match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/#about');
      
      // Expand first accordion
      await page.click('.expandable button:first-child');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('about-accordion-expanded-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        threshold: 0.1
      });
    });
  });
});
