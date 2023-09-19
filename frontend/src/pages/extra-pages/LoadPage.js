import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import LoadTable from 'pages/dashboard/LoadTable';



const LoadPage = () => (
  <MainCard>
    <Typography variant="body2">
      <LoadTable/>
    </Typography>
  </MainCard>
);

export default LoadPage;
