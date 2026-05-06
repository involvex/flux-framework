import {startDevServer} from '../../dev/server.js'
import {Command} from 'commander'

export const startCommand = new Command('start')
	.description('Start development server')
	.option('-w, --web', 'Start web dev server')
	.option('-t, --tunnel', 'Start with tunnel support')
	.option('-p, --port <port>', 'Port to run on', '8081')
	.option('--debug', 'Enable debugging')
	.action(async options => {
		await startDevServer({
			web: options.web,
			tunnel: options.tunnel,
			port: parseInt(options.port),
			debug: options.debug,
		})
	})
