import React, { useCallback, useEffect, useState } from 'react';
import './styles/app.css';
import { theme } from './styles/theme';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { DashboardContext } from './context/dashboard-context';
import { useAuthContext } from './hooks/useAuthContext';

import {
   Route,
   Redirect,
   Switch,
   useLocation,
   withRouter,
} from 'react-router-dom';
import routes from './routes/routes';
import { dashboardNav } from './constants/dashboardNav';
import Dev from './pages/Dev';

import Dashboard from './components/Dashboard';
import ModuleTitle from './components/ModuleTitle';
import Devtools from './components/Devtools';

const Main = styled.main`
   width: 100%;
`;

const App = () => {
   const [dashboardNavArr, setDashboardNavArr] = useState([]);
   const [isDashboardMode, setIsDashboardMode] = useState(true);
   const [isMenuExpanded, setIsMenuExpanded] = useState(true);

   const location = useLocation();

   const { user, authIsReady } = useAuthContext();

   const pathnameArray = location.pathname.split('/');

   const getParamId = () => {
      if (pathnameArray.at(-1) !== 'tasks' && pathnameArray.at(-1) !== '') {
         return pathnameArray.at(-1);
      } else {
         return pathnameArray.at(-2);
      }
   };
   const paramId = getParamId();

   let dashboardLocations = dashboardNavArr.map(({ link }) => link);
   dashboardLocations = [
      ...dashboardLocations,
      '',
      `/tasks/${paramId}`,
      `/users/${paramId}`,
   ];

   let currentLocationName;
   currentLocationName = dashboardNavArr.find(
      (item) => item.link === location.pathname
   );
   if (typeof currentLocationName === 'undefined') {
      currentLocationName = 'Unknown location';
   }

   useEffect(() => {
      if (user) {
         setDashboardNavArr(dashboardNav(user.uid));
      }
   }, [user]);

   useEffect(() => {
      if (dashboardLocations.includes(location.pathname)) {
         setIsDashboardMode(true);
      } else {
         setIsDashboardMode(false);
      }
   }, [isDashboardMode, location]);

   return (
      <DashboardContext.Provider
         value={{
            isDashboardMode,
            isMenuExpanded,
            expandMenu: useCallback(() => {
               setIsMenuExpanded((prevState) => !prevState);
            }),
         }}
      >
         <ThemeProvider theme={theme}>
            {authIsReady && (
               <Main>
                  {isDashboardMode ? (
                     <Dashboard>
                        <ModuleTitle title={currentLocationName.label} />
                        <Switch>
                           <Route exact path="/dev">
                              <Dev />
                           </Route>
                           {routes.map((route, index) => {
                              return (
                                 <Route path={route.path} exact key={index}>
                                    {route.auth === 'loggedIn' &&
                                       user &&
                                       route.component}
                                    {route.auth === 'loggedOut' &&
                                       !user &&
                                       route.component}
                                    {route.auth === 'loggedIn' && !user && (
                                       <Redirect to={{ pathname: '/login' }} />
                                    )}
                                    {route.auth === 'loggedOut' && user && (
                                       <Redirect to={{ pathname: '/' }} />
                                    )}
                                 </Route>
                              );
                           })}
                           <Redirect to="/" />
                        </Switch>
                     </Dashboard>
                  ) : (
                     <React.Fragment>
                        <Switch>
                           <Route exact path="/dev">
                              <Dev />
                           </Route>
                           {routes.map((route, index) => {
                              return (
                                 <Route path={route.path} exact key={index}>
                                    {route.auth === 'loggedIn' &&
                                       user &&
                                       route.component}
                                    {route.auth === 'loggedOut' &&
                                       !user &&
                                       route.component}
                                    {route.auth === 'loggedIn' && !user && (
                                       <Redirect to={{ pathname: '/login' }} />
                                    )}
                                    {route.auth === 'loggedOut' && user && (
                                       <Redirect to={{ pathname: '/' }} />
                                    )}
                                 </Route>
                              );
                           })}
                           <Redirect to="/login" />
                        </Switch>
                     </React.Fragment>
                  )}

                  {process.env.NODE_ENV === 'development' && <Devtools />}
                  <ToastContainer
                     position="bottom-right"
                     autoClose={2000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss={false}
                     draggable={false}
                     pauseOnHover
                  />
               </Main>
            )}
         </ThemeProvider>
      </DashboardContext.Provider>
   );
};

export default withRouter(App);
