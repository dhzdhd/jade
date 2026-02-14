import pkg from 'lz-string';
const { decompressFromBase64 } = pkg;

const DRAWING_COMPRESSED_REG =
	/(\n##? Drawing\n[^`]*(?:```compressed\-json\n))([\s\S]*?)(```\n)/gm;
const DRAWING_COMPRESSED_REG_ESCAPED_NEWLINE =
	/(\\n##? Drawing\\n[^`]*(?:```compressed\-json\\n))([\s\S]*?)(```\\n)/gm;

export function decompressExcalidrawData(content: string): string {
	const match = DRAWING_COMPRESSED_REG.exec(content);
	const escapedMatch =
		DRAWING_COMPRESSED_REG_ESCAPED_NEWLINE.exec(content);

	let bufMatch = undefined;

	if (match == null && escapedMatch == null) {
		console.log('Failed to parse regex');
		return '';
	}
	if (escapedMatch != null) {
		bufMatch = match;
	}
	if (match != null) {
		bufMatch = match;
	}

	const encoded = match![2].replace(/[\r\n]/g, '');
	const json = decompressFromBase64(encoded);

	return json;
}
