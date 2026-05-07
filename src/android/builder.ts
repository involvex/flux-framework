import {execSync} from 'child_process'
import {existsSync} from 'fs'
import {resolve} from 'path'
import chalk from 'chalk'

export interface AndroidBuildOptions {
	buildType: 'debug' | 'release'
	outputType: 'apk' | 'aab'
	package: string
	signingConfig?: SigningConfig
}

export interface SigningConfig {
	storeFile: string
	storePassword: string
	keyAlias: string
	keyPassword: string
}

export async function buildAndroid(options: AndroidBuildOptions) {
	console.log(chalk.blue('🤖 Building Android app...'))
	console.log(chalk.gray(`Build Type: ${options.buildType}`))
	console.log(chalk.gray(`Output Type: ${options.outputType}`))

	const androidDir = resolve(process.cwd(), 'android')

	try {
		// Generate signing configuration if provided
		if (options.signingConfig && options.buildType === 'release') {
			await generateSigningConfig(androidDir, options.signingConfig)
		}

		// Clean previous builds
		console.log(chalk.gray('Cleaning previous builds...'))
		execSync(`cd ${androidDir} && ./gradlew clean`, {stdio: 'inherit'})

		// Build the app
		console.log(chalk.gray('Building app...'))

		if (options.outputType === 'aab') {
			execSync(
				`cd ${androidDir} && ./gradlew bundle${capitalize(options.buildType)}`,
				{
					stdio: 'inherit',
				},
			)
			console.log(chalk.green('✓ AAB build completed'))
		} else {
			execSync(
				`cd ${androidDir} && ./gradlew assemble${capitalize(options.buildType)}`,
				{
					stdio: 'inherit',
				},
			)
			console.log(chalk.green('✓ APK build completed'))
		}

		// Show output location
		const outputDir =
			options.outputType === 'aab'
				? `app/build/outputs/bundle/${options.buildType}`
				: `app/build/outputs/apk/${options.buildType}`

		console.log(chalk.gray(`Output: ${resolve(androidDir, outputDir)}`))
	} catch (error) {
		console.error(chalk.red('✗ Android build failed'))
		throw error
	}
}

async function generateSigningConfig(
	androidDir: string,
	signingConfig: SigningConfig,
): Promise<void> {
	console.log(chalk.gray('Generating signing configuration...'))

	const keystorePath = resolve(androidDir, 'app/release.keystore')

	// Check if keystore already exists
	if (!existsSync(keystorePath)) {
		console.log(chalk.gray('Creating release keystore...'))
		try {
			execSync(
				`keytool -genkey -v -keystore "${keystorePath}" ` +
					`-alias ${signingConfig.keyAlias} ` +
					`-keyalg RSA -keysize 2048 -validity 10000 ` +
					`-storepass ${signingConfig.storePassword} ` +
					`-keypass ${signingConfig.keyPassword} ` +
					`-dname "CN=Flux App, OU=Development, O=Flux, L=City, ST=State, C=US"`,
				{stdio: 'inherit'},
			)
			console.log(chalk.green('✓ Keystore created'))
		} catch (error) {
			console.error(chalk.red('✗ Failed to create keystore'))
			throw error
		}
	}

	// Generate signing configuration file
	const signingConfigContent = `
storeFile=${keystorePath}
storePassword=${signingConfig.storePassword}
keyAlias=${signingConfig.keyAlias}
keyPassword=${signingConfig.keyPassword}
`

	const signingConfigPath = resolve(androidDir, 'app/signing.properties')
	const fs = await import('fs')
	fs.writeFileSync(signingConfigPath, signingConfigContent.trim())
	console.log(chalk.green('✓ Signing configuration generated'))
}

export async function installAndroid(options: AndroidBuildOptions) {
	console.log(chalk.blue('📱 Installing Android app...'))

	const androidDir = resolve(process.cwd(), 'android')

	try {
		// Build the APK first
		await buildAndroid({...options, outputType: 'apk'})

		// Find the APK file
		const apkDir = resolve(
			androidDir,
			`app/build/outputs/apk/${options.buildType}`,
		)
		const apkFiles = execSync(`ls ${apkDir}/*.apk`, {encoding: 'utf-8'})
			.split('\n')
			.filter(f => f.trim())

		if (apkFiles.length === 0) {
			console.error(chalk.red('✗ No APK found'))
			return
		}

		const apkPath = resolve(apkDir, apkFiles[apkFiles.length - 1])

		// Install on connected device
		console.log(chalk.gray('Installing on device...'))
		execSync(`adb install -r ${apkPath}`, {stdio: 'inherit'})
		console.log(chalk.green('✓ App installed successfully'))

		// Launch the app
		const packageName = options.package
		execSync(`adb shell am start -n ${packageName}/.MainActivity`, {
			stdio: 'inherit',
		})
		console.log(chalk.green('✓ App launched'))
	} catch (error) {
		console.error(chalk.red('✗ Installation failed'))
		throw error
	}
}

export async function runAndroid(options: AndroidBuildOptions) {
	console.log(chalk.blue('🚀 Running Android app...'))

	try {
		// Check if device is connected
		const devices = execSync('adb devices', {encoding: 'utf-8'})
		const deviceLines = devices
			.split('\n')
			.slice(1)
			.filter(line => line.trim())

		if (deviceLines.length === 0) {
			console.log(
				chalk.yellow(
					'⚠️  No devices found. Please connect a device or start an emulator.',
				),
			)
			return
		}

		const deviceId = deviceLines[0].split('\t')[0]
		console.log(chalk.green(`✓ Found device: ${deviceId}`))

		// Check if app is already installed
		const packageName = options.package
		try {
			execSync(`adb -s ${deviceId} shell pm list packages ${packageName}`, {
				stdio: 'pipe',
				encoding: 'utf-8',
			})
			console.log(chalk.gray('App already installed, launching...'))
			execSync(
				`adb -s ${deviceId} shell am start -n ${packageName}/.MainActivity`,
				{
					stdio: 'inherit',
				},
			)
		} catch {
			console.log(chalk.gray('App not installed, building and installing...'))
			await installAndroid(options)
		}

		console.log(chalk.green('✓ App running on device'))
	} catch (error) {
		console.error(chalk.red('✗ Failed to run app'))
		throw error
	}
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
