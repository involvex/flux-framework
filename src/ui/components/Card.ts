import {createElement} from 'react'

export interface CardProps {
	children: React.ReactNode
	className?: string
}

export function Card({children, className = ''}: CardProps) {
	return createElement(
		'div',
		{
			className: `expoic-card ${className}`,
		},
		children,
	)
}
