import {existsSync, readFileSync} from 'fs'
import {execSync} from 'child_process'
import {resolve} from 'path'
import chalk from 'chalk'

export async function diagnoseProject() {
	console.log(chalk.blue('🔍 Diagnosing project...'))
	console.log()

	const checks = [
		checkNodeVersion,
		checkBunVersion,
		checkConfigFile,
		checkDependencies,
		checkNativeDirs,
		checkGit,
	]

	let passed = 0
	let failed = 0

	for (const check of checks) {
		try {
			await check()
			passed++
		} catch (error) {
			failed++
		}
	}

	console.log()
	console.log(chalk.bold('Summary:'))
	console.log(chalk.green(`✓ Passed: ${passed}`))
	console.log(chalk.red(`✗ Failed: ${failed}`))

	if (failed > 0) {
		console.log()
		console.log(
			chalk.yellow('⚠️  Some checks failed. Please fix the issues above.'),
		)
		process.exit(1)
	} else {
		console.log()
		console.log(chalk.green('✅ All checks passed!'))
	}
}

async function checkNodeVersion() {
	try {
		const version = execSync('node --version', {encoding: 'utf-8'}).trim()
		console.log(chalk.green('✓ Node.js:'), version)
	} catch (error) {
		console.log(chalk.red('✗ Node.js:'), 'Not installed')
		throw error
	}
}

async function checkBunVersion() {
	try {
		const version = execSync('bun --version', {encoding: 'utf-8'}).trim()
		console.log(chalk.green('✓ Bun:'), version)
	} catch (error) {
		console.log(chalk.red('✗ Bun:'), 'Not installed')
		throw error
	}
}

async function checkConfigFile() {
	const configPath = resolve(process.cwd(), 'flux.config.ts')

	if (existsSync(configPath)) {
		console.log(chalk.green('✓ Config file:'), 'flux.config.ts')
	} else {
		console.log(chalk.red('✗ Config file:'), 'Not found')
		throw new Error('Config file not found')
	}
}

async function checkDependencies() {
	const packagePath = resolve(process.cwd(), 'package.json')

	if (existsSync(packagePath)) {
		const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
		console.log(
			chalk.green('✓ Dependencies:'),
			Object.keys(pkg.dependencies || {}).length,
		)
	} else {
		console.log(chalk.red('✗ Dependencies:'), 'package.json not found')
		throw new Error('package.json not found')
	}
}

async function checkNativeDirs() {
	const androidDir = resolve(process.cwd(), 'android')

	const hasAndroid = existsSync(androidDir)

	if (hasAndroid) {
		console.log(chalk.green('✓ Native dirs:'), 'android')
	} else {
		console.log(chalk.yellow('⚠ Native dirs:'), 'None (run flux prebuild)')
	}
}

async function checkGit() {
	try {
		execSync('git rev-parse --git-dir', {encoding: 'utf-8', stdio: 'pipe'})
		console.log(chalk.green('✓ Git:'), 'Initialized')
	} catch (error) {
		console.log(chalk.yellow('⚠ Git:'), 'Not initialized')
	}
}
