import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { message } from 'antd';

const AddBus = () => {
  const key = 'updatable'; // Define a unique key for the message

  const [values, setValues] = useState({
    busId: '',
    licensePlateNumber: '',
    seatingCapacity: '',
    fuelType: '',
    ownerInformation: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addResponse = await fetch('https://sripass.onrender.com/api/bus/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!addResponse.ok) {
        throw new Error('API request failed');
      }

      const data = await addResponse.json();
      console.log('New bus added:', data);
      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: 'Bus added successfully',
          duration: 2,
        });
      }, 1000);

      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message',
      });
    } catch (error) {
      console.error('Error adding new bus:', error);
      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'error',
          content: 'Error',
          duration: 2,
        });
      }, 1000);

      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message',
      });
    }
  };

  return (
    <MainCard>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="busId">Bus ID</InputLabel>
            <OutlinedInput
              id="busId"
              type="text"
              value={values.busId}
              onChange={handleChange('busId')}
              required
              label="Bus ID"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="licensePlateNumber">License Plate Number</InputLabel>
            <OutlinedInput
              id="licensePlateNumber"
              type="text"
              value={values.licensePlateNumber}
              onChange={handleChange('licensePlateNumber')}
              required
              label="License Plate Number"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="seatingCapacity">Seating Capacity</InputLabel>
            <OutlinedInput
              id="seatingCapacity"
              type="number"
              value={values.seatingCapacity}
              onChange={handleChange('seatingCapacity')}
              required
              label="Seating Capacity"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="fuelType">Fuel Type</InputLabel>
            <OutlinedInput
              id="fuelType"
              type="text"
              value={values.fuelType}
              onChange={handleChange('fuelType')}
              required
              label="Fuel Type"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="ownerInformation">Owner Information</InputLabel>
            <OutlinedInput
              id="ownerInformation"
              type="text"
              value={values.ownerInformation}
              onChange={handleChange('ownerInformation')}
              required
              label="Owner Information"
            />
          </FormControl>
        </div>
        {/* Apply width style to the button */}
        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
          Add
        </Button>
      </form>
    </MainCard>
  );
};

export default AddBus;
