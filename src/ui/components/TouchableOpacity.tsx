import {View} from './View'
import React from 'react'

export interface TouchableOpacityProps {
	children: React.ReactNode
	onPress?: () => void
	onLongPress?: () => void
	onPressIn?: () => void
	onPressOut?: () => void
	disabled?: boolean
	style?: React.CSSProperties
	className?: string
	activeOpacity?: number
}

export function TouchableOpacity({
	children,
	onPress,
	onPressIn,
	onPressOut,
	disabled = false,
	style,
	className,
	activeOpacity = 0.7,
}: TouchableOpacityProps) {
	const [isPressed, setIsPressed] = React.useState(false)

	const handlePressIn = () => {
		if (!disabled) {
			setIsPressed(true)
			onPressIn?.()
		}
	}

	const handlePressOut = () => {
		if (!disabled) {
			setIsPressed(false)
			onPressOut?.()
		}
	}

	const handleClick = () => {
		if (!disabled && onPress) {
			onPress()
		}
	}

	return (
		<View
			onClick={handleClick}
			onMouseDown={handlePressIn}
			onMouseUp={handlePressOut}
			onMouseLeave={handlePressOut}
			onTouchStart={handlePressIn}
			onTouchEnd={handlePressOut}
			style={{
				cursor: disabled ? 'not-allowed' : 'pointer',
				opacity: disabled ? 0.5 : isPressed ? activeOpacity : 1,
				transition: 'opacity 0.2s',
				...style,
			}}
			className={className}
		>
			{children}
		</View>
	)
}
