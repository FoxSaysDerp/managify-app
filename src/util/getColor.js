import {
   TASK_PRIORITY,
   TASK_STATUS,
   TASK_STATE,
} from '../constants/taskProperties';

export const getColor = ({ value, type }) => {
   let color;
   switch (type) {
      case 'priority':
         TASK_PRIORITY.filter((item) => {
            if (item.name === value) {
               color = item.color;
            }
         });
         break;
      case 'status':
         TASK_STATUS.filter((item) => {
            if (item.name === value) {
               color = item.color;
            }
         });
         break;
      case 'state':
         TASK_STATE.filter((item) => {
            if (item.name === value) {
               color = item.color;
            }
         });
         break;
      default:
         return null;
   }

   return color;
};
