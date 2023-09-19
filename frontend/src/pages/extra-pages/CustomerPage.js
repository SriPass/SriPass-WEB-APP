// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import CustomerTable from 'pages/dashboard/CustomerTable';



const CustomerPage = () => (
  <MainCard>
    <Typography variant="body2">
      <CustomerTable/>
    </Typography>
  </MainCard>
);

export default CustomerPage;
