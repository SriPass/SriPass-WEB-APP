// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import CustomerRateTable from 'pages/dashboard/CustomerRateTable';




const CustomerRatePage = () => (
  <MainCard>
    <Typography variant="body2">
      <CustomerRateTable/>
    </Typography>
  </MainCard>
);

export default CustomerRatePage;
