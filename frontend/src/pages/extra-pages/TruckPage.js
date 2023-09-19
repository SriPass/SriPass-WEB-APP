// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import TruckTable from 'pages/dashboard/TruckTable';



const TruckPage = () => (
  <MainCard>
    <Typography variant="body2">
      <TruckTable/>
    </Typography>
  </MainCard>
);

export default TruckPage;
