import type { LayoutServerLoad } from './$types';
import remarkWikiLink, {
	getPermalinks
} from '@portaljs/remark-wiki-link';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import config from '../../.config/config';
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
import {
	getSanitizedPath,
	generateIncrementalSlugs,
	type PostAndHeadingData
} from '$lib';
import type { Config } from '$lib/config';
import { generateGraphData } from '$lib/graph';
import {
	generateHeadings,
	type Markdown,
	type Post
} from '$lib/post';
import { decompressExcalidrawData } from '$lib/excalidraw';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const cfg = config as Config;
	const files = Object.entries(
		import.meta.glob<{ default: string }>('../../posts/**', {
			query: '?raw'
		})
	);

	const posts = await Promise.all(
		files.map(async ([fileName, file]) => {
			const content = (await file()).default;
			const slug = getSanitizedPath(fileName);
			const incrementalSlugs = generateIncrementalSlugs(slug);

			if (fileName.endsWith('.excalidraw.md')) {
				const json = decompressExcalidrawData(content);

				return {
					content: content,
					data: { kind: 'excalidraw', excalidrawJson: json },
					fileName,
					slug,
					incrementalSlugs
				} satisfies Post;
			} else if (fileName.endsWith('.md')) {
				const links: string[] = [];

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
						inspectEach({ url, propertyName, node }) {
							links.push(url);
						}
					})
					.use(rehypeStringify);

				const md = await processor.process(content);
				const headings = generateHeadings(md.toString());

				return {
					content: md.toString(),
					data: { kind: 'markdown', headings, links },
					fileName,
					slug,
					incrementalSlugs
				} satisfies Post;
			} else if (fileName.endsWith('.excalidraw')) {
				return {
					content: content,
					data: { kind: 'excalidraw', excalidrawJson: content },
					fileName,
					slug,
					incrementalSlugs
				} satisfies Post;
			} else {
				return {
					content: content,
					data: { kind: 'invalid' },
					fileName,
					slug,
					incrementalSlugs
				} satisfies Post;
			}
		})
	);

	const graphData = generateGraphData(posts);

	const postsAndHeadings: PostAndHeadingData[] = [
		...posts
			.filter((post) => post.data.kind === 'markdown')
			.map((post) => {
				return { title: post.slug, url: `/${post.slug}` };
			}),
		...posts
			.filter((post) => post.data.kind === 'markdown')
			.flatMap((post) => {
				const data = post.data as Markdown;
				return data.headings.map((heading) => {
					return {
						title: `${post.slug}${'#'.repeat(heading.level)}${heading.text}`,
						url: `/${post.slug}${heading.url}`
					};
				});
			})
	].sort() satisfies PostAndHeadingData[];

	return {
		posts: posts,
		files: files
			.filter(([filename]) => filename.endsWith('.md'))
			.map(([fileName]) => getSanitizedPath(fileName)),
		config: cfg,
		graphData: graphData,
		postsAndHeadings: postsAndHeadings
	};
};
