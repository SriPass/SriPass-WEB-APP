// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ExpensesTable from 'pages/dashboard/ExpensesTable';



const ExpensesPage = () => (
  <MainCard>
    <Typography variant="body2">
      <ExpensesTable/>
    </Typography>
  </MainCard>
);

export default ExpensesPage;
