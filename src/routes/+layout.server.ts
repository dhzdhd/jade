import { type MdsvexCompileOptions } from "mdsvex";
import type { LayoutServerLoad } from "./$types";
import remarkWikiLink, { getPermalinks } from "@portaljs/remark-wiki-link";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import config from '../../.config/config';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import inspectUrls from "@jsdevtools/rehype-url-inspector";
import rehypeMermaid from "rehype-mermaid";

export const load: LayoutServerLoad = async () => {
    const rawPosts = Object.entries(import.meta.glob<any>('../../posts/**.md', { eager: true, query: '?raw', }),);
    const mdsvexOptions: MdsvexCompileOptions = {};

    const getSlug = (fileName: string): string => {
        return fileName.replace('.md', '').replace('../../posts/', '');
    }

    const posts = await Promise.all(rawPosts.map(async ([fileName, file], idx) => {
        const content = file.default;
        const slug = getSlug(fileName);

        const md = await unified()
            .use(remarkParse)
            .use(remarkWikiLink,
                //     {
                //     pathFormat: 'obsidian-short',
                //     permalinks: getPermalinks("../../posts"),
                //     hrefTemplate: (permalink: string) => {
                //         if (permalink.endsWith(".excalidraw")) {
                //             const link = permalink.split("posts/").pop();
                //             return `/excalidraw/${link!.split(".excalidraw")[0]}`;
                //         }

                //         return permalink.split("posts").pop()!.toString();
                //     }
                // }
            )
            .use(remarkMath)
            .use(remarkToc)
            .use(remarkRehype)
            .use(rehypeKatex)
            .use(rehypePrettyCode, { theme: "tokyo-night", keepBackground: true })
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings)
            .use(inspectUrls, {
                inspectEach({ url }) {
                    console.log(url);
                }
            })
            .use(rehypeMermaid)
            .use(rehypeStringify)
            .process(content)

        return {
            content: md.toString(),
            fileName,
            slug,
        }
    }))

    return {
        posts: posts,
        config: config,
    };
};
