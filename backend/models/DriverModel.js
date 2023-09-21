// models/Driver.js

const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driver_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // Add other fields as needed
  assignedRoute: {
    type: String, 
    required: true, 
  },
  assignedVehicle: {
    type: String, 
    required: true, 
  },
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
