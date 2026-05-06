import {defineConfig} from 'flux/config'

export default defineConfig({
	name: 'My Flux App',
	version: '1.0.0',
	slug: 'my-flux-app',

	platform: {
		android: {
			package: 'com.mycompany.myfluxapp',
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
		mode: 'auto',
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
		url: 'https://updates.flux.dev',
		enabled: true,
		checkAutomatically: 'ON_LOAD',
	},

	plugins: [
		'flux-plugin-splash-screen',
		'flux-plugin-icons',
		'flux-plugin-adb-wifi',
	],
})
