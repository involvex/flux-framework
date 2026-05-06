import type {RunOptions} from '../../build/runner.js'
import {runOnPlatform} from '../../build/runner.js'
import {Command} from 'commander'

export const runCommand = new Command('run')
	.description('Run on specific platform')
	.argument('<platform>', 'Platform to run on (android, web)')
	.option('--device <device>', 'Specific device to run on')
	.option('--debug', 'Enable debugging')
	.action(async (platform: string, options: RunOptions) => {
		await runOnPlatform({
			platform,
			device: options.device,
			debug: options.debug,
		})
	})
