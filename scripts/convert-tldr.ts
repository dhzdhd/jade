import { readFile, writeFile } from 'fs/promises';
import { glob } from 'fs/promises';

async function main() {
	const files = await Array.fromAsync(glob('../**/*.drawing'));

	await Promise.all(
		files.map(async (fileName: string) => {
			const content = await readFile(fileName, 'utf-8');
			const parsed = JSON.parse(content);
			const svg = parsed['previewUri'];

			await writeFile(`${fileName}.svg`, svg);
		})
	);
}

await main();
