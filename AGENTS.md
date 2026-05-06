# AGENTS.md

## Essential Information for Agents

### Developer Commands

- **Development server**: `bun flux start` (web: `--web`, tunnel: `--tunnel`)
- **Production build**: `bun flux build` (platform: `--platform android|ios|web`, profile: `--profile development|production`)
- **Run on device**: `bun flux run android|ios|web`
- **Native project generation**: `bun flux prebuild` (clean: `--clean`, platform-specific: `--platform android|ios`)
- **Device management**:
  - Connect WiFi: `bun flux device connect-wifi`
  - List devices: `bun flux device list`
  - View logs: `bun flux device log`
- **Updates**:
  - Create: `bun flux update create`
  - Publish: `bun flux update publish --channel production`
  - Rollback: `bun flux update rollback --version previous`
- **Diagnostics**: `bun flux doctor`, `bun flux info`

### Package Manager & Scripts

- **Required**: Bun (>=1.0.0)
- **Install**: `bun install`
- **Format**: `bun run format` (Prettier with @involvex/prettier-config)
- **Lint**: `bun lint` (ESLint on src/\*_/_.ts)
- **Test**: `bun test`
- **Typecheck**: `bun typecheck` (tsc --noEmit)
- **Build**: `bun run build` (bundles src/index.ts to dist/)

### Project Structure

- `src/` - Source code (components, screens, hooks, utils, services, styles, assets)
- `android/` - Generated Android native code
- `ios/` - Generated iOS native code
- `web/` - Web-specific files
- `flux.config.ts` - Framework configuration (create in project root)
- `package.json` - Dependencies and scripts

### Technology Stack

- **Framework**: React Native (New Architecture)
- **Build System**: Bun
- **Native Runtime**: Capacitor 6+
- **UI**: Web Components based
- **Navigation**: File-based routing
- **JS Engine**: Hermes

### Configuration

Create `flux.config.ts` with:

```typescript
import {defineConfig} from 'flux/config'
export default defineConfig({
	// Required: name, version, slug
	// Platform config: android, ios, web
	// UI: mode, theme, animations, hardwareBackButton
	// Navigation: type, deepLinking, lazy
	// Build: bundler, minify, sourceMaps, treeShaking
	// Development: fastRefresh, hotReload, debug
	// Updates: url, enabled, checkAutomatically
	// plugins: array of plugin names
})
```

### Important Notes

- Monorepo structure: source generates native platforms
- Executed commands assume repository root
- Generated code in android/, ios/, web/ should not be edited directly
- Configuration changes require `bun flux prebuild --clean` to regenerate native projects
