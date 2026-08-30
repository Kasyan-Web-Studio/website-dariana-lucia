import { spawn } from 'node:child_process';
import { access, cp, mkdir, rm } from 'node:fs/promises';

const vinextCommand = process.execPath;
const vinextCli = './node_modules/vinext/dist/cli.js';

await new Promise((resolve, reject) => {
  const build = spawn(vinextCommand, [vinextCli, 'build', '--prerender-all'], { stdio: 'inherit', shell: false });
  build.once('error', reject);
  build.once('exit', (code) => resolve(code));
});

try {
  await access('dist/server/prerendered-routes/index.html');
} catch {
  throw new Error('vinext did not generate dist/server/prerendered-routes/index.html');
}

await rm('pages-dist', { recursive: true, force: true });
await mkdir('pages-dist', { recursive: true });
await cp('dist/client', 'pages-dist', { recursive: true });
await cp('dist/server/prerendered-routes', 'pages-dist', { recursive: true, force: true });

console.log('Cloudflare Pages output generated from app/ via vinext in pages-dist/.');
