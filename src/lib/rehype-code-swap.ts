import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import type { Plugin } from 'unified';

export interface RehypeCodeSwapOptions {
	transform: (
		code: string,
		lang: string | undefined
	) => Element | undefined;
}

const rehypeSwapCodeWithImage: Plugin<
	[RehypeCodeSwapOptions],
	Root
> = (options: RehypeCodeSwapOptions) => {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element, index, parent) => {
			if (
				node.tagName !== 'pre' ||
				index === undefined ||
				index === null ||
				!parent
			)
				return;

			const code = node.children.find(
				(child): child is Element =>
					child.type === 'element' &&
					(child as Element).tagName === 'code'
			);

			if (!code) return;

			const text = code.children[0];
			const codeText = text?.type === 'text' ? text.value : '';

			const className =
				(code.properties?.className as string[]) ?? [];
			const lang = className
				.find((c) => c.startsWith('language-'))
				?.replace('language-', '');

			const replacement = options.transform(codeText, lang);
			if (replacement) {
				parent.children[index] = replacement;
			}
		});
	};
};

export default rehypeSwapCodeWithImage;
