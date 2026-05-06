# flux

Next-generation hybrid mobile development framework combining the best features of Expo and Ionic.

## Features

- 🚀 **Web-First Development** - Build and debug primarily in browser with live reload
- 📱 **True Cross-Platform** - Single codebase for Android, iOS, and Web
- ⚡ **Fast Reloading** - Universal Fast Refresh across all platforms
- 🔌 **ADB Over WiFi** - Seamless wireless debugging without USB cables
- 🎨 **100+ Components** - Comprehensive UI component library
- 📦 **Continuous Native Generation** - On-demand native project generation
- 🔄 **OTA Updates** - Over-the-air updates without app store submission
- 🛠️ **Modern Tooling** - Bun-powered build system and development server

## Installation

```bash
# Create new project
bun create flux-app my-app

# Navigate to project
cd my-app

# Start development server
bun flux start
```

## CLI Commands

### Development

```bash
# Start development server
bun flux start

# Start web dev server
bun flux start --web

# Start with tunnel support
bun flux start --tunnel
```

### Building

```bash
# Build for production
bun flux build

# Build for specific platform
bun flux build --platform android

# Build with profile
bun flux build --profile development
```

### Running

```bash
# Run on Android
bun flux run android

# Run on iOS
bun flux run ios

# Run on web
bun flux run web
```

### Prebuild

```bash
# Generate native projects
bun flux prebuild

# Clean and regenerate
bun flux prebuild --clean

# Platform-specific prebuild
bun flux prebuild --platform android
```

### Device Management

```bash
# Connect device over WiFi
bun flux device connect-wifi

# List available devices
bun flux device list

# Disconnect device
bun flux device disconnect

# View device logs
bun flux device log
```

### Updates

```bash
# Create update
bun flux update create

# Publish update
bun flux update publish --channel production

# Rollback update
bun flux update rollback --version previous

# Inspect updates
bun flux update inspect
```

### Diagnostics

```bash
# Diagnose project issues
bun flux doctor

# Show project info
bun flux info
```

## Configuration

Create an `flux.config.ts` file in your project root:

```typescript
import {defineConfig} from 'flux/config'

export default defineConfig({
	name: 'My flux App',
	version: '1.0.0',
	slug: 'my-flux-app',

	platform: {
		android: {
			package: 'com.mycompany.myfluxapp',
			versionCode: 1,
			minSdkVersion: 21,
			targetSdkVersion: 34,
		},
		ios: {
			bundleIdentifier: 'com.mycompany.myfluxapp',
			buildNumber: '1',
			supportsTablet: true,
		},
		web: {
			bundler: 'vite',
			output: 'static',
		},
	},

	ui: {
		mode: 'auto',
		theme: 'light',
		animations: true,
		hardwareBackButton: true,
	},

	navigation: {
		type: 'file-based',
		deepLinking: true,
		lazy: true,
	},

	build: {
		bundler: 'bun',
		minify: true,
		sourceMaps: true,
		treeShaking: true,
	},

	development: {
		fastRefresh: true,
		hotReload: true,
		debug: true,
	},

	updates: {
		url: 'https://updates.flux.dev',
		enabled: true,
		checkAutomatically: 'ON_LOAD',
	},

	plugins: [
		'flux-plugin-splash-screen',
		'flux-plugin-icons',
		'flux-plugin-adb-wifi',
	],
})
```

## Components

### Basic Components

```tsx
import {Button, Card, Text, Input, View} from 'flux-ui'

export default function MyScreen() {
	return (
		<Card>
			<Text>Hello from flux!</Text>
			<Input placeholder="Enter text" />
			<Button onClick={() => console.log('Clicked')}>Click Me</Button>
		</Card>
	)
}
```

### Navigation

```tsx
import {useRouter} from 'flux/router'
import {View, Text} from 'flux-ui'

export default function HomeScreen() {
	const router = useRouter()

	return (
		<View>
			<Text>Home Screen</Text>
			<Button onClick={() => router.push('/about')}>Go to About</Button>
		</View>
	)
}
```

## Project Structure

```
flux-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components (file-based routing)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── services/           # API and data services
│   ├── styles/             # Global styles and themes
│   └── assets/             # Static assets
├── android/                # Generated Android native code
├── ios/                    # Generated iOS native code
├── web/                    # Web-specific files
├── flux.config.ts        # Framework configuration
└── package.json            # Dependencies
```

## Technology Stack

- **Core Framework**: React Native (New Architecture)
- **Build System**: Bun
- **Native Runtime**: Capacitor 6+
- **UI Components**: Web Components based
- **Navigation**: File-based routing
- **JavaScript Engine**: Hermes

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Run linter
bun lint

# Type check
bun typecheck

# Build project
bun run build
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details

## Support

- **Documentation**: https://docs.flux.dev
- **GitHub Issues**: https://github.com/flux/flux/issues
- **Discord**: https://discord.gg/flux

## Acknowledgments

flux is built on the shoulders of giants:

- **Expo** - For the excellent React Native framework and tooling
- **Ionic** - For the comprehensive UI component library and web components
- **React Native** - For the amazing cross-platform framework
- **Capacitor** - For the modern native runtime
- **Bun** - For the fast JavaScript runtime and bundler
- **Vite** - For the excellent build tool and dev server
