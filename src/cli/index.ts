#!/usr/bin/env bun
import {doctorCommand} from './commands/doctor.js'
import {deviceCommand} from './commands/device.js'
import {createCommand} from './commands/create.js'
import {initCommand} from './commands/init.js'
import {infoCommand} from './commands/info.js'
import {fileURLToPath} from 'node:url'
import {Command} from 'commander'
import path from 'node:path'

// Heavy commands that run as child processes to avoid bundling vite/esbuild
// into the CLI startup path (which causes ENOENT reading package.json from cwd).
// We intercept them BEFORE Commander parses, so all args are forwarded verbatim.
// In dev: __filename is in src/cli/index.ts -> src/cli/commands/
// In prod: __filename is in dist/index.js -> src/cli/commands/
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = __dirname.endsWith('cli')
const commandsDir = isDev
	? path.join(__dirname, 'commands')
	: path.join(__dirname, '..', 'src', 'cli', 'commands')

const heavyCommands = ['start', 'build', 'run', 'prebuild', 'update']

const cmdArg = process.argv[2]
if (heavyCommands.includes(cmdArg)) {
	const {execFileSync} = await import('child_process')
	try {
		execFileSync(
			'bun',
			[path.join(commandsDir, `${cmdArg}.ts`), ...process.argv.slice(3)],
			{
				stdio: 'inherit',
				cwd: process.cwd(),
				env: {...process.env},
			},
		)
	} catch (e: unknown) {
		if (e instanceof Error && 'status' in e) {
			process.exit((e as {status: number}).status)
		} else {
			process.exit(1)
		}
	}
	process.exit(0)
}

const program = new Command()
	.name('flux')
	.description('Next-generation hybrid mobile development framework')
	.version('0.1.0')

// Lightweight commands (no heavy deps) are statically imported
program.addCommand(createCommand)
program.addCommand(initCommand)
program.addCommand(doctorCommand)
program.addCommand(infoCommand)
program.addCommand(deviceCommand)

program.parse()
