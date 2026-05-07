#!/usr/bin/env bun
import {prebuildCommand} from './commands/prebuild.js'
import {updateCommand} from './commands/update.js'
import {doctorCommand} from './commands/doctor.js'
import {deviceCommand} from './commands/device.js'
import {createCommand} from './commands/create.js'
import {startCommand} from './commands/start.js'
import {buildCommand} from './commands/build.js'
import {initCommand} from './commands/init.js'
import {infoCommand} from './commands/info.js'
import {runCommand} from './commands/run.js'
import {Command} from 'commander'

const program = new Command()

program
	.name('flux')
	.description('Next-generation hybrid mobile development framework')
	.version('0.1.0')

program.addCommand(createCommand)
program.addCommand(initCommand)
program.addCommand(startCommand)
program.addCommand(buildCommand)
program.addCommand(runCommand)
program.addCommand(prebuildCommand)
program.addCommand(deviceCommand)
program.addCommand(updateCommand)
program.addCommand(doctorCommand)
program.addCommand(infoCommand)

program.parse()
