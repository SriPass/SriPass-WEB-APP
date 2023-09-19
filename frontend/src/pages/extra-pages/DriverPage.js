// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import DriverTable from 'pages/dashboard/DriverTable';



const DriverPage = () => (
  <MainCard>
    <Typography variant="body2">
      <DriverTable/>
    </Typography>
  </MainCard>
);

export default DriverPage;
