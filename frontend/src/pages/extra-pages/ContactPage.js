// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ContactTable from 'pages/dashboard/ContactTable';




const ContactPage = () => (
  <MainCard>
    <Typography variant="body2">
      <ContactTable/>
    </Typography>
  </MainCard>
);

export default ContactPage;
