import { Link as RouterLink } from 'react-router-dom';

import {
   Avatar,
   Button,
   TextField,
   FormControlLabel,
   Checkbox,
   Link,
   Paper,
   Box,
   Grid,
   Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Main from '../styles/Main';
import Copyright from '../components/Copyright';

const Login = () => {
   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         email: data.get('email'),
         password: data.get('password'),
      });
   };

   return (
      <Main>
         <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={false} sm={4} md={6} sx={{}}>
               <img
                  src={require('../assets/images/photos/office-photo-1.jpg')}
                  alt=""
                  style={{
                     width: '100%',
                     objectFit: 'cover',
                     height: '100vh',
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={2}>
               <Box
                  sx={{
                     mx: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                     height: '100%',
                  }}
               >
                  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign in
                  </Typography>
                  <Box
                     component="form"
                     noValidate
                     onSubmit={handleSubmit}
                     sx={{ mt: 1 }}
                  >
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                     />
                     <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                     />
                     <Grid container sx={{ justifyContent: 'flex-end' }}>
                        <Button
                           type="submit"
                           variant="contained"
                           sx={{ mt: 3, mb: 2, py: 2, px: 5 }}
                        >
                           Sign In
                        </Button>
                     </Grid>
                     <Grid container>
                        <Grid item xs>
                           <Link
                              component={RouterLink}
                              to="/dev"
                              variant="body2"
                           >
                              Forgot password?
                           </Link>
                        </Grid>
                        <Grid item>
                           Don&apos;t have an account?{' '}
                           <Link
                              component={RouterLink}
                              to="/signup"
                              variant="body2"
                           >
                              {'Sign Up'}
                           </Link>
                        </Grid>
                     </Grid>
                     <Copyright sx={{ mt: 3 }} />
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Main>
   );
};

export default Login;
