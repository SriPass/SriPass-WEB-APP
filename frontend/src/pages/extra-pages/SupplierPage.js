// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import SupplierTable from 'pages/dashboard/SupplierTable';



const SupplierPage = () => (
  <MainCard>
    <Typography variant="body2">
      <SupplierTable/>
    </Typography>
  </MainCard>
);

export default SupplierPage;
