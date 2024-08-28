import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Agent from './exports/Agent.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 3000


app.use(express.static(join(__dirname, 'public')))

app.get('*', (req, res) => {
 res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`)
})
