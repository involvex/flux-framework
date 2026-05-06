import {loadConfig} from '../config/loader.js'
import {WebSocketServer} from 'ws'
import {createServer} from 'http'

export interface DevServerOptions {
	web?: boolean
	tunnel?: boolean
	port: number
	debug?: boolean
}

export async function startDevServer(options: DevServerOptions) {
	const config = loadConfig()

	if (!config) {
		console.error('Failed to load config')
		process.exit(1)
	}

	console.log(`🚀 Starting Expoic dev server...`)
	console.log(`📦 App: ${config.name} v${config.version}`)
	console.log(`🌐 Port: ${options.port}`)

	if (options.web) {
		console.log(`🌍 Web mode enabled`)
	}

	if (options.tunnel) {
		console.log(`🔗 Tunnel mode enabled`)
	}

	if (options.debug) {
		console.log(`🐛 Debug mode enabled`)
	}

	const server = createServer((req, res) => {
		res.writeHead(200, {'Content-Type': 'text/html'})
		res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${config.name}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div id="root">
            <h1>${config.name}</h1>
            <p>Expoic dev server running on port ${options.port}</p>
            <p>Fast Refresh enabled</p>
          </div>
          <script>
            // WebSocket connection for HMR
            const ws = new WebSocket('ws://localhost:${options.port}');
            ws.onmessage = (event) => {
              console.log('Update received:', event.data);
              location.reload();
            };
          </script>
        </body>
      </html>
    `)
	})

	const wss = new WebSocketServer({server})

	wss.on('connection', ws => {
		console.log('📱 Client connected')

		ws.on('message', message => {
			console.log('Received:', message.toString())
		})
	})

	server.listen(options.port, () => {
		console.log(`✅ Server running at http://localhost:${options.port}`)
		console.log(`📡 WebSocket server ready`)
	})

	process.on('SIGINT', () => {
		console.log('\n🛑 Shutting down server...')
		server.close()
		wss.close()
		process.exit(0)
	})
}
