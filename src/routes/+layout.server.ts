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
import { getSanitizedPath, getSlugs, type GraphData, type PostAndHeadingData } from "$lib";
import type { Config } from "$lib/config";

export const prerender = true;

export const load: LayoutServerLoad = async () => {
    const cfg = config as Config;
    const files = Object.entries(import.meta.glob<any>('../../posts/**', { query: '?raw' }),);

    const posts = await Promise.all(files.filter(async ([filename]) => filename.endsWith('.md')).map(async ([fileName, file]) => {
        const content = (await file()).default;
        const slug = getSanitizedPath(fileName);
        const postSlugs = getSlugs(slug);

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
            .use(rehypePrettyCode, { theme: cfg.codeblockTheme ?? 'tokyo-night', keepBackground: true })
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings)
            .use(inspectUrls, {
                inspectEach({ url, propertyName, node }) {
                    if (node.tagName === 'img' && propertyName === 'src') {
                        // console.log(url)
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
            postSlug: slug,
            slugs: postSlugs,
        }
    }))

    const postNodes = posts.map((post) => {
        const slug = getSanitizedPath(post.fileName);
        return { id: slug, label: slug, url: `/${slug}` };
    })
    const headingNodes = posts.map((post) => {
        return post.headings.map((heading) => {
            return {
                id: `${post.postSlug}${heading.url}`,
                label: `${post.postSlug}#${heading.text}`,
                url: `/${post.postSlug}${heading.url}`
            }
        });
    }).flat();
    const nodes = [...postNodes, ...headingNodes];
    const links = posts.map((post) => {
        const slug = getSanitizedPath(post.fileName);

        return post.headings.map((heading) => {
            return {
                source: slug,
                target: `${post.postSlug}${heading.url}`,
            }
        })
    }).flat();

    const graphData = {
        nodes,
        links,
    } satisfies GraphData;

    const postsAndHeadings: PostAndHeadingData[] = [
        ...posts.map((post) => { return { title: post.postSlug, url: `/${post.postSlug}` } }),
        ...posts.flatMap((post) =>
            post.headings.map((heading) => {
                return {
                    title: `${post.postSlug}${'#'.repeat(heading.level)}${heading.text}`,
                    url: `/${post.postSlug}${heading.url}`,
                }
            })
        )
    ].sort() satisfies PostAndHeadingData[];

    return {
        posts: posts,
        files: files.map(([fileName]) => getSanitizedPath(fileName)),
        config: cfg,
        graphData: graphData,
        postsAndHeadings: postsAndHeadings,
    };
};
