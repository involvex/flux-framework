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
	// Determine project root: in dev, __dirname is src/utils; in prod bundle,
	// __dirname is dist/. Try source-relative path first, then dist-relative.
	const srcTemplatePath = resolve(__dirname, '../../templates', templateName)
	const prodTemplatePath = resolve(__dirname, '../templates', templateName)
	const templatePath = existsSync(srcTemplatePath)
		? srcTemplatePath
		: prodTemplatePath

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
			const binaryExtensions = ['.jar', '.zip', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.svg']
			const ext = entry.slice(entry.lastIndexOf('.')).toLowerCase()
			if (binaryExtensions.includes(ext)) {
				const binaryContent = readFileSync(sourcePath)
				writeFileSync(targetPath, binaryContent)
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
}
