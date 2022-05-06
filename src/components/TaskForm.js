import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, Paper, Stack, TextField } from '@mui/material';


const TaskForm = () => {
   const [users, setUsers] = useState([]);
   const [owner, setOwner] = useState(null);
   const [assigned, setAssigned] = useState(null);

   useEffect(() => {
      setUsers(['Tim', 'Kira']);
   },[]);

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const form = {
         title: data.get('title'),
         desc: data.get('desc'),
         owner: owner,
         assigned: assigned,
      };
      console.log(form);
   };

   return (
      <Box
         component="form"
         noValidate
         onSubmit={handleSubmit} 
      >
         <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
               <Stack spacing={3}>
                  <Paper
                     sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'w
                     }}
                  >
                     <TextField
                        variant='standard'
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Task title"
                        name="title"
                        autoComplete="Task title"
                        autoFocus
                     />
                  </Paper>
                  <Paper
                     sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 300
                     }}
                  >
                     <TextField
                        variant='standard'
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        minRows={10}
                        id="desc"
                        label="Task description"
                        name="desc"
                        autoComplete="Task description"
                        autoFocus
                     />
                  </Paper>
               </Stack>
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
               <Stack spacing={3} sx={{height: '100%'}}>
                  <Paper
                     sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                     }}
                  >
                     <Autocomplete
                        variant='standard'
                        disablePortal
                        id="owner" 
                        value={owner}
                        onChange={(e, value) => {setOwner(value);}}
                        options={users}
                        renderInput={(params) => <TextField {...params} label="Reports to" />}
                     />
                  </Paper>
                  <Paper
                     sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                     }}
                  >
                     <Autocomplete
                        variant='standard'
                        disablePortal
                        id="assigned"
                        value={assigned}
                        onChange={(e, value) => {setAssigned(value);}}
                        options={users}
                        renderInput={(params) => <TextField {...params} label="Assigned" />}
                     />
                  </Paper>
                  <Button
                     type="submit"
                     variant="contained"
                     sx={{ mt: 'auto !important', py: 2, px: 5, width: 1 }}
                  >
                    Save
                  </Button>
               </Stack>
            </Grid>
         </Grid>
      </Box>
   );
};

export default TaskForm;