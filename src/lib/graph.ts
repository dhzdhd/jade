import { getSanitizedPath } from '$lib';
import type { Post } from '../routes/+layout.server';

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
		.map((post) => {
			return post.headings.map((heading) => {
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
		.map((post) => {
			const slug = getSanitizedPath(post.fileName);

			const headingLinksSet = new Set(
				post.headings.map((heading) => {
					return {
						source: slug,
						target: `${post.slug}${heading.url}`
					};
				})
			);
			const urlLinksSet = new Set(
				post.links
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

	console.log(links);

	return {
		nodes,
		links
	};
}
