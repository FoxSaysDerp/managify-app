import { Link as RouterLink } from 'react-router-dom';

import { getColor } from '../util/getColor';

import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

import {
   Avatar,
   Box,
   Divider,
   Tooltip,
   Chip,
   Link,
   Typography,
} from '@mui/material';

const TaskList = (props) => {
   const { tasks, label } = props;

   const columns = [
      {
         field: 'taskName',
         headerName: 'Task Name',
         width: 380,
         editable: false,
         renderCell: (task) => {
            return (
               <Link
                  component={RouterLink}
                  to={`/tasks/${task.row.id}`}
                  sx={{ color: '#000000', textDecoration: 'none' }}
               >
                  {task.value}
                  <Chip
                     label={task.row.taskPriority}
                     size="small"
                     style={{
                        backgroundColor: getColor({
                           value: task.row.taskPriority,
                           type: 'priority',
                        }),
                        marginLeft: 8,
                     }}
                  />
               </Link>
            );
         },
      },
      {
         field: 'taskStatus',
         headerName: 'Status',
         width: 140,
         editable: false,
         renderCell: (status) => (
            <Chip
               label={status.value}
               style={{
                  backgroundColor: getColor({
                     value: status.value,
                     type: 'status',
                  }),
               }}
            />
         ),
      },
      {
         field: 'assignedUsers',
         headerName: 'Assigned to',
         renderCell: (assigned) => {
            let assignedUsers = assigned.value;
            return (
               <Box
                  sx={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     gap: 0.5,
                  }}
               >
                  {assignedUsers.map((user, index) => {
                     return (
                        <Tooltip key={user.id} arrow title={user.displayName}>
                           <Avatar
                              component={RouterLink}
                              to={`/users/${user.id}`}
                              src={user.photoURL}
                              alt={user.displayName}
                              sx={{
                                 marginLeft: index === 0 ? 0 : '-14px',
                                 zIndex: 1000 - index * index ** index,
                                 '&:hover': {
                                    color: '#ffffff',
                                 },
                              }}
                           />
                        </Tooltip>
                     );
                  })}
               </Box>
            );
         },
         width: 160,
         editable: false,
         sortable: false,
      },
      {
         field: 'dueDate',
         headerName: 'Due Date',
         renderCell: (dueDate) => {
            return <span>{moment().to(dueDate)}</span>;
         },
         width: 160,
      },
   ];

   if (tasks?.length === 0) {
      return (
         <div
            style={{
               height: 400,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Typography variant="h4">
               {'Currently there are no tasks. :('}
            </Typography>
         </div>
      );
   }

   return (
      <Box>
         <Typography variant="h6">{label}</Typography>
         <Divider sx={{ mb: 2, mt: 1 }} />
         <div style={{ height: 400, width: '100%' }}>
            {tasks && tasks.length > 0 && (
               <DataGrid
                  rows={tasks}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
               />
            )}
         </div>
      </Box>
   );
};

export default TaskList;
