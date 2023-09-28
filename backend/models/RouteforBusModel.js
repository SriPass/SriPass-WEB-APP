// // models/BusRoute.js

// const mongoose = require('mongoose');

// const busRouteSchema = new mongoose.Schema({
//   RouteNo: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   from: {
//     type: String,
//     required: true,
//   },
//   to: {
//     type: String,
//     required: true,
//   },
//   vehicleNo: {
//     type: String,
//     required: true,
//   },
// });

// const BusRoute = mongoose.model('RouteforBus', busRouteSchema);

// module.exports = BusRoute;
// models/BusRoute.js

const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  startPoint: {
    type: String,
    required: true,
  },
  endPoint: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

const busRouteSchema = new mongoose.Schema({
  RouteNo: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  destinations: [destinationSchema], // Array of destinations and fares
});

const BusRoute = mongoose.model('RouteforBus', busRouteSchema);

module.exports = BusRoute;
