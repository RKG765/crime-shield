const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle POST request to save contact form data
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Save the contact form data to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Send response back to frontend
        res.status(200).json({ message: 'Your message has been received!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the message' });
    }
});

module.exports = router;
