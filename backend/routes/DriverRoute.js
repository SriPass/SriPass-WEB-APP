// routes/drivers.js

const express = require('express');
const router = express.Router();
const Driver = require('../models/DriverModel'); // Import the Mongoose model

// POST - Add a new driver
router.post('/add', async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get all drivers
router.get('/all', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add routes for PUT, DELETE, and any other operations as needed

module.exports = router;
