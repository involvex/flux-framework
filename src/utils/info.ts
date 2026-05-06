import {readFileSync, existsSync} from 'fs'
import {execSync} from 'child_process'
import {resolve} from 'path'
import chalk from 'chalk'

export async function showProjectInfo() {
	console.log(chalk.blue('📋 Project Information'))
	console.log()

	const configPath = resolve(process.cwd(), 'flux.config.ts')
	const packagePath = resolve(process.cwd(), 'package.json')

	if (existsSync(configPath)) {
		try {
			const configContent = readFileSync(configPath, 'utf-8')
			const configMatch = configContent.match(
				/export default defineConfig\(([\s\S]*?)\)/,
			)

			if (configMatch) {
				const configStr = configMatch[1]
				const config = eval(`(${configStr})`) as Record<string, unknown>

				console.log(chalk.bold('App Configuration:'))
				console.log(chalk.gray('  Name:'), config.name)
				console.log(chalk.gray('  Version:'), config.version)
				console.log(chalk.gray('  Slug:'), config.slug)
				console.log()
			}
		} catch {
			console.log(chalk.yellow('⚠️  Could not read config'))
		}
	}

	if (existsSync(packagePath)) {
		try {
			const pkg = JSON.parse(readFileSync(packagePath, 'utf-8')) as Record<
				string,
				unknown
			>

			console.log(chalk.bold('Package Information:'))
			console.log(chalk.gray('  Name:'), pkg.name)
			console.log(chalk.gray('  Version:'), pkg.version)
			console.log(
				chalk.gray('  Dependencies:'),
				Object.keys((pkg.dependencies as Record<string, unknown>) ?? {}).length,
			)
			console.log(
				chalk.gray('  Dev Dependencies:'),
				Object.keys((pkg.devDependencies as Record<string, unknown>) ?? {})
					.length,
			)
			console.log()
		} catch {
			console.log(chalk.yellow('⚠️  Could not read package.json'))
		}
	}

	try {
		const nodeVersion = execSync('node --version', {encoding: 'utf-8'}).trim()
		const bunVersion = execSync('bun --version', {encoding: 'utf-8'}).trim()

		console.log(chalk.bold('Environment:'))
		console.log(chalk.gray('  Node.js:'), nodeVersion)
		console.log(chalk.gray('  Bun:'), bunVersion)
		console.log(chalk.gray('  Platform:'), process.platform)
		console.log(chalk.gray('  Arch:'), process.arch)
		console.log()
	} catch {
		console.log(chalk.yellow('⚠️  Could not get environment info'))
	}

	const androidDir = resolve(process.cwd(), 'android')

	console.log(chalk.bold('Native Projects:'))
	console.log(
		chalk.gray('  Android:'),
		existsSync(androidDir) ? '✓ Generated' : '✗ Not generated',
	)
	console.log()
}
