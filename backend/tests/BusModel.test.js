
const mongoose = require('mongoose');
const Bus = require('../models/BusModel'); // Update the path to the BusModel

const { expect } = require('chai');

describe('BusModel', () => {
  before(async () => {
    // Connect to your test database
    await mongoose.connect('mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Disconnect from the test database after all tests are completed
    await mongoose.disconnect();
  });

  it('should save a valid bus to the database', async () => {
    const validBus = new Bus({
      busId: 'B04',
      licensePlateNumber: 'XY-4123',
      seatingCapacity: 50,
      fuelType: 'Diesel',
      ownerInformation: 'John Doe',
    });

    const savedBus = await validBus.save();
    expect(savedBus).to.have.property('_id'); // The bus should have an _id property
  });

  it('should not save a bus with missing required fields', async () => {
    const busWithMissingField = new Bus({
      licensePlateNumber: 'XU-0123',
      seatingCapacity: 50,
      fuelType: 'Diesel',
      ownerInformation: 'John Doe',
    });

    try {
      await busWithMissingField.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for a validation error
      expect(error).to.be.instanceOf(mongoose.Error.ValidationError);
    }
  });

  it('should not save a bus with a non-unique busId', async () => {
    const bus1 = new Bus({
      busId: 'B05',
      licensePlateNumber: 'XYZ123',
      seatingCapacity: 50,
      fuelType: 'Diesel',
      ownerInformation: 'John Doe',
    });

    const bus2 = new Bus({
      busId: 'B05', // Same busId as bus1
      licensePlateNumber: 'UVW456',
      seatingCapacity: 60,
      fuelType: 'Diesel',
      ownerInformation: 'Jane Smith',
    });

    // Save the first bus
    await bus1.save();

    try {
      await bus2.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for a duplicate key error
      expect(error).to.be.instanceOf(mongoose.Error.MongoError);
    }
  });
});
