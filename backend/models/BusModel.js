// models/BusModel.js

const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true,
  },
  licensePlateNumber: {
    type: String,
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  ownerInformation: {
    type: String,
    required: true,
  },



});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
