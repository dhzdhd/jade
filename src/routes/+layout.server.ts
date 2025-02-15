import { compile, type MdsvexCompileOptions } from "mdsvex";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const rawPosts = Object.entries(import.meta.glob<any>('../../posts/**.md', { eager: true, query: '?raw', }),);
    const mdsvexOptions: MdsvexCompileOptions = {
        remarkPlugins: [],
        rehypePlugins: []
    };

    const posts = rawPosts.map(async ([fileName, file], idx) => {
        const content = file.default;

        const md = await compile(content, mdsvexOptions)
        console.log(JSON.stringify(md));

        return {
            content: md
        }
    })

    return {
        posts: posts,
        message: "string"
    };
};
