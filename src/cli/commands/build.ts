import {Command} from 'commander'

export const buildCommand = new Command('build')
	.description('Build for production')
	.option('-p, --platform <platform>', 'Platform to build for', 'all')
	.option('--profile <profile>', 'Build profile', 'production')
	.option('--type <type>', 'Build type', 'app')
	.action(async (options: Record<string, unknown>) => {
		const {buildProject} = await import('../../build/builder.js')
		await buildProject({
			platform: options.platform as string,
			profile: options.profile as string,
			type: options.type as string,
		})
	})

buildCommand.parse(process.argv)
