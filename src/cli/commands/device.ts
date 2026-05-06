import {
	connectWifi,
	listDevices,
	disconnectDevice,
	viewLogs,
} from '../../dev/device.js'
import {Command} from 'commander'

export const deviceCommand = new Command('device').description(
	'Device management commands',
)

deviceCommand
	.command('connect-wifi')
	.description('Connect device over WiFi')
	.action(async () => {
		await connectWifi()
	})

deviceCommand
	.command('list')
	.description('List available devices')
	.action(async () => {
		await listDevices()
	})

deviceCommand
	.command('disconnect')
	.description('Disconnect device')
	.action(async () => {
		await disconnectDevice()
	})

deviceCommand
	.command('log')
	.description('View device logs')
	.action(async () => {
		await viewLogs()
	})
