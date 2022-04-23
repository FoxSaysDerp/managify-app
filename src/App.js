import React from 'react';
import 'reset-css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss';

import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Auth from './auth/Auth';

const Main = styled.main`
   width: 100%;
`;

const App = () => {
   return (
      <ThemeProvider breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']}>
         <Main>
            <BrowserRouter>
               <Switch>
                  <Route path="/" component={Auth} exact />
                  <Redirect to="/" />
               </Switch>
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
            </BrowserRouter>
         </Main>
      </ThemeProvider>
   );
};

export default App;
