// material-ui

import { Box } from '@mui/material';
import backgroundImage from '../logo/bg.png'; // Import your image here
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        bottom: 0,
      }}
    >
      <img
        src={backgroundImage} // Use the imported image as the source
        alt="Background"
        style={{
          width: '100%',
          height: 'calc(100vh - 175px)',
          objectFit: 'cover', // Ensure the image covers the entire container
        }}
      />
    </Box>
  );
};

export default AuthBackground;
