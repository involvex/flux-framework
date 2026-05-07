import {loadConfig} from '../src/config/loader.js'
import {describe, test, expect} from 'bun:test'

describe('Config Loader', () => {
	test('should load config from flux.config.ts', () => {
		const config = loadConfig()
		expect(config).toBeDefined()
		expect(config?.name).toBeDefined()
		expect(config?.version).toBeDefined()
		expect(config?.slug).toBeDefined()
	})

	test('should have platform configuration', () => {
		const config = loadConfig()
		expect(config?.platform).toBeDefined()
		expect(config?.platform?.android).toBeDefined()
	})

	test('should have UI configuration', () => {
		const config = loadConfig()
		expect(config?.ui).toBeDefined()
		expect(config?.ui?.mode).toBeDefined()
		expect(config?.ui?.theme).toBeDefined()
	})

	test('should have build configuration', () => {
		const config = loadConfig()
		expect(config?.build).toBeDefined()
		expect(config?.build?.bundler).toBeDefined()
		expect(config?.build?.minify).toBeDefined()
	})

	test('should have development configuration', () => {
		const config = loadConfig()
		expect(config?.development).toBeDefined()
		expect(config?.development?.fastRefresh).toBeDefined()
		expect(config?.development?.hotReload).toBeDefined()
	})
})
