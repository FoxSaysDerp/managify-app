import React, { useEffect } from 'react';
import { Autocomplete, Box, Button, Grid, Paper, Stack, TextareaAutosize, TextField } from '@mui/material';

import Main from '../styles/Main';
import { flexbox } from '@mui/system';
import DB from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import TaskForm from '../components/TaskForm';


const NewTask = () => {
   const handleSubmit = (task) => {
      console.log(task);
   };

   return (
      <Main>
         <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
               <Paper sx={{ p:2 }}>
                  <TaskForm task={{assigned:'Tim'}} editable onSubmit={handleSubmit}/>
               </Paper>
               
            </Grid>
         </Grid>
      </Main>
   );
};

export default NewTask;
