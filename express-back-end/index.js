import express from 'express'
import createTables from './db_migration.js'
import cors from 'cors'

import usersRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())

app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)

app.listen(PORT, () => {
    createTables()
    console.info(`Server running on port ${PORT}...`)
})