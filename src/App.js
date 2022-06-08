import React, { useCallback, useEffect, useState } from 'react';
import './styles/app.css';
import { theme } from './styles/theme';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { DashboardContext } from './context/dashboard-context';

import {
   Route,
   Redirect,
   Switch,
   useLocation,
   withRouter,
} from 'react-router-dom';
import routes from './routes/routes';
import { dashboardNav } from './constants/dashboardNav';

import { AuthContextProvider } from './context/auth-context';

import Dashboard from './components/Dashboard';
import ModuleTitle from './components/ModuleTitle';
import Devtools from './components/Devtools';

const Main = styled.main`
   width: 100%;
`;

const App = () => {
   const [isDashboardMode, setIsDashboardMode] = useState(false);
   const [isMenuExpanded, setIsMenuExpanded] = useState(true);

   const location = useLocation();

   const dashboardLocations = dashboardNav.map(({ link }) => link);

   let currentLocationName;
   currentLocationName = dashboardNav.find(
      (item) => item.link === location.pathname
   );
   if (typeof currentLocationName === 'undefined') {
      currentLocationName = 'Unknown location';
   }

   useEffect(() => {
      if (dashboardLocations.includes(location.pathname)) {
         setIsDashboardMode(true);
      } else {
         setIsDashboardMode(false);
      }
   }, [isDashboardMode, location]);

   return (
      <AuthContextProvider>
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
                     <React.Fragment>
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
            </ThemeProvider>
         </DashboardContext.Provider>
      </AuthContextProvider>
   );
};

export default withRouter(App);
