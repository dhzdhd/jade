import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { Config } from '@sveltejs/kit';
import cfg from './.config/config.ts';

const config: Config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		},
		router: {
			resolution: 'server'
		}
	},
	paths: {
		base: cfg.basePath ?? ''
	},
	extensions: ['.svelte', '.md']
};

export default config;
