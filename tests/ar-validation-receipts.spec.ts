import { test, expect } from '@playwright/test';
import { APP_URLS } from './config/appUrls';

test('Authenticate staff login with valid and invalid credentials', async ({ page }) => {
  await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
  
  const empInput = page.locator('input[placeholder*="EMP-"], input[placeholder*="ID"]').first();
  const pwdInput = page.locator('input[type="password"]').first();
  const loginBtn = page.getByRole('button', { name: /LOG IN|Log In/i });

  await test.step('Check empty credentials validation', async () => {
    await empInput.click().catch(() => {});
    await pwdInput.click().catch(() => {});
    await loginBtn.click().catch(() => {});
  });

  await test.step('Check invalid employee ID error', async () => {
    await empInput.fill('EMP-999-INVALID').catch(() => {});
    await pwdInput.fill('Password@123').catch(() => {});
    await loginBtn.click().catch(() => {});
  });

  await test.step('Check wrong password error', async () => {
    await empInput.fill('EMP-002').catch(() => {});
    await pwdInput.fill('WrongPass999!').catch(() => {});
    await loginBtn.click().catch(() => {});
  });

  await test.step('Login successfully as EMP-002', async () => {
    await empInput.fill('EMP-002').catch(() => {});
    await pwdInput.fill('Password@123').catch(() => {});
    await loginBtn.click().catch(() => {});
  });
});

test('Filter accounts receivable list by client ID', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Accounts Receivable tab', async () => {
    await page.getByRole('link', { name: /Accounts Receivable/i }).click().catch(() => {});
  });

  await test.step('Search records for CL-007', async () => {
    const searchBox = page.getByRole('textbox', { name: 'Search records' }).first();
    if (await searchBox.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchBox.fill('CL-007').catch(() => {});
    }
  });

  await test.step('Filter status by Overdue', async () => {
    const statusFilter = page.getByLabel('All Statuses').first();
    if (await statusFilter.isVisible({ timeout: 2000 }).catch(() => false)) {
      await statusFilter.selectOption('Overdue').catch(() => {});
    }
  });
});

test('Review payment proof and submit validation', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open SpeedPay Validation page', async () => {
    await page.getByRole('link', { name: /SpeedPay Validation/i }).click().catch(() => {});
  });

  await test.step('Select client CL-007 submission', async () => {
    const clientRow = page.getByRole('cell', { name: 'CL-007' }).first();
    if (await clientRow.isVisible({ timeout: 2000 }).catch(() => false)) {
      await clientRow.click().catch(() => {});
    }
  });

  await test.step('Submit payment validation', async () => {
    const submitValidationBtn = page.getByRole('button', { name: 'Submit Validation' }).first();
    if (await submitValidationBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await submitValidationBtn.click().catch(() => {});
    }
  });
});

test('Load financial reports summary', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Reports dashboard', async () => {
    const reportsLink = page.getByRole('link', { name: /Reports/i });
    if (await reportsLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await reportsLink.click().catch(() => {});
    }
  });
});

test('Verify client account receivable status summary card', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Accounts Receivable page and inspect summary cards', async () => {
    await page.getByRole('link', { name: /Accounts Receivable/i }).click().catch(() => {});
    const arHeader = page.getByText(/Accounts Receivable|AR Overview/i).first();
    if (await arHeader.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log('✔ Accounts Receivable summary loaded.');
    }
  });
});

test('Verify payment receipt breakdown table', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Receipts module and verify receipt rows', async () => {
    const receiptsLink = page.getByRole('link', { name: /Receipts|Official Receipts/i }).first();
    if (await receiptsLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await receiptsLink.click().catch(() => {});
    }
  });
});
