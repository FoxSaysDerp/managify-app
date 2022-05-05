import React, { useCallback, useEffect, useState } from 'react';
import './styles/app.scss';

import { theme } from './styles/theme';
import { DashboardContext } from './context/dashboard-context';

import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@mui/material/styles';

import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import { dashboardNav } from './constants/dashboardNav';

import Dashboard from './components/Dashboard';
import ModuleTitle from './components/ModuleTitle';

import routes from './routes/routes';

const Main = styled.main`
   width: 100%;
`;

const App = () => {
   const [isDashboardMode, setIsDashboardMode] = useState(false);
   const [isMenuExpanded, setIsMenuExpanded] = useState(true);

   const currentLocation = useLocation();

   const dashboardLocations = dashboardNav.map(({ link }) => link);

   const currentLocationName = dashboardNav.find(
      (item) => item.link === currentLocation.pathname
   );

   console.log(currentLocationName);

   useEffect(() => {
      if (dashboardLocations.includes(currentLocation.pathname)) {
         setIsDashboardMode(true);
         console.log(isDashboardMode);
      }
   }, []);

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
            <Main>
               {isDashboardMode ? (
                  <Dashboard>
                     <ModuleTitle title={currentLocationName.label} />
                     <Switch>
                        {routes.map((route, index) => {
                           return (
                              <Route
                                 path={route.path}
                                 component={route.component}
                                 exact
                                 key={index}
                              />
                           );
                        })}
                        <Redirect to="/" />
                     </Switch>
                  </Dashboard>
               ) : (
                  <Switch>
                     {routes.map((route, index) => {
                        return (
                           <Route
                              path={route.path}
                              component={route.component}
                              exact
                              key={index}
                           />
                        );
                     })}
                     <Redirect to="/" />
                  </Switch>
               )}
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
         </ThemeProvider>
      </DashboardContext.Provider>
   );
};

export default App;
