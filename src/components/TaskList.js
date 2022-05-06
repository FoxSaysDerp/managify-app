import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

import StringAvatar from './StringAvatar';

const columns = [
   {
      field: 'taskName',
      headerName: 'Task Name',
      width: 380,
      editable: true,
   },
   {
      field: 'status',
      headerName: 'Status',
      width: 140,
      editable: false,
   },
   {
      field: 'assigned',
      headerName: 'Assigned to',
      renderCell: (assigned) => {
         console.log(assigned);
         console.log(assigned.value);
         assigned.value?.forEach((user, index) => {
            return <StringAvatar name={user} key={index} />;
         });
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

const TaskList = (props) => {
   const { tasks } = props;
   return (
      <div style={{ height: 400, width: '100%' }}>
         <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
         />
      </div>
   );
};

export default TaskList;
