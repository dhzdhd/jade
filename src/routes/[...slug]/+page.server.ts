import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

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
    // return { posts, slug }
}
