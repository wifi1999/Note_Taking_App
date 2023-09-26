const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Replace this with your data or fetch data from a database
const notes = [
  { id: 1, title: 'First Note', content: 'This is the content of the first note.' },
  { id: 2, title: 'Second Note', content: 'This is the content of the second note.' }
];

app.post('/search', (req, res) => {
  try {
    const { query } = req.body;

    const searchResults = notes.filter(note => {
      return note.title.includes(query) || note.content.includes(query);
    });

    console.log(`Search successful for query: ${query}`);
    res.json(searchResults);
  } 
  catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).json({ message: 'An error occurred during search' });
  }
});

app.listen(3003, () => {
  console.log('Search microservice listening on port 3003');
});
