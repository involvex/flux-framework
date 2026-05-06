import {createElement} from 'react'

export interface TextProps {
	children: React.ReactNode
	className?: string
}

export function Text({children, className = ''}: TextProps) {
	return createElement(
		'span',
		{
			className: `expoic-text ${className}`,
		},
		children,
	)
}
