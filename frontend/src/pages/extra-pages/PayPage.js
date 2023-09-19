// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import PayTable from 'pages/dashboard/PayTable';



const PayPage = () => (
  <MainCard>
    <Typography variant="body2">
      <PayTable/>
    </Typography>
  </MainCard>
);

export default PayPage;
