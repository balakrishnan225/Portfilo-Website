import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Agent from './exports/Agent.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')))

// Catch-all route to serve index.html for any unmatched routes
app.get('*', (req, res) => {
 res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`)
})
