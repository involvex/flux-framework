import type {PrebuildOptions} from '../../build/prebuild.js'
import {prebuildNative} from '../../build/prebuild.js'
import {Command} from 'commander'

export const prebuildCommand = new Command('prebuild')
	.description('Generate native projects')
	.option('--clean', 'Clean and regenerate')
	.option('-p, --platform <platform>', 'Platform-specific prebuild')
	.action(async (options: PrebuildOptions) => {
		await prebuildNative({
			clean: options.clean,
			platform: options.platform,
		})
	})
