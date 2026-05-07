import {Button} from '../src/ui/components/Button.js'
import {View} from '../src/ui/components/View.js'
import {Text} from '../src/ui/components/Text.js'
import {describe, test, expect} from 'bun:test'
import {render} from '@testing-library/react'
import {createElement} from 'react'

describe('UI Components', () => {
	test('Button should render correctly', () => {
		const {container} = render(createElement(Button, null, 'Click me'))
		expect(container.textContent).toBe('Click me')
	})

	test('Button should handle click events', () => {
		let clicked = false
		const handleClick = () => {
			clicked = true
		}
		const {container} = render(
			createElement(Button, {onClick: handleClick}, 'Click me'),
		)
		const button = container.querySelector('button')
		button?.click()
		expect(clicked).toBe(true)
	})

	test('Text should render correctly', () => {
		const {container} = render(createElement(Text, null, 'Hello World'))
		expect(container.textContent).toBe('Hello World')
	})

	test('View should render children', () => {
		const {container} = render(
			createElement(
				View,
				null,
				createElement(Text, null, 'Child 1'),
				createElement(Text, null, 'Child 2'),
			),
		)
		expect(container.textContent).toBe('Child 1Child 2')
	})

	test('View should apply className', () => {
		const {container} = render(
			createElement(
				View,
				{className: 'test-class'},
				createElement(Text, null, 'Test'),
			),
		)
		const view = container.querySelector('.test-class')
		expect(view).toBeDefined()
	})
})
