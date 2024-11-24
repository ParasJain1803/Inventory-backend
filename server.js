require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Example POST route
app.post('/api/data', (req, res) => {
    const { name } = req.body;
    res.send({ message: `Hello, ${name}!` });
});

app.use((req, res, next) => {
    if (!req.user) {
        return res.status(403).send('Forbidden');
    }
    next();
});

app.post('/api/inventory', (req, res) => {
    // Code for handling POST request
});

app.put('/api/inventory/:id', (req, res) => {
    // Code for handling PUT request
});

app.delete('/api/inventory/:id', (req, res) => {
    // Code for handling DELETE request
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use((req, res, next) => {
    if (!req.user) {
        return res.status(403).send('Forbidden');
    }
    next();
});

app.post('/api/inventory', (req, res) => {
    // Code for handling POST request
});

app.put('/api/inventory/:id', (req, res) => {
    // Code for handling PUT request
});

app.delete('/api/inventory/:id', (req, res) => {
    // Code for handling DELETE request
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
