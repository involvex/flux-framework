import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
	plugins: [react()],
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
				manualChunks: {
					'react-vendor': ['react', 'react-dom', 'react-router-dom'],
					'flux-core': ['flux'],
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
