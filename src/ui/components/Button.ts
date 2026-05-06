import {createElement} from 'react'

export interface ButtonProps {
	children: React.ReactNode
	onClick?: () => void
	mode?: 'ios' | 'md' | 'auto'
	disabled?: boolean
}

export function Button({
	children,
	onClick,
	mode = 'auto',
	disabled = false,
}: ButtonProps) {
	return createElement(
		'button',
		{
			onClick,
			disabled,
			className: `expoic-button expoic-button-${mode}`,
		},
		children,
	)
}
