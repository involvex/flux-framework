import {loadConfig} from '../config/loader.js'
import {execSync} from 'child_process'
import {buildAndroid as buildAndroidApp} from '../android/builder.js'
import chalk from 'chalk'
import type {FluxConfig} from '../config/types.js'

export interface BuildOptions {
	platform: string
	profile: string
	type: string
}

export async function buildProject(options: BuildOptions) {
	const config = loadConfig()

	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	console.log(chalk.blue(`🔨 Building ${config.name}...`))
	console.log(chalk.gray(`Platform: ${options.platform}`))
	console.log(chalk.gray(`Profile: ${options.profile}`))
	console.log(chalk.gray(`Type: ${options.type}`))

	try {
		if (options.platform === 'all' || options.platform === 'web') {
			await buildWeb(config)
		}

		if (options.platform === 'all' || options.platform === 'android') {
			await buildAndroid(config, options)
		}

		console.log(chalk.green('✅ Build completed successfully!'))
	} catch (error) {
		console.error(chalk.red('❌ Build failed:'), error)
		process.exit(1)
	}
}

async function buildWeb(_config: FluxConfig) {
	console.log(chalk.blue('🌐 Building for web...'))

	try {
		// Use Vite for web builds
		execSync('bunx vite build', {
			stdio: 'inherit',
		})
		console.log(chalk.green('✓ Web build complete'))
	} catch (error) {
		console.error(chalk.red('✗ Web build failed'))
		throw error
	}
}

async function buildAndroid(config: FluxConfig, options: BuildOptions) {
	console.log(chalk.blue('🤖 Building for Android...'))

	const androidConfig = config.platform?.android
	if (!androidConfig) {
		console.error(chalk.red('✗ Android configuration not found'))
		return
	}

	try {
		const buildType = options.profile === 'production' ? 'release' : 'debug'
		const outputType = options.type === 'app-bundle' ? 'aab' : 'apk'

		await buildAndroidApp({
			buildType: buildType,
			outputType: outputType,
			package: androidConfig.package,
		})

		console.log(chalk.green('✓ Android build complete'))
	} catch (error) {
		console.error(chalk.red('✗ Android build failed'))
		throw error
	}
}
