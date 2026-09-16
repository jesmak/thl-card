/**
 * Bundles src/ into the single file HACS installs: dist/thl-card.js
 *
 * lit is bundled; Home Assistant doesn't hand cards a copy of it. The output is
 * not minified, so anyone can read what runs in their browser — most of its size
 * is the map of Finland, which doesn't compress away in either case.
 */
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

await build({
  entryPoints: ['src/thl-card.ts'],
  outfile: 'dist/thl-card.js',
  bundle: true,
  format: 'esm',
  target: 'es2020',
  minify: false,
  legalComments: 'none',
  banner: {
    js: `/*! ${packageJson.name} ${packageJson.version} | MIT License */`,
  },
  define: {
    __CARD_VERSION__: JSON.stringify(packageJson.version),
  },
  logLevel: 'info',
});
