import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { TASK_STATUS } from '../constants/taskProperties';
import { getColor } from '../util/getColor';

const TaskGraph = (props) => {
   const { data } = props;

   const options = {
      interaction: {
         intersect: false,
      },
      cubicInterpolationMode: 'monotone',
   };

   let taskStatuses = [];
   let taskStatistics = [];

   data.map((task) => {
      taskStatuses.push(task.taskStatus);
   });

   TASK_STATUS.map((status) => {
      taskStatistics.push({
         label: status.name,
         amount: taskStatuses.filter((taskStatus) => taskStatus === status.name)
            .length,
         color: getColor({ value: status.name, type: 'status' }),
      });
   });

   taskStatistics = taskStatistics.filter((stat) => stat.amount !== 0);

   const myData = {
      labels: taskStatistics.map((task) => task.label),
      datasets: [
         {
            label: 'Task assignments',
            data: taskStatistics.map((task) => task.amount),
            backgroundColor: taskStatistics.map((task) => task.color),
         },
      ],
   };

   return <Doughnut options={options} data={myData} />;
};

export default TaskGraph;
