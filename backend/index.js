const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authenticateJWT, login } = require('./auth');




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

const goals = [];
app.post('/login', login);

app.get('/goals', (req, res) => {
    res.json(goals);
});

app.post('/goals', authenticateJWT, (req, res) => {
    const goal = req.body;
    goals.push(goal);
    res.status(201).json(goal);
});




app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact form submitted:", { name, email, message });
    res.status(200).send('Message sent!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });



