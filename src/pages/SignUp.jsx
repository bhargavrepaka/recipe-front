import { useState } from 'react'; // Added useState import
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' }); 
  const [errors, setErrors] = useState({ email: false, password: false,exists:false }); 
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let newErrors = { email: false, password: false };

    if (!formData.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
      newErrors.email = true;
    }

    if (formData.password.length < 6) {
      newErrors.password = true;
    }

    // Update the state with the new errors
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        const result = await axios.post('http://localhost:8080/api/user/signup',{...formData})
        console.log(result)
        toast.success("Account Created!\nHead to Sign In :) ",{
          duration: 3000,
        })
        navigate("/signin")
      } catch (error) {
        setErrors({...errors,exists:true})
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); 
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange} 
                  error={errors.email} 
                  helperText={errors.email ? 'Invalid email format' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange} 
                  error={errors.password} 
                  helperText={errors.password ? 'Password must be at least 6 characters long' : ''}
                />
              </Grid>
              {/* <Grid item xs={12}>
              {errors.exists ? 
              <Typography variant='h6' color={'red'}>User already exists</Typography> : " "
               }
                
              </Grid> */}
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}