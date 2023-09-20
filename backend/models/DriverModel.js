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
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
