import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, FormControl, InputAdornment, ListItemIcon, ListItemText } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import {
  UserOutlined,
  CarryOutOutlined,
  ScheduleOutlined,
  CarOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  ContactsOutlined,
  TeamOutlined,
  MoneyCollectOutlined,
  SolutionOutlined,
  ClusterOutlined,
  ShopOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

const optionIcons = {
  Customer: <UserOutlined />,
  Load: <CarryOutOutlined />,
  Shipper: <ScheduleOutlined />,
  Carrier: <CarOutlined />,
  'Carrier Rate': <DollarCircleOutlined />,
  Consigne: <FileTextOutlined />,
  Contact: <ContactsOutlined />,
  'Customer Rate': <TeamOutlined />,
  Driver: <UserSwitchOutlined />,
  Expenses: <MoneyCollectOutlined />,
  Pay: <DollarCircleOutlined />,
  Supplier: <SolutionOutlined />,
  Trailer: <ClusterOutlined />,
  Truck: <ShopOutlined />,

  'Add Customer': <UserOutlined />,
  'Add Load': <CarryOutOutlined />,
  'Add Shipper': <ScheduleOutlined />,
  'Add Carrier': <CarOutlined />,
  'Add Carrier Rate': <DollarCircleOutlined />,
  'Add Consigne': <FileTextOutlined />,
  'Add Contact': <ContactsOutlined />,
  'Add Customer Rate': <TeamOutlined />,
  'Add Driver': <UserSwitchOutlined />,
  'Add Expenses': <MoneyCollectOutlined />,
  'Add Pay': <DollarCircleOutlined />,
  'Add Supplier': <SolutionOutlined />,
  'Add Trailer': <ClusterOutlined />,
  'Add Truck': <ShopOutlined />,
  // ... Add icons for other options
};

const optionNavigation = {
  'Carrier Rate': 'carrierrate',
  'Customer Rate': 'customerrate',
  // ... Add other navigation mappings here
  'Add Customer': 'addcustomer',
  'Add Load': 'addload',
  'Add Shipper': 'addshipper',
  'Add Carrier': 'addcarrier',
  'Add Carrier Rate': 'addcarrierrate',
  'Add Consigne': 'addconsigne',
  'Add Contact': 'addcontact',
  'Add Customer Rate': 'addcustomerrate',
  'Add Driver': 'adddriver',
  'Add Expenses': 'addexpenses',
  'Add Pay': 'addpay',
  'Add Supplier': 'addsupplier',
  'Add Trailer': 'addtrailer',
  'Add Truck': 'addtruck',
};

export default function FreeSolo() {
  const options = [
    'Customer',
    'Load',
    'Shipper',
    'Carrier',
    'Carrier Rate',
    'Consigne',
    'Contact',
    'Customer Rate',
    'Driver',
    'Expenses',
    'Pay',
    'Supplier',
    'Trailer',
    'Truck',

    'Add Customer',
    'Add Load',
    'Add Shipper',
    'Add Carrier Rate',
    'Add Consigne',
    'Add Contact',
    'Add Customer Rate',
    'Add Driver',
    'Add Expenses',
    'Add Pay',
    'Add Supplier',
    'Add Trailer',
    'Add Truck',
    // ... Other options
  ];
  const navigate = useNavigate();

  const handleOptionSelect = (event, value) => {
    if (value) {
      // Navigate to the appropriate route when an option is selected
      navigate(`/${optionNavigation[value] || value.toLowerCase()}`);
    }
  };

  const getOptionLabelWithIcon = (option) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ListItemIcon sx={{ marginRight: 1 }}>
        {optionIcons[option]}
      </ListItemIcon>
      <ListItemText primary={option} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
        <Stack spacing={3}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={options}
            sx={{
              width: 250,
              '& .MuiInputBase-input': {
                height: '6px',
              },
            }}
            onChange={(event, value) => handleOptionSelect(event, value)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Ctrl + K"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>{getOptionLabelWithIcon(option)}</li>
            )}
          />
        </Stack>
      </FormControl>
    </Box>
  );
}
