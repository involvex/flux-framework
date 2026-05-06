export interface FluxConfig {
	name: string
	version: string
	slug: string
	platform: PlatformConfig
	ui: UIConfig
	navigation: NavigationConfig
	build: BuildConfig
	development: DevelopmentConfig
	updates: UpdatesConfig
	plugins: string[] | PluginConfig[]
}

export interface PlatformConfig {
	android?: AndroidConfig
	ios?: IOSConfig
	web?: WebConfig
}

export interface AndroidConfig {
	package: string
	versionCode: number
	minSdkVersion: number
	targetSdkVersion: number
}

export interface IOSConfig {
	bundleIdentifier: string
	buildNumber: string
	supportsTablet: boolean
}

export interface WebConfig {
	bundler: 'vite' | 'webpack'
	output: 'static' | 'server'
}

export interface UIConfig {
	mode: 'ios' | 'md' | 'auto'
	theme: 'light' | 'dark' | 'auto'
	animations: boolean
	hardwareBackButton: boolean
}

export interface NavigationConfig {
	type: 'file-based' | 'manual'
	deepLinking: boolean
	lazy: boolean
}

export interface BuildConfig {
	bundler: 'bun' | 'webpack' | 'metro'
	minify: boolean
	sourceMaps: boolean
	treeShaking: boolean
	codeSplitting?: boolean
	assetOptimization?: boolean
}

export interface DevelopmentConfig {
	fastRefresh: boolean
	hotReload: boolean
	debug: boolean
}

export interface UpdatesConfig {
	url: string
	enabled: boolean
	checkAutomatically: 'ON_LOAD' | 'ON_ERROR_RECOVERY' | 'MANUAL'
}

export interface PluginConfig {
	name: string
	options?: Record<string, any>
}

export type ConfigPlugin = (config: FluxConfig) => FluxConfig
