import { Link as RouterLink } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
   Avatar,
   Button,
   TextField,
   Input,
   Link,
   Paper,
   Box,
   Grid,
   Typography,
   Alert,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Main from '../styles/Main';
import Copyright from '../components/Copyright';

const Signup = () => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      console.log(data);
   };

   console.log(watch('displayName'));
   console.log(watch('email'));
   console.log(watch('password'));
   console.log(errors);

   return (
      <Main>
         <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={false} sm={4} md={6} sx={{}}>
               <img
                  src={require('../assets/images/photos/office-photo-2.jpg')}
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
                     <KeyIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign up
                  </Typography>
                  <Box
                     component="form"
                     noValidate
                     onSubmit={handleSubmit(onSubmit)}
                     sx={{ mt: 1 }}
                  >
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="displayName"
                        label="Name"
                        name="displayName"
                        autoComplete="name"
                        error={!!errors.displayName}
                        autoFocus
                        {...register('displayName', {
                           required: true,
                           minLength: 3,
                           maxLength: 30,
                        })}
                     />
                     {errors.displayName && (
                        <Alert severity="error">
                           This field is required and must contain 3-30
                           characters.
                        </Alert>
                     )}
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...register('email', {
                           required: true,
                           minLength: 5,
                           maxLength: 30,
                        })}
                     />
                     {errors.email && (
                        <Alert severity="error">
                           This field is required, must contain 5-30 characters
                           and be a valid email address.
                        </Alert>
                     )}
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register('password', {
                           required: true,
                           minLength: 10,
                        })}
                     />
                     {errors.password && (
                        <Alert severity="error">
                           This field is required and must contain at least 10
                           characters.
                        </Alert>
                     )}
                     <label htmlFor="contained-button-file">
                        <Input
                           accept="image/*"
                           id="contained-button-file"
                           type="file"
                           sx={{ display: 'none' }}
                        />
                        <Button
                           startIcon={<PhotoCamera />}
                           variant="contained"
                           component="span"
                           sx={{ my: 2, px: 2, py: 1 }}
                        >
                           Upload avatar
                        </Button>
                     </label>
                     <Grid container sx={{ justifyContent: 'flex-end' }}>
                        <Button
                           type="submit"
                           variant="contained"
                           sx={{ mt: 3, mb: 2, py: 2, px: 5 }}
                        >
                           Sign Up
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
                           Already have an account?{' '}
                           <Link
                              component={RouterLink}
                              to="/login"
                              variant="body2"
                           >
                              {'Sign In'}
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

export default Signup;
