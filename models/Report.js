const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    incident: { type: String, required: true },  // Incident description
    location: { type: String, required: true },  // Crime location (state)
    date: { type: Date, required: true },        // Date of the incident
    contact: { type: String, default: 'Anonymous' },  // Optional contact information
    submittedAt: { type: Date, default: Date.now }  // Date the report was submitted
});

module.exports = mongoose.model('Report', reportSchema);
