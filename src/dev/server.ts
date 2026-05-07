import {createServer as createViteServer} from 'vite'
import {createViteConfig} from '../web/vite.js'
import {loadConfig} from '../config/loader.js'
import chalk from 'chalk'

export interface DevServerOptions {
	web?: boolean
	tunnel?: boolean
	port: string
	debug?: boolean
}

export async function startDevServer(options: DevServerOptions) {
	const config = loadConfig()

	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	console.log(chalk.blue('🚀 Starting Flux dev server...'))
	console.log(chalk.gray(`📦 App: ${config.name} v${config.version}`))
	console.log(chalk.gray(`🌐 Port: ${options.port}`))

	if (options.web) {
		console.log(chalk.gray('🌍 Web mode enabled'))
	}

	if (options.tunnel) {
		console.log(chalk.gray('🔗 Tunnel mode enabled'))
	}

	if (options.debug) {
		console.log(chalk.gray('🐛 Debug mode enabled'))
	}

	try {
		const viteConfig = createViteConfig()
		const server = await createViteServer({
			...viteConfig,
			configFile: false,
			server: {
				...viteConfig.server,
				port: parseInt(options.port, 10),
				host: true,
			},
		})

		void server.listen()

		console.log(
			chalk.green('✅ Server running at http://localhost:' + options.port),
		)
		console.log(chalk.green('📡 React Fast Refresh enabled'))

		process.on('SIGINT', () => {
			console.log(chalk.yellow('\n🛑 Shutting down server...'))
			void server.close().then(() => process.exit(0))
		})
	} catch (error) {
		console.error(chalk.red('❌ Failed to start dev server:'), error)
		process.exit(1)
	}
}
