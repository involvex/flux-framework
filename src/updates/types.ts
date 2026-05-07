export interface UpdateInfo {
	version: string
	buildNumber: number
	createdAt: string
	expiredAt?: string
	description?: string
	assets: UpdateAsset[]
}

export interface UpdateAsset {
	platform: 'android' | 'web'
	type: 'bundle' | 'manifest'
	url: string
	hash: string
	size: number
}

export interface UpdateCheckResult {
	hasUpdate: boolean
	update?: UpdateInfo
	currentVersion: string
	latestVersion: string
}

export interface UpdateProgress {
	downloaded: number
	total: number
	percentage: number
}

export interface UpdateOptions {
	checkAutomatically: 'ON_LOAD' | 'ON_ERROR_RECOVERY' | 'MANUAL'
	url: string
	enabled: boolean
}
