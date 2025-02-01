const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 5000;

// Enable Cross-Origin Requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define a simple schema and model
const Story = mongoose.model('Story', new mongoose.Schema({
  title: String,
  content: String,
}));

// API endpoint to get stories from the database
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to create a new story in the database
app.post('/api/stories', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newStory = new Story({ title, content });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
