export interface NativeModule {
	name: string
	version: string
	description: string
	permissions?: string[]
	dependencies?: string[]
	initialize?: () => Promise<void>
	cleanup?: () => Promise<void>
}

export interface NativeModuleConfig {
	enabled: boolean
	options?: Record<string, unknown>
}
