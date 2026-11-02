import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const demo = '?world=desktop&persona=maya&theme=light';
const sample = fileURLToPath(new URL('../examples/review-vault/', import.meta.url));
const files = ['Home.md', 'Profile.md', 'Current Focus.md', 'Projects/Community Map.md', 'People/Alex Chen.md'];

async function fixtureHashes() {
  return Promise.all(files.map(async (name) => [
    name,
    createHash('sha256').update(await readFile(new URL('../examples/review-vault/' + name, import.meta.url))).digest('hex'),
  ]));
}

test('a rendered project can be traced to its Markdown and provenance', async ({ page }) => {
  await page.goto(demo);
  const project = page.getByRole('dialog', { name: 'Ubud Retreat Week.md', exact: true });
  await expect(project.getByRole('progressbar', { name: 'Ubud Retreat Week progress', exact: true }))
    .toHaveAttribute('aria-valuenow', '45');
  await project.getByRole('button', { name: 'View the Markdown source, Ubud Retreat Week.md', exact: true }).click();
  const source = page.getByRole('dialog', { name: 'Source of Ubud Retreat Week', exact: true });
  await source.getByRole('tab', { name: 'Markdown', exact: true }).click();
  const markdown = source.getByRole('tabpanel', { name: 'Markdown', exact: true });
  await expect(markdown).toContainText(/progress:\s*45/);
  await expect(markdown).toContainText(/provenance:\s*fictional/);
  await expect(markdown).toContainText('[[Island Atlas Travel]]');
});

test('changing worlds retains the demo life and a dark preference survives reload', async ({ page }) => {
  await page.goto(demo);
  await page.getByRole('radio', { name: 'Editorial', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Welcome back, Maya', exact: true })).toBeVisible();
  await expect(page.getByRole('complementary', { name: 'Maya OS contents', exact: true })).toBeVisible();
  await page.getByRole('radio', { name: 'Dark', exact: true }).click();
  await expect(page).toHaveURL(/theme=dark/);
  // Remove the URL's theme override; reload must recover the locally saved choice.
  await page.goto('?world=editorial&persona=maya');
  await expect(page.getByRole('radio', { name: 'Dark', exact: true })).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByRole('heading', { name: 'Welcome back, Maya', exact: true })).toBeVisible();
});

test('the synthetic folder imports and its project is searchable while offline', async ({ page, context }) => {
  const before = await fixtureHashes();
  // Exercise the real HTML directory-input fallback. Native directory permissions are separate.
  await page.addInitScript(() => { delete window.showDirectoryPicker; });
  await page.goto(demo);
  await page.getByRole('button', { name: 'Add your life', exact: true }).click();
  const setup = page.getByRole('dialog', { name: 'Set up your Life OS', exact: true });
  await setup.getByRole('button', { name: 'I already have a vault', exact: true }).click();
  await context.setOffline(true);
  const chooserEvent = page.waitForEvent('filechooser');
  await setup.getByRole('button', { name: 'Choose a vault folder', exact: true }).click();
  await (await chooserEvent).setFiles(sample);
  await expect(setup).toContainText('5 notes and 0 images');
  await setup.getByRole('button', { name: 'Open my Life OS', exact: true }).click();
  await expect(page.getByRole('main', { name: 'Rowan OS desktop', exact: true })).toBeVisible();
  await page.keyboard.press('Control+k');
  const search = page.getByRole('dialog', { name: 'Search Rowan OS', exact: true });
  await search.getByRole('combobox').fill('Community Map');
  await search.getByRole('option', { name: /^Community Map Project Projects\/Community Map\.md Fictional(?: |$)/ }).click();
  const project = page.getByRole('dialog', { name: 'Community Map.md', exact: true });
  await expect(project.getByRole('heading', { name: 'Community Map', exact: true })).toBeVisible();
  await expect(project.getByRole('progressbar', { name: 'Community Map progress', exact: true }))
    .toHaveAttribute('aria-valuenow', '25');
  await expect(project).toContainText('Alex Chen');
  expect(await fixtureHashes()).toEqual(before);
});
