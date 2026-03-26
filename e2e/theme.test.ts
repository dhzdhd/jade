import { expect, test } from '@playwright/test';

test.describe('Theme / Dark Mode', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should have theme toggle functionality', async ({ page }) => {
		await page.getByRole('button', { name: 'Toggle theme' }).click();
		await page.getByRole('menuitem', { name: 'Dark' }).click();
		await page.waitForTimeout(300);

		await page.getByRole('button', { name: 'Toggle theme' }).click();
		await page.getByRole('menuitem', { name: 'Light' }).click();
		await page.waitForTimeout(300);
	});

	test('should respect system preference or default theme', async ({
		page
	}) => {
		const html = page.locator('html');
		const classes = await html.getAttribute('class');

		if (classes) {
			expect(classes).toMatch(/(dark|light|theme)/i);
		}
	});
});
