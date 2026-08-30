import { copyFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const source = 'C:/Users/kbora/Desktop/websites/website iubi si luci/logo fara fundal iubi.png';
const output = 'C:/Users/kbora/Documents/website-dariana-lucia/public/assets/brand';

await mkdir(output, { recursive: true });
await copyFile(source, `${output}/logo-full.png`);

const makeImage = () => sharp(source);

await makeImage().resize({ width: 1120, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(`${output}/logo-intro.png`);
await makeImage().extract({ left: 500, top: 0, width: 700, height: 560 }).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 420, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(`${output}/logo-mark-dl.png`);
await makeImage().extract({ left: 0, top: 0, width: 1670, height: 790 }).resize({ width: 1120, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(`${output}/logo-no-slogan.png`);
await makeImage().modulate({ brightness: 1.18, saturation: 1.05 }).png({ compressionLevel: 9 }).toFile(`${output}/logo-light.png`);
await makeImage().extract({ left: 500, top: 0, width: 700, height: 560 }).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 64, height: 64, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(`${output}/favicon.png`);

console.log(`Brand assets written to ${output}`);
