// models/LocalPassengers.js

const mongoose = require('mongoose');

const localPassengersSchema = new mongoose.Schema({
  passengerId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

const LocalPassengers = mongoose.model('LocalPassengers', localPassengersSchema);

module.exports = LocalPassengers;
