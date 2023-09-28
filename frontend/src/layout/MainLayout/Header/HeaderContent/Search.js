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
  MoneyCollectOutlined,
  UserSwitchOutlined,
  ProfileOutlined
} from '@ant-design/icons';

const optionIcons = {
  
  'Local Passengers': <UserOutlined /> ,
  'Bus Scheduling': <CarryOutOutlined />,
  'Route Management': <ScheduleOutlined />,
  'Inspector Details': <CarOutlined />,
  'Bus Details': <ProfileOutlined />,
  'Driver Details': <UserSwitchOutlined />,
  'Fare Revenue Analysis' :<MoneyCollectOutlined /> 

};

const optionNavigation = {
  'Local Passengers': 'passenger',
  'Bus Scheduling': 'bus',
  'Route Management': 'route',
  'Inspector Details': 'inspector',
  'Bus Details': 'busdetails',
  'Driver Details': 'driver',
  'Fare Revenue Analysis' : 'fareRevenue'
 
 
};

export default function FreeSolo() {
  const options = [
    'Local Passengers',
    'Bus Scheduling',
    'Route Management',
    'Inspector Details',
    'Bus Details',
    'Driver Details',
    'Fare Revenue Analysis'

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
