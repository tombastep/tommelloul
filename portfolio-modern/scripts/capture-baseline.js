const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const viewports = [
  { width: 375, height: 667, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1920, height: 1080, name: 'desktop' }
];

const sections = [
  { name: 'home', url: 'https://tommelloul.com/#home' },
  { name: 'about', url: 'https://tommelloul.com/#about' },
  { name: 'animism', url: 'https://tommelloul.com/#animism' },
  { name: 'wendy', url: 'https://tommelloul.com/#wendy' },
  { name: 'evo', url: 'https://tommelloul.com/#evo' },
  { name: 'eaaa', url: 'https://tommelloul.com/#eaaa' },
  { name: 'mist', url: 'https://tommelloul.com/#mist' },
  { name: 'umaguti', url: 'https://tommelloul.com/#umaguti' },
  { name: 'clear-studio', url: 'https://tommelloul.com/#clear-studio' },
  { name: 'hs-building', url: 'https://tommelloul.com/#hs-building' },
  { name: 'neot-shamir', url: 'https://tommelloul.com/#neot-shamir' }
];

async function captureBaseline() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  // Create baseline directory
  const baselineDir = path.join(__dirname, '..', 'tests', 'baseline');
  if (!fs.existsSync(baselineDir)) {
    fs.mkdirSync(baselineDir, { recursive: true });
  }

  for (const viewport of viewports) {
    console.log(`Capturing ${viewport.name} viewport...`);
    
    for (const section of sections) {
      console.log(`  Capturing ${section.name}...`);
      
      const page = await context.newPage();
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      try {
        await page.goto(section.url, { waitUntil: 'networkidle', timeout: 30000 });
        
        // Wait for any animations to complete
        await page.waitForTimeout(2000);
        
        // Take screenshot
        const screenshotPath = path.join(baselineDir, `${section.name}-${viewport.name}.png`);
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: true,
          animations: 'disabled'
        });
        
        console.log(`    Saved: ${screenshotPath}`);
      } catch (error) {
        console.error(`    Error capturing ${section.name}:`, error.message);
      } finally {
        await page.close();
      }
    }
  }
  
  await browser.close();
  console.log('Baseline capture complete!');
}

captureBaseline().catch(console.error);
