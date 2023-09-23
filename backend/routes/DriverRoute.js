// routes/drivers.js

const express = require('express');
const router = express.Router();
const Driver = require('../models/DriverModel'); // Import the Mongoose model

// POST - Add a new driver
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE - Delete a driver by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const driverId = req.params.id;
//     const deletedDriver = await Driver.findByIdAndRemove(driverId);

//     if (!deletedDriver) {
//       return res.status(404).json({ error: 'Driver not found' });
//     }

//     res.json({ message: 'Driver deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// DELETE - Delete a specific Driver by ObjectId
router.delete('/:id', async (req, res) => {
  const objectId = req.params.id; 

  try {
    const deletedDriver = await Driver.findByIdAndRemove(objectId);

    if (!deletedDriver) {
      res.status(404).json({ message: 'Driver not found' });
    } else {
      res.json({ message: 'Driver deleted successfully', deletedDriver });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const driverId = req.params.id;
    const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, { new: true });

    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json(updatedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
