import {copyTemplate} from '../../utils/template.js'
import {mkdirSync, existsSync} from 'fs'
import {Command} from 'commander'
import {resolve} from 'path'
import chalk from 'chalk'

export const createCommand = new Command('create')
	.description('Create a new Flux project')
	.argument('<project-name>', 'Name of the project')
	.option('-d, --description <description>', 'Project description')
	.option('-t, --template <template>', 'Template to use (default: default)')
	.action(async (projectName, options) => {
		try {
			const description = options.description ?? 'A Flux mobile application'
			const template = options.template ?? 'default'
			const projectSlug = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')
			const projectPath = resolve(process.cwd(), projectName)

			console.log(chalk.blue('🚀 Creating Flux project...'))
			console.log(chalk.gray(`📦 Project: ${projectName}`))
			console.log(chalk.gray(`📁 Location: ${projectPath}`))
			console.log(chalk.gray(`📝 Description: ${description}`))
			console.log(chalk.gray(`🎨 Template: ${template}`))

			// Check if directory already exists
			if (existsSync(projectPath)) {
				console.error(chalk.red(`❌ Directory already exists: ${projectPath}`))
				process.exit(1)
			}

			// Create project directory
			mkdirSync(projectPath, {recursive: true})

			// Copy template
			await copyTemplate(template, projectPath, {
				projectName,
				projectSlug,
				description,
			})

			console.log(chalk.green('✅ Project created successfully!'))
			console.log(chalk.gray('\nNext steps:'))
			console.log(chalk.gray(`  1. cd ${projectName}`))
			console.log(chalk.gray('  2. bun install'))
			console.log(chalk.gray('  3. bun dev'))
		} catch (error) {
			console.error(chalk.red('❌ Failed to create project:'), error)
			process.exit(1)
		}
	})
