import {defineConfig} from '@involvex/flux/config'

export default defineConfig({
	name: '{{projectName}}',
	version: '0.1.0',
	slug: '{{projectSlug}}',
	description: '{{description}}',
	platform: {
		android: {
			package: 'com.{{projectSlug}}.app',
			versionCode: 1,
			minSdkVersion: 21,
			targetSdkVersion: 34,
		},
		web: {
			bundler: 'vite',
			output: 'static',
		},
	},
	ui: {
		mode: 'web',
		theme: 'light',
		animations: true,
		hardwareBackButton: true,
	},
	navigation: {
		type: 'file-based',
		deepLinking: true,
		lazy: true,
	},
	build: {
		bundler: 'bun',
		minify: true,
		sourceMaps: true,
		treeShaking: true,
	},
	development: {
		fastRefresh: true,
		hotReload: true,
		debug: true,
	},
	updates: {
		enabled: true,
		checkAutomatically: 'on-start',
	},
})
