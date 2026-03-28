import fs from 'node:fs/promises';
import path, { type ParsedPath } from 'node:path';
import { argv } from 'node:process';

type PromiseOr<T> = T | Promise<T>;

async function ignore(message: string, func: () => PromiseOr<void>) {
	try {
		await func();
		console.log(`Success: ${message}`);
	} catch (err) {
		console.error(`Error: ${message}`);
		console.error(err);
	}
}

async function cleanAndRemake(ssgPath: ParsedPath, dryRun: boolean) {
	const configPath = path.join(path.format(ssgPath), '.config');
	const postsPath = path.join(path.format(ssgPath), 'posts');

	if (dryRun) {
		console.log(
			`[Dry Run] Would delete and recreate config folder - ${configPath}`
		);
		console.log(
			`[Dry Run] Would delete and recreate posts folder - ${postsPath}`
		);
		return;
	}

	console.log(
		`Cleaning and remaking directories in ${path.format(ssgPath)}...`
	);

	await ignore(`Removing ${configPath}`, async () => {
		await fs.rm(configPath, { recursive: true, force: true });
	});
	await ignore(`Creating ${configPath}`, async () => {
		await fs.mkdir(configPath, { recursive: true });
	});

	await ignore(`Removing ${postsPath}`, async () => {
		await fs.rm(postsPath, { recursive: true, force: true });
	});
	await ignore(`Creating ${postsPath}`, async () => {
		await fs.mkdir(postsPath, { recursive: true });
	});
}

async function createFiles(ssgPath: ParsedPath, dryRun: boolean) {
	const configFile = path.join(
		path.format(ssgPath),
		'.config',
		'config.ts'
	);
	const cssFile = path.join(
		path.format(ssgPath),
		'.config',
		'custom.css'
	);

	if (dryRun) {
		console.log(`[Dry Run] Would create config file - ${configFile}`);
		console.log(
			`[Dry Run] Would create custom CSS file - ${cssFile}`
		);
		return;
	}

	console.log('Initializing configuration files...');

	await ignore(`Writing ${configFile}`, async () => {
		await fs.writeFile(configFile, '{}', { flag: 'wx' });
	});
	await ignore(`Writing ${cssFile}`, async () => {
		await fs.writeFile(cssFile, '', { flag: 'wx' });
	});
}

async function main() {
	if (!argv.at(2)) {
		console.error('Error: No target path provided.');
		process.exit(1);
	}

	const ssgPath = path.parse(argv.at(2)!);
	const dryRun = (argv.at(3)?.toLowerCase() ?? 'true') === 'true';

	console.log(`Starting prerequisites setup...`);
	console.log(`Target: ${path.format(ssgPath)}`);
	console.log(`Dry Run: ${dryRun}`);

	await cleanAndRemake(ssgPath, dryRun);
	await createFiles(ssgPath, dryRun);

	console.log('Prerequisites setup complete.');
}

await main();
