import {FluxPlugin} from '../index.js'

export const PerformancePlugin: FluxPlugin = {
	name: 'performance',
	version: '1.0.0',
	description: 'Performance monitoring and optimization plugin',
	author: 'Flux Team',
	hooks: {
		modifyConfig: config => {
			// Add performance configuration
			return {
				...config,
				build: {
					...config.build,
					assetOptimization: true,
					codeSplitting: true,
				},
			}
		},
		preDev: async _context => {
			console.log('Performance plugin: Pre-dev hook')
			// Initialize performance monitoring
		},
		web: {
			modifyViteConfig: viteConfig => {
				// Add performance optimizations to Vite config
				const typedConfig = viteConfig as {
					build?: {
						rollupOptions?: {output?: {manualChunks?: Record<string, string[]>}}
					}
				}
				const result = {
					...(viteConfig as Record<string, unknown>),
					build: {
						...(typedConfig.build ?? {}),
						rollupOptions: {
							...(typedConfig.build?.rollupOptions ?? {}),
							output: {
								...(typedConfig.build?.rollupOptions?.output ?? {}),
								manualChunks: {
									'react-vendor': ['react', 'react-dom'],
									'flux-core': ['flux'],
								},
							},
						},
					},
				}
				return result
			},
		},
	},
}
