import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { Button, FormControl, InputLabel, OutlinedInput, MenuItem, Select } from '@mui/material';
import { message } from 'antd';

const AddRoute = () => {
  const key = 'updatable'; // Define a unique key for the message

  const [values, setValues] = useState({
    RouteNo: '',
    from: '',
    to: '',
    vehicleNo: '',
  });

  // State variable to hold the list of RouteNo options
  const [routeOptions, setRouteOptions] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const addResponse = await fetch('https://sripass.onrender.com/api/bus-schedules/', {
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
      console.log('New payment added:', data);

      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: 'Route added successfully',
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
      console.error('Error adding new route:', error);

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
      console.error('Error updating route');
    }
  };

  // Use useEffect to fetch RouteNo options from the API
  useEffect(() => {
    const fetchRouteOptions = async () => {
      try {
        const response = await fetch('https://sripass.onrender.com/api/busroutes/');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        // Extract RouteNo values from data and set them in the state
        const routeNos = data.map((route) => route.RouteNo);
        setRouteOptions(routeNos);
      } catch (error) {
        console.error('Error fetching RouteNo options:', error);
      }
    };

    fetchRouteOptions();
  }, []); // Empty dependency array to fetch options only once on component mount

  return (
    <MainCard>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="RouteNo">Route ID</InputLabel>
          <Select
            label="Route No"
            id="RouteNo"
            value={values.RouteNo}
            onChange={handleChange('RouteNo')}
            required
          >
            {/* Map the fetched RouteNo options to MenuItem components */}
            {routeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="from">Start Time</InputLabel>
          <OutlinedInput id="from" type="text" value={values.from} onChange={handleChange('from')} required label="From" />
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="to">End Time</InputLabel>
          <OutlinedInput id="to" type="text" value={values.to} onChange={handleChange('to')} required label="To" />
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="vehicleNo">Select Drivers</InputLabel>
          <Select label="Vehicle No" id="vehicleNo" value={values.vehicleNo} onChange={handleChange('vehicleNo')} required>
            {/* Add MenuItem components for each driver option */}
            <MenuItem value="driver1">Driver 1</MenuItem>
            <MenuItem value="driver2">Driver 2</MenuItem>
            <MenuItem value="driver3">Driver 3</MenuItem>
            {/* Add more driver options as needed */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined" style={{ marginBottom: '20px' }}>
          <InputLabel htmlFor="vehicleNo">Select Inspector</InputLabel>
          <Select label="Vehicle No" id="vehicleNo" value={values.vehicleNo} onChange={handleChange('vehicleNo')} required>
            {/* Add MenuItem components for each inspector option */}
            <MenuItem value="inspector1">Inspector 1</MenuItem>
            <MenuItem value="inspector2">Inspector 2</MenuItem>
            <MenuItem value="inspector3">Inspector 3</MenuItem>
            {/* Add more inspector options as needed */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="to">Vehicle No</InputLabel>
          <OutlinedInput id="to" type="text" value={values.to} onChange={handleChange('to')} required label="To" />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
          ADD NEW SCHEDULE
        </Button>
      </form>
    </MainCard>
  );
};

export default AddRoute;
