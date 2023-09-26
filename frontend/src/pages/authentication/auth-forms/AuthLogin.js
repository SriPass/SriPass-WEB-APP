import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// material-ui
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';


// project import

import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';



const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {

    if (localStorage.getItem('currentManager')) {
      window.location.href = '/'
    }
  })

  function login(e) {

    e.preventDefault(); // Prevent the default form submission

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    // Validation for password field
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }



    const manager = { email, password };
    dispatch({ type: 'MANAGER_LOGIN_REQUEST' });
    setIsLoading(true); // Set loading state to true

    // Define the request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(manager),
    };

    fetch('https://sripass.onrender.com/api/manager/login', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: 'MANAGER_LOGIN_SUCCESS', payload: data });
        localStorage.setItem('currentManager', JSON.stringify(data));
        window.location.href = '/';
        setLoginSuccess('Login successful.');
      })
      .catch((error) => {
        setLoginError('Login unsuccessful. Please check your email and password.');
        setTimeout(() => {
          setLoginError('');
        }, 2000);
        dispatch({ type: 'MANAGER_LOGIN_FAILED', payload: error });
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false regardless of success or error
      });
  }


  return (
    <>
      <form noValidate onSubmit={login}>
        {isLoading && (
          <div style={{ marginBottom: '20px' }}>
            <LinearProgress />
          </div>

        )}
        {loginError && (
          <Alert severity="error" style={{ marginBottom: '10px' }}>{loginError}</Alert>
        )}
        {loginSuccess && (
          <Typography variant="caption" color="success">
            <Alert severity="success" style={{ marginBottom: '10px' }}>{loginSuccess}</Alert>
          </Typography>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  setEmailError('');
                }}
                placeholder="Enter email address"
                fullWidth
                error={!!emailError} // Add error prop
                sx={{ borderColor: emailError ? 'red' : undefined }} // Add border color style
              />
              {emailError && (
                <Typography variant="caption" color="error">
                  {emailError}
                </Typography>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="password-login"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                  setPasswordError(''); // Clear the error when the user makes changes
                }}

                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
                error={!!passwordError} // Add error prop
                sx={{ borderColor: passwordError ? 'red' : undefined }}
              />
              {passwordError && (
                <Typography variant="caption" color="error">
                  {passwordError}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="h6">Keep me signed in</Typography>}
              />
              <Link variant="h6" component={RouterLink} to="" color="text.primary">
                Forgot Password?
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <AnimateButton>
              <Button onClick={login} fullWidth size="large" type="submit" variant="contained" color="primary">
                Login
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>

  );
};

export default AuthLogin;
