import type { BundledTheme } from 'shiki';

interface ConfigData {
	title: string;
	description: string;
	redirects: Record<string, string>;
	codeblockTheme: BundledTheme;
	basePath: string;
}
export type Config = Partial<ConfigData>;
