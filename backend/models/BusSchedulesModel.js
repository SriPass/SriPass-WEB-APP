// models/BusSchedules.js

const mongoose = require('mongoose');

const busSchedulesSchema = new mongoose.Schema({
  RouteNo: {
    type: String,
    required: true,
  },
  StartTime: {
    type: Date,
    required: true,
  },
  EndTime: {
    type: Date,
    required: true,
  },
  DriverName: {
    type: String,
    required: true,
  },
  InspectorName: {
    type: String,
    required: true,
  },
  VehicleNo: {
    type: String,
    required: true,
  },
});

const BusSchedules = mongoose.model('BusSchedules', busSchedulesSchema);

module.exports = BusSchedules;
