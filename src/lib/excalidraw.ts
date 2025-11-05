import pkg from 'lz-string';
const { decompressFromBase64 } = pkg;

const DRAWING_COMPRESSED_REG =
	/(\n##? Drawing\n[^`]*(?:```compressed\-json\n))([\s\S]*?)(```\n)/gm;

export function decompressExcalidrawData(content: string): string {
	const match = DRAWING_COMPRESSED_REG.exec(content);

	if (match == null) {
		// TODO: Possibly getting \n stripped markdown, breaking the regex
		return '';
	}

	const encoded = match![2].replace(/[\r\n]/g, '');
	const json = decompressFromBase64(encoded);

	return json;
}
