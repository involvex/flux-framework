import {Command} from 'commander'

export const runCommand = new Command('run')
	.description('Run on specific platform')
	.argument('<platform>', 'Platform to run on (android, web)')
	.option('--device <device>', 'Specific device to run on')
	.option('--debug', 'Enable debugging')
	.action(async (platform: string, options: Record<string, unknown>) => {
		const {runOnPlatform} = await import('../../build/runner.js')
		await runOnPlatform({
			platform,
			device: options.device as string | undefined,
			debug: options.debug as boolean | undefined,
		})
	})

runCommand.parse(process.argv)
