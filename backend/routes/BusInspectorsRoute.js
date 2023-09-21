// routes/busInspectors.js

const express = require('express');
const router = express.Router();
const BusInspector = require('../models/BusInspectorsModel');

// POST - Create a new BusInspector
router.post('/', async (req, res) => {
  try {
    const newBusInspector = new BusInspector(req.body);
    await newBusInspector.save();
    res.status(201).json(newBusInspector);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get all BusInspectors
router.get('/', async (req, res) => {
  try {
    const busInspectors = await BusInspector.find();
    res.json(busInspectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get a specific BusInspector by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const busInspector = await BusInspector.findById(id);
    if (!busInspector) {
      res.status(404).json({ message: 'BusInspector not found' });
    } else {
      res.json(busInspector);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT - Update a BusInspector by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const updatedBusInspector = await BusInspector.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedBusInspector) {
      res.status(404).json({ message: 'BusInspector not found' });
    } else {
      res.json(updatedBusInspector);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE - Delete a BusInspector by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBusInspector = await BusInspector.findByIdAndRemove(id);
    if (!deletedBusInspector) {
      res.status(404).json({ message: 'BusInspector not found' });
    } else {
      res.json({ message: 'BusInspector deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
