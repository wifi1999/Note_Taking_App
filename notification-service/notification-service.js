const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/send-notification', (req, res) => {
  try {
    const { userId, message } = req.body;
    console.log(`Sending notification to user ${userId}: ${message}`); 
    res.json({ success: true });
  } 
  catch (error) {
    console.error('Error sending notification:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send notification' });
  }
});

app.listen(3002, () => {
  console.log('Notification microservice listening on port 3002');
});
