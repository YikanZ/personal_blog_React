const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/projects', (req, res) => {
    const projects = [
        { id: 1, name: 'Project 1', description: 'This is project 1' },
        { id: 2, name: 'Project 2', description: 'This is project 2' },
        { id: 3, name: 'Project 3', description: 'This is project 3' }
    ];
    res.json(projects);
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact form submitted:", { name, email, message });
    res.status(200).send('Message sent!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

