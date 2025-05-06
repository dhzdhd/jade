import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { getSanitizedPath, getSlugs } from '$lib';
import pkg from 'lz-string';

const { decompressFromBase64 } = pkg;

export const entries: EntryGenerator = async () => {
    const rawPosts = Object.entries(import.meta.glob<any>('../../../posts/**.md', { query: '?raw' }));

    const slugs = rawPosts.map(([fileName]) => getSanitizedPath(fileName)).flatMap((path) => getSlugs(path));
    const uniqueSlugs = [...new Set(slugs)];

    return uniqueSlugs.map((slug) => {
        return { slug }
    })
};

const DRAWING_COMPRESSED_REG =
    /(\n##? Drawing\n[^`]*(?:```compressed\-json\n))([\s\S]*?)(```\n)/gm;
function decompressExcalidrawData(content: string): string {
    const match = DRAWING_COMPRESSED_REG.exec(content);

    const encoded = match![2].replace(/[\r\n]/g, "");
    const json = decompressFromBase64(encoded);

    return json;
}

export const load: PageServerLoad = async ({ params, parent }) => {
    const slug = params.slug
    const { posts } = await parent();

    const postsData = await posts;
    const filteredPosts = postsData.filter((post) => post.postSlug === slug);
    const postsWithinFolder = postsData.filter(post => post.slugs.includes(slug));

    if (filteredPosts.length !== 1 && postsWithinFolder.length === 0) {
        error(404, "Page not found");
    }

    if (slug.endsWith('.excalidraw')) {
        const post = Object.entries(import.meta.glob<any>(`../../../posts/**.excalidraw.md`, { query: '?raw' }),).filter(([path, _fn]) => path === `../../../posts/${slug}.md`)[0];
        const content = (await post[1]()).default;

        const json = decompressExcalidrawData(content);
        return {
            posts: filteredPosts,
            allPosts: postsData,
            isFolder: false,
            slug,
            json,
        }
    }

    if (filteredPosts.length === 0) {
        return {
            posts: postsWithinFolder,
            allPosts: postsData,
            isFolder: true,
            slug,
            undefined,
        };
    }

    return {
        posts: filteredPosts,
        allPosts: postsData,
        isFolder: false,
        slug,
        undefined,
    }
}
