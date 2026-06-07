import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docsDir = resolve(root, 'docs');
const cnamePath = resolve(docsDir, 'CNAME');

await mkdir(docsDir, { recursive: true });

const cname = existsSync(cnamePath) ? await readFile(cnamePath, 'utf8') : '';
if (cname.trim() !== 'docs.autojs6.com') {
  await writeFile(cnamePath, 'docs.autojs6.com\n');
}

await cp(resolve(root, 'api/images'), resolve(docsDir, 'images'), {
  recursive: true,
  force: true,
});
