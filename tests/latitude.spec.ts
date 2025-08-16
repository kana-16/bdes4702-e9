import { test } from '@playwright/test';

const BASE = 'https://digitalhome.latitudecountertops.com';

test('latitude flow', async ({ page, isMobile }) => {
  if (isMobile == true) {
    test.skip();
  }

  // 1) Login
  await page.goto(`${BASE}/login/staff`, { timeout: 5000 });
  await page.fill('input[name="ID"], input[name="username"], input[type="text"]', 'SUPER');
  await page.fill('input[name="Password"], input[name="password"], input[type="password"]', 'JW1414');
  await page.click('button[type="submit"], input[type="submit"]');

  // 2) Accounts
  await page.waitForURL(`${BASE}/staff/accounts`, { timeout: 5000 });
  // await page.screenshot({ path: page.viewportSize()?.width + "_accounts.png" });

  // 3) Quotes / Jobs
  await page.click('text=Quotes / Jobs', { timeout: 5000 });
  await page.screenshot({ path: page.viewportSize()?.width + "_quotes_jobs.png" }); 

  // 4) Search SUNKIT
  await page.fill('input[name="q"]', 'SUNKIT', { timeout: 5000 }); 
  await page.keyboard.press('Enter');
  await page.screenshot({ path: page.viewportSize()?.width + "_quotes_jobs_search.png" }); 

  // 5) Job details
  await page.waitForSelector('text=View Job Details', { timeout: 5000 });
  await page.click('text=View Job Details');
  await page.screenshot({ path: page.viewportSize()?.width + "_job_details.png" });
});
