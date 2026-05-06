import {readFileSync, existsSync} from 'fs'
import {FluxConfig} from './types.js'
import {resolve} from 'path'

export function loadConfig(): FluxConfig | null {
	const configPath = resolve(process.cwd(), 'flux.config.ts')

	if (!existsSync(configPath)) {
		console.warn('flux.config.ts not found')
		return null
	}

	try {
		const configContent = readFileSync(configPath, 'utf-8')

		const configMatch = configContent.match(
			/export default defineConfig\(([\s\S]*?)\)/,
		)
		if (!configMatch) {
			throw new Error('Could not find config definition')
		}

		const configStr = configMatch[1]
		const config = eval(`(${configStr})`) as FluxConfig &
			Record<string, unknown>

		return validateConfig(config)
	} catch (error) {
		console.error('Error loading config:', error)
		return null
	}
}

export function validateConfig(config: Record<string, unknown>): FluxConfig {
	const required = ['name', 'version', 'slug'] as const

	for (const field of required) {
		if (!config[field]) {
			throw new Error(`Missing required config field: ${field}`)
		}
	}

	return config as unknown as FluxConfig
}

export function defineConfig(config: FluxConfig): FluxConfig {
	return config
}
