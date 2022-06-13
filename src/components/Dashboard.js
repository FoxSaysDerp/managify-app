import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

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
   Typography,
} from '@mui/material';
import { Menu, ChevronLeft, Notifications, Add } from '@mui/icons-material';
import StringAvatar from './StringAvatar';

import { NavLink as RouterNavLink, Link as RouterLink } from 'react-router-dom';

import { dashboardNav, dashboardNavSecondary } from '../constants/dashboardNav';
import Copyright from './Copyright';

const drawerWidth = 240;

const Logo = styledComp.img`
   max-height: 42px;
   width: auto;
`;

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
   const { children } = props;

   const [dashboardNavArr, setDashboardNavArr] = useState([]);
   const [open, setOpen] = useState(true);
   const toggleDrawer = () => {
      setOpen(!open);
   };

   const { user } = useAuthContext();

   useEffect(() => {
      if (user) {
         setDashboardNavArr(dashboardNav(user.uid));
      }
   }, [user]);

   return (
      <>
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
                  {!open && (
                     <Logo
                        src={require('../assets/images/logo.png')}
                        alt="Managify"
                        sx={{ flexGrow: 1 }}
                     />
                  )}
                  <div style={{ flexGrow: 1 }} />
                  <IconButton color="inherit">
                     <Badge badgeContent={4} color="secondary">
                        <Notifications />
                     </Badge>
                  </IconButton>
                  {user && (
                     <Typography variant="button" sx={{ ml: 4 }}>
                        {user.displayName}
                     </Typography>
                  )}
                  <IconButton>
                     {user?.photoURL ? (
                        <Avatar
                           component={RouterLink}
                           to={`/users/${user.uid}`}
                           src={user?.photoURL}
                        />
                     ) : (
                        <StringAvatar name={user.displayName} />
                     )}
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
                  <Logo
                     src={require('../assets/images/logo2.png')}
                     alt="Managify"
                     style={{ width: '100%', margin: '0 6px' }}
                  />
                  <IconButton onClick={toggleDrawer}>
                     <ChevronLeft />
                  </IconButton>
               </Toolbar>
               <Divider />
               <List component="nav">
                  {user &&
                     dashboardNavArr.map((item, index) => {
                        return (
                           <DashboardListItemButton
                              component={RouterNavLink}
                              to={item.link}
                              key={index}
                              sx={{ px: 2, py: 1, m: 1, borderRadius: '18px' }}
                              exact
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
                           component={RouterNavLink}
                           to={item.link}
                           key={index}
                           sx={{ px: 2, py: 1, m: 1, borderRadius: '18px' }}
                           exact
                        >
                           <ListItemIcon>{item.icon}</ListItemIcon>

                           <ListItemText primary={item.label} />
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
               <Fab
                  component={RouterNavLink}
                  color="primary"
                  aria-label="add"
                  to="/tasks/new"
                  sx={{
                     '&:hover': {
                        color: '#000',
                     },
                  }}
               >
                  <Add />
               </Fab>
            </Tooltip>
         </Box>
      </>
   );
};

export default Dashboard;
