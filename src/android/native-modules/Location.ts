import {NativeModule} from './types.js'

export const LocationModule: NativeModule = {
	name: 'Location',
	version: '1.0.0',
	description: 'GPS and location services functionality',
	permissions: [
		'android.permission.ACCESS_FINE_LOCATION',
		'android.permission.ACCESS_COARSE_LOCATION',
	],
	dependencies: ['com.google.android.gms:play-services-location:21.0.1'],
	async initialize() {
		console.log('Location module initialized')
	},
	async cleanup() {
		console.log('Location module cleaned up')
	},
}
