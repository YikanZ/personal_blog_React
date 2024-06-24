const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { login, authenticateJWT } = require('./auth');
const Goal = require('./models/Goal'); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = 'mongodb://localhost:27017/yikanwebsite'; // Update with your actual MongoDB connection string
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.post('/login', login);

app.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

app.post('/goals', authenticateJWT, async (req, res) => {
  try {
    const { goal, time } = req.body;
    const newGoal = new Goal({ goal, time, status: 'ongoing' });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error adding goal' });
  }
});

app.put('/goals/:id', authenticateJWT, async (req, res) => {
  try {
    const { goal, time, status, completedTime } = req.body;
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, { goal, time, status, completedTime }, { new: true });
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal' });
  }
});

app.delete('/goals/:id', authenticateJWT, async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
