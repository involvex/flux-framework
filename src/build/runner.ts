import {loadConfig} from '../config/loader.js'
import {execSync} from 'child_process'
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

	try {
		if (options.device) {
			console.log(chalk.gray(`Device: ${options.device}`))
		}

		if (options.debug) {
			console.log(chalk.gray('Debug mode enabled'))
		}

		execSync('adb shell am start -n com.expoic.app/.MainActivity', {
			stdio: 'inherit',
		})
		console.log(chalk.green('✓ App launched on Android'))
	} catch (error) {
		console.error(chalk.red('✗ Failed to run on Android'))
		throw error
	}
}

async function runWeb(_options: RunOptions) {
	console.log(chalk.blue('🌐 Running on web...'))

	try {
		const port = 8081
		console.log(chalk.gray(`Opening http://localhost:${port}`))

		execSync(`start http://localhost:${port}`, {
			stdio: 'inherit',
			shell: 'powershell.exe',
		})
		console.log(chalk.green('✓ Browser opened'))
	} catch (error) {
		console.error(chalk.red('✗ Failed to run on web'))
		throw error
	}
}
