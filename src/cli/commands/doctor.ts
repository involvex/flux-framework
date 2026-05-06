import {diagnoseProject} from '../../utils/doctor.js'
import {Command} from 'commander'

export const doctorCommand = new Command('doctor')
	.description('Diagnose project issues')
	.action(async () => {
		await diagnoseProject()
	})
