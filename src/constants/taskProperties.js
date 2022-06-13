import {
   grey,
   yellow,
   blue,
   amber,
   red,
   green,
   orange,
   lightGreen,
} from '@mui/material/colors';

export const TASK_PRIORITY = [
   {
      name: 'Critical',
      color: red[400].toString(),
   },
   {
      name: 'High',
      color: orange[700].toString(),
   },
   {
      name: 'Medium',
      color: yellow[400].toString(),
   },
   {
      name: 'Low',
      color: lightGreen[400].toString(),
   },
];

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

export const TASK_STATE = [
   {
      name: 'Active',
      color: green[400].toString(),
   },
   {
      name: 'Archived',
      color: yellow[800].toString(),
   },
];
