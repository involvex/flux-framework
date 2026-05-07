import {NativeModule} from './types.js'

export const NetworkModule: NativeModule = {
	name: 'Network',
	version: '1.0.0',
	description: 'Network connectivity and HTTP requests',
	permissions: [
		'android.permission.INTERNET',
		'android.permission.ACCESS_NETWORK_STATE',
	],
	dependencies: ['com.squareup.okhttp3:okhttp:4.12.0'],
	async initialize() {
		console.log('Network module initialized')
	},
	async cleanup() {
		console.log('Network module cleaned up')
	},
}
