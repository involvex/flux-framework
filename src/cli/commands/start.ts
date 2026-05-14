// This file is executed as a child process from cli/index.ts.
// Heavy deps (vite/esbuild) are loaded lazily, not bundled at CLI startup.
import {Command} from 'commander'

export const startCommand = new Command('start')
	.description('Start development server')
	.option('-w, --web', 'Start web dev server')
	.option('-t, --tunnel', 'Start with tunnel support')
	.option('-p, --port <port>', 'Port to run on', '8081')
	.option('--debug', 'Enable debugging')
	.action(async (options: Record<string, unknown>) => {
		const {startDevServer} = await import('../../dev/server.js')
		await startDevServer({
			web: options.web as boolean | undefined,
			tunnel: options.tunnel as boolean | undefined,
			port: options.port as string,
			debug: options.debug as boolean | undefined,
		})
	})

startCommand.parse(process.argv)
