import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { message } from 'antd';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';


const AddBusSchedule = () => {
  const key = 'updatable'; // Define a unique key for the message
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [values, setValues] = useState({
    RouteNo: '',
    StartDate: '',
    EndDate: '',
    StartTime: '',
    EndTime: '',
    VehicalNo: ''
  });

  const [driverOptions, setDriverOptions] = useState([]);
  const [inspectorOptions, setInspectorOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  useEffect(() => {
    const fetchInspectorOptions = async () => {
      try {
        const response = await fetch('https://sripass.onrender.com/api/businspectors/');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        console.log('Inspector Data:', data);
        // Extract inspector options and set them in the state
        const inspectorData = data.map((inspector) => ({
          inspectorId: inspector.inspectorId,
          name: inspector.name
        }));
        setInspectorOptions(inspectorData);
      } catch (error) {
        console.error('Error fetching inspector options:', error);
      }
    };

    fetchInspectorOptions();
  }, []);

  useEffect(() => {
    const fetchVehicleOptions = async () => {
      try {
        const response = await fetch('https://sripass.onrender.com/api/bus/');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        // Extract licensePlateNumber values from data and set them in the state
        const vehicleNos = data.map((vehicle) => vehicle.licensePlateNumber);
        setVehicleOptions(vehicleNos);
      } catch (error) {
        console.error('Error fetching Vehicle No options:', error);
      }
    };

    fetchVehicleOptions();
  }, []);


  // Use useEffect to fetch driver options from the API
  useEffect(() => {
    const fetchDriverOptions = async () => {
      try {
        const response = await fetch('https://sripass.onrender.com/api/driver/');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        // Extract driver_id and name from data and set them in the state
        const driverData = data.map((driver) => ({
          driverId: driver.driver_id,
          name: driver.name
        }));
        setDriverOptions(driverData);
      } catch (error) {
        console.error('Error fetching driver options:', error);
      }
    };

    fetchDriverOptions();
  }, []);
  // State variable to hold the list of RouteNo options
  const [routeOptions, setRouteOptions] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Data', values);

    // Include the date and time values in the values object
    const updatedValues = {
      ...values,
      StartDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
      EndDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
      StartTime: startTime ? dayjs(startTime).format('hh:mm a') : '',
      EndTime: endTime ? dayjs(endTime).format('hh:mm a') : ''
    };

    console.log(updatedValues)

    try {
      const addResponse = await fetch('https://sripass.onrender.com/api/bus-schedules/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedValues)
      });

      if (!addResponse.ok) {
        throw new Error('API request failed');
      }

      const data = await addResponse.json();
      console.log('New payment added:', data);

      message.open({
        key,
        type: 'loading',
        content: 'Loading...'
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: 'Route added successfully',
          duration: 2
        });
      }, 1000);
      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message'
      });
    } catch (error) {
      console.error('Error adding new route:', error);

      message.open({
        key,
        type: 'loading',
        content: 'Loading...'
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'error',
          content: 'Error',
          duration: 2
        });
      }, 1000);
      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message'
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
          <Select label="Route No" id="RouteNo" value={values.RouteNo} onChange={handleChange('RouteNo')} required>
            {/* Map the fetched RouteNo options to MenuItem components */}
            {routeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined" style={{ marginBottom: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateField label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
        </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined" style={{ marginBottom: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateField label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
        </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined" style={{ marginBottom: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <TimePicker label="Start Time" value={startTime} onChange={(newValue) => setStartTime(newValue)} />
        </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined" style={{ marginBottom: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="End Time" value={endTime} onChange={(newValue) => setEndTime(newValue)} />
        </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="driverNo">Select Drivers</InputLabel>
          <Select label="Driver No" id="driverNo" value={values.DriverNo} onChange={handleChange('DriverNo')} required>
            {/* Map the fetched driver options to MenuItem components */}
            {driverOptions.map((option) => (
              <MenuItem key={option.driverId} value={option.driverId}>
                {option.driverId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="inspectorNo">Select Inspector</InputLabel>
          <Select label="Inspector No" id="inspectorNo" value={values.inspectorNo} onChange={handleChange('inspectorNo')} required>
            {/* Map the fetched inspector options to MenuItem components */}
            {inspectorOptions.map((option) => (
              <MenuItem key={option.inspectorId} value={option.inspectorId}>
                {option.inspectorId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

         <FormControl fullWidth margin="normal" variant="outlined" style={{ marginBottom: '20px' }}>
          <InputLabel htmlFor="vehicalNo">Vehicle No</InputLabel>
          <Select
            label="Vehicle No"
            id="vehicalNo"
            value={values.VehicleNo}
            onChange={handleChange('VehicleNo')}
            required
          >
            {/* Map the fetched vehicle options to MenuItem components */}
            {vehicleOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
          ADD NEW SCHEDULE
        </Button>
      </form>
    </MainCard>
  );
};

export default AddBusSchedule;
