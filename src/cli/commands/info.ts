import {showProjectInfo} from '../../utils/info.js'
import {Command} from 'commander'

export const infoCommand = new Command('info')
	.description('Show project information')
	.action(async () => {
		await showProjectInfo()
	})
