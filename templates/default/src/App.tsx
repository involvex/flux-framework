import {View, Text, Button} from 'flux/ui'
import {useState} from 'react'

export default function App() {
	const [count, setCount] = useState(0)

	return (
		<View className="app">
			<Text className="title">Welcome to {{projectName}}</Text>
			<Text className="subtitle">Count: {count}</Text>
			<Button onClick={() => setCount(c => c + 1)}>Increment</Button>
		</View>
	)
}
