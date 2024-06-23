const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const { register, login } = require('./controllers/User') 
const courseRoutes = require('./routes/courses');
const assignmentRoutes = require('./routes/Assignments');
const authroutes = require('./routes/AuthRouter');
const userRoutes = require('./routes/User');
const discussionRoutes = require('./routes/discussion');
const commentRoutes = require('./routes/comments');
const notesRoutes = require('./routes/Notes'); // Import the notes routes

const db = require('./db');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/register', register);
app.use('/login', login);
app.use('/course', courseRoutes);
app.use('/assignment', assignmentRoutes);
app.use('/auth', authroutes);
app.use('/users', userRoutes);
app.use('/discussion', discussionRoutes);
app.use('/comments', commentRoutes);
app.use('/notes', notesRoutes); // Add the notes routes here
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// This should be the last middleware to handle any unmatched routes
app.use((req, res) => {
  res.send('Wrong URL!');
});

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`);
});

