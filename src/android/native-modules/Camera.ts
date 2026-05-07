import {NativeModule} from './types.js'

export const CameraModule: NativeModule = {
	name: 'Camera',
	version: '1.0.0',
	description: 'Camera access and photo capture functionality',
	permissions: [
		'android.permission.CAMERA',
		'android.permission.WRITE_EXTERNAL_STORAGE',
		'android.permission.READ_EXTERNAL_STORAGE',
	],
	dependencies: ['androidx.camera:camera-core:1.3.0'],
	async initialize() {
		console.log('Camera module initialized')
	},
	async cleanup() {
		console.log('Camera module cleaned up')
	},
}
