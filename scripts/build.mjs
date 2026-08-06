import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(root, 'dist/btc.html');
const templatePath = resolve(root, 'src/btc.template.html');

mkdirSync(dirname(templatePath), { recursive: true });
mkdirSync(dirname(outputPath), { recursive: true });
if (!existsSync(templatePath)) {
  writeFileSync(templatePath, readFileSync(resolve(root, 'btc.html'), 'utf8'));
}

const template = readFileSync(templatePath, 'utf8');
const moduleScript = template.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!moduleScript) throw new Error('Could not find the application module script.');

const appSource = `
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import QRCode from 'qrcode';
${moduleScript[1].replace(
  /\n    function setLibError[\s\S]*?\n    \/\*\* Compact SeedQR/,
  '\n    /** Compact SeedQR'
)}
`;

const bundledScript = (await esbuild.build({
  stdin: { contents: appSource, resolveDir: root, sourcefile: 'app.js', loader: 'js' },
  bundle: true,
  format: 'iife',
  minify: true,
  platform: 'browser',
  write: false,
})).outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

const styles = await postcss([tailwindcss({ content: [{ raw: template, extension: 'html' }] })]).process(
  `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background:
    radial-gradient(ellipse at 20% 0%, #1a3a42 0%, transparent 50%),
    radial-gradient(ellipse at 80% 100%, #0d2a30 0%, transparent 45%),
    #00151a;
  min-height: 100vh;
}`,
  { from: undefined }
);

const standalone = template
  .replace(
    /\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*<style>[\s\S]*?<\/style>/,
    `\n  <style>${styles.css}</style>`
  )
  .replace(/<script type="module">[\s\S]*?<\/script>/, `<script>${bundledScript}</script>`);

if (/https:\/\/cdn\.tailwindcss\.com|cdn\.jsdelivr\.net/.test(standalone)) {
  throw new Error('Standalone build still contains a CDN dependency.');
}

writeFileSync(outputPath, standalone);
console.log(`Built ${outputPath}`);
