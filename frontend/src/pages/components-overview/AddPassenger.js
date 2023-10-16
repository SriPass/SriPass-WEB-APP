
import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { Button, FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { message } from 'antd';



const AddPassenger = () => {
  const key = 'updatable'; // Define a unique key for the message

  const [values, setValues] = useState({
    passengerId: '',
    firstName: '',
    lastName: '',
    email:'',
    password:'',
    contactNumber: '',
    address: '',
  });

  const [ setRoutes] = useState([]); // State variable to store route data

  useEffect(() => {
    // Fetch the route data when the component mounts
    fetch('https://sripass.onrender.com/api/busroutes/')
      .then((response) => response.json())
      .then((data) => {
        setRoutes(data); // Update the routes state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching routes:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addResponse = await fetch('https://sripass.onrender.com/api/localPassengers/', {
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
      console.log('New local passenger added:', data);
      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: 'Passenger added successfully',
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
      console.error('Error adding new local passenger:', error);
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
            <InputLabel htmlFor="passengerId">Passenger ID</InputLabel>
            <OutlinedInput
              id="passengerId"
              type="text"
              value={values.passengerId}
              onChange={handleChange('passengerId')}
              required
              label="Passenger ID"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <OutlinedInput
              id="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange('firstName')}
              required
              label="First Name"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <OutlinedInput
              id="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange('lastName')}
              required
              label="Last Name"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="lastName">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              required
              label="Email"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="lastName">Password</InputLabel>
            <OutlinedInput
              id="password"
              type="password"
              value={values.password}
              onChange={handleChange('password')}
              required
              label="Password"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
            <OutlinedInput
              id="contactNumber"
              type="text"
              value={values.contactNumber}
              onChange={handleChange('contactNumber')}
              required
              label="Contact Number"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="address">Address</InputLabel>
            <OutlinedInput
              id="address"
              type="text"
              value={values.address}
              onChange={handleChange('address')}
              required
              label="Address"
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
export default AddPassenger;