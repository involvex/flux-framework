import {createElement} from 'react'

export interface InputProps {
	placeholder?: string
	value?: string
	onChange?: (value: string) => void
	type?: string
	className?: string
	style?: React.CSSProperties
}

export function Input({
	placeholder,
	value,
	onChange,
	type = 'text',
	className = '',
	style,
}: InputProps) {
	return createElement('input', {
		placeholder,
		value,
		onChange: (e: {target: {value: string}}) => onChange?.(e.target.value),
		type,
		className: `expoic-input ${className}`,
		style,
	})
}
