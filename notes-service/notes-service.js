const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const morgan = require('morgan');
const winston = require('winston');

mongoose.connect('mongodb://localhost:27017/notes-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(cors());

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

app.use(morgan('combined', { stream: morganStream }));

const noteSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

app.get('/notes', async (req, res) => {
  console.log('GET /notes - Retrieving all notes');
  logger.info('GET /notes - Retrieving all notes');
  try {
    const notes = await Note.find();
    res.json(notes);
  } 
  catch (error) {
    console.error('Error fetching notes:', error);
    logger.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    id: uuidv4(),
    title,
    content,
  });

  console.log('POST /notes - New note added:', newNote);
  logger.info('POST /notes - New note added:', newNote);

  try {
    await newNote.save();
    res.json(newNote);
  } 
  catch (error) {
    console.error('Error adding new note:', error);
    logger.error('Error adding new note:', error);
    res.status(500).json({ error: 'Error adding new note' });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});