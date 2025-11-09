import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { getSanitizedPath, generateIncrementalSlugs } from '$lib';
import type { Post } from '$lib/post';

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

export const load: PageServerLoad<{
	post: Post;
	nextPost?: Post;
	previousPost?: Post;
}> = async ({ params, parent }) => {
	const slug = params.slug;
	const { posts } = await parent();

	const currentPost = posts
		.filter((post: Post) => post.slug === slug)
		.at(0);
	const postsWithinFolder = posts.filter((post: Post) =>
		post.incrementalSlugs.includes(slug)
	);

	if (!currentPost && postsWithinFolder.length === 0) {
		error(404, 'Page not found');
	}

	const previousPost: Post =
		posts[posts.map((post) => post.slug).indexOf(slug) - 1];
	const nextPost: Post =
		posts[posts.map((post) => post.slug).indexOf(slug) + 1];

	if (!currentPost) {
		return {
			post: {
				content: '',
				data: { kind: 'folder', posts: postsWithinFolder },
				fileName: slug,
				slug: slug,
				incrementalSlugs: generateIncrementalSlugs(slug)
			} satisfies Post
		};
	}

	return {
		post: currentPost satisfies Post,
		previousPost,
		nextPost
	};
};
