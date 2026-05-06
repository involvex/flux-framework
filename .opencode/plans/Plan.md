# flux - Hybrid Mobile Development Framework

## Project Overview

**flux** is a next-generation hybrid mobile development framework that combines the best features of Expo and Ionic, built on React Native with Bun as the primary build system. The framework enables rapid development with web-based tooling, fast reloading, and seamless native integration.

### Core Philosophy

- **Web-First Development**: Build and debug primarily in browser with live reload
- **True Cross-Platform**: Single codebase for Android, iOS, and Web
- **Modern Architecture**: Leverage React Native New Architecture, JSI, and Hermes
- **Developer Experience**: Fast iteration, powerful tooling, and comprehensive debugging
- **Performance**: Native-level performance with optimized builds and runtime

---

## Architecture Overview

### Technology Stack

**Core Framework:**

- React Native (New Architecture with Fabric & TurboModules)
- React 18+ with concurrent features
- TypeScript for type safety
- Hermes JavaScript Engine (default)

**Build System:**

- Bun for package management and runtime
- Bun's native bundler for production builds
- Metro bundler for React Native development
- Vite for web development and fast refresh

**Native Runtime:**

- Capacitor 6+ for native bridge
- Expo Modules API for native modules
- JSI (JavaScript Interface) for direct native interop

**UI Components:**

- Web Components based (Ionic-style)
- React Native components (Expo-style)
- Adaptive styling system
- Shadow DOM for encapsulation

**Navigation:**

- Expo Router (file-based routing)
- React Navigation integration
- Deep linking support
- Universal across platforms

---

## Key Features

### 1. Web-Based Development with Fast Reloading

**Universal Fast Refresh:**

- Works across Android, iOS, and Web
- Preserves component state during updates
- Artifact memoization in bundler
- Sub-second reload times

**Development Server:**

- Bun-powered dev server with HMR
- Live reloading from local machine
- Tunnel support for remote devices
- QR code scanning for easy connection
- Multiple server switching capability

**Browser-First Development:**

- Most development in browser with `flux serve`
- Full Chrome DevTools integration
- Platform detection for native features
- Responsive design testing
- No native compilation required for most changes

### 2. ADB Over WiFi Support

**Seamless Device Connection:**

- Automatic ADB over WiFi setup
- One-command device pairing
- Wireless debugging without USB cables
- Support for multiple devices simultaneously
- Automatic reconnection on device wake

**Implementation:**

- Built-in ADB WiFi bridge
- Automatic port forwarding
- Device discovery and management
- Connection status monitoring
- Fallback to USB when WiFi unavailable

**Commands:**

```bash
flux device:connect-wifi    # Connect device over WiFi
flux device:list            # List available devices
flux device:disconnect      # Disconnect device
flux device:log             # View device logs
```

### 3. Continuous Native Generation (CNG)

**On-Demand Native Projects:**

- Native projects generated from config
- Similar to node_modules generation
- Easy upgrades and maintenance
- Native directories can be regenerated
- Eliminates manual native project management

**Configuration:**

- Single `flux.config.ts` file
- TypeScript-based configuration
- Platform-specific overrides
- Environment variable support
- Config validation and autocomplete

**Commands:**

```bash
flux prebuild              # Generate native projects
flux prebuild --clean      # Clean and regenerate
flux prebuild --platform android  # Platform-specific
```

### 4. Comprehensive Component Library

**100+ Pre-Built Components:**

**Navigation:**

- Tabs, Tab Bar, Tab Button
- Router, Router Link, Router Outlet
- Menu, Menu Button, Menu Toggle
- Split Pane

**Form Components:**

- Input, Textarea, Checkbox, Radio
- Select, Toggle, Range
- Searchbar, Date/Time Pickers

**Layout:**

- Grid, Row, Column
- Card, Content, List
- Item, Item Group, Item Sliding

**Action Components:**

- Button, FAB
- Alert, Action Sheet, Toast
- Modal, Popover
- Refresher, Reorder

**Media:**

- Icon, Avatar, Thumbnail, Image

**Progress:**

- Progress Bar, Spinner, Skeleton Text

**Features:**

- Web Components based (Shadow DOM)
- Adaptive styling (iOS/Material Design)
- Platform-specific modes
- CSS variables for theming
- Dark mode support
- High contrast mode

### 5. Advanced Animation System

**Web Animations API:**

- Browser-optimized animations
- GPU-accelerated performance
- Gesture integration
- Preference-based (reduced motion)

**Built-in Animations:**

- Page transitions
- Modal animations
- List animations
- Gesture-based animations
- Custom animation support

**Performance:**

- Runs on compositor thread
- Doesn't block JavaScript
- Smooth 60fps animations
- Memory efficient

### 6. Config Plugin System

**Architecture:**

```
withMyPlugin (Config Plugin)
→ withAndroidPlugin, withIosPlugin (Plugin Function)
→ withAndroidManifest, withInfoPlist (Mod Plugin Function)
→ mods.android.manifest, mods.ios.infoplist (Mod)
```

**Features:**

- Synchronous functions accepting config
- Named with `with<PluginName>` convention
- Serializable return values
- Evaluated during app config phase
- Mods evaluated during prebuild syncing

**Use Cases:**

- Generate app icons
- Set app names
- Configure AndroidManifest.xml
- Configure Info.plist
- Native project modifications
- Predictable native changes

### 7. OTA Updates

**Over-the-Air Updates:**

- Update JavaScript without app store submission
- Runtime version policies for compatibility
- Rollout support for gradual deployment
- Update insights and tracking
- Republish for quick rollbacks

**Implementation:**

- Bundle versioning
- Update channels (dev, preview, production)
- Automatic update checking
- User-controlled updates
- Fallback to previous version

**Commands:**

```bash
flux update:create         # Create update
flux update:publish        # Publish update
flux update:rollback       # Rollback update
flux update:inspect        # Inspect updates
```

### 8. Cloud Build Services

**EAS Build Integration:**

- Cloud builds for Android and iOS
- Consistent build environments
- Automatic credential management
- Internal distribution with URLs
- Build profiles in config
- Auto-submit to app stores

**Build Profiles:**

- Development builds for testing
- Preview builds for internal distribution
- Production builds for app stores
- Custom build configurations

**Local Builds:**

- Build with Android Studio and Xcode
- `flux run:android` and `flux run:ios`
- Native debugging capabilities
- Custom build configurations
- Build cache providers

### 9. File-Based Routing

**Expo Router Integration:**

- Native navigation with React Native Screens
- Automatic deep linking for all screens
- Offline-first with automatic updates
- Lazy-evaluation in production
- Deferred bundling in development
- Universal across platforms

**Benefits:**

- Simpler mental model
- Automatic deep linking
- Easier refactoring
- Typed routes for safety
- Async routes for bundle splitting
- Better upgrade isolation

### 10. Performance Optimizations

**Build Optimizations:**

- Bun bundler for fast builds
- Tree shaking for unused code
- Code splitting and lazy loading
- Asset optimization
- Source maps for debugging

**Runtime Optimizations:**

- Hermes JavaScript engine
- JSI for direct native interop
- No bridge overhead
- Virtual scroll for large lists
- Memoization and caching

**Bundle Optimizations:**

- Automatic bundle analysis
- Bundle size reporting
- Dead code elimination
- Minification and compression

---

## Development Workflow

### Initial Setup

```bash
# Create new project
bun create flux-app my-app

# Navigate to project
cd my-app

# Start development server
bun flux start

# Open in browser
# Automatically opens at http://localhost:8081
```

### Development Loop

**1. Write and Run JavaScript Code:**

```bash
# Start dev server with fast refresh
bun flux start

# Open in browser
bun flux open --web

# Connect Android device over WiFi
bun flux device:connect-wifi

# View on device
# Scan QR code or use device URL
```

**2. Update Configuration:**

```bash
# Edit flux.config.ts
# Changes applied automatically
```

**3. Write Native Code:**

```bash
# Create development build
bun flux prebuild
bun flux run:android

# Or use cloud build
bun flux build --platform android --profile development
```

**4. Install Libraries:**

```bash
# Install flux-compatible libraries
bun flux install expo-camera

# Install any React Native library
bun add react-native-maps
bun flux prebuild
```

### Debugging

**Browser Debugging:**

```bash
# Start with debugging enabled
bun flux start --debug

# Open Chrome DevTools
# Automatic connection
```

**Native Debugging:**

```bash
# Android debugging
bun flux run:android
# Open Android Studio and attach debugger

# iOS debugging
bun flux run:ios
# Open Xcode and attach debugger
```

**Production Debugging:**

```bash
# Test production build locally
bun flux start --no-dev --minify

# View crash reports
bun flux crash:report
```

---

## Project Structure

```
flux-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Shared components
│   │   ├── navigation/     # Navigation components
│   │   └── forms/          # Form components
│   ├── screens/            # Screen components (file-based routing)
│   │   ├── index.tsx       # Home screen
│   │   ├── about.tsx       # About screen
│   │   └── [id].tsx        # Dynamic routes
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── services/           # API and data services
│   ├── styles/             # Global styles and themes
│   │   ├── theme.ts        # Theme configuration
│   │   └── global.css      # Global styles
│   └── assets/             # Static assets
│       ├── images/
│       ├── fonts/
│       └── icons/
├── android/                # Generated Android native code
├── ios/                    # Generated iOS native code
├── web/                    # Web-specific files
├── flux.config.ts        # Framework configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── bun.lockb               # Bun lock file
└── README.md               # Project documentation
```

---

## Configuration

### flux.config.ts

```typescript
import {defineConfig} from 'flux/config'

export default defineConfig({
	// App metadata
	name: 'My flux App',
	version: '1.0.0',
	slug: 'my-flux-app',

	// Platform configuration
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

	// UI configuration
	ui: {
		mode: 'auto', // 'ios', 'md', 'auto'
		theme: 'light', // 'light', 'dark', 'auto'
		animations: true,
		hardwareBackButton: true,
	},

	// Navigation configuration
	navigation: {
		type: 'file-based', // 'file-based', 'manual'
		deepLinking: true,
		lazy: true,
	},

	// Build configuration
	build: {
		bundler: 'bun',
		minify: true,
		sourceMaps: true,
		treeShaking: true,
	},

	// Development configuration
	development: {
		fastRefresh: true,
		hotReload: true,
		debug: true,
	},

	// Update configuration
	updates: {
		url: 'https://updates.flux.dev',
		enabled: true,
		checkAutomatically: 'ON_LOAD',
	},

	// Plugins
	plugins: [
		'flux-plugin-splash-screen',
		'flux-plugin-icons',
		'flux-plugin-adb-wifi',
	],
})
```

---

## CLI Commands

### Core Commands

```bash
# Development
flux start                    # Start development server
flux start --web            # Start web dev server
flux start --tunnel         # Start with tunnel support

# Building
flux build                  # Build for production
flux build --platform android
flux build --profile development

# Running
flux run:android            # Run on Android
flux run:ios                # Run on iOS
flux run:web                # Run on web

# Prebuild
flux prebuild               # Generate native projects
flux prebuild --clean       # Clean and regenerate

# Updates
flux update:create          # Create update
flux update:publish         # Publish update
flux update:rollback        # Rollback update

# Device Management
flux device:connect-wifi    # Connect device over WiFi
flux device:list            # List available devices
flux device:disconnect      # Disconnect device
flux device:log             # View device logs

# Diagnostics
flux doctor                 # Diagnose project issues
flux info                   # Show project info
flux version                # Show version info
```

---

## Plugin System

### Creating a Plugin

```typescript
// plugins/flux-plugin-my-feature.ts
import {ConfigPlugin} from 'flux/config'

const withMyFeature: ConfigPlugin = config => {
	return withAndroid(config, config => {
		// Modify Android configuration
		config.modResults = withAndroidManifest(config, config => {
			const manifest = config.modResults
			// Modify manifest
			return config
		})
		return config
	})
}

export default withMyFeature
```

### Using a Plugin

```typescript
// flux.config.ts
export default defineConfig({
	plugins: [
		'flux-plugin-my-feature',
		[
			'flux-plugin-my-feature',
			{
				// Plugin options
				enabled: true,
			},
		],
	],
})
```

---

## Component Usage

### Basic Component

```tsx
import {Button, Card, Text} from 'flux-ui'

export default function MyScreen() {
	return (
		<Card>
			<Text>Hello from flux!</Text>
			<Button onClick={() => console.log('Clicked')}>Click Me</Button>
		</Card>
	)
}
```

### Platform-Specific Component

```tsx
import {Button} from 'flux-ui'
import {Platform} from 'flux'

export default function MyButton() {
	return (
		<Button
			mode={Platform.OS === 'ios' ? 'ios' : 'md'}
			onClick={() => console.log('Clicked')}
		>
			Platform Button
		</Button>
	)
}
```

### Navigation

```tsx
// screens/index.tsx
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

// screens/about.tsx
import {View, Text} from 'flux-ui'

export default function AboutScreen() {
	return (
		<View>
			<Text>About Screen</Text>
		</View>
	)
}
```

---

## Performance Optimization

### Build Optimization

```typescript
// flux.config.ts
export default defineConfig({
	build: {
		bundler: 'bun',
		minify: true,
		sourceMaps: false, // Disable in production
		treeShaking: true,
		codeSplitting: true,
		assetOptimization: true,
	},
})
```

### Runtime Optimization

```typescript
// Use Hermes
flux.config.ts
export default defineConfig({
	jsEngine: 'hermes',
})

// Use JSI modules
import {MyNativeModule} from 'flux-native'

// Direct native interop without bridge overhead
const result = await MyNativeModule.fastOperation()
```

### Component Optimization

```tsx
import {memo, useMemo, useCallback} from 'react'
import {VirtualList} from 'flux-ui'

const MyComponent = memo(({data}) => {
	const processedData = useMemo(() => {
		return data.map(item => ({...item, processed: true}))
	}, [data])

	const handleClick = useCallback(id => {
		console.log('Clicked:', id)
	}, [])

	return (
		<VirtualList
			data={processedData}
			renderItem={({item}) => (
				<Item onClick={() => handleClick(item.id)}>{item.name}</Item>
			)}
		/>
	)
})
```

---

## Testing

### Unit Testing

```bash
# Run tests
bun flux test

# Run tests in watch mode
bun flux test --watch

# Run tests with coverage
bun flux test --coverage
```

### E2E Testing

```bash
# Run E2E tests
bun flux test:e2e

# Run E2E tests on specific platform
bun flux test:e2e --platform android
```

### Testing Example

```typescript
// MyComponent.test.tsx
import { render, screen } from '@flux/test';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles click', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## Deployment

### Web Deployment

```bash
# Build for web
bun flux build --platform web

# Deploy to hosting
bun flux deploy --platform web
```

### Android Deployment

```bash
# Build APK
bun flux build --platform android --profile production

# Build AAB for Play Store
bun flux build --platform android --profile production --type app-bundle

# Submit to Play Store
bun flux submit --platform android
```

### iOS Deployment

```bash
# Build IPA
bun flux build --platform ios --profile production

# Submit to App Store
bun flux submit --platform ios
```

### OTA Updates

```bash
# Create and publish update
bun flux update:create
bun flux update:publish --channel production

# Rollback if needed
bun flux update:rollback --version previous
```

---

## Documentation

### API Documentation

- Component API: Full documentation of all UI components
- Plugin API: Guide for creating custom plugins
- Config API: Complete configuration reference
- CLI API: All CLI commands and options

### Guides

- Getting Started: Quick start guide
- Development Guide: Development workflow and best practices
- Deployment Guide: Deployment to various platforms
- Performance Guide: Performance optimization techniques
- Plugin Development: Creating custom plugins
- Migration Guide: Migrating from Expo or Ionic

### Examples

- Starter Templates: Pre-configured project templates
- Component Examples: Usage examples for all components
- Integration Examples: Integration with third-party services
- Best Practices: Recommended patterns and practices

---

## Roadmap

### Phase 1: Foundation (Months 1-3)

**Core Framework:**

- [x] Project architecture design
- [ ] Basic CLI implementation
- [ ] Config system
- [ ] Build system integration (Bun)
- [ ] Development server
- [ ] Fast refresh implementation

**UI Components:**

- [ ] Core component library (50 components)
- [ ] Adaptive styling system
- [ ] Theme system
- [ ] Web Components integration

**Navigation:**

- [ ] File-based routing
- [ ] Deep linking
- [ ] Navigation components

### Phase 2: Advanced Features (Months 4-6)

**Native Integration:**

- [ ] Capacitor integration
- [ ] Expo Modules API
- [ ] JSI support
- [ ] Native module system

**Build & Deploy:**

- [ ] Production builds
- [ ] Cloud build integration
- [ ] OTA updates
- [ ] App store submission

**Tooling:**

- [ ] VS Code extension
- [ ] Debugging tools
- [ ] Performance profiling
- [ ] Bundle analysis

### Phase 3: Ecosystem (Months 7-9)

**Plugin System:**

- [ ] Config plugin API
- [ ] Plugin marketplace
- [ ] Official plugins
- [ ] Community plugins

**Testing:**

- [ ] Unit testing framework
- [ ] E2E testing
- [ ] Testing utilities
- [ ] Coverage reporting

**Documentation:**

- [ ] Complete API docs
- [ ] Guides and tutorials
- [ ] Examples and templates
- [ ] Video tutorials

### Phase 4: Polish & Optimization (Months 10-12)

**Performance:**

- [ ] Bundle optimization
- [ ] Runtime optimization
- [ ] Memory optimization
- [ ] Animation performance

**Developer Experience:**

- [ ] Error handling
- [ ] Warning system
- [ ] Migration tools
- [ ] Upgrade guides

**Community:**

- [ ] Contribution guidelines
- [ ] Issue templates
- [ ] PR templates
- [ ] Community guidelines

---

## Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/flux/flux.git
cd flux

# Install dependencies
bun install

# Run tests
bun test

# Run linter
bun lint

# Build project
bun build
```

### Contribution Guidelines

- Follow the code of conduct
- Write tests for new features
- Update documentation
- Follow the contribution guide
- Submit pull requests with clear descriptions

---

## License

MIT License - See LICENSE file for details

---

## Support

- **Documentation**: https://docs.flux.dev
- **GitHub Issues**: https://github.com/flux/flux/issues
- **Discord**: https://discord.gg/flux
- **Twitter**: @fluxframework

---

## Acknowledgments

flux is built on the shoulders of giants:

- **Expo**: For the excellent React Native framework and tooling
- **Ionic**: For the comprehensive UI component library and web components
- **React Native**: For the amazing cross-platform framework
- **Capacitor**: For the modern native runtime
- **Bun**: For the fast JavaScript runtime and bundler
- **Vite**: For the excellent build tool and dev server

Thank you to all contributors and maintainers of these projects!
