import { useState, useEffect } from 'react';
import { useCollection } from '../hooks/useCollection';

import TaskList from '../components/TaskList';
import { Paper, Typography, Divider } from '@mui/material';

const Tasks = () => {
   const [tasks, setTasks] = useState([]);

   const { documents } = useCollection('tasks');

   useEffect(() => {
      if (documents && documents.length > 0) {
         setTasks(documents);
         console.log(tasks);
      }
   }, [documents]);

   return (
      <Paper sx={{ p: 2 }}>
         <Typography variant="h6">All tasks</Typography>
         <Divider sx={{ mb: 2, mt: 1 }} />
         <TaskList tasks={tasks} />
      </Paper>
   );
};

export default Tasks;
