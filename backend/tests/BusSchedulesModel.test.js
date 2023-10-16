const mongoose = require('mongoose');
const BusSchedules = require('../models/BusSchedulesModel'); // Update the path to the BusSchedules model
const { expect } = require('chai');
const Bus = require('../models/BusModel'); 
describe('BusSchedules Model', () => {
  before(async () => {
    // Connect to your test database
    await mongoose.connect('mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Disconnect from the test database after all tests are completed
    await mongoose.disconnect();
  });

  it('should save a valid bus schedule to the database', async () => {
    const validSchedule = new BusSchedules({
      RouteNo: '121',
      StartDate: '2023-01-01',
      EndDate: '2023-01-31',
      StartTime: '08:00 AM',
      EndTime: '04:00 PM',
      DriverNo: 1234,
      inspectorNo: 'INS-5678',
      licensePlateNumber: 'XYZ123',
    });

    const savedSchedule = await validSchedule.save();
    expect(savedSchedule).to.have.property('_id'); // The schedule should have an _id property
  });

  it('should not save a bus schedule with missing required fields', async () => {
    const scheduleWithMissingField = new BusSchedules({
      RouteNo: '100',
      StartDate: '2023-02-01',
      EndDate: '2023-02-28',
      StartTime: '09:00 AM',
      EndTime: '05:00 PM',
      DriverNo: 5678,
      inspectorNo: 'INS-9012',
      // Missing licensePlateNumber
    });

    try {
      await scheduleWithMissingField.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for a validation error
      expect(error).to.be.instanceOf(mongoose.Error.ValidationError);
    }
  });


  //3rd test case
  it('should not save a bus schedule with an unsaved licensePlateNumber', async () => {
    const busScheduleData = {
      RouteNo: 'R001',
      StartDate: '2023-01-01',
      EndDate: '2023-01-10',
      StartTime: '08:00 AM',
      EndTime: '04:00 PM',
      DriverNo: 123,
      inspectorNo: 'I001',
      licensePlateNumber: 'XYZ12333', // This licensePlateNumber should exist in BusModel
    };

    const busSchedule = new BusSchedules(busScheduleData);

    try {
      await busSchedule.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for an error due to an unsaved licensePlateNumber
      expect(error).to.be.instanceOf(mongoose.Error.ValidationError);
    }
  });


  it('should not save a bus schedule with a non-unique RouteNo', async () => {
    const schedule1 = new BusSchedules({
      RouteNo: 'R03',
      StartDate: '2023-03-01',
      EndDate: '2023-03-31',
      StartTime: '10:00 AM',
      EndTime: '06:00 PM',
      DriverNo: 9012,
      inspectorNo: 'INS-1234',
      licensePlateNumber: 'ABC456',
    });

    const schedule2 = new BusSchedules({
      RouteNo: 'R03', // Same RouteNo as schedule1
      StartDate: '2023-04-01',
      EndDate: '2023-04-30',
      StartTime: '11:00 AM',
      EndTime: '07:00 PM',
      DriverNo: 3456,
      inspectorNo: 'INS-5678',
      licensePlateNumber: 'DEF789',
    });

    // Save the first schedule
    await schedule1.save();

    try {
      await schedule2.save();
      // The test should fail if save is successful
      expect.fail('Expected error but save was successful');
    } catch (error) {
      // Check for a duplicate key error
      expect(error).to.be.instanceOf(mongoose.Error.MongoError);
    }
  });
});
