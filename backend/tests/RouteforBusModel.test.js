const mongoose = require('mongoose');
const BusRoute = require('../models/RouteforBusModel'); // Update the path to the RouteforBusModel
const { expect } = require('chai');

describe('RouteforBusModel', () => {
  before(async () => {
    // Connect to your test database
    await mongoose.connect('mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Disconnect from the test database after all tests are completed
    await mongoose.disconnect();
  });

  it('should save a valid bus route to the database', async () => {
    const validBusRoute = new BusRoute({
      RouteNo: '120',
      from: 'Start Point',
      to: 'End Point',
      vehicleNo: 'V123',
      destinations: [
        {
          startPoint: 'Point A',
          endPoint: 'Point B',
          fare: 10,
        },
      ],
    });

    const savedBusRoute = await validBusRoute.save();
    expect(savedBusRoute).to.have.property('_id'); // The bus route should have an _id property
  });

  it('should not save a bus route with missing required fields', async () => {
    const busRouteWithMissingField = new BusRoute({
      RouteNo: '101',
      from: 'Start Point',
      // Missing "to" and "vehicleNo" fields
      destinations: [
        {
          startPoint: 'Point A',
          endPoint: 'Point B',
          fare: 10,
        },
      ],
    });

    try {
      await busRouteWithMissingField.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for a validation error
      expect(error).to.be.instanceOf(mongoose.Error.ValidationError);
    }
  });

  it('should not save a bus route with a non-unique RouteNo', async () => {
    const busRoute1 = new BusRoute({
      RouteNo: '101',
      from: 'Start Point 1',
      to: 'End Point 1',
      vehicleNo: 'V123',
      destinations: [
        {
          startPoint: 'Point A',
          endPoint: 'Point B',
          fare: 10,
        },
      ],
    });

    const busRoute2 = new BusRoute({
      RouteNo: '101', // Same RouteNo as busRoute1
      from: 'Start Point 2',
      to: 'End Point 2',
      vehicleNo: 'V456',
      destinations: [
        {
          startPoint: 'Point X',
          endPoint: 'Point Y',
          fare: 15,
        },
      ],
    });

    await busRoute1.save();
    try {
      await busRoute2.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for a duplicate key error
      expect(error).to.be.instanceOf(mongoose.Error.MongoError);
    }
  });
});
