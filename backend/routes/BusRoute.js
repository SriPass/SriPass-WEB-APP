// routes/BusRoute.js

const express = require('express');
const router = express.Router();
const Bus = require('../models/BusModel'); // Import the Mongoose model

// POST - Add a new bus
router.post('/', async (req, res) => {
    try {
      const newBus = new Bus(req.body);
      await newBus.save();
      res.status(201).json(newBus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// GET - Get all buses
router.get('/', async (req, res) => {
    try {
      const buses = await Bus.find();
      res.json(buses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// PUT - Update details of a specific bus
router.put('/:id', async (req, res) => {
    try {
      const busId = req.params.id;
      const updatedBus = await Bus.findByIdAndUpdate(busId, req.body, { new: true });
  
      if (!updatedBus) {
        return res.status(404).json({ error: 'Bus details not found' });
      }
  
      res.json(updatedBus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// DELETE - Delete a specific bus 
router.delete('/:id', async (req, res) => {
    const objectId = req.params.id; 
  
    try {
      const deletedBus = await Bus.findByIdAndRemove(objectId);
  
      if (!deletedBus) {
        res.status(404).json({ message: 'Bus details not found' });
      } else {
        res.json({ message: 'Bus details deleted successfully', deletedBus });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;