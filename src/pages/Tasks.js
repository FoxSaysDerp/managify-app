import React from 'react';

import TaskList from '../components/TaskList';
import { Paper, Typography, Divider } from '@mui/material';

import DUMMY_TASKS from '../constants/dummyTasks';

const Tasks = () => {
   return (
      <Paper sx={{ p: 2 }}>
         <Typography variant="h6">All tasks</Typography>
         <Divider sx={{ mb: 2, mt: 1 }} />
         <TaskList tasks={DUMMY_TASKS} />
      </Paper>
   );
};

export default Tasks;
