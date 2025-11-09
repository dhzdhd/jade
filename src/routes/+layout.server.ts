import type { LayoutServerLoad } from './$types';
import config from '../../.config/config';
import {
	getSanitizedPath,
	generateIncrementalSlugs,
	type PostAndHeadingData
} from '$lib';
import type { Config } from '$lib/config';
import { generateGraphData } from '$lib/graph';
import { type Markdown, type Post } from '$lib/post';
import { decompressExcalidrawData } from '$lib/excalidraw';
import { generateFileProperties, parseBase } from '$lib/bases';
import { generateMarkdownPost } from '$lib/markdown';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const cfg = config as Config;
	const files = Object.entries(
		import.meta.glob<{ default: string }>('../../posts/**', {
			query: '?raw'
		})
	);

	const fileProperties = await generateFileProperties(files);

	const posts: Post[] = await Promise.all(
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
				const markdownPostData = await generateMarkdownPost(content);

				return {
					content: markdownPostData.md.toString(),
					data: {
						kind: 'markdown',
						headings: markdownPostData.headings,
						links: markdownPostData.links
					},
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
			} else if (
				fileName.endsWith('.base.yml') ||
				fileName.endsWith('.base.yaml') ||
				fileName.endsWith('.base')
			) {
				parseBase(content);

				return {
					content: content,
					data: { kind: 'base', fileProperties },
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
		files: files.map(([fileName]) => getSanitizedPath(fileName)),
		config: cfg,
		graphData: graphData,
		postsAndHeadings: postsAndHeadings
	};
};
