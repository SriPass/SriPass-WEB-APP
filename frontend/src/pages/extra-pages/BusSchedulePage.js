import React from 'react';
import {
  Box,
  Grid,
  Typography

} from '@mui/material';
import MainCard from 'components/MainCard';
import AddBusSchedule from 'pages/components-overview/AddBusSchedule';
import BusScheduleTable from 'pages/dashboard/BusScheduleTable';

const BusSchedulePage = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Details</Typography>
          </Grid>

        </Grid>
        <MainCard content={false} sx={{ mt: 1.5, padding: 2 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <BusScheduleTable/>
          </Box>
        </MainCard>

      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Add New Bus Schedule</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <AddBusSchedule />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default BusSchedulePage;
