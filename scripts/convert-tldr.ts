import { readFile, writeFile } from 'fs/promises';
import { glob } from 'fs/promises';
import path from 'path';

async function main() {
	const files = await Array.fromAsync(glob('../**/*.drawing'));

	await Promise.all(
		files.map(async (fileName: string) => {
			const content = await readFile(fileName, 'utf-8');
			const parsed = JSON.parse(content);
			const svg = parsed['previewUri'];

			const dirName = path.dirname(fileName);
			const baseName = path.basename(fileName);

			await writeFile(`${dirName}/${baseName}.svg`, svg);
		})
	);
}

await main();
