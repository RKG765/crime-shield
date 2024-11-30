const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); // Your existing Report model

// GET /api/updates - Fetch crime reports
router.get('/', async (req, res) => {
    try {
        const { state } = req.query; // Extract state filter from query parameters

        // Build query based on state (if provided)
        let query = {};
        if (state) {
            query.state = state; // Assuming 'state' is a field in your Report model
        }

        // Fetch reports from the database
        const reports = await Report.find(query).sort({ date: -1 }); // Sort by most recent reports
        res.json({ reports });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'An error occurred while fetching reports.' });
    }
});

module.exports = router;
