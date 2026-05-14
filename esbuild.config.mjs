import {build} from 'esbuild'
import * as fs from 'fs'

const externals = ['vite', 'esbuild', '@vitejs/plugin-react', '@esbuild/*']

// Add all node_modules as externals
const nodeModules = fs.readdirSync('node_modules')
for (const mod of nodeModules) {
	if (!externals.includes(mod) && !mod.startsWith('.')) {
		externals.push(mod)
	}
}

await build({
	entryPoints: ['src/index.ts'],
	outdir: 'dist',
	target: 'node20',
	platform: 'node',
	bundle: true,
	format: 'esm',
	external: externals,
	loader: {
		'.ts': 'ts',
	},
	logLevel: 'warning',
})
