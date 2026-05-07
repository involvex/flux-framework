import {
	readFileSync,
	writeFileSync,
	readdirSync,
	statSync,
	mkdirSync,
	existsSync,
} from 'fs'
import {join, resolve, dirname} from 'path'
import {fileURLToPath} from 'url'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export interface TemplateVariables {
	projectName: string
	projectSlug: string
	description: string
}

export async function copyTemplate(
	templateName: string,
	targetPath: string,
	variables: TemplateVariables,
): Promise<void> {
	const templatePath = resolve(__dirname, '../../../templates', templateName)

	if (!existsSync(templatePath)) {
		throw new Error(`Template not found: ${templateName}`)
	}

	console.log(chalk.gray(`📋 Copying template: ${templateName}`))

	await copyDirectory(templatePath, targetPath, variables)

	console.log(chalk.gray('✨ Template copied successfully'))
}

async function copyDirectory(
	source: string,
	target: string,
	variables: TemplateVariables,
): Promise<void> {
	const entries = readdirSync(source)

	for (const entry of entries) {
		const sourcePath = join(source, entry)
		const targetPath = join(target, entry)
		const stats = statSync(sourcePath)

		if (stats.isDirectory()) {
			mkdirSync(targetPath, {recursive: true})
			await copyDirectory(sourcePath, targetPath, variables)
		} else {
			let content = readFileSync(sourcePath, 'utf-8')

			// Replace template variables
			content = content.replace(/\{\{projectName\}\}/g, variables.projectName)
			content = content.replace(/\{\{projectSlug\}\}/g, variables.projectSlug)
			content = content.replace(/\{\{description\}\}/g, variables.description)

			writeFileSync(targetPath, content, 'utf-8')
		}
	}
}
