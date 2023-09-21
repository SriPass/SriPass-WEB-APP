// models/BusInspector.js

const mongoose = require('mongoose');

const busInspectorSchema = new mongoose.Schema({
  inspectorId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  assignedRoute: {
    type: String,
    required: true,
  },
  assignedVehicleNo: {
    type: String,
    required: true,
  },
});

const BusInspector = mongoose.model('BusInspector', busInspectorSchema);

module.exports = BusInspector;
