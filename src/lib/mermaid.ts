import mermaid from 'mermaid';

export function initMermaid(theme: 'light' | 'dark') {
	mermaid.initialize({
		startOnLoad: false,
		theme: theme === 'dark' ? 'dark' : 'default'
	});
	mermaid.run();
}
