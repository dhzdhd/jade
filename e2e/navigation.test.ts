import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
	test('should handle 404 page', async ({ page }) => {
		await page.goto('/random-garbage-link');

		await expect(page.getByRole('complementary')).toBeVisible();
		await expect(page.getByText('Jade Toggle theme')).toBeVisible();
		await expect(
			page.getByRole('button', { name: 'Toggle file tree button' })
		).toBeVisible();
		await expect(page.locator('h1')).toContainText('404');
	});

	test('should navigate to a post route successfully with reload check', async ({
		page
	}) => {
		await page.goto('/');
		await page
			.getByRole('button', { name: 'Toggle file tree button' })
			.click();
		await page
			.getByRole('link', { name: 'Shaders and Textures' })
			.click();

		await expect(
			page.getByRole('heading', { name: 'Shaders and Textures' })
		).toBeVisible();
		await expect(
			page
				.getByLabel('breadcrumb')
				.getByRole('link', { name: 'Shaders and Textures' })
		).toBeVisible();
		await expect(page.getByText('Jade Toggle theme')).toBeVisible();
		await expect(
			page.getByRole('button', { name: 'Toggle file tree button' })
		).toBeVisible();
		await expect(
			page.getByRole('button', { name: 'Toggle table of contents' })
		).toBeVisible();
		await expect(
			page
				.getByRole('complementary')
				.filter({ hasText: 'Ink Sample Note Shaders and' })
		).toBeVisible();

		await page.goto('/Shaders%20and%20Textures');

		await expect(
			page.getByRole('heading', { name: 'Shaders and Textures' })
		).toBeVisible();
		await expect(
			page
				.getByLabel('breadcrumb')
				.getByRole('link', { name: 'Shaders and Textures' })
		).toBeVisible();
		await expect(page.getByText('Jade Toggle theme')).toBeVisible();
		await expect(
			page.getByRole('button', { name: 'Toggle file tree button' })
		).toBeVisible();
		await expect(
			page.getByRole('button', { name: 'Toggle table of contents' })
		).toBeVisible();
		await expect(
			page
				.getByRole('complementary')
				.filter({ hasText: 'Ink Sample Note Shaders and' })
		).toBeVisible();
	});
});
