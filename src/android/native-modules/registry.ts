import {NativeModule} from './types.js'

class NativeModuleRegistry {
	private modules = new Map<string, NativeModule>()

	register(module: NativeModule): void {
		if (this.modules.has(module.name)) {
			throw new Error(`Module ${module.name} is already registered`)
		}
		this.modules.set(module.name, module)
	}

	unregister(name: string): void {
		this.modules.delete(name)
	}

	get(name: string): NativeModule | undefined {
		return this.modules.get(name)
	}

	getAll(): NativeModule[] {
		return Array.from(this.modules.values())
	}

	has(name: string): boolean {
		return this.modules.has(name)
	}

	async initialize(name: string): Promise<void> {
		const module = this.get(name)
		if (!module) {
			throw new Error(`Module ${name} not found`)
		}
		if (module.initialize) {
			await module.initialize()
		}
	}

	async cleanup(name: string): Promise<void> {
		const module = this.get(name)
		if (!module) {
			throw new Error(`Module ${name} not found`)
		}
		if (module.cleanup) {
			await module.cleanup()
		}
	}
}

export const nativeModuleRegistry = new NativeModuleRegistry()
