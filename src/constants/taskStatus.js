import { grey, blue, amber, red, green } from '@mui/material/colors';

export const TASK_STATUS = [
   {
      name: 'Open',
      color: grey[100].toString(),
   },
   {
      name: 'In Progress',
      color: blue[200].toString(),
   },
   {
      name: 'Resolved',
      color: amber[300].toString(),
   },
   {
      name: 'Reopened',
      color: red[300].toString(),
   },
   {
      name: 'Done',
      color: green[300].toString(),
   },
];
