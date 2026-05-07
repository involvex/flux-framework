import {defineConfig} from 'bun:test'

export default defineConfig({
	testMatch: ['**/*.test.ts', '**/*.test.tsx'],
	testTimeout: 10000,
})
