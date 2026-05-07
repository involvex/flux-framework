import {View} from './View'
import React from 'react'

export interface SliderProps {
	value: number
	onValueChange?: (value: number) => void
	minimumValue?: number
	maximumValue?: number
	step?: number
	disabled?: boolean
	style?: React.CSSProperties
	className?: string
	minimumTrackTintColor?: string
	maximumTrackTintColor?: string
	thumbTintColor?: string
}

export function Slider({
	value,
	onValueChange,
	minimumValue = 0,
	maximumValue = 100,
	step = 1,
	disabled = false,
	style,
	className,
	minimumTrackTintColor = '#007AFF',
	maximumTrackTintColor = '#767577',
	thumbTintColor = '#007AFF',
}: SliderProps) {
	const percentage =
		((value - minimumValue) / (maximumValue - minimumValue)) * 100

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!disabled && onValueChange) {
			const newValue = Number(event.target.value)
			onValueChange(newValue)
		}
	}

	return (
		<View
			style={{
				display: 'flex',
				alignItems: 'center',
				...style,
			}}
			className={className}
		>
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: 4,
					backgroundColor: maximumTrackTintColor,
					borderRadius: 2,
					opacity: disabled ? 0.5 : 1,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: `${percentage}%`,
						backgroundColor: minimumTrackTintColor,
						borderRadius: 2,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: `${percentage}%`,
						transform: 'translate(-50%, -50%)',
						width: 20,
						height: 20,
						backgroundColor: thumbTintColor,
						borderRadius: '50%',
						cursor: disabled ? 'not-allowed' : 'pointer',
						boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
					}}
				/>
			</div>
			<input
				type="range"
				min={minimumValue}
				max={maximumValue}
				step={step}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					opacity: 0,
					cursor: disabled ? 'not-allowed' : 'pointer',
				}}
			/>
		</View>
	)
}
