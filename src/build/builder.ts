import {loadConfig} from '../config/loader.js'
import {execSync} from 'child_process'
import chalk from 'chalk'

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

async function buildWeb(config: any) {
	console.log(chalk.blue('🌐 Building for web...'))

	try {
		execSync('bun build src/index.ts --outdir dist/web --target browser', {
			stdio: 'inherit',
		})
		console.log(chalk.green('✓ Web build complete'))
	} catch (error) {
		console.error(chalk.red('✗ Web build failed'))
		throw error
	}
}

async function buildAndroid(config: any, options: BuildOptions) {
	console.log(chalk.blue('🤖 Building for Android...'))

	try {
		if (options.type === 'app-bundle') {
			console.log(chalk.gray('Building AAB for Play Store'))
		} else {
			console.log(chalk.gray('Building APK'))
		}

		execSync('bun build src/index.ts --outdir dist/android --target node', {
			stdio: 'inherit',
		})
		console.log(chalk.green('✓ Android build complete'))
	} catch (error) {
		console.error(chalk.red('✗ Android build failed'))
		throw error
	}
}
