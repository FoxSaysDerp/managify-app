import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './context/auth-context';

import 'antd/dist/antd.css';

import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline } from '@mui/material';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
   <AuthContextProvider>
      <BrowserRouter>
         <CssBaseline />
         <App tab="home" />
      </BrowserRouter>
   </AuthContextProvider>
);
