// models/PassengerTravelHistory.js
const mongoose = require('mongoose');

const passengerTravelHistorySchema = new mongoose.Schema({
    PassengerID: {
        type: String, // Assuming PassengerID is a string
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    routeNo: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
        default: 0.00,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },

}, {
    timestamps: true, // Add createdAt and updatedAt fields
});

const PassengerTravelHistory = mongoose.model('PassengerTravelHistory', passengerTravelHistorySchema);

module.exports = PassengerTravelHistory;
