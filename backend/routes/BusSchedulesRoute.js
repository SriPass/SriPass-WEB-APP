// routes/busSchedules.js

const express = require('express');
const router = express.Router();
const BusSchedules = require('../models/BusSchedulesModel');

// POST - Create a new BusSchedule
router.post('/', async (req, res) => {
  try {
    const newBusSchedule = new BusSchedules(req.body);
    await newBusSchedule.save();
    res.status(201).json(newBusSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get all BusSchedules
router.get('/', async (req, res) => {
  try {
    const busSchedules = await BusSchedules.find();
    res.json(busSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get a specific BusSchedule by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const busSchedule = await BusSchedules.findById(id);
    if (!busSchedule) {
      res.status(404).json({ message: 'BusSchedule not found' });
    } else {
      res.json(busSchedule);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT - Update a BusSchedule by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const updatedBusSchedule = await BusSchedules.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedBusSchedule) {
      res.status(404).json({ message: 'BusSchedule not found' });
    } else {
      res.json(updatedBusSchedule);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE - Delete a BusSchedule by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBusSchedule = await BusSchedules.findByIdAndRemove(id);
    if (!deletedBusSchedule) {
      res.status(404).json({ message: 'BusSchedule not found' });
    } else {
      res.json({ message: 'BusSchedule deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
