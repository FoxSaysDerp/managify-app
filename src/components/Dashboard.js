import React, { useState } from 'react';

import styledComp from 'styled-components';

import { styled } from '@mui/material/styles';
import { theme } from '../styles/theme';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {
   Container,
   Avatar,
   Box,
   List,
   ListItemIcon,
   ListItemButton,
   ListItemText,
   Toolbar,
   Fab,
   Divider,
   IconButton,
   Badge,
   Tooltip,
   Chip,
} from '@mui/material';
import { Menu, ChevronLeft, Notifications, Add } from '@mui/icons-material';

import { NavLink as RouterLink } from 'react-router-dom';

import {
   dashboardNav,
   dashboardNavSecondary,
   dashboardNavDev,
} from '../constants/dashboardNav';
import Copyright from './Copyright';

const drawerWidth = 240;

const Logo = styledComp.img`
   max-height: 42px;
   width: auto;
`;
console.log(theme.palette);

const DashboardListItemButton = styledComp(ListItemButton)`
   &.active {
      background-color: ${theme.palette.primary.light};
      color: ${theme.palette.primary.contrastText}
   }
`;

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
         overflowX: 'hidden',
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         width: theme.spacing(7),
         [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
         },
      }),
   },
}));

const Dashboard = (props) => {
   const [open, setOpen] = useState(true);
   const toggleDrawer = () => {
      setOpen(!open);
   };

   const { children } = props;

   return (
      <React.Fragment>
         <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
               <Toolbar
                  sx={{
                     pr: '24px', // keep right padding when drawer closed
                  }}
               >
                  <IconButton
                     edge="start"
                     color="inherit"
                     aria-label="open drawer"
                     onClick={toggleDrawer}
                     sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                     }}
                  >
                     <Menu />
                  </IconButton>
                  <Logo
                     src={require('../assets/images/logo.png')}
                     alt="Managify"
                     sx={{ flexGrow: 1 }}
                  />
                  <div style={{ flexGrow: 1 }} />
                  <IconButton color="inherit">
                     <Badge badgeContent={4} color="secondary">
                        <Notifications />
                     </Badge>
                  </IconButton>
                  <IconButton sx={{ ml: 2 }}>
                     <Avatar
                        src={require('../assets/images/placeholders/person-placeholder.jpg')}
                     />
                  </IconButton>
               </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
               <Toolbar
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'flex-end',
                     px: [1],
                  }}
               >
                  <IconButton onClick={toggleDrawer}>
                     <ChevronLeft />
                  </IconButton>
               </Toolbar>
               <Divider />
               <List component="nav">
                  {dashboardNav.map((item, index) => {
                     return (
                        <DashboardListItemButton
                           component={RouterLink}
                           to={item.link}
                           key={index}
                           sx={{ px: 2, py: 1, m: 1, borderRadius: '18px' }}
                        >
                           <ListItemIcon>{item.icon}</ListItemIcon>
                           <ListItemText primary={item.label} />
                        </DashboardListItemButton>
                     );
                  })}
                  <Divider sx={{ my: 1 }} />
                  {dashboardNavSecondary.map((item, index) => {
                     return (
                        <DashboardListItemButton
                           component={RouterLink}
                           to={item.link}
                           key={index}
                        >
                           <ListItemIcon>{item.icon}</ListItemIcon>

                           <ListItemText primary={item.label} />
                        </DashboardListItemButton>
                     );
                  })}
                  <Divider sx={{ mt: 5, mb: 1 }} />
                  {dashboardNavDev.map((item, index) => {
                     return (
                        <DashboardListItemButton
                           component={RouterLink}
                           to={item.link}
                           key={index}
                        >
                           <ListItemIcon>{item.icon}</ListItemIcon>

                           <ListItemText
                              primary={item.label}
                              sx={{
                                 display: 'inline-block',
                                 width: 'fit-content',
                              }}
                           />
                           {item.chip && (
                              <Chip
                                 label={item.chip.label}
                                 color={item.chip.color}
                              />
                           )}
                        </DashboardListItemButton>
                     );
                  })}
               </List>
            </Drawer>
            <Box
               component="main"
               sx={{
                  backgroundColor: (theme) =>
                     theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
               }}
            >
               <Toolbar />
               <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
                  {children}
               </Container>
               <Copyright />
            </Box>
         </Box>
         <Box
            sx={{
               position: 'absolute',
               zIndex: 9999,
               bottom: '30px',
               right: '25px',
            }}
         >
            <Tooltip title="Add new task" arrow placement="top-start">
               <Fab color="primary" aria-label="add">
                  <Add />
               </Fab>
            </Tooltip>
         </Box>
      </React.Fragment>
   );
};

export default Dashboard;
