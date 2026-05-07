import type {PluginConfig} from '../../config/types.js'
import {FluxPlugin} from '../index.js'

export const CrashlyticsPlugin: FluxPlugin = {
	name: 'crashlytics',
	version: '1.0.0',
	description: 'Crash reporting and analytics plugin',
	author: 'Flux Team',
	dependencies: ['analytics'],
	hooks: {
		modifyConfig: config => {
			// Add crashlytics configuration
			return {
				...config,
				plugins: [
					...(config.plugins || []),
					{
						name: 'crashlytics',
						options: {
							enabled: true,
						},
					},
				] as PluginConfig[],
			}
		},
		preBuild: async _context => {
			console.log('Crashlytics plugin: Pre-build hook')
			// Initialize crashlytics SDK
		},
		android: {
			modifyGradle: gradle => {
				// Add crashlytics dependencies
				return (
					gradle +
					"\n    implementation 'com.google.firebase:firebase-crashlytics:18.6.0'"
				)
			},
			modifyManifest: manifest => {
				// Add crashlytics permissions
				return manifest.replace(
					'</manifest>',
					'    <uses-permission android:name="android.permission.INTERNET" />\n</manifest>',
				)
			},
		},
	},
}
