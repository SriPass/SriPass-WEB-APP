import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ShipperTable from 'pages/dashboard/ShipperTable';



const ShipperPage = () => (
  <MainCard>
    <Typography variant="body2">
      <ShipperTable/>
    </Typography>
  </MainCard>
);

export default ShipperPage;
