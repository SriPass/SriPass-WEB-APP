// routes/localPassengers.js

const express = require('express');
const router = express.Router();
const LocalPassengers = require('../models/LocalPassengersModel');

// POST - Create a new LocalPassenger
router.post('/', async (req, res) => {
  try {
    const newLocalPassenger = new LocalPassengers(req.body);
    await newLocalPassenger.save();
    res.status(201).json(newLocalPassenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get all LocalPassengers
router.get('/', async (req, res) => {
  try {
    const localPassengers = await LocalPassengers.find();
    res.json(localPassengers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// GET - Get a specific LocalPassenger by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const localPassenger = await LocalPassengers.findById(id);
      if (!localPassenger) {
        res.status(404).json({ message: 'LocalPassenger not found' });
      } else {
        res.json(localPassenger);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// PUT - Update a LocalPassenger by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const updatedLocalPassenger = await LocalPassengers.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedLocalPassenger) {
        res.status(404).json({ message: 'LocalPassenger not found' });
      } else {
        res.json(updatedLocalPassenger);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // DELETE - Delete a LocalPassenger by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedLocalPassenger = await LocalPassengers.findByIdAndRemove(id);
      if (!deletedLocalPassenger) {
        res.status(404).json({ message: 'LocalPassenger not found' });
      } else {
        res.json({ message: 'LocalPassenger deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


module.exports = router;
