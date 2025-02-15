export const prerender = true;

import { compile, type MdsvexCompileOptions } from "mdsvex";
import type { LayoutServerLoad } from "./$types";
import remarkWikiLink, { getPermalinks } from "@portaljs/remark-wiki-link";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import config from '../../.config/config';

export const load: LayoutServerLoad = async () => {
    const rawPosts = Object.entries(import.meta.glob<any>('../../posts/**.md', { eager: true, query: '?raw', }),);
    const mdsvexOptions: MdsvexCompileOptions = {
        remarkPlugins: [
            remarkMath, [
                remarkWikiLink,
                {
                    pathFormat: "obsidian-short",
                    permalinks: getPermalinks("./posts"),
                    hrefTemplate: (permalink: string) => {
                        if (permalink.endsWith(".excalidraw")) {
                            const link = permalink.split("posts/").pop();
                            return `/excalidraw/${link!.split(".excalidraw")[0]}`;
                        }

                        return permalink.split("src/posts").pop();
                    },
                },
            ],
        ],
        rehypePlugins: [rehypeKatex]
    };

    const getSlug = (fileName: string): string => {
        return fileName.replace('.md', '').replace('../../posts/', '');
    }

    const posts = await Promise.all(rawPosts.map(async ([fileName, file], idx) => {
        const content = file.default;

        const md = await compile(content, mdsvexOptions)
        console.log(JSON.stringify(md));

        const slug = getSlug(fileName);

        return {
            content: md,
            fileName,
            slug,
        }
    }))

    return {
        posts: posts,
        config: config,
    };
};
