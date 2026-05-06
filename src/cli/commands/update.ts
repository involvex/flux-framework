import {
	createUpdate,
	publishUpdate,
	rollbackUpdate,
	inspectUpdates,
} from '../../build/updates.js'
import {Command} from 'commander'

export const updateCommand = new Command('update').description(
	'Update management commands',
)

updateCommand
	.command('create')
	.description('Create update')
	.action(async () => {
		await createUpdate()
	})

updateCommand
	.command('publish')
	.description('Publish update')
	.option('--channel <channel>', 'Update channel', 'production')
	.action(async options => {
		await publishUpdate({channel: options.channel})
	})

updateCommand
	.command('rollback')
	.description('Rollback update')
	.option('--version <version>', 'Version to rollback to')
	.action(async options => {
		await rollbackUpdate({version: options.version})
	})

updateCommand
	.command('inspect')
	.description('Inspect updates')
	.action(async () => {
		await inspectUpdates()
	})
