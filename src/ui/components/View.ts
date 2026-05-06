import {createElement} from 'react'

export interface ViewProps {
	children: React.ReactNode
	className?: string
}

export function View({children, className = ''}: ViewProps) {
	return createElement(
		'div',
		{
			className: `expoic-view ${className}`,
		},
		children,
	)
}
