import {copyTemplate} from '../../utils/template.js'
import {Command} from 'commander'
import {existsSync} from 'fs'
import chalk from 'chalk'

export const initCommand = new Command('init')
	.description('Initialize a new Flux project in the current directory')
	.option('-n, --name <name>', 'Project name')
	.option('-d, --description <description>', 'Project description')
	.action(async options => {
		try {
			const projectName =
				options.name ?? process.cwd().split('\\').pop() ?? 'my-flux-app'
			const description = options.description ?? 'A Flux mobile application'
			const projectSlug = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')

			console.log(chalk.blue('🚀 Initializing Flux project...'))
			console.log(chalk.gray(`📦 Project: ${projectName}`))
			console.log(chalk.gray(`📝 Description: ${description}`))

			// Check if directory is empty
			const files = ['package.json', 'flux.config.ts', 'tsconfig.json']
			const existingFiles = files.filter(file => existsSync(file))

			if (existingFiles.length > 0) {
				console.log(
					chalk.yellow(
						`⚠️  Directory is not empty. Found: ${existingFiles.join(', ')}`,
					),
				)
				const answer = await prompt(
					'Continue anyway? This may overwrite existing files. (y/N): ',
				)
				if (answer.toLowerCase() !== 'y') {
					console.log(chalk.gray('❌ Initialization cancelled'))
					return
				}
			}

			// Copy template
			await copyTemplate('default', process.cwd(), {
				projectName,
				projectSlug,
				description,
			})

			console.log(chalk.green('✅ Project initialized successfully!'))
			console.log(chalk.gray('\nNext steps:'))
			console.log(chalk.gray('  1. bun install'))
			console.log(chalk.gray('  2. bun dev'))
		} catch (error) {
			console.error(chalk.red('❌ Failed to initialize project:'), error)
			process.exit(1)
		}
	})

async function prompt(question: string): Promise<string> {
	const readline = await import('readline')
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	return new Promise(resolve => {
		rl.question(question, answer => {
			rl.close()
			resolve(answer)
		})
	})
}
