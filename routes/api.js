const express = require('express');
const router = express.Router();

// Example MongoDB schema (to be created)
const ExampleModel = require('../models/Example'); 


// Get example data
router.get('/data', async (req, res) => {
    try {
        const data = await ExampleModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post example data
router.post('/data', async (req, res) => {
    const newData = new ExampleModel(req.body);
    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
