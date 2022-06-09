import { useHistory } from 'react-router-dom';

import { getUser } from '../util/getUser';
import { getColor } from '../util/getColor';

import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

import { Avatar, Box, Tooltip, Chip } from '@mui/material';

const TaskList = (props) => {
   const { tasks } = props;

   const history = useHistory();

   const columns = [
      {
         field: 'taskName',
         headerName: 'Task Name',
         width: 380,
         editable: false,
         renderCell: (task) => {
            return (
               <span>
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
               </span>
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
                  {assignedUsers.map((item, index) => {
                     let user = getUser(item);
                     return (
                        <Tooltip key={user.id} arrow title={user.displayName}>
                           <Avatar
                              onClick={() => history.push(`/user/${user.id}`)}
                              src={user.photoURL}
                              alt={user.displayName}
                              sx={{
                                 marginLeft: index === 0 ? 0 : '-14px',
                                 zIndex: 1000 - index * index ** index,
                                 '&:hover': {
                                    cursor: 'pointer',
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
            return <span>{moment().to(dueDate.value)}</span>;
         },
         width: 160,
      },
   ];

   return (
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
   );
};

export default TaskList;
