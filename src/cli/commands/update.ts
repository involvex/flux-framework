import {Command} from 'commander'

export const updateCommand = new Command('update').description(
	'Update management commands',
)

updateCommand
	.command('create')
	.description('Create update')
	.action(async () => {
		const {createUpdate} = await import('../../build/updates.js')
		await createUpdate()
	})

updateCommand
	.command('publish')
	.description('Publish update')
	.option('--channel <channel>', 'Update channel', 'production')
	.action(async (options: Record<string, unknown>) => {
		const {publishUpdate} = await import('../../build/updates.js')
		await publishUpdate({channel: options.channel as string | undefined})
	})

updateCommand
	.command('rollback')
	.description('Rollback update')
	.option('--version <version>', 'Version to rollback to')
	.action(async (options: Record<string, unknown>) => {
		const {rollbackUpdate} = await import('../../build/updates.js')
		await rollbackUpdate({version: options.version as string | undefined})
	})

updateCommand
	.command('inspect')
	.description('Inspect updates')
	.action(async () => {
		const {inspectUpdates} = await import('../../build/updates.js')
		await inspectUpdates()
	})

updateCommand.parse(process.argv)
