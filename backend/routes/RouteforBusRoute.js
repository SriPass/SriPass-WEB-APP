// routes/busRoutes.js

const express = require('express');
const router = express.Router();
const BusRoute = require('../models/RouteforBusModel');

// POST - Create a new BusRoute
router.post('/', async (req, res) => {
  try {
    const newBusRoute = new BusRoute(req.body);
    await newBusRoute.save();
    res.status(201).json(newBusRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get all BusRoutes
router.get('/', async (req, res) => {
  try {
    const busRoutes = await BusRoute.find();
    res.json(busRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get a specific BusRoute by RouteNo
router.get('/:id', async (req, res) => {
  const routeNo = req.params.routeNo;

  try {
    const busRoute = await BusRoute.findOne({ RouteNo: routeNo });
    if (!busRoute) {
      res.status(404).json({ message: 'BusRoute not found' });
    } else {
      res.json(busRoute);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.put('/:id', async (req, res) => {
  const objectId = req.params.id;

  try {
    const updatedBusRoute = await BusRoute.findByIdAndUpdate(
      objectId,
      req.body, // Update with the request body
      { new: true } // To return the updated document
    );

    if (!updatedBusRoute) {
      res.status(404).json({ message: 'BusRoute not found' });
    } else {
      res.json({ message: 'BusRoute updated successfully', updatedRoute: updatedBusRoute });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE - Delete a specific BusRoute by ObjectId
router.delete('/:id', async (req, res) => {
  const objectId = req.params.id; 

  try {
    const deletedBusRoute = await BusRoute.findByIdAndRemove(objectId);

    if (!deletedBusRoute) {
      res.status(404).json({ message: 'BusRoute not found' });
    } else {
      res.json({ message: 'BusRoute deleted successfully', deletedRoute: deletedBusRoute });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;