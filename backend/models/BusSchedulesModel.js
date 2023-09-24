// models/BusSchedules.js

const mongoose = require('mongoose');

const busSchedulesSchema = new mongoose.Schema({
  RouteNo: {
    type: String,
    required: true,
  },
  StartDate: {
    type: String,
    required: true,
  },
  EndDate: {
    type: String,
    required: true,
  },
  StartTime: {
    type: String,
    required: true,
  },
  EndTime: {
    type: String,
    required: true,
  },
  DriverNo: {
    type: Number,
    required: true,
  },
  inspectorNo: {
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