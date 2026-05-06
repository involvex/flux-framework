import {FluxConfig, ConfigPlugin} from '../config/types.js'

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
