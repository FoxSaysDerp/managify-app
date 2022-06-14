import '../styles/override.css';
import { Calendar as AntCalendar, Badge } from 'antd';
import { Link, Paper } from '@mui/material';
import { useCollection } from '../hooks/useCollection';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import styled from '@mui/styled-engine-sc';
import { getColor } from '../util/getColor';
import moment from 'moment';


const LinkStyled = styled(Link)`
   display:inline-block;
   width: 100%;

   > span{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
   }

   &:hover .ant-badge-status-text{
    text-decoration: underline;
   }
`;

const CALENDAR_SIZE = 42;
const DAY_IN_MS = 24 * 3600 * 1000;

const moreThan3MonthsLater = (ts) => {
   return ts + 3 * CALENDAR_SIZE * DAY_IN_MS;
};

const Calendar = () => {
   const [tasks, setTasks] = useState(new Map());
   const { documents, setQuery } = useCollection('tasks', [['dueDate', '>=', Timestamp.fromMillis(0)], ['dueDate', '<=', Timestamp.fromMillis(0)]]);
   const [initialized, setInitialized] = useState(false);

   const getTasks = (date) => {
      const currentTimestamp = date._d.getTime();
      let minStartTimestamp = currentTimestamp - CALENDAR_SIZE * DAY_IN_MS;
      setQuery([['dueDate', '>=', Timestamp.fromMillis(minStartTimestamp)], ['dueDate', '<=', Timestamp.fromMillis(moreThan3MonthsLater(minStartTimestamp))]]);
   };

   useEffect(() => {
      if (!initialized) {
         getTasks(moment());
         setInitialized(true);
      }
   }, [initialized]);

   useEffect(() => {
      if (documents) {
         const tasksMap = documents
            .filter(task => task.dueDate.toDate)
            .filter(task => task.taskStatus != 'Done')
            .reduce(
               (map, task) => map.set(task.dueDate.toDate().toDateString(), [...map.get(task.dueDate.toDate().toDateString()) || [], task]),
               new Map()
            );
         setTasks(tasksMap);
      }
   }, [documents]);

   const onPanelChange = (date, mode) => {
      if (mode == 'month') getTasks(date);
   };

   const dateCellRender = (date) => {
      return (
         <ul
            style={{ listStyleType: 'none'}}
         >
            {tasks.get(date.toDate().toDateString())?.map((task) => (
               <li key={task.id}>
                  <LinkStyled component={RouterLink}
                     to={`/tasks/${task.id}`}
                  >
                     <Badge color={getColor({ value: task.taskPriority, type: 'priority' })} text={task.taskName} />
                  </LinkStyled>
               </li>
            ))}
         </ul>
      );
   };

   return (
      <Paper sx={{ p: 2 }}>
         <AntCalendar
            onPanelChange={onPanelChange}
            dateCellRender={dateCellRender}
         />
      </Paper>
   );
};

export default Calendar;