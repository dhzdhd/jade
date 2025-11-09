import inspectUrls from '@jsdevtools/rehype-url-inspector';
import remarkWikiLink, {
	getPermalinks
} from '@portaljs/remark-wiki-link';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { parse } from 'yaml';
import remarkFrontMatter from 'remark-frontmatter';
import { statSync } from 'fs';
import { dirname, extname } from 'path';

export interface BaseCard {
	name: string;
	url: string;
	image: string;
}

export interface BaseData {
	cards: BaseCard[];
}

export interface BaseConfig {
	filters?: Filter;
	formulas?: Record<string, string>;
	properties?: FileProperties;
	views: View[];
}

export interface Sort {
	property: string;
	direction: string;
}

export interface View {
	type: 'table' | 'cards';
	name: string;
	limit?: number;
	filters?: Filter;
	order?: string[];
	sort?: Sort[];
	cardSize?: number;
	image?: string;
	imageFit?: string;
	imageAspectRatio?: number;
	rowHeight?: string;
}

export interface Filter {
	or: (Filter | string)[];
	and: (Filter | string)[];
	not: (Filter | string)[];
}

export interface FileProperties {
	ctime: string;
	ext: string;
	file: string;
	folder: string;
	links: string[];
	mtime: string;
	name: string;
	properties?: Record<string, any>;
	size: number;
}

export function parseBase(content: string): BaseConfig {
	const yaml: BaseConfig = parse(content) as BaseConfig;

	console.log(JSON.stringify(yaml, null, 3));

	return yaml;
}

export async function generateFileProperties(
	files: [
		string,
		() => Promise<{
			default: string;
		}>
	][]
): Promise<FileProperties[]> {
	const properties: FileProperties[] = await Promise.all(
		files.map(async ([fileName, file]) => {
			const content = (await file()).default;
			const links: string[] = [];
			let properties: Record<string, any> | undefined;

			const processor = unified()
				.use(remarkParse)
				.use(remarkWikiLink, {
					pathFormat: 'obsidian-short',
					permalinks: getPermalinks('posts'),
					hrefTemplate: (permalink: string) => {
						if (permalink.endsWith('.excalidraw')) {
							const link = permalink.split('posts/').pop();
							return `/excalidraw/${link!.split('.excalidraw')[0]}`;
						}

						return permalink.split('posts').pop()!.toString();
					}
				})
				.use(remarkFrontMatter)
				.use(function () {
					return function (tree: any) {
						const children: any[] | undefined = tree.children;

						const value = children
							?.filter((val) => val.type === 'yaml')
							?.map((val) => val.value)
							?.at(0);

						try {
							properties = parse(value);
						} catch (err) {
							console.error(
								`Could not parse frontmatter for file : ${fileName}`
							);
						}
					};
				})
				.use(remarkRehype)
				.use(inspectUrls, {
					inspectEach({ url }) {
						links.push(url);
					}
				})
				.use(rehypeStringify);

			const md = await processor.process(content);
			const pathFromRoot = fileName.replace(/^..\/..\//, '');
			const stats = statSync(pathFromRoot);
			const ext = extname(pathFromRoot);
			const folder = dirname(pathFromRoot);

			return {
				ctime: stats.ctime.toISOString(),
				ext: ext,
				file: md.toString(),
				folder: folder,
				links: links,
				mtime: stats.mtime.toISOString(),
				name: fileName,
				properties: properties,
				size: stats.size
			} satisfies FileProperties;
		})
	);

	return properties;
}
