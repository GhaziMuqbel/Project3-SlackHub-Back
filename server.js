const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const socketIO = require('socket.io')
const { default: mongoose } = require('mongoose')
const { server } = require('websocket')
const register = require('./controllers/User')
const Login = require('./controllers/User')

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const app = express()
const server = http.createServer(server)
const io = socketIO(server)

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.post('/register', register)
app.post('/login', Login)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
