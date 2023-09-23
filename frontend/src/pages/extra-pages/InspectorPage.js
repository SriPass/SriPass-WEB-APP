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
import InspectorTable from 'pages/dashboard/InspectorTable';
import AddInspector from 'pages/components-overview/AddInspector';

const InspectorPage = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item></Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5, padding: 2 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <InspectorTable />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Add New Inspector</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <AddInspector />
        </MainCard>
      </Grid>

      {/* Row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Inspector Details Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {/* Add content for Inspector Details Report here */}
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Inspector Details Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Estimated Time" />
              <Typography variant="h5"></Typography>
            </ListItemButton>
            {/* Add more items for the Inspector Details Report */}
          </List>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default InspectorPage;
