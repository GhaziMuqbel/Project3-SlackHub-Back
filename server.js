const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { register, login } = require('./controllers/User') // Destructure the imports
const chatRoutes = require('./routes/Chat')
const courseRoutes = require('./routes/courses')
const assignmentRoutes = require('./routes/Assignments')
const authroutes = require('./routes/AuthRouter')
const db = require('./db')

const app = express()

// Import http and socket.io
const http = require('http')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 3001
const corsOptions = {
  origin: ['http://localhost:5501', 'http://127.0.0.1:5501','http://localhost:5173'], // Allow both origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
//app.use(express.urlencoded({ extended: false }))
app.use('/register', register)
app.use('/login', login)
app.use('/chats', chatRoutes)
app.use('/course', courseRoutes)
app.use('/assignment', assignmentRoutes)
app.use('/auth', authroutes)
app.use('/', (req, res) => {
  res.send('Connected!')
})

// Create an HTTP server
app.listen(PORT, () => {
 console.log(`Running Express server on Port ${PORT} . . .`)
})
