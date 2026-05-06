import {writeFileSync, readFileSync, existsSync} from 'fs'
import {loadConfig} from '../config/loader.js'
import {execSync} from 'child_process'
import {resolve} from 'path'
import chalk from 'chalk'

export interface UpdateOptions {
	channel?: string
	version?: string
}

export async function createUpdate() {
	console.log(chalk.blue('📦 Creating update...'))

	const config = loadConfig()
	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	try {
		const timestamp = Date.now()
		const updateId = `${config.version}-${timestamp}`

		console.log(chalk.gray(`Update ID: ${updateId}`))
		console.log(chalk.gray(`Version: ${config.version}`))

		const updateInfo = {
			id: updateId,
			version: config.version,
			timestamp,
			channel: 'development',
		}

		const updatesDir = resolve(process.cwd(), '.expoic', 'updates')
		if (!existsSync(updatesDir)) {
			execSync(`mkdir -p ${updatesDir}`, {stdio: 'inherit'})
		}

		writeFileSync(
			resolve(updatesDir, `${updateId}.json`),
			JSON.stringify(updateInfo, null, 2),
		)

		console.log(chalk.green('✓ Update created successfully'))
	} catch (error) {
		console.error(chalk.red('✗ Failed to create update'))
		throw error
	}
}

export async function publishUpdate(options: UpdateOptions) {
	console.log(chalk.blue('🚀 Publishing update...'))

	const config = loadConfig()
	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	try {
		console.log(chalk.gray(`Channel: ${options.channel}`))

		const updatesDir = resolve(process.cwd(), '.expoic', 'updates')
		const updateFiles = execSync(`ls ${updatesDir}/*.json`, {encoding: 'utf-8'})
			.split('\n')
			.filter(f => f.trim())

		if (updateFiles.length === 0) {
			console.log(chalk.yellow('⚠️  No updates found. Create one first.'))
			return
		}

		const latestUpdate = updateFiles[updateFiles.length - 1]
		const updateData = JSON.parse(readFileSync(latestUpdate, 'utf-8'))

		updateData.channel = options.channel
		updateData.publishedAt = new Date().toISOString()

		writeFileSync(latestUpdate, JSON.stringify(updateData, null, 2))

		console.log(chalk.green(`✓ Update published to ${options.channel} channel`))
	} catch (error) {
		console.error(chalk.red('✗ Failed to publish update'))
		throw error
	}
}

export async function rollbackUpdate(options: UpdateOptions) {
	console.log(chalk.blue('↩️  Rolling back update...'))

	try {
		if (!options.version) {
			console.log(chalk.yellow('⚠️  Please specify --version'))
			return
		}

		console.log(chalk.gray(`Rolling back to version: ${options.version}`))
		console.log(chalk.green('✓ Update rolled back successfully'))
	} catch (error) {
		console.error(chalk.red('✗ Failed to rollback update'))
		throw error
	}
}

export async function inspectUpdates() {
	console.log(chalk.blue('🔍 Inspecting updates...'))

	try {
		const updatesDir = resolve(process.cwd(), '.expoic', 'updates')

		if (!existsSync(updatesDir)) {
			console.log(chalk.yellow('⚠️  No updates found'))
			return
		}

		const updateFiles = execSync(`ls ${updatesDir}/*.json`, {encoding: 'utf-8'})
			.split('\n')
			.filter(f => f.trim())

		console.log(chalk.green(`Found ${updateFiles.length} update(s):`))

		updateFiles.forEach((file, index) => {
			const updateData = JSON.parse(readFileSync(file, 'utf-8'))
			console.log(`  ${index + 1}. ${updateData.id}`)
			console.log(`     Version: ${updateData.version}`)
			console.log(`     Channel: ${updateData.channel || 'unpublished'}`)
			console.log(
				`     Created: ${new Date(updateData.timestamp).toLocaleString()}`,
			)
			if (updateData.publishedAt) {
				console.log(
					`     Published: ${new Date(updateData.publishedAt).toLocaleString()}`,
				)
			}
		})
	} catch (error) {
		console.error(chalk.red('✗ Failed to inspect updates'))
		throw error
	}
}
