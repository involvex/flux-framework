import {Command} from 'commander'

export const prebuildCommand = new Command('prebuild')
	.description('Generate native projects')
	.option('--clean', 'Clean and regenerate')
	.option('-p, --platform <platform>', 'Platform-specific prebuild')
	.action(async (options: Record<string, unknown>) => {
		const {prebuildNative} = await import('../../build/prebuild.js')
		await prebuildNative({
			clean: options.clean as boolean | undefined,
			platform: options.platform as string | undefined,
		})
	})

prebuildCommand.parse(process.argv)
