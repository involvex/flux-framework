import {UpdateInfo, UpdateCheckResult, UpdateOptions} from './types.js'
import {loadConfig} from '../config/loader.js'
import fetch from 'node-fetch'

export class UpdateManager {
	private options: UpdateOptions
	private currentVersion: string
	private updateInfo: UpdateInfo | null = null

	constructor() {
		const config = loadConfig()
		this.options = {
			enabled: config?.updates?.enabled ?? false,
			url: config?.updates?.url ?? '',
			checkAutomatically: config?.updates?.checkAutomatically ?? 'MANUAL',
		}
		this.currentVersion = config?.version ?? '0.0.0'
	}

	async checkForUpdates(): Promise<UpdateCheckResult> {
		if (!this.options.enabled) {
			return {
				hasUpdate: false,
				currentVersion: this.currentVersion,
				latestVersion: this.currentVersion,
			}
		}

		try {
			const response = await fetch(`${this.options.url}/check`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					currentVersion: this.currentVersion,
					platform: 'android',
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to check for updates')
			}

			const data = (await response.json()) as {update: UpdateInfo}
			const updateInfo: UpdateInfo = data.update

			const hasUpdate = this.isNewerVersion(updateInfo.version)

			return {
				hasUpdate,
				update: hasUpdate ? updateInfo : undefined,
				currentVersion: this.currentVersion,
				latestVersion: updateInfo.version,
			}
		} catch (error) {
			console.error('Failed to check for updates:', error)
			return {
				hasUpdate: false,
				currentVersion: this.currentVersion,
				latestVersion: this.currentVersion,
			}
		}
	}

	async downloadUpdate(
		updateInfo: UpdateInfo,
		onProgress?: (progress: number) => void,
	): Promise<void> {
		const asset = updateInfo.assets.find(a => a.platform === 'android')
		if (!asset) {
			throw new Error('No update asset found for Android')
		}

		try {
			const response = await fetch(asset.url)
			if (!response.ok) {
				throw new Error('Failed to download update')
			}

			const contentLength = response.headers.get('content-length')
			const total = contentLength ? parseInt(contentLength, 10) : 0
			let downloaded = 0

			const arrayBuffer = await response.arrayBuffer()
			downloaded = arrayBuffer.byteLength

			if (onProgress && total > 0) {
				const percentage = (downloaded / total) * 100
				onProgress(percentage)
			}

			// Save the update
			await this.saveUpdate(updateInfo)

			this.updateInfo = updateInfo
		} catch (error) {
			console.error('Failed to download update:', error)
			throw error
		}
	}

	async applyUpdate(): Promise<void> {
		if (!this.updateInfo) {
			throw new Error('No update available to apply')
		}

		try {
			// In a real implementation, this would apply the update
			// For now, we'll just log the update
			console.log('Applying update:', this.updateInfo.version)

			// Only reload if we're in a browser environment
			// eslint-disable-next-line no-undef
			if (typeof window !== 'undefined' && window.location) {
				// eslint-disable-next-line no-undef
				window.location.reload()
			}
		} catch (error) {
			console.error('Failed to apply update:', error)
			throw error
		}
	}

	private isNewerVersion(version: string): boolean {
		const current = this.currentVersion.split('.').map(Number)
		const latest = version.split('.').map(Number)

		for (let i = 0; i < Math.max(current.length, latest.length); i++) {
			const currentPart = current[i] ?? 0
			const latestPart = latest[i] ?? 0

			if (latestPart > currentPart) {
				return true
			}
			if (latestPart < currentPart) {
				return false
			}
		}

		return false
	}

	private async saveUpdate(updateInfo: UpdateInfo): Promise<void> {
		// In a real implementation, this would save the update to local storage
		// For now, we'll just store it in memory
		console.log('Saving update:', updateInfo.version)
	}
}

export const updateManager = new UpdateManager()
