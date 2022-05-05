import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

const Main = ({ children }) => {
   return (
      <ThemeProvider theme={theme}>
         <main>{children}</main>
      </ThemeProvider>
   );
};

export default Main;
