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
import DriverTable from 'pages/dashboard/DriverTable';
import AddDriver from 'pages/components-overview/AddDriver';


const DriverPage = () => {

    



    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Route Details</Typography>
                    </Grid>

                </Grid>
                <MainCard content={false} sx={{ mt: 1.5, padding: 2 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <DriverTable/>
                    </Box>
                </MainCard>

            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Add New Route</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AddDriver/>
                </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Route</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                   
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Route Details</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                            <ListItemText primary="Estimated Time" />
                            <Typography variant="h5"></Typography>
                        </ListItemButton>
                       
                            <>
                                <ListItemButton divider>
                                    <ListItemText primary="Start" />
                                    <Typography variant="h5"></Typography>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Destination" />
                                    <Typography variant="h5"></Typography>
                                </ListItemButton>
                            </>
                        
                    </List>
                </MainCard>

            </Grid>


        </Grid>
    );
};

export default DriverPage;
