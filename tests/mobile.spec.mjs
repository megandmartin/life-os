import { test, expect } from '@playwright/test';

test('a phone user can open the demo and find a project without horizontal overflow', async ({ page }) => {
  await page.goto('?world=desktop&persona=maya&theme=light');
  const unlock = page.getByRole('button', { name: 'Open Maya OS', exact: true });
  await unlock.tap();
  await expect(unlock).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Good morning, Maya', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const search = page.getByRole('dialog', { name: 'Search Maya OS', exact: true });
  await search.getByRole('combobox').fill('Ubud Retreat Week');
  await search.getByRole('option', { name: /^Ubud Retreat Week Project 03 Projects\/Ubud Retreat Week\.md Fictional(?: |$)/ }).click();
  await expect(page.getByRole('heading', { name: 'Ubud Retreat Week', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
