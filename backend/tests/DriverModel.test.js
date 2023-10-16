const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const Driver = require('../models/DriverModel');

describe('DriverModel', () => {
  before(async () => {
    // Connect to a test database or use an in-memory database for testing
    await mongoose.connect('mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Disconnect from the test database after all tests are completed
    await mongoose.disconnect();
  });

  it('should save a new driver', async () => {
    const driverData = {
      driver_id: 9,
      name: 'Piyal ',
      tel: '123-456-7890',
      address: '123 Main St',
      assignedRoute: '100',
      assignedVehicle: 'ND-7878',
    };

    const newDriver = new Driver(driverData);
    const savedDriver = await newDriver.save();

    expect(savedDriver._id).to.exist;
    expect(savedDriver.driver_id).to.equal(driverData.driver_id);
    expect(savedDriver.name).to.equal(driverData.name);
    // Add similar assertions for other fields
  });

  it('should not save a driver without required fields', async () => {
    const driverData = {
      name: 'John Doe',
      tel: '123-456-7890',
      // Missing required fields
    };

    const driver = new Driver(driverData);

    try {
      await driver.save();
      throw new Error('Expected validation error but saved successfully');
    } catch (error) {
      expect(error.name).to.equal('ValidationError');
    }
  });

  it('should not save a driver with a non-unique driver_id', async () => {
    const driver1 = new Driver({
      driver_id: 10,
      name: 'John Doe',
      tel: '123-456-7890',
      address: '123 Main St',
      assignedRoute: '177',
      assignedVehicle: 'NC-7858',
    });

    const driver2 = new Driver({
      driver_id: 10, // Same driver_id as driver1
      name: 'Jane Smith',
      tel: '987-654-3210',
      address: '456 Elm St',
      assignedRoute: '188',
      assignedVehicle: 'TX-1234',
    });

    await driver1.save();
    try {
      await driver2.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for a duplicate key error
      expect(error).to.be.instanceOf(mongoose.Error.MongoError);
    }
  });
});
