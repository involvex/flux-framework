import {execSync} from 'child_process'
import chalk from 'chalk'

export async function connectWifi() {
	console.log(chalk.blue('📡 Connecting device over WiFi...'))

	try {
		const devices = execSync('adb devices', {encoding: 'utf-8'})
		const deviceLines = devices
			.split('\n')
			.slice(1)
			.filter(line => line.trim())

		if (deviceLines.length === 0) {
			console.log(
				chalk.yellow('⚠️  No devices found. Please connect via USB first.'),
			)
			return
		}

		const deviceId = deviceLines[0].split('\t')[0]
		console.log(chalk.green(`✓ Found device: ${deviceId}`))

		const ip = execSync(`adb -s ${deviceId} shell ip addr show wlan0`, {
			encoding: 'utf-8',
		})
		const ipMatch = ip.match(/inet (\d+\.\d+\.\d+\.\d+)/)

		if (!ipMatch) {
			console.log(chalk.red('✗ Could not find device IP'))
			return
		}

		const deviceIp = ipMatch[1]
		console.log(chalk.green(`✓ Device IP: ${deviceIp}`))

		execSync(`adb tcpip 5555`, {encoding: 'utf-8'})
		console.log(chalk.green('✓ TCP mode enabled'))

		execSync(`adb connect ${deviceIp}:5555`, {encoding: 'utf-8'})
		console.log(chalk.green(`✓ Connected to ${deviceIp}:5555`))

		console.log(chalk.blue('🎉 Device connected over WiFi!'))
	} catch (error) {
		console.error(chalk.red('Error connecting device:'), error)
	}
}

export async function listDevices() {
	console.log(chalk.blue('📱 Listing devices...'))

	try {
		const devices = execSync('adb devices', {encoding: 'utf-8'})
		const deviceLines = devices
			.split('\n')
			.slice(1)
			.filter(line => line.trim())

		if (deviceLines.length === 0) {
			console.log(chalk.yellow('⚠️  No devices found'))
			return
		}

		console.log(chalk.green(`Found ${deviceLines.length} device(s):`))
		deviceLines.forEach((line, index) => {
			const [id, status] = line.split('\t')
			console.log(`  ${index + 1}. ${id} - ${status}`)
		})
	} catch (error) {
		console.error(chalk.red('Error listing devices:'), error)
	}
}

export async function disconnectDevice() {
	console.log(chalk.blue('📡 Disconnecting device...'))

	try {
		execSync('adb disconnect', {encoding: 'utf-8'})
		console.log(chalk.green('✓ Device disconnected'))
	} catch (error) {
		console.error(chalk.red('Error disconnecting device:'), error)
	}
}

export async function viewLogs() {
	console.log(chalk.blue('📋 Viewing device logs...'))
	console.log(chalk.gray('Press Ctrl+C to exit'))

	try {
		execSync('adb logcat', {stdio: 'inherit'})
	} catch (error) {
		console.error(chalk.red('Error viewing logs:'), error)
	}
}
