import '../styles/override.css';
import { Calendar, Badge } from 'antd';
import { Paper } from '@mui/material';

const getListData = (value) => {
   let listData;
   switch (value.date()) {
      case 8:
         listData = [
            { type: 'warning', content: 'warning event.' },
            { type: 'success', content: 'usual event.' },
         ];
         break;
      case 10:
         listData = [
            { type: 'warning', content: 'warning event.' },
            { type: 'success', content: 'usual event.' },
            { type: 'error', content: 'error event.' },
         ];
         break;
      case 15:
         listData = [
            { type: 'warning', content: 'warning event' },
            {
               type: 'success',
               content: 'very long usual event。。....',
            },
            { type: 'error', content: 'error event 1.' },
            { type: 'error', content: 'error event 2.' },
            { type: 'error', content: 'error event 3.' },
            { type: 'error', content: 'error event 4.' },
         ];
         break;
      default:
   }
   return listData || [];
};

const dateCellRender = (value) => {
   const listData = getListData(value);
   return (
      <ul
         className="events"
         style={{ listStyleType: 'none', paddingLeft: 'unset' }}
      >
         {listData.map((item) => (
            <li key={item.content}>
               <Badge status={item.type} text={item.content} />
            </li>
         ))}
      </ul>
   );
};

const getMonthData = (value) => {
   if (value.month() === 8) {
      return 1394;
   }
};

const monthCellRender = (value) => {
   const num = getMonthData(value);
   return num ? (
      <div className="notes-month">
         <section>{num}</section>
         <span>Backlog number</span>
      </div>
   ) : null;
};

// eslint-disable-next-line
export default () => (
   <Paper sx={{ p: 2 }}>
      <Calendar
         dateCellRender={dateCellRender}
         monthCellRender={monthCellRender}
      />
   </Paper>
);
