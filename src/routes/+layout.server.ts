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
import jsdom from 'jsdom';
import type { GraphData } from "$lib";
import type { Config } from "$lib/types";

export const prerender = true;

export const load: LayoutServerLoad = async () => {
    const rawPosts = Object.entries(import.meta.glob<any>('../../posts/**.md', { query: '?raw' }),);

    const getSlug = (fileName: string): string => {
        return fileName.replace('.md', '').replace('../../posts/', '');
    }

    const posts = await Promise.all(rawPosts.map(async ([fileName, file], idx) => {
        const content = (await file()).default;
        const slug = getSlug(fileName);

        const processor = unified()
            .use(remarkParse)
            .use(remarkWikiLink,
                {
                    pathFormat: 'obsidian-short',
                    permalinks: getPermalinks("posts"),
                    hrefTemplate: (permalink: string) => {
                        if (permalink.endsWith(".excalidraw")) {
                            const link = permalink.split("posts/").pop();
                            return `/excalidraw/${link!.split(".excalidraw")[0]}`;
                        }

                        return permalink.split("posts").pop()!.toString();
                    }
                }
            )
            .use(remarkMath)
            .use(remarkToc)
            .use(remarkRehype)
            .use(rehypeKatex)
            // FIXME: https://github.com/remcohaszing/remark-mermaidjs/issues/3
            // .use(rehypeMermaid, {
            //     strategy: 'img-svg'
            //     // strategy: 'pre-mermaid'
            // })
            .use(rehypePrettyCode, { theme: "tokyo-night", keepBackground: true })
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings)
            .use(inspectUrls, {
                inspectEach({ url, propertyName, node }) {
                    if (node.tagName === 'img' && propertyName === 'src') {
                        console.log(url)
                    }
                }
            })
            .use(rehypeStringify);

        const md = await processor.process(content)

        const parser = new jsdom.JSDOM(md.toString());
        const document = parser.window.document;
        const headingNodes = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headings = Array.from(headingNodes).map((heading) => ({
            level: parseInt(heading.tagName.substring(1), 10),
            text: heading.textContent || '',
            url: `#${heading.id}`,
        }));

        return {
            content: md.toString(),
            headings,
            fileName,
            slug,
        }
    }))

    const postNodes = posts.map((post) => {
        const slug = getSlug(post.fileName);
        return { id: slug, label: slug, url: `/${slug}` };
    })
    const headingNodes = posts.map((post) => {
        return post.headings.map((heading) => {
            return {
                id: heading.url,
                label: heading.text,
                url: `/${post.slug}${heading.url}`
            }
        });
    }).flat();
    const nodes = [...postNodes, ...headingNodes];
    const links = posts.map((post) => {
        const slug = getSlug(post.fileName);

        return post.headings.map((heading) => {
            return {
                source: slug,
                target: heading.url,
            }
        })
    }).flat();

    const graphData = {
        nodes,
        links,
    } satisfies GraphData;

    return {
        posts: Promise.all(posts),
        files: rawPosts.map(([fileName]) => getSlug(fileName)),
        config: config as Config,
        graphData: graphData,
    };
};
