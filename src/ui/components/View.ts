import {createElement} from 'react'

export interface ViewProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	onClick?: () => void
	onMouseDown?: () => void
	onMouseUp?: () => void
	onMouseLeave?: () => void
	onTouchStart?: () => void
	onTouchEnd?: () => void
}

export function View({
	children,
	className = '',
	style,
	onClick,
	onMouseDown,
	onMouseUp,
	onMouseLeave,
	onTouchStart,
	onTouchEnd,
}: ViewProps) {
	return createElement(
		'div',
		{
			className: `expoic-view ${className}`,
			style,
			onClick,
			onMouseDown,
			onMouseUp,
			onMouseLeave,
			onTouchStart,
			onTouchEnd,
		},
		children,
	)
}
