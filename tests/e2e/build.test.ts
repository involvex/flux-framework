import {describe, test, expect} from 'bun:test'
import {execSync} from 'child_process'
import {existsSync} from 'fs'
import {resolve} from 'path'

describe('Build Process E2E', () => {
	test('should build project successfully', () => {
		try {
			execSync('bun run build', {stdio: 'pipe'})
			expect(true).toBe(true)
		} catch (error) {
			expect(false).toBe(true)
		}
	})

	test('should generate dist directory', () => {
		const distPath = resolve(process.cwd(), 'dist')
		expect(existsSync(distPath)).toBe(true)
	})

	test('should generate index.js bundle', () => {
		const indexPath = resolve(process.cwd(), 'dist/index.js')
		expect(existsSync(indexPath)).toBe(true)
	})

	test('should pass typecheck', () => {
		try {
			execSync('bun run typecheck', {stdio: 'pipe'})
			expect(true).toBe(true)
		} catch (error) {
			expect(false).toBe(true)
		}
	})

	test('should pass linting', () => {
		try {
			execSync('bun run lint', {stdio: 'pipe'})
			expect(true).toBe(true)
		} catch (error) {
			expect(false).toBe(true)
		}
	})
})
