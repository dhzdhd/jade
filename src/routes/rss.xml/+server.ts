import type { Config } from '$lib/config';
import { generateMarkdownPost } from '$lib/markdown';
import type { RequestHandler } from '@sveltejs/kit';
import config from '../../../.config/config';
import { getSanitizedPath } from '$lib';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const cfg = config as Config;
	const files = Object.entries(
		import.meta.glob<{ default: string }>('../../../posts/**', {
			query: '?raw'
		})
	).filter(([fileName, _]) => {
		return (
			fileName.endsWith('.md') && !fileName.endsWith('.excalidraw.md')
		);
	});

	const markdownFiles = await Promise.all(
		files.map(async ([fileName, file]) => {
			const content = (await file()).default;
			const slug = getSanitizedPath(fileName);

			const markdownObj = await generateMarkdownPost(content);
			return {
				slug: slug,
				...markdownObj
			};
		})
	);

	const feedTitle = cfg?.rss?.title ?? 'RSS Feed';
	const feedAuthor = cfg?.rss?.author ?? 'Jade';
	const feedDescription =
		cfg?.rss?.description ?? `RSS feed of ${feedAuthor}'s posts`;
	const feedLink = `${cfg?.rss?.origin ?? ''}/`;
	const feedUpdated = new Date().toISOString();

	const xml = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <link href="${feedLink}rss.xml" rel="self"/>
    <link href="${feedLink}">
    <id>${feedLink}</id>
    <updated>${feedUpdated}</updated>
    <author>
      <name>${feedAuthor}</name>
    </author>
    <subtitle>${feedDescription}</subtitle>
    <generator>TypeScript</generator>
${markdownFiles
	.map(
		(post: any, idx: number) => `    <entry>
        <title>${post?.frontmatter?.title ?? `Post ${idx + 1}`}</title>
        <link href="${feedLink + post?.slug}"/>
        <id>${feedLink + post?.slug}</id>
        <updated>${post?.frontmatter?.updated ?? feedUpdated}</updated>
        <published>${post?.frontmatter?.published ?? feedUpdated}</published>
        <content type="html"><![CDATA[${post.md}]]></content>
      </entry>`
	)
	.join('\n')}
  </feed>`;

	return new Response(xml);
};
