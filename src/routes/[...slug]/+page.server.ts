import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { getSanitizedPath, getSlugs } from '$lib';

export const entries: EntryGenerator = async () => {
    const rawPosts = Object.entries(import.meta.glob<any>('../../../posts/**.md', { query: '?raw' }));

    const slugs = rawPosts.map(([fileName]) => getSanitizedPath(fileName)).flatMap((path) => getSlugs(path));
    const uniqueSlugs = [...new Set(slugs)];

    return uniqueSlugs.map((slug) => {
        return { slug }
    })
};

export const load: PageServerLoad = async ({ params, parent }) => {
    const slug = params.slug
    const { posts } = await parent();

    const postsData = await posts;
    const filteredPosts = postsData.filter((post) => post.postSlug === slug);
    const postsWithinFolder = postsData.filter(post => post.slugs.includes(slug));

    if (filteredPosts.length !== 1 && postsWithinFolder.length === 0) {
        error(404, "Page not found");
    }

    if (filteredPosts.length === 0) {
        return {
            posts: postsWithinFolder,
            allPosts: postsData,
            isFolder: true,
            slug,
        };
    }

    return {
        posts: filteredPosts,
        allPosts: postsData,
        isFolder: false,
        slug,
    }
}
