import mermaid from 'mermaid';

export async function renderMermaid(theme: 'light' | 'dark') {
	mermaid.initialize({
		startOnLoad: false,
		theme: theme === 'dark' ? 'dark' : 'default'
	});

	document.querySelectorAll('.mermaid').forEach((el) => {
		const source =
			el.getAttribute('data-source') ?? el.textContent ?? '';
		if (!el.getAttribute('data-source')) {
			el.setAttribute('data-source', source);
		}
		el.removeAttribute('data-processed');
		el.innerHTML = source;
	});

	await mermaid.run({ querySelector: '.mermaid' });
}
