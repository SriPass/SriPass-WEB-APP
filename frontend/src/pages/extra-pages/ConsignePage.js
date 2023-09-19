// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ConsigneTable from 'pages/dashboard/ConsigneTable';




const ConsignePage = () => (
  <MainCard>
    <Typography variant="body2">
      <ConsigneTable/>
    </Typography>
  </MainCard>
);

export default ConsignePage;
