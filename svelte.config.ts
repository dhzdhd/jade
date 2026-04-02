import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { Config } from '@sveltejs/kit';
import cfg from './.config/config.ts';

const config: Config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		router: {
			resolution: 'server'
		},
		prerender: {
			entries: ['*'],
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			handleUnseenRoutes: 'warn'
		},
		paths: {
			base: cfg.basePath === undefined ? '' : `/${cfg.basePath}`
		}
	},
	extensions: ['.svelte', '.md']
};

export default config;
