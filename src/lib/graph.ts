import { getSanitizedPath } from '$lib';
import type { Markdown, Post } from './post';

export interface Node {
	id: string;
	label: string;
	url: string;
}

export interface Link {
	source: string;
	target: string;
}

export interface GraphData {
	nodes: Node[];
	links: Link[];
}

export function generateGraphData(posts: Post[]): GraphData {
	const postNodes = posts.map((post) => {
		const slug = getSanitizedPath(post.fileName);
		return { id: slug, label: slug, url: `/${slug}` };
	});
	const headingNodes = posts
		.filter((post) => post.data.kind === 'markdown')
		.map((post) => {
			const data = post.data as Markdown;

			return data.headings.map((heading) => {
				return {
					id: `${post.slug}${heading.url}`,
					label: `${post.slug}#${heading.text}`,
					url: `/${post.slug}${heading.url}`
				};
			});
		})
		.flat();
	const nodes = [...postNodes, ...headingNodes];

	const links = posts
		.filter((post) => post.data.kind === 'markdown')
		.map((post) => {
			const slug = getSanitizedPath(post.fileName);
			const data = post.data as Markdown;

			const headingLinksSet = new Set(
				data.headings.map((heading) => {
					return {
						source: slug,
						target: `${post.slug}${heading.url}`
					};
				})
			);
			const urlLinksSet = new Set(
				data.links
					.filter(
						(link) =>
							link.startsWith('/') &&
							nodes.map((node) => node.id).includes(link.slice(1))
					)
					.map((link) => {
						return {
							source: slug,
							target: link.slice(1)
						};
					})
			);
			const linksSet = headingLinksSet.union(urlLinksSet);

			return [...linksSet];
		})
		.flat();

	return {
		nodes,
		links
	};
}
