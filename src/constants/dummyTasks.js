import moment from 'moment';

const DUMMY_TASKS = [
   {
      id: 1,
      taskName: 'Override button styles',
      status: 'Open',
      assigned: ['MK', 'TK'],
      dueDate: moment().add(7, 'd'),
      priority: 'Medium',
   },
   {
      id: 2,
      taskName: 'Update policies on client page',
      status: 'In progress',
      assigned: ['DT', 'TM'],
      dueDate: moment().add(2, 'd'),
      priority: 'High',
   },
   {
      id: 3,
      taskName: 'Delete console.logs() from source code',
      status: 'Reopened',
      assigned: ['DK', 'RG', 'CM'],
      dueDate: moment().add(8, 'm'),
      priority: 'Low',
   },
   {
      id: 4,
      taskName: 'Add new button style',
      status: 'In progress',
      assigned: ['DK'],
      dueDate: moment().add(10, 'h'),
      priority: 'Low',
   },
   {
      id: 5,
      taskName: 'Center a div',
      status: 'Open',
      assigned: ['DK', 'RG', 'JB', 'GM'],
      dueDate: moment().add(2, 'M'),
      priority: 'High',
   },
   {
      id: 6,
      taskName: 'Optimize code',
      status: 'In progress',
      assigned: ['DK', 'RG'],
      dueDate: moment().add(10, 'd'),
      priority: 'Low',
   },
];

export default DUMMY_TASKS;
