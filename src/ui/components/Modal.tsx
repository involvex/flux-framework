import {View} from './View'
import React from 'react'

export interface ModalProps {
	visible: boolean
	onRequestClose?: () => void
	children: React.ReactNode
	animationType?: 'none' | 'slide' | 'fade'
	transparent?: boolean
	style?: React.CSSProperties
	className?: string
}

export function Modal({
	visible,
	onRequestClose,
	children,
	animationType = 'fade',
	transparent = false,
	style,
	className,
}: ModalProps) {
	const [isVisible, setIsVisible] = React.useState(visible)

	React.useEffect(() => {
		setIsVisible(visible)
	}, [visible])

	const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget && onRequestClose) {
			onRequestClose()
		}
	}

	if (!isVisible) {
		return null
	}

	const animationStyles: Record<string, React.CSSProperties> = {
		none: {},
		slide: {
			animation: 'slideIn 0.3s ease-out',
		},
		fade: {
			animation: 'fadeIn 0.3s ease-out',
		},
	}

	return (
		<>
			<div
				onClick={handleBackdropClick}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: transparent ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.8)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 1000,
					...animationStyles[animationType],
				}}
			>
				<View
					style={{
						backgroundColor: 'white',
						borderRadius: 8,
						padding: 20,
						maxWidth: '90%',
						maxHeight: '90%',
						overflow: 'auto',
						...style,
					}}
					className={className}
				>
					{children}
				</View>
			</div>
			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes slideIn {
					from { transform: translateY(-100%); opacity: 0; }
					to { transform: translateY(0); opacity: 1; }
				}
			`}</style>
		</>
	)
}
