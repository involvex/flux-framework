import {buildProject} from '../../build/builder.js'
import {Command} from 'commander'

export const buildCommand = new Command('build')
	.description('Build for production')
	.option('-p, --platform <platform>', 'Platform to build for', 'all')
	.option('--profile <profile>', 'Build profile', 'production')
	.option('--type <type>', 'Build type', 'app')
	.action(async options => {
		await buildProject({
			platform: options.platform,
			profile: options.profile,
			type: options.type,
		})
	})
