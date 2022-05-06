import React from 'react';
import UserList from '../components/UserList';
import { Paper } from '@mui/material';

const Team = () => {
   return (
      <Paper sx={{ maxWidth: '420px' }}>
         <UserList extended />
      </Paper>
   );
};

export default Team;
