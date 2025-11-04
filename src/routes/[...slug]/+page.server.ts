import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { getSanitizedPath, generateIncrementalSlugs } from '$lib';
import pkg from 'lz-string';

const { decompressFromBase64 } = pkg;

type MarkdownData = {
	type: 'markdown';
};
type ExcalidrawData = {
	type: 'excalidraw';
	excalidrawJson: string;
};
type BasesData = {
	type: 'base';
};
type JupyterData = {
	type: 'jupyter';
};
type FolderData = {
	type: 'folder';
};

type PostType =
	| MarkdownData
	| FolderData
	| ExcalidrawData
	| BasesData
	| JupyterData;

export const entries: EntryGenerator = async () => {
	const rawPosts = Object.entries(
		import.meta.glob<any>('../../../posts/**/*.md', { query: '?raw' })
	);

	const slugs = rawPosts
		.map(([fileName]) => getSanitizedPath(fileName))
		.flatMap((path) => generateIncrementalSlugs(path));
	const uniqueSlugs = [...new Set(slugs)];

	return uniqueSlugs.map((slug) => {
		return { slug };
	});
};

const DRAWING_COMPRESSED_REG =
	/(\n##? Drawing\n[^`]*(?:```compressed\-json\n))([\s\S]*?)(```\n)/gm;
function decompressExcalidrawData(content: string): string {
	const match = DRAWING_COMPRESSED_REG.exec(content);

	const encoded = match![2].replace(/[\r\n]/g, '');
	const json = decompressFromBase64(encoded);

	return json;
}

export const load: PageServerLoad<{}> = async ({
	params,
	parent
}) => {
	const slug = params.slug;
	const { posts } = await parent();

	const filteredPosts = posts.filter((post) => post.slug === slug);
	const postsWithinFolder = posts.filter((post) =>
		post.incrementalSlugs.includes(slug)
	);

	if (filteredPosts.length !== 1 && postsWithinFolder.length === 0) {
		error(404, 'Page not found');
	}

	if (
		['.base', '.base.yml', '.base.yaml'].some((x) => slug.endsWith(x))
	) {
		const post = Object.entries(
			import.meta.glob<any>(`../../../posts/**.excalidraw.md`, {
				query: '?raw'
			})
		).filter(
			([path, _fn]) => path === `../../../posts/${slug}.md`
		)[0];
	}

	if (slug.endsWith('.excalidraw')) {
		const post = Object.entries(
			import.meta.glob<any>(`../../../posts/**.excalidraw.md`, {
				query: '?raw'
			})
		).filter(
			([path, _fn]) => path === `../../../posts/${slug}.md`
		)[0];
		const content = (await post[1]()).default;

		const json = decompressExcalidrawData(content);
		return {
			posts: filteredPosts,
			allPosts: posts,
			slug: slug,
			postType: {
				type: 'excalidraw',
				excalidrawJson: json
			} satisfies ExcalidrawData
		};
	}

	if (filteredPosts.length === 0) {
		return {
			posts: postsWithinFolder,
			allPosts: posts,
			slug: slug,
			postType: { type: 'folder' } satisfies FolderData
		};
	}

	return {
		posts: filteredPosts,
		allPosts: posts,
		slug: slug,
		postType: { type: 'markdown' } satisfies MarkdownData
	};
};
