import {loadConfig} from '../config/loader.js'
import {execSync} from 'child_process'
import {runAndroid as runAndroidApp} from '../android/builder.js'
import chalk from 'chalk'

export interface RunOptions {
	platform: string
	device?: string
	debug?: boolean
}

export async function runOnPlatform(options: RunOptions) {
	const config = loadConfig()

	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	console.log(chalk.blue(`🚀 Running ${config.name} on ${options.platform}...`))

	try {
		switch (options.platform) {
			case 'android':
				await runAndroid(options)
				break
			case 'web':
				await runWeb(options)
				break
			default:
				console.error(chalk.red(`Unknown platform: ${options.platform}`))
				process.exit(1)
		}
	} catch (error) {
		console.error(chalk.red('❌ Run failed:'), error)
		process.exit(1)
	}
}

async function runAndroid(options: RunOptions) {
	console.log(chalk.blue('🤖 Running on Android...'))

	const config = loadConfig()
	if (!config) {
		console.error('Failed to load config')
		return
	}

	const androidConfig = config.platform?.android
	if (!androidConfig) {
		console.error(chalk.red('✗ Android configuration not found'))
		return
	}

	try {
		if (options.device) {
			console.log(chalk.gray(`Device: ${options.device}`))
		}

		if (options.debug) {
			console.log(chalk.gray('Debug mode enabled'))
		}

		await runAndroidApp({
			buildType: 'debug',
			outputType: 'apk',
			package: androidConfig.package,
		})

		console.log(chalk.green('✓ App running on Android'))
	} catch (error) {
		console.error(chalk.red('✗ Failed to run on Android'))
		throw error
	}
}

async function runWeb(_options: RunOptions) {
	console.log(chalk.blue('🌐 Running on web...'))

	try {
		const port = 8081
		console.log(chalk.gray(`Starting Vite dev server on port ${port}`))

		execSync('bunx vite', {
			stdio: 'inherit',
		})

		console.log(chalk.green('✓ Web dev server started'))
	} catch (error) {
		console.error(chalk.red('✗ Failed to run on web'))
		throw error
	}
}
