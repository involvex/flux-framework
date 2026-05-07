import {
	View,
	Text,
	Button,
	Card,
	Input,
	Image,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	Switch,
	Slider,
	Modal,
} from 'flux/ui'
import {useRouter} from 'flux/navigation'
import {useState} from 'react'

export default function App() {
	const router = useRouter()
	const [count, setCount] = useState(0)
	const [text, setText] = useState('')
	const [switchValue, setSwitchValue] = useState(false)
	const [sliderValue, setSliderValue] = useState(50)
	const [modalVisible, setModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	const handlePress = () => {
		setLoading(true)
		setTimeout(() => {
			setCount(c => c + 1)
			setLoading(false)
		}, 1000)
	}

	return (
		<ScrollView className="app">
			<Card className="header">
				<Text className="title">Welcome to Flux</Text>
				<Text className="subtitle">
					Next-generation hybrid mobile framework
				</Text>
			</Card>

			<View className="content">
				<Card className="feature">
					<Text className="feature-title">🚀 Fast Development</Text>
					<Text className="feature-description">
						Web-first development with hot module replacement and fast refresh
					</Text>
				</Card>

				<Card className="feature">
					<Text className="feature-title">📱 Cross-Platform</Text>
					<Text className="feature-description">
						Single codebase for Android and Web with native performance
					</Text>
				</Card>

				<Card className="feature">
					<Text className="feature-title">🔧 Modern Tooling</Text>
					<Text className="feature-description">
						Bun-powered build system with Vite for web development
					</Text>
				</Card>

				<Card className="demo">
					<Text className="demo-title">Component Demo</Text>
					<View className="demo-content">
						<View className="counter">
							<Text className="counter-value">{count}</Text>
							<View className="counter-actions">
								<Button
									onClick={handlePress}
									disabled={loading}
								>
									{loading ? 'Loading...' : 'Increment'}
								</Button>
								{loading && <ActivityIndicator size="small" />}
							</View>
						</View>

						<Input
							value={text}
							onChange={setText}
							placeholder="Type something..."
							className="demo-input"
						/>

						<View className="demo-row">
							<Switch
								value={switchValue}
								onValueChange={setSwitchValue}
							/>
							<Text>{switchValue ? 'Enabled' : 'Disabled'}</Text>
						</View>

						<View className="demo-slider">
							<Slider
								value={sliderValue}
								onValueChange={setSliderValue}
								minimumValue={0}
								maximumValue={100}
							/>
							<Text>Value: {sliderValue}</Text>
						</View>

						<TouchableOpacity
							onPress={() => setModalVisible(true)}
							className="demo-button"
						>
							<Text>Open Modal</Text>
						</TouchableOpacity>

						<Image
							source="https://via.placeholder.com/300x150/007AFF/ffffff?text=Flux+Framework"
							alt="Flux Framework"
							className="demo-image"
						/>
					</View>
				</Card>

				<View className="actions">
					<Button onClick={() => router.push('/about')}>Learn More</Button>
					<Button onClick={() => router.push('/docs')}>Documentation</Button>
				</View>
			</View>

			<Modal
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View>
					<Text className="modal-title">Modal Demo</Text>
					<Text className="modal-text">
						This is a modal dialog. Click outside to close.
					</Text>
					<Button onClick={() => setModalVisible(false)}>Close</Button>
				</View>
			</Modal>
		</ScrollView>
	)
}
