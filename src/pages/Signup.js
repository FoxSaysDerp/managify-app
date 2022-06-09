import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../hooks/useSignup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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
import Spinner from '../components/Spinner';

const Signup = () => {
   const [avatarErrors, setAvatarErrors] = useState([]);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   const history = useHistory();

   const { signup, isPending, error, isFulfilled } = useSignup();

   const ONE_MEGABYTE = 1024 * 1024;
   const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

   const onSubmit = async (data) => {
      console.log(data);
      if (Object.values(data).every((item) => typeof item !== 'undefined')) {
         await signup(
            data.email,
            data.password,
            data.displayName,
            data.avatar[0]
         );

         if (isFulfilled) {
            history.push('/');
         }
      }

      return () => clearTimeout();
   };

   const avatarInput = watch('avatar');

   const avatarInputChecker = () => {
      setAvatarErrors([]);
      if (avatarInput && avatarInput[0]) {
         if (avatarInput[0].size > ONE_MEGABYTE) {
            setAvatarErrors([...avatarErrors, 'Avatar is too large.']);
         }

         if (!ALLOWED_TYPES.includes(avatarInput[0].type)) {
            setAvatarErrors([...avatarErrors, 'Avatar has an invalid type.']);
         }
      }
   };

   useMemo(() => {
      avatarInputChecker();
   }, [avatarInput]);

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
                     <Grid container sx={{ alignItems: 'center' }}>
                        <label htmlFor="avatar">
                           <Input
                              accept="image/jpeg,image/jpg,image/png"
                              multiple={false}
                              type="file"
                              name="avatar"
                              id="avatar"
                              sx={{ display: 'none' }}
                              {...register('avatar', {
                                 required: true,
                              })}
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
                        <Typography variant={'caption'} sx={{ px: 2 }}>
                           Only accepted file types are *.JPG, *.JPEG, *.PNG.
                           <br />
                           Max file size: 1MB
                        </Typography>
                     </Grid>
                     {avatarErrors.length !== 0 && (
                        <Alert severity="error">
                           <ul style={{ marginBottom: 0 }}>
                              {avatarErrors.map((item, index) => {
                                 if (item.length > 1) {
                                    return <li key={index}>{item}</li>;
                                 }
                              })}
                           </ul>
                        </Alert>
                     )}
                     {/* eslint-disable */}
                     {avatarErrors.length === 0 &&
                        avatarInput &&
                        avatarInput[0] && (
                           <Grid container>
                              <TextField
                                 id="avatarText"
                                 InputProps={{
                                    readOnly: true,
                                 }}
                                 fullWidth
                                 variant="standard"
                                 defaultValue={avatarInput[0].name}
                              />
                           </Grid>
                        )}
                     {/* eslint-enable */}
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
                           {isPending ? 'Loading...' : 'Sign Up'}
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
                              Sign In
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

export default Signup;
