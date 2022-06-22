import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { useHistory } from 'react-router-dom';

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
   Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';
import Main from '../styles/Main';
import Copyright from '../components/Copyright';

const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const history = useHistory();

   const { login, isPending, error, isFulfilled } = useLogin();

   const onSubmit = async (data) => {
      data;
      await login(data.email, data.password);

      'Login.js - isFulfilled', isFulfilled;

      if (isFulfilled) {
         history.push('/');
      }

      return () => clearTimeout();
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
                     onSubmit={handleSubmit(onSubmit)}
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
                     <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                     />
                     <Grid
                        container
                        sx={{
                           justifyContent: 'flex-end',
                           alignItems: 'center',
                           columnGap: '16px',
                        }}
                     >
                        {isPending && <Spinner size={32} />}
                        <Button
                           type="submit"
                           variant="contained"
                           sx={{ mt: 3, mb: 2, py: 2, px: 5 }}
                        >
                           {isPending ? 'Loading...' : 'Sign In'}
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
         {error &&
            toast.error(error, {
               position: 'bottom-center',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            })}
      </Main>
   );
};

export default Login;
