// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import TrailerTable from 'pages/dashboard/TrailerTable';



const TrailerPage = () => (
  <MainCard>
    <Typography variant="body2">
      <TrailerTable/>
    </Typography>
  </MainCard>
);

export default TrailerPage;
