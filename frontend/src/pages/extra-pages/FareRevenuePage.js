import React, { useState, useEffect } from 'react';


// material-ui
import {

    Box,
    Grid,
    Typography
} from '@mui/material';

// project import
import IncomeAreaChart from '../dashboard/IncomeAreaChart';


import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import CostPerDayChart from '../dashboard/CostPerDayChart';






// // sales report status
// const status = [
//     {
//         value: 'today',
//         label: 'Today'
//     },
//     {
//         value: 'month',
//         label: 'This Month'
//     },
//     {
//         value: 'year',
//         label: 'This Year'
//     }
// ];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const FreeRevenuePage = () => {

    
    const [costData, setCostData] = useState(null);
    const [totalPassengers, setTotalPassengers] = useState(null);
    const [totalRoutes, setTotalRoutes] = useState(null);
    const [totalBuses, setTotalBuses] = useState(null);

    //Total Revenue
    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/travelhistory/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming that the response data is an array of objects with 'cost' property
                // Calculate the total cost from the data
                const totalCost = data.reduce((accumulator, item) => accumulator + item.cost, 0);
                setCostData(totalCost);
                console.log(totalCost)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Total Passengers
    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/localpassengers/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of documents, and you want to count them
                const numberOfPassengers = data.length;
                setTotalPassengers(numberOfPassengers);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Total Routes
    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/busroutes/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of documents, and you want to count them
                const numberOfRoutes = data.length;
                setTotalRoutes(numberOfRoutes);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //Total Buses
    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/bus/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of documents, and you want to count them
                const numberOfBuses = data.length;
                setTotalBuses(numberOfBuses);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Total Drivers
    const [totalDrivers, setTotalDrivers] = useState(null); // State to store the total number of drivers

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/driver/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of documents, and you want to count them
                const numberOfDrivers = data.length;
                setTotalDrivers(numberOfDrivers);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Total Inspectors
    const [totalInspectors, setTotalInspectors] = useState(null); // State to store the total number of inspectors

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/businspectors/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of documents, and you want to count them
                const numberOfInspectors = data.length;
                setTotalInspectors(numberOfInspectors);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //Total Balance
    const [totalBalance, setTotalBalance] = useState(null); // State to store the total balance

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/localpassengers/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of documents with a "balance" property
                // Calculate the total balance from the data
                const total = data.reduce((accumulator, item) => accumulator + item.balance, 0);
                setTotalBalance(total);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //Total TopUpAmount
    const [totalTopUpAmount, setTotalTopUpAmount] = useState(null); // State to store the total topUpAmount

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('https://sripass.onrender.com/api/localpassengers/')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of objects with 'topUpAmount' property
                // Calculate the total topUpAmount from the data
                const totalAmount = data.reduce((accumulator, item) => accumulator + item.topUpAmount, 0);
                setTotalTopUpAmount(totalAmount);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);



    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Reports</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Revenue" count={costData !== null ? `LKR ${costData.toFixed(2)}` : 'Loading...'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Account Balance of Passengers" count={totalBalance !== null ? `LKR ${totalBalance.toFixed(2)}` : 'Loading...'} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Top-Up Amount of Passengers" count={totalTopUpAmount !== null ? `LKR ${totalTopUpAmount.toFixed(2)}` : 'Loading...'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Passengers" count={totalPassengers !== null ? totalPassengers.toLocaleString() : 'Loading...'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Routes" count={totalRoutes !== null ? totalRoutes.toLocaleString() : 'Loading...'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Registerd Buses" count={totalBuses !== null ? totalBuses.toLocaleString() : 'Loading...'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Registerd Drivers" count={totalDrivers !== null ? totalDrivers.toLocaleString() : 'Loading...'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Registerd Inspectors" count={totalInspectors !== null ? totalInspectors.toLocaleString() : 'Loading...'} />
            </Grid>




            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Route Cost Analysis Chart</Typography>
                    </Grid>
                    <Grid item>
                        
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <IncomeAreaChart />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Cost Per Day Chart</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        
                    </Box>
                    <CostPerDayChart />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default FreeRevenuePage;
