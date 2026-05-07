import {nativeModuleRegistry} from '../src/android/native-modules/index.js'
import {LocationModule} from '../src/android/native-modules/Location.js'
import {CameraModule} from '../src/android/native-modules/Camera.js'
import {describe, test, expect} from 'bun:test'

describe('Native Module Registry', () => {
	test('should register modules', () => {
		nativeModuleRegistry.register(CameraModule)
		expect(nativeModuleRegistry.has('Camera')).toBe(true)
	})

	test('should get registered module', () => {
		const module = nativeModuleRegistry.get('Camera')
		expect(module).toBeDefined()
		expect(module?.name).toBe('Camera')
	})

	test('should get all modules', () => {
		nativeModuleRegistry.register(LocationModule)
		const modules = nativeModuleRegistry.getAll()
		expect(modules.length).toBeGreaterThan(0)
	})

	test('should unregister module', () => {
		nativeModuleRegistry.unregister('Camera')
		expect(nativeModuleRegistry.has('Camera')).toBe(false)
	})

	test('should initialize module', async () => {
		nativeModuleRegistry.register(CameraModule)
		await nativeModuleRegistry.initialize('Camera')
		expect(nativeModuleRegistry.has('Camera')).toBe(true)
	})

	test('should cleanup module', async () => {
		await nativeModuleRegistry.cleanup('Camera')
		expect(nativeModuleRegistry.has('Camera')).toBe(true)
	})
})
