// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import CarrierTable from 'pages/dashboard/CarrierTable';




const CarrierPage = () => (
  <MainCard>
    <Typography variant="body2">
      <CarrierTable/>
    </Typography>
  </MainCard>
);

export default CarrierPage;
