import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // The map data is generated and is one very long line per county.
  globalIgnores(['dist/', 'node_modules/', 'src/map/counties.ts']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { console: 'readonly', URL: 'readonly' } },
  },
]);
