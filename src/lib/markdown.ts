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

export async function generateMarkdownPost(content: string) {
	const cfg = config as Config;
	const links: string[] = [];

	const processor = unified()
		.use(remarkParse)
		.use(remarkWikiLink, {
			pathFormat: 'obsidian-short',
			permalinks: getPermalinks('posts'),
			hrefTemplate: (permalink: string) => {
				if (permalink.endsWith('.excalidraw')) {
					const link = permalink.split('posts/').pop();

					return link ?? '/';
				}

				return permalink.split('posts').pop()!.toString();
			}
		})
		.use(remarkMath)
		.use(remarkToc)
		.use(remarkFrontMatter)
		.use(remarkGfm)
		.use(remarkDirective)
		.use(remarkRehype)
		.use(rehypeKatex)
		// FIXME: https://github.com/remcohaszing/remark-mermaidjs/issues/3
		.use(rehypePrettyCode, {
			theme: cfg.codeblockTheme ?? 'tokyo-night',
			keepBackground: true
		})
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings)
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
		links
	};
}
