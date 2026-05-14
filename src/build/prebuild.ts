import {existsSync, rmSync} from 'fs'
import {loadConfig} from '../config/loader.js'
import {resolve} from 'path'
import {generateAndroidProject} from '../android/generator.js'
import chalk from 'chalk'

export interface PrebuildOptions {
	clean?: boolean
	platform?: string
}

export async function prebuildNative(options: PrebuildOptions) {
	const config = loadConfig()

	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	console.log(chalk.blue('🔧 Prebuilding native projects...'))

	if (options.clean) {
		console.log(chalk.gray('Cleaning existing native directories...'))
		await cleanNativeDirs()
	}

	try {
		if (!options.platform || options.platform === 'android') {
			await generateAndroidProject()
		}

		console.log(chalk.green('✅ Prebuild completed successfully!'))
	} catch (error) {
		console.error(chalk.red('❌ Prebuild failed:'), error)
		process.exit(1)
	}
}

async function cleanNativeDirs() {
	const dirs = ['android']

	for (const dir of dirs) {
		const dirPath = resolve(process.cwd(), dir)
		if (existsSync(dirPath)) {
			rmSync(dirPath, {recursive: true, force: true})
			console.log(chalk.gray(`✓ Removed ${dir}/`))
		}
	}
}
