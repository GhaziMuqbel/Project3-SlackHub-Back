const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { register, login } = require('./controllers/User') // Destructure the imports

const courseRoutes = require('./routes/courses')
const assignmentRoutes = require('./routes/Assignments')
const authroutes = require('./routes/AuthRouter')
const userRoutes = require('./routes/User');
const discussionRoutes = require('./routes/discussion');
const commentRoutes = require('./routes/comments');
const db = require('./db')
const app = express()


const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(express.json())
app.use('/register', register)
app.use('/login', login)

app.use('/course', courseRoutes)
app.use('/assignment', assignmentRoutes)
app.use('/auth', authroutes)
app.use('/users', userRoutes);
app.use('/discussion', discussionRoutes);
app.use('/comments', commentRoutes);
app.use('/', (req, res) => {
  res.send('Connected!')
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
