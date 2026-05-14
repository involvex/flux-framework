#!/bin/bash
# Build script for the flux CLI
# Uses esbuild directly with proper external deps and code splitting

cd /d/repos/expo-ionic

node -e "
const {build} = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  outbase: 'src',
  target: 'node20',
  platform: 'node',
  bundle: true,
  format: 'esm',
  splitting: true,
  packages: 'external',
  loader: {
    '.ts': 'ts',
  },
  logLevel: 'warning',
}).then(() => console.log('Build complete')).catch(e => { console.error(e); process.exit(1); });
"