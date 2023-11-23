const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://janrezvkasilag:ot8mhadoHqN7Utms@surveyform.zg3bsca.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model
const surveySchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  feedback: String,
});

const Survey = mongoose.model('Survey', surveySchema);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static('public'));

// Route for handling form submissions
app.post('/submit-survey', async (req, res) => {
    try {
      const surveyData = req.body;
      const survey = new Survey(surveyData);
      await survey.save();
      res.status(201).json({ message: 'Survey submitted successfully!' });
    } catch (error) {
      console.error('Error saving survey:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
