import {FluxConfig, ConfigPlugin, PluginConfig} from '../config/types.js'

export interface PluginContext {
	config: FluxConfig
	projectRoot: string
	platform: 'android' | 'web' | 'all'
}

export interface PluginHooks {
	// Build lifecycle hooks
	preBuild?: (context: PluginContext) => Promise<void>
	postBuild?: (context: PluginContext) => Promise<void>

	// Dev lifecycle hooks
	preDev?: (context: PluginContext) => Promise<void>
	postDev?: (context: PluginContext) => Promise<void>

	// Config hooks
	modifyConfig?: (config: FluxConfig) => FluxConfig

	// Android-specific hooks
	android?: {
		preBuild?: (context: PluginContext) => Promise<void>
		postBuild?: (context: PluginContext) => Promise<void>
		modifyGradle?: (gradle: string) => string
		modifyManifest?: (manifest: string) => string
	}

	// Web-specific hooks
	web?: {
		preBuild?: (context: PluginContext) => Promise<void>
		postBuild?: (context: PluginContext) => Promise<void>
		modifyViteConfig?: (config: unknown) => unknown
	}
}

export interface FluxPlugin extends PluginConfig {
	name: string
	version: string
	description?: string
	author?: string
	dependencies?: string[]
	hooks?: PluginHooks
}

export class PluginManager {
	private plugins = new Map<string, FluxPlugin>()
	private context: PluginContext

	constructor(config: FluxConfig, projectRoot: string) {
		this.context = {
			config,
			projectRoot,
			platform: 'all',
		}
	}

	register(plugin: FluxPlugin): void {
		if (this.plugins.has(plugin.name)) {
			throw new Error(`Plugin ${plugin.name} is already registered`)
		}
		this.plugins.set(plugin.name, plugin)
	}

	unregister(name: string): void {
		this.plugins.delete(name)
	}

	get(name: string): FluxPlugin | undefined {
		return this.plugins.get(name)
	}

	getAll(): FluxPlugin[] {
		return Array.from(this.plugins.values())
	}

	has(name: string): boolean {
		return this.plugins.has(name)
	}

	async executeHook(
		hookName: keyof PluginHooks,
		platform?: 'android' | 'web',
	): Promise<void> {
		for (const plugin of this.plugins.values()) {
			if (!plugin.hooks) continue

			let hookFn: ((context: PluginContext) => Promise<void>) | undefined

			if (platform && plugin.hooks[platform]) {
				const platformHooks = plugin.hooks[platform] as PluginHooks
				hookFn = platformHooks[hookName] as (
					context: PluginContext,
				) => Promise<void>
			} else {
				hookFn = plugin.hooks[hookName] as (
					context: PluginContext,
				) => Promise<void>
			}

			if (hookFn) {
				try {
					await hookFn(this.context)
				} catch (error) {
					console.error(
						`Error executing hook ${hookName} in plugin ${plugin.name}:`,
						error,
					)
					throw error
				}
			}
		}
	}

	async modifyConfig(config: FluxConfig): Promise<FluxConfig> {
		let modifiedConfig = config

		for (const plugin of this.plugins.values()) {
			if (plugin.hooks?.modifyConfig) {
				modifiedConfig = plugin.hooks.modifyConfig(modifiedConfig)
			}
		}

		return modifiedConfig
	}

	async modifyGradle(gradle: string): Promise<string> {
		let modifiedGradle = gradle

		for (const plugin of this.plugins.values()) {
			if (plugin.hooks?.android?.modifyGradle) {
				modifiedGradle = plugin.hooks.android.modifyGradle(modifiedGradle)
			}
		}

		return modifiedGradle
	}

	async modifyManifest(manifest: string): Promise<string> {
		let modifiedManifest = manifest

		for (const plugin of this.plugins.values()) {
			if (plugin.hooks?.android?.modifyManifest) {
				modifiedManifest = plugin.hooks.android.modifyManifest(modifiedManifest)
			}
		}

		return modifiedManifest
	}

	async modifyViteConfig(config: unknown): Promise<unknown> {
		let modifiedConfig = config

		for (const plugin of this.plugins.values()) {
			if (plugin.hooks?.web?.modifyViteConfig) {
				modifiedConfig = plugin.hooks.web.modifyViteConfig(modifiedConfig)
			}
		}

		return modifiedConfig
	}
}

export function withPlugin(
	config: FluxConfig,
	plugin: ConfigPlugin,
): FluxConfig {
	return plugin(config)
}

export function createPlugin(name: string, fn: ConfigPlugin): ConfigPlugin {
	return config => {
		console.log(`Applying plugin: ${name}`)
		return fn(config)
	}
}

export * from '../config/types.js'
export * from './built-in/index.js'
