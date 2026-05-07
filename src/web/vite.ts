import reactPlugin from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {resolve} from 'path'

export function createViteConfig() {
	return defineConfig({
		plugins: [reactPlugin()],
		server: {
			port: 8081,
			host: true,
			hmr: {
				overlay: true,
			},
		},
		build: {
			outDir: 'dist/web',
			emptyOutDir: true,
			sourcemap: true,
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/[name]-[hash].js',
					entryFileNames: 'assets/[name]-[hash].js',
					assetFileNames: 'assets/[name]-[hash][extname]',
					manualChunks(id) {
						if (
							id.includes('react') ||
							id.includes('react-dom') ||
							id.includes('react-router')
						) {
							return 'react-vendor'
						}
						if (id.includes('flux')) {
							return 'flux-core'
						}
						return 'vendor'
					},
				},
			},
		},
		resolve: {
			alias: {
				'@': resolve(process.cwd(), 'src'),
			},
		},
		optimizeDeps: {
			include: ['react', 'react-dom', 'react-router-dom'],
		},
	})
}
