// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import CarrierRateTable from 'pages/dashboard/CarrierRateTable';



const CarrierRatePage = () => (
  <MainCard>
    <Typography variant="body2">
      <CarrierRateTable/>
    </Typography>
  </MainCard>
);

export default CarrierRatePage;
