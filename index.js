const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // To manage environment variables
const app = express();
const PORT = process.env.PORT || 8000;

// Import routes
const qrRouter = require('./qr');
const pairRouter = require('./pair');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Routes
app.use('/qr', qrRouter);
app.use('/code', pairRouter);

app.get('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
