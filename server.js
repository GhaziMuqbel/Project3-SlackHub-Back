const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const socketIO = require('socket.io')
const http = require('http')
const { register, login } = require('./controllers/User') // Destructure the imports
const chatRoutes = require('./routes/Chat')
const courseRoutes = require('./routes/courses')

const db = require('./db')

// mongoose.connect('', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
const app = express()
const server = http.createServer(app)

// const serverI = http.createServer(server)

const io = socketIO(server)
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.post('/register', register)
app.post('/login', login)
app.use('/chats', chatRoutes)
app.use('/course', courseRoutes)
app.use('/', (req, res) => {
  res.send('Connected!')
})
server.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
