const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { register, login } = require('./controllers/User') // Destructure the imports
const reviewRoutes = require('./routes/review')
const courseRoutes = require('./routes/courses')
const assignmentRoutes = require('./routes/Assignments')
const db = require('./db')

const app = express()

// Import http and socket.io
const http = require('http')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 3001
const corsOptions = {
  origin: ['http://localhost:5501', 'http://127.0.0.1:5501'], // Allow both origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}
app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
//app.use(express.urlencoded({ extended: false }))
app.use('/register', register)
app.use('/login', login)
app.use('/chats', chatRoutes)
app.use('/course', courseRoutes)
app.use('/assignment', assignmentRoutes)
app.use('/', (req, res) => {
  res.send('Connected!')
})

// Create an HTTP server
const httpServer = http.createServer(app)

// Create a Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5501', 'http://127.0.0.1:5501'], // Allow both origins
    methods: ['GET', 'POST'],
    credentials: true
  }
})
// Users dictionary to keep track of connected users
const users = {}
io.on('connection', (socket) => {
  console.log('New connection:', socket.id) // Log new connections

  socket.on('new-user', (name) => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
    console.log(`${name} connected with id ${socket.id}`)
  })

  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id]
    })
    console.log(`Message from ${users[socket.id]}: ${message}`)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
httpServer.listen(4000, () => {
  console.log('Socket.IO server is running on port 4000')
})
app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
