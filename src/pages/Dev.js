import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

import Main from '../styles/Main';

import routes from '../routes/routes';

import { Link } from 'react-router-dom';

const Dev = () => {
   return (
      <Main>
         <Grid
            container
            sx={{
               justifyContent: 'center',
               minHeight: '100vh',
               alignItems: 'center',
               flexDirection: 'column',
            }}
         >
            <Typography variant="h4" sx={{ mb: 3 }}>
               Current routes
            </Typography>
            <Box
               sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
               }}
            >
               <nav aria-label="secondary mailbox folders">
                  <List>
                     {routes.map((route, index) => {
                        return (
                           <ListItem disablePadding key={index}>
                              <ListItemButton component={Link} to={route.path}>
                                 <ListItemText primary={route.name} />
                                 <code>{route.path}</code>
                              </ListItemButton>
                           </ListItem>
                        );
                     })}
                  </List>
               </nav>
            </Box>
         </Grid>
      </Main>
   );
};

export default Dev;
