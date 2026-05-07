import {View} from './View'
import React from 'react'

export interface ActivityIndicatorProps {
	size?: 'small' | 'large' | number
	color?: string
	animating?: boolean
	style?: React.CSSProperties
	className?: string
}

export function ActivityIndicator({
	size = 'small',
	color = '#007AFF',
	animating = true,
	style,
	className,
}: ActivityIndicatorProps) {
	const sizeValue = typeof size === 'number' ? size : size === 'large' ? 36 : 24

	if (!animating) {
		return null
	}

	return (
		<View
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				...style,
			}}
			className={className}
		>
			<div
				style={{
					width: sizeValue,
					height: sizeValue,
					border: `3px solid ${color}`,
					borderTopColor: 'transparent',
					borderRadius: '50%',
					animation: 'spin 1s linear infinite',
				}}
			/>
			<style>{`
				@keyframes spin {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
				}
			`}</style>
		</View>
	)
}
