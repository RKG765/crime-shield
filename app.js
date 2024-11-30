const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());   // To parse incoming JSON requests
app.use(express.static('public'));  // Serve static files from the public folder

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/crimeshield')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
const contactRoutes = require('./routes/contactus');
app.use('/api/contact', contactRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const reportRoutes = require('./routes/reports'); // Import the reports route
app.use('/api/reports', reportRoutes);  
 

const getupdates = require('./routes/update'); // Import the reports route
app.use('/api/update', getupdates); 

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Basic error handling middleware
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});

// Global error handler for uncaught errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
