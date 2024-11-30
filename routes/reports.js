const express = require('express');
const Report = require('../models/Report'); // Import the Report schema
const router = express.Router();

// POST route to handle report submission
router.post('/submit', async (req, res) => {
    const { incident, location, date, contact } = req.body;

    // Validate required fields
    if (!incident || !location || !date) {
        return res.status(400).json({ error: 'Incident, location, and date are required.' });
    }

    try {
        // Create and save a new report
        const newReport = new Report({
            incident,
            location,
            date,
            contact: contact || 'Anonymous', // Default to Anonymous if no contact info
        });

        await newReport.save();
        res.status(201).json({ message: 'Crime report submitted successfully!' });
    } catch (error) {
        console.error('Error submitting crime report:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

// GET route to fetch all crime reports, with optional filtering by case type and location
router.get('/', async (req, res) => {
    const { caseType, location } = req.query; // Retrieve query parameters (e.g., caseType, location)

    try {
        const filter = {};
        if (caseType) filter.incident = caseType;  // Filter by case type (e.g., "Robbery")
        if (location) filter.location = location;  // Filter by location (e.g., "Delhi")

        // Fetch reports from the database based on filter
        const reports = await Report.find(filter);

        if (reports.length === 0) {
            return res.status(404).json({ error: 'No reports found matching the criteria.' });
        }

        res.status(200).json({ reports }); // Return the reports as JSON
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

module.exports = router;
