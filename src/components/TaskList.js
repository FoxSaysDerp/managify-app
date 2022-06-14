import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styled from '@mui/styled-engine-sc';

import { getColor } from '../util/getColor';

import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

import {
   Box,
   Divider,
   Chip,
   Link,
   Typography,
   FormControlLabel,
   FormGroup,
   Switch,
} from '@mui/material';

import UserAvatar from './UserAvatar';

const TaskPriority = styled('span')`
   display: inline-block;
   width: 9px;
   height: 9px;
   border-radius: 50%;
   background-color: ${(props) => props.color};
   margin-left: 6px;
   transform: translateY(-2px);
`;

const TaskList = (props) => {
   const { tasks, label } = props;

   const [showArchived, setShowArchived] = useState(true);

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
                  {task.row.isArchived && (
                     <Chip
                        label="Archived"
                        size="small"
                        style={{
                           backgroundColor: getColor({
                              value: 'Archived',
                              type: 'state',
                           }),
                           opacity: 0.5,
                           marginLeft: 8,
                        }}
                     />
                  )}
               </Link>
            );
         },
      },
      {
         field: 'taskPriority',
         headerName: 'Priority',
         width: 160,
         editable: false,
         renderCell: (priority) => (
            <Box>
               <Typography variant="button" sx={{ display: 'inline' }}>
                  {priority.value}
               </Typography>
               <TaskPriority
                  color={getColor({ value: priority.value, type: 'priority' })}
               />
            </Box>
         ),
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
                        <RouterLink
                           to={`/users/${user.id}`}
                           key={user.id}
                           style={{ marginLeft: index === 0 ? 0 : '-15px' }}
                        >
                           <UserAvatar
                              src={user.photoURL}
                              name={user.displayName}
                              sx={{
                                 marginLeft: index === 0 ? 0 : '-15px',
                                 zIndex: 1000 - index * index ** index,
                                 '&:hover': {
                                    color: '#ffffff',
                                 },
                              }}
                           />
                        </RouterLink>
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
            return (
               <span>{moment().to(moment.unix(dueDate.value.seconds))}</span>
            );
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
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">{label}</Typography>
            <FormGroup>
               <FormControlLabel
                  control={
                     <Switch
                        checked={showArchived}
                        onChange={() => {
                           setShowArchived(!showArchived);
                        }}
                     />
                  }
                  label="Show archived"
               />
            </FormGroup>
         </Box>
         <Divider sx={{ mb: 2, mt: 1 }} />
         <div style={{ height: 400, width: '100%' }}>
            {tasks && tasks.length > 0 && (
               <DataGrid
                  rows={tasks.filter(
                     (task) => !task.isArchived || showArchived
                  )}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
               />
            )}
         </div>
      </Box>
   );
};

export default TaskList;
