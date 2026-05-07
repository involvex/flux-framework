import {View} from './View'
import React from 'react'

export interface SwitchProps {
	value: boolean
	onValueChange?: (value: boolean) => void
	disabled?: boolean
	style?: React.CSSProperties
	className?: string
	trackColor?: {
		false?: string
		true?: string
	}
	thumbColor?: {
		false?: string
		true?: string
	}
}

export function Switch({
	value,
	onValueChange,
	disabled = false,
	style,
	className,
	trackColor = {false: '#767577', true: '#81b0ff'},
	thumbColor = {false: '#f4f3f4', true: '#f4f3f4'},
}: SwitchProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!disabled && onValueChange) {
			onValueChange(event.target.checked)
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
			<label
				style={{
					position: 'relative',
					display: 'inline-block',
					width: 50,
					height: 28,
					cursor: disabled ? 'not-allowed' : 'pointer',
					opacity: disabled ? 0.5 : 1,
				}}
			>
				<input
					type="checkbox"
					checked={value}
					onChange={handleChange}
					disabled={disabled}
					style={{
						opacity: 0,
						width: 0,
						height: 0,
					}}
				/>
				<span
					style={{
						position: 'absolute',
						cursor: disabled ? 'not-allowed' : 'pointer',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: value ? trackColor.true : trackColor.false,
						transition: '0.4s',
						borderRadius: 34,
					}}
				/>
				<span
					style={{
						position: 'absolute',
						content: '',
						height: 20,
						width: 20,
						left: value ? 26 : 4,
						bottom: 4,
						backgroundColor: value ? thumbColor.true : thumbColor.false,
						transition: '0.4s',
						borderRadius: '50%',
					}}
				/>
			</label>
		</View>
	)
}
