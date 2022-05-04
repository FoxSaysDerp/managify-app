import React from 'react';
import { Grid, Paper, Stack } from '@mui/material';

import UserList from '../components/UserList';

const Home = () => {
   return (
      <>
         <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
               <Stack spacing={3}>
                  <Paper
                     sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                     }}
                  >
                     <span>Test</span>
                  </Paper>
                  <Paper
                     sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                     }}
                  >
                     <span>Test</span>
                  </Paper>
               </Stack>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
               <Paper
                  sx={{
                     px: 2,
                     py: 1,
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               >
                  <UserList />
               </Paper>
            </Grid>
         </Grid>
      </>
   );
};

export default Home;
