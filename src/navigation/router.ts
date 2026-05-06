export interface Route {
	path: string
	component: React.ComponentType
}

export interface RouterProps {
	routes: Route[]
}

export function Router(_routes: Route[]) {
	return null
}

export function useRouter() {
	return {
		push: (path: string) => {
			console.log('Navigate to:', path)
		},
		back: () => {
			console.log('Go back')
		},
		replace: (path: string) => {
			console.log('Replace with:', path)
		},
	}
}
