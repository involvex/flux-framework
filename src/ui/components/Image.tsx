import React from 'react'

export interface ImageProps {
	source: string | {uri: string}
	alt?: string
	style?: React.CSSProperties
	className?: string
	width?: number | string
	height?: number | string
	onLoad?: () => void
	onError?: () => void
}

export function Image({
	source,
	alt = '',
	style,
	className,
	width = 'auto',
	height = 'auto',
	onLoad,
	onError,
}: ImageProps) {
	const src = typeof source === 'string' ? source : source.uri

	return (
		<img
			src={src}
			alt={alt}
			style={{
				...style,
				width,
				height,
				objectFit: 'cover',
			}}
			className={className}
			onLoad={onLoad}
			onError={onError}
		/>
	)
}
