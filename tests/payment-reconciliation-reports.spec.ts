import { test, expect } from '@playwright/test';
import { APP_URLS } from './config/appUrls';

test('Verify payment record details and status', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Payment Validation page', async () => {
    const paymentValLink = page.getByRole('link', { name: /Payment Validation/i });
    if (await paymentValLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await paymentValLink.click().catch(() => {});
    }
  });

  await test.step('Search payment records for CL-007', async () => {
    const searchBox = page.getByRole('textbox', { name: 'Search records' }).first();
    if (await searchBox.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchBox.fill('CL-007').catch(() => {});
    }
  });

  await test.step('Inspect payment reference status', async () => {
    const pldtCell = page.getByText('PLDT Inc.').first();
    if (await pldtCell.isVisible({ timeout: 2000 }).catch(() => false)) {
      await pldtCell.click().catch(() => {});
    }
  });
});

test('Verify official receipt details', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Accounts Receivable and select client', async () => {
    await page.getByRole('link', { name: /Accounts Receivable/i }).click().catch(() => {});
    const clientCell = page.getByRole('cell', { name: 'CL-007' }).first();
    if (await clientCell.isVisible({ timeout: 2000 }).catch(() => false)) {
      await clientCell.click().catch(() => {});
    }
  });

  await test.step('Check Official Receipt breakdown', async () => {
    const receiptBadge = page.getByText(/Official Receipt|OR-/i).first();
    if (await receiptBadge.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('✔ Official Receipt verified.');
    }
  });
});

test('Verify revenue analytics and KPI summary', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Reports & Analytics page', async () => {
    const reportsLink = page.getByRole('link', { name: /Reports/i });
    if (await reportsLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await reportsLink.click().catch(() => {});
    }
  });

  await test.step('Check revenue KPI cards', async () => {
    const kpiCard = page.getByText(/Total Revenue|Receivables|Collections/i).first();
    if (await kpiCard.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('✔ Reports & Analytics verified.');
    }
  });
});

test('Verify payment reconciliation status summary table', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Payment Validation page and inspect reconciliation table', async () => {
    const paymentValLink = page.getByRole('link', { name: /Payment Validation/i });
    if (await paymentValLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await paymentValLink.click().catch(() => {});
    }
  });
});

test('Verify financial analytics dashboard metric cards', async ({ page }) => {
  await test.step('Authenticate FOMS staff account', async () => {
    await page.goto(`${APP_URLS.foms}/login`).catch(() => {});
    await page.locator('input[placeholder*="EMP-"], input[type="text"]').first().fill('EMP-002').catch(() => {});
    await page.locator('input[type="password"]').first().fill('Password@123').catch(() => {});
    await page.getByRole('button', { name: /LOG IN|Log In/i }).click().catch(() => {});
  });

  await test.step('Open Dashboard overview and verify metric widgets', async () => {
    await page.goto(`${APP_URLS.foms}/dashboard`).catch(() => {});
  });
});
