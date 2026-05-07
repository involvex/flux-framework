import {View} from './View'
import React from 'react'

export interface ScrollViewProps {
	children: React.ReactNode
	style?: React.CSSProperties
	className?: string
	horizontal?: boolean
	onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
}

export function ScrollView({
	children,
	style,
	className,
	horizontal = false,
	onScroll,
}: ScrollViewProps) {
	return (
		<div
			style={{
				overflow: 'auto',
				...style,
			}}
			className={className}
			onScroll={onScroll}
		>
			<View
				style={{
					display: 'flex',
					flexDirection: horizontal ? 'row' : 'column',
					minWidth: horizontal ? 'max-content' : '100%',
					minHeight: horizontal ? '100%' : 'max-content',
				}}
			>
				{children}
			</View>
		</div>
	)
}
