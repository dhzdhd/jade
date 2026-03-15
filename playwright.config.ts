import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: {
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	},
	testDir: 'e2e'
});
