import  { useState } from 'react'; // Added useState import

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useUser} from "../context/userContext"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' }); 
  const [errors, setErrors] = useState({ email: false, password: false });
  const {setUser,setAuth}=useUser()
  const navigate=useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    let newErrors = { email: false, password: false };

    if (formData.email && !formData.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
      newErrors.email = true;
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log(formData);
      try {
        const result = await axios.post("https://recipe-back-kygs.onrender.com/api/user/signin",{...formData})
        console.log(result)
        localStorage.setItem('authToken', result.data.token);
        setUser(result.data.user)
        setAuth(true)
        toast.success('Login Success :)')
        navigate("/home")
      } catch (error) {
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type='email'
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange} 
              error={errors.email} 
              helperText={errors.email ? 'Invalid email format' : ''}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange} 
              error={errors.password} 
              helperText={errors.password ? 'Password must be at least 6 characters long' : ''}
            />
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
 
  );
}