import jsdom from 'jsdom';
import type { Heading } from './post';
import remarkWikiLink, {
	getPermalinks
} from '@portaljs/remark-wiki-link';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import inspectUrls from '@jsdevtools/rehype-url-inspector';
import config from '../../.config/config';
import type { Config } from './config';
import rehypeMermaid from 'rehype-mermaid';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeSwapCodeWithImage, {
	type RehypeCodeSwapOptions
} from './rehype-code-swap';
import { h } from 'hastscript';
import fs from 'node:fs';
import { fromHtml } from 'hast-util-from-html';
import path from 'node:path';
import toml from 'toml';
import yaml from 'yaml';

export function generateHeadings(content: string): Heading[] {
	const parser = new jsdom.JSDOM(content.toString());
	const document = parser.window.document;
	const headingNodes = document.querySelectorAll(
		'h1, h2, h3, h4, h5, h6'
	);

	return Array.from(headingNodes).map((heading) => ({
		level: parseInt(heading.tagName.substring(1), 10),
		text: heading.textContent || '',
		url: `#${heading.id}`
	}));
}

export function isFileIndex(fileName: string): boolean {
	const fileBaseName = path
		.basename(fileName)
		.replace(path.extname(fileName), '');
	return ['index', 'landing'].includes(fileBaseName.toLowerCase());
}

export async function generateMarkdownPost(
	content: string
): Promise<any> {
	const cfg = config as Config;
	const links: string[] = [];
	let frontmatter: Record<string, object> | undefined;

	const processor = unified()
		.use(remarkParse)
		.use(remarkWikiLink, {
			pathFormat: 'obsidian-short',
			permalinks: getPermalinks('posts'),
			hrefTemplate: (permalink: string) =>
				permalink.split('posts').pop() ?? '/'
		})
		.use(remarkMath)
		.use(remarkToc)
		.use(remarkFrontMatter, ['toml', 'yaml'])
		.use(function () {
			return function (tree) {
				const frontmatterObj = (tree as any)['children']
					.filter((e: any) => e.type === 'yaml' || e.type === 'toml')
					.at(0);

				if (typeof frontmatterObj === 'undefined') {
					return;
				}

				try {
					if (frontmatterObj.type === 'toml') {
						frontmatter = toml.parse(frontmatterObj.value);
					} else {
						frontmatter = yaml.parse(frontmatterObj.value);
					}
				} catch (err) {
					console.error(
						`Failed to parse frontmatter for content -\n\t${content.substring(0, 25)}`
					);
				}
			};
		})
		.use(remarkGfm)
		.use(remarkDirective)
		.use(remarkRehype)
		.use(rehypeSwapCodeWithImage, {
			transform(code, lang) {
				if (lang === 'handdrawn-ink') {
					try {
						const codeJson = JSON.parse(code);
						const filePath = codeJson['filepath'];

						const svg = fs.readFileSync(
							`posts/${filePath}.svg`,
							'utf-8'
						);

						const tree = fromHtml(svg.trim(), { fragment: true });
						const svgElement = tree.children[0];

						return h('div', { class: 'svg-block' }, [svgElement]);
					} catch (err) {
						console.log(err);
						console.log('Failed to parse Ink drawing');
					}
				}
			}
		} as RehypeCodeSwapOptions)
		.use(rehypeKatex)
		.use(rehypeMermaid, {
			strategy: 'pre-mermaid'
		})
		.use(rehypePrettyCode, {
			theme: cfg.codeblockTheme ?? 'tokyo-night',
			keepBackground: true
		})
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings)
		.use(rehypeGithubAlerts, {})
		.use(inspectUrls, {
			inspectEach({ url }) {
				links.push(url);
			}
		})
		.use(rehypeStringify);

	const md = await processor.process(content);
	const headings = generateHeadings(md.toString());

	return {
		md,
		headings,
		links,
		frontmatter
	};
}
