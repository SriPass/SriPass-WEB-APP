import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { message } from 'antd';
import { Add as AddIcon } from '@mui/icons-material'; // Import the Add icon from MUI


const AddRoute = () => {
    const key = 'updatable'; // Define a unique key for the message

    const [values, setValues] = useState({
        RouteNo: '',
        from: '',
        to: '',
        vehicleNo: '',
    });

    const [destinations, setDestinations] = useState([]);

    const handleDestinationChange = (index, prop) => (event) => {
        const newDestinations = [...destinations];
        newDestinations[index][prop] = event.target.value;
        setDestinations(newDestinations);
    };

    const handleAddDestination = () => {
        setDestinations([...destinations, { startPoint: '', endPoint: '', fare: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const routeData = {
                ...values,
                destinations: destinations,
            };

            console.log(routeData)
            const addResponse = await fetch('https://sripass.onrender.com/api/busroutes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routeData),
            });

            if (!addResponse.ok) {
                throw new Error('API request failed');
            }

            const data = await addResponse.json();
            console.log('New route added:', data);

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

    return (
        <MainCard>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="RouteNo">Route No</InputLabel>
                    <OutlinedInput
                        id="RouteNo"
                        type="text"
                        value={values.RouteNo}
                        onChange={(e) => setValues({ ...values, RouteNo: e.target.value })}
                        required
                        label="Route No"
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="from">From</InputLabel>
                    <OutlinedInput
                        id="from"
                        type="text"
                        value={values.from}
                        onChange={(e) => setValues({ ...values, from: e.target.value })}
                        required
                        label="From"
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="to">To</InputLabel>
                    <OutlinedInput
                        id="to"
                        type="text"
                        value={values.to}
                        onChange={(e) => setValues({ ...values, to: e.target.value })}
                        required
                        label="To"
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="vehicleNo">Vehicle No</InputLabel>
                    <OutlinedInput
                        id="vehicleNo"
                        type="text"
                        value={values.vehicleNo}
                        onChange={(e) => setValues({ ...values, vehicleNo: e.target.value })}
                        required
                        label="Vehicle No"
                    />
                </FormControl>

                {/* Render destination input fields */}
                {destinations.map((destination, index) => (
                    <div key={index}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel htmlFor={`startPoint-${index}`}>{`Start Point ${index + 1}`}</InputLabel>
                            <OutlinedInput
                                id={`startPoint-${index}`}
                                type="text"
                                value={destination.startPoint}
                                onChange={handleDestinationChange(index, 'startPoint')}
                                required
                                label={`Start Point ${index + 1}`}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel htmlFor={`endPoint-${index}`}>{`End Point ${index + 1}`}</InputLabel>
                            <OutlinedInput
                                id={`endPoint-${index}`}
                                type="text"
                                value={destination.endPoint}
                                onChange={handleDestinationChange(index, 'endPoint')}
                                required
                                label={`End Point ${index + 1}`}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel htmlFor={`fare-${index}`}>{`Fare ${index + 1}`}</InputLabel>
                            <OutlinedInput
                                id={`fare-${index}`}
                                type="number"
                                value={destination.fare}
                                onChange={handleDestinationChange(index, 'fare')}
                                required
                                label={`Fare ${index + 1}`}
                            />
                        </FormControl>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={handleAddDestination}
                    style={{ marginBottom: '20px', marginTop: '20px', display: 'flex', alignItems: 'center', height: '45px' }}
                >
                    <AddIcon />
                    Add Destination
                </Button>


                <Button type="submit" variant="contained" color="primary" style={{ height: '45px', width: '100%' }}>
                    ADD NEW ROUTE
                </Button>
            </form>
        </MainCard>
    );
};

export default AddRoute;
