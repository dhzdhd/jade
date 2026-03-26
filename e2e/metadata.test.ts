import { expect, test } from '@playwright/test';

test.describe('Metadata', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should have lang attribute on html element', async ({
		page
	}) => {
		const html = page.locator('html');
		await expect(html).toHaveAttribute('lang');
	});

	test('should have title', async ({ page }) => {
		await expect(page).toHaveTitle('Jade');
	});

	test('should have icon', async ({ page }) => {
		const favicon = page.locator('link[rel~="icon"]');
		await expect(favicon).not.toHaveCount(0);

		const href = await favicon.first().getAttribute('href');
		expect(href).toBeTruthy();

		const response = await page.request.get(
			href!.startsWith('http')
				? href!
				: `/${href!.replace(/^\//, '')}`
		);
		expect(response.status()).toBe(200);
	});
});
