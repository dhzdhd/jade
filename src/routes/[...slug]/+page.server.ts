import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
    const rawPosts = Object.entries(import.meta.glob<any>('../../../posts/**.md', { query: '?raw' }),);
    const getSlug = (fileName: string): string => {
        return fileName.replace('.md', '').replace('../../../posts/', '');
    }

    return rawPosts.map(([fileName]) => {
        return { slug: getSlug(fileName) }
    })
};

export const load: PageServerLoad = async ({ params, parent }) => {
    const slug = params.slug
    const { posts } = await parent();

    return posts.then((postsData) => {
        const post = postsData.filter((post) => post.slug === slug);

        if (post.length !== 1) {
            error(404, "Page not found");
        }

        return {
            post: post.at(0)!
        }
    });
}
