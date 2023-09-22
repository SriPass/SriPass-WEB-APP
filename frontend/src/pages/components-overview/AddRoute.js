import React from 'react';
import MainCard from 'components/MainCard';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { message } from 'antd';

const AddRoute = () => {


    const key = 'updatable'; // Define a unique key for the message

    const [values, setValues] = React.useState({
        RouteNo: '',
        from: '',
        to: '',
        vehicleNo: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const addResponse = await fetch('http://localhost:8070/api/busroutes/', {
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
    }

return (
    <MainCard>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="RouteNo">Route No</InputLabel>
                <OutlinedInput
                    id="RouteNo"
                    type="text"
                    value={values.RouteNo}
                    onChange={handleChange('RouteNo')}
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
                    onChange={handleChange('from')}
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
                    onChange={handleChange('to')}
                    required
                    label="To"
                />
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined" style={{ marginBottom: '20px' }}>
                <InputLabel htmlFor="vehicleNo">Vehicle No</InputLabel>
                <OutlinedInput
                    id="vehicleNo"
                    type="text"
                    value={values.vehicleNo}
                    onChange={handleChange('vehicleNo')}
                    required
                    label="Vehicle No"
                />
            </FormControl>

            <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                ADD NEW ROUTE
            </Button>
        </form>
    </MainCard>

);
};

export default AddRoute;
