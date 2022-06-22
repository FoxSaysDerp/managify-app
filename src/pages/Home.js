import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import { Grid, Paper, Stack, Typography } from '@mui/material';

import UserList from '../components/UserList';
import TaskList from '../components/TaskList';

const Home = () => {
   const { user } = useAuthContext();

   const { documents } = useCollection('tasks');

   const [taskDocs, setTaskDocs] = useState([]);
   useEffect(() => {
      if (documents) {
         setTaskDocs(
            documents.filter((task) => task.assignedUsersIds.includes(user.uid))
         );
      }
   }, [documents, user]);
   return (
      <>
         <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
               <Stack spacing={3}>
                  <Paper
                     sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                     }}
                  >
                     <Typography variant="h5" sx={{ mb: 4 }}>
                        Hello, <strong>{user.displayName}</strong>
                     </Typography>
                     <TaskList label="Your tasks" tasks={taskDocs} />
                  </Paper>
               </Stack>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
               <Paper
                  sx={{
                     px: 2,
                     py: 1,
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               >
                  <UserList />
               </Paper>
            </Grid>
         </Grid>
      </>
   );
};

export default Home;
