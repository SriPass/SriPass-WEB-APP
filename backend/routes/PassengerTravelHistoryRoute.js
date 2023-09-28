// routes/PassengerTravelHistoryRoute.js
const express = require('express');
const router = express.Router();
const PassengerTravelHistory = require('../models/PassengerTravelHistoryModel'); // Import the Mongoose model

// POST - Create a new PassengerTravelHistory record
router.post('/', async (req, res) => {
  try {
    const newTravelHistory = new PassengerTravelHistory(req.body);
    const savedTravelHistory = await newTravelHistory.save();
    res.status(201).json(savedTravelHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get all PassengerTravelHistory records
router.get('/', async (req, res) => {
  try {
    const travelHistoryRecords = await PassengerTravelHistory.find();
    res.json(travelHistoryRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get a specific PassengerTravelHistory record by ID
router.get('/:id', async (req, res) => {
  const objectId = req.params.id;

  try {
    const travelHistoryRecord = await PassengerTravelHistory.findById(objectId);
    if (!travelHistoryRecord) {
      res.status(404).json({ message: 'Travel history record not found' });
    } else {
      res.json(travelHistoryRecord);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT - Update details of a specific PassengerTravelHistory record
router.put('/:id', async (req, res) => {
  const objectId = req.params.id;

  try {
    const updatedTravelHistory = await PassengerTravelHistory.findByIdAndUpdate(
      objectId,
      req.body,
      { new: true }
    );

    if (!updatedTravelHistory) {
      res.status(404).json({ message: 'Travel history record not found' });
    } else {
      res.json(updatedTravelHistory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE - Delete a specific PassengerTravelHistory record by ID
router.delete('/:id', async (req, res) => {
  const objectId = req.params.id;

  try {
    const deletedTravelHistory = await PassengerTravelHistory.findByIdAndRemove(objectId);

    if (!deletedTravelHistory) {
      res.status(404).json({ message: 'Travel history record not found' });
    } else {
      res.json({ message: 'Travel history record deleted successfully', deletedTravelHistory });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
