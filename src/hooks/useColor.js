import { TASK_STATUS } from '../constants/taskStatus';
import { TASK_PRIORITY } from '../constants/taskPriority';

export const useColor = ({ value, type }) => {
   let color;
   if (type === 'priority') {
      TASK_PRIORITY.filter((item) => {
         if (item.name === value) {
            color = item.color;
         }
      });
   }
   if (type === 'status') {
      TASK_STATUS.filter((item) => {
         if (item.name === value) {
            color = item.color;
         }
      });
   }
   return color;
};
