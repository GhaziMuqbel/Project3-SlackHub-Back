const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const socketIO = require('socket.io')
const { default: mongoose } = require('mongoose')
const http = require('http')
const { register, login } = require('./controllers/User') // Destructure the imports
const chatRoutes = require('./routes/Chat')
<<<<<<< HEAD
// mongoose.connect('', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
const app = express()
const server = http.createServer(app)
=======

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// const serverI = http.createServer(server)
>>>>>>> 9516cc7 (Almost Done with the add course function)
const io = socketIO(server)
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.post('/register', register)
app.post('/login', login)
app.use('/chats', chatRoutes)
app.use('/', (req, res) => {
  res.send('Connected!')
})
server.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
