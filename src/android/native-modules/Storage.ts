import {NativeModule} from './types.js'

export const StorageModule: NativeModule = {
	name: 'Storage',
	version: '1.0.0',
	description: 'Local storage and file system access',
	permissions: [
		'android.permission.READ_EXTERNAL_STORAGE',
		'android.permission.WRITE_EXTERNAL_STORAGE',
	],
	dependencies: [],
	async initialize() {
		console.log('Storage module initialized')
	},
	async cleanup() {
		console.log('Storage module cleaned up')
	},
}
