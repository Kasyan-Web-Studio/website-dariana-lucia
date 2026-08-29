import { cp, mkdir, rm } from 'node:fs/promises';

await rm('pages-dist', { recursive: true, force: true });
await mkdir('pages-dist', { recursive: true });
await cp('pages-public', 'pages-dist', { recursive: true });
