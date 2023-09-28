import React from 'react';
import {
    Box,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Typography

} from '@mui/material';
import MainCard from 'components/MainCard';
import PassengerTable from 'pages/dashboard/PassengerTable';
import AddPassenger from 'pages/components-overview/AddPassenger';
import TravelHistoryTable from 'pages/dashboard/TravelHistoryTable';


const PassengerPage = () => {

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>                       
                     <Typography variant="h5">Passenger Details</Typography>

                    </Grid>

                </Grid>
                <MainCard content={false} sx={{ mt: 1.5, padding: 2 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <PassengerTable/>
                    </Box>
                </MainCard>

            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Add /Register Passengers</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AddPassenger/>
                </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Passengers Travel History Details</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                   <TravelHistoryTable/>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Passengers Journey Report</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                            <ListItemText primary="Monthly" />
                            <Typography variant="h5"></Typography>
                        </ListItemButton>
                       
                            <>
                                <ListItemButton divider>
                                    <ListItemText primary="Weekly" />
                                    <Typography variant="h5"></Typography>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Daily" />
                                    <Typography variant="h5"></Typography>
                                </ListItemButton>
                            </>
                        
                    </List>
                </MainCard>

            </Grid>


        </Grid>
    );
};

export default PassengerPage;
