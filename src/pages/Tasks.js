import { useState, useEffect } from 'react';
import { useCollection } from '../hooks/useCollection';

import TaskList from '../components/TaskList';
import { Paper } from '@mui/material';

const Tasks = () => {
   const [tasks, setTasks] = useState([]);

   const { documents } = useCollection('tasks');

   useEffect(() => {
      if (documents && documents.length > 0) {
         setTasks(documents);
         tasks;
      }
   }, [documents]);

   return (
      <Paper sx={{ p: 2 }}>
         <TaskList label={'All tasks'} tasks={tasks} />
      </Paper>
   );
};

export default Tasks;
