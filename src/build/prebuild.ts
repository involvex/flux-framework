import {existsSync, mkdirSync, writeFileSync} from 'fs'
import {loadConfig} from '../config/loader.js'
import {execSync} from 'child_process'
import {resolve} from 'path'
import chalk from 'chalk'

export interface PrebuildOptions {
	clean?: boolean
	platform?: string
}

export async function prebuildNative(options: PrebuildOptions) {
	const config = loadConfig()

	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	console.log(chalk.blue('🔧 Prebuilding native projects...'))

	if (options.clean) {
		console.log(chalk.gray('Cleaning existing native directories...'))
		await cleanNativeDirs()
	}

	try {
		if (!options.platform || options.platform === 'android') {
			await generateAndroid(config)
		}

		console.log(chalk.green('✅ Prebuild completed successfully!'))
	} catch (error) {
		console.error(chalk.red('❌ Prebuild failed:'), error)
		process.exit(1)
	}
}

async function cleanNativeDirs() {
	const dirs = ['android']

	for (const dir of dirs) {
		const dirPath = resolve(process.cwd(), dir)
		if (existsSync(dirPath)) {
			execSync(`rm -rf ${dirPath}`, {stdio: 'inherit'})
			console.log(chalk.gray(`✓ Removed ${dir}/`))
		}
	}
}

async function generateAndroid(config: any) {
	console.log(chalk.blue('🤖 Generating Android project...'))

	const androidDir = resolve(process.cwd(), 'android')

	if (!existsSync(androidDir)) {
		mkdirSync(androidDir, {recursive: true})
	}

	const buildGradle = `
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.0")
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
`

	writeFileSync(resolve(androidDir, 'build.gradle'), buildGradle)
	console.log(chalk.green('✓ Android project generated'))
}
