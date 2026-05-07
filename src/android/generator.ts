import type {AndroidConfig, FluxConfig} from '../config/types.js'
import {nativeModuleRegistry} from './native-modules/index.js'
import {writeFileSync, mkdirSync, existsSync} from 'fs'
import {loadConfig} from '../config/loader.js'
import {resolve} from 'path'
import chalk from 'chalk'

export interface AndroidBuildOptions {
	package: string
	versionCode: number
	minSdkVersion: number
	targetSdkVersion: number
	buildType: 'debug' | 'release'
	outputType: 'apk' | 'aab'
}

export async function generateAndroidProject() {
	const config = loadConfig()
	if (!config) {
		console.error('Failed to load config')
		return
	}

	console.log(chalk.blue('🤖 Generating Android project...'))

	const androidDir = resolve(process.cwd(), 'android')
	if (!existsSync(androidDir)) {
		mkdirSync(androidDir, {recursive: true})
	}

	const androidConfig = config.platform?.android
	if (!androidConfig) {
		console.error(chalk.red('✗ Android configuration not found'))
		return
	}

	// Generate Gradle files
	await generateGradleFiles(androidDir, androidConfig)

	// Generate AndroidManifest.xml
	await generateAndroidManifest(androidDir, config)

	// Generate MainActivity
	await generateMainActivity(androidDir, config)

	// Generate build.gradle files
	await generateAppBuildGradle(androidDir, config)

	// Generate settings.gradle
	await generateSettingsGradle(androidDir)

	// Generate gradle.properties
	await generateGradleProperties(androidDir)

	console.log(chalk.green('✓ Android project generated successfully'))
}

function collectModulePermissions(): string[] {
	const modules = nativeModuleRegistry.getAll()
	const permissions = new Set<string>()

	for (const module of modules) {
		if (module.permissions) {
			for (const permission of module.permissions) {
				permissions.add(permission)
			}
		}
	}

	return Array.from(permissions)
}

function collectModuleDependencies(): string[] {
	const modules = nativeModuleRegistry.getAll()
	const dependencies = new Set<string>()

	for (const module of modules) {
		if (module.dependencies) {
			for (const dependency of module.dependencies) {
				dependencies.add(dependency)
			}
		}
	}

	return Array.from(dependencies)
}

async function generateGradleFiles(androidDir: string, config: AndroidConfig) {
	const buildGradle = `
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = ${config.minSdkVersion}
        compileSdkVersion = ${config.targetSdkVersion}
        targetSdkVersion = ${config.targetSdkVersion}
        ndkVersion = "25.1.8937393"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.0")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.0")
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
}

async function generateAndroidManifest(androidDir: string, config: FluxConfig) {
	const manifestDir = resolve(androidDir, 'app/src/main')
	if (!existsSync(manifestDir)) {
		mkdirSync(manifestDir, {recursive: true})
	}

	const modulePermissions = collectModulePermissions()
	const permissionsXml = modulePermissions
		.map(permission => `    <uses-permission android:name="${permission}" />`)
		.join('\n')

	const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${config.platform?.android?.package}">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
${permissionsXml}

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="${config.name}"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:configChanges="orientation|keyboardHidden|screenSize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`

	writeFileSync(resolve(manifestDir, 'AndroidManifest.xml'), manifest)
}

async function generateMainActivity(androidDir: string, config: FluxConfig) {
	const mainActivityDir = resolve(androidDir, 'app/src/main/java/com/flux/app')
	if (!existsSync(mainActivityDir)) {
		mkdirSync(mainActivityDir, {recursive: true})
	}

	const mainActivity = `package com.flux.app;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "${config.slug}";
    }
}
`

	writeFileSync(resolve(mainActivityDir, 'MainActivity.java'), mainActivity)
}

async function generateAppBuildGradle(androidDir: string, config: FluxConfig) {
	const appDir = resolve(androidDir, 'app')
	if (!existsSync(appDir)) {
		mkdirSync(appDir, {recursive: true})
	}

	const moduleDependencies = collectModuleDependencies()
	const dependenciesXml = moduleDependencies
		.map(dep => `    implementation '${dep}'`)
		.join('\n')

	const buildGradle = `
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace '${config.platform?.android?.package}'
    compileSdk ${config.platform?.android?.targetSdkVersion}

    defaultConfig {
        applicationId "${config.platform?.android?.package}"
        minSdk ${config.platform?.android?.minSdkVersion}
        targetSdk ${config.platform?.android?.targetSdkVersion}
        versionCode ${config.platform?.android?.versionCode}
        versionName "${config.version}"
    }

    signingConfigs {
        release {
            if (project.hasProperty('releaseStoreFile')) {
                storeFile file(project.releaseStoreFile)
                storePassword project.releaseStorePassword
                keyAlias project.releaseKeyAlias
                keyPassword project.releaseKeyPassword
            }
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = '17'
    }
}

dependencies {
    implementation 'com.facebook.react:react-android:0.73.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
${dependenciesXml}
}
`

	writeFileSync(resolve(appDir, 'build.gradle'), buildGradle)
}

async function generateSettingsGradle(androidDir: string) {
	const settingsGradle = `
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "flux"
include ':app'
`

	writeFileSync(resolve(androidDir, 'settings.gradle'), settingsGradle)
}

async function generateGradleProperties(androidDir: string) {
	const gradleProps = `
# Project-wide Gradle settings.
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
`

	writeFileSync(resolve(androidDir, 'gradle.properties'), gradleProps)
}
