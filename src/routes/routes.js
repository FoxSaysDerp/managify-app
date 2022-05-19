import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dev from '../pages/Dev';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Team from '../pages/Team';
import Task from '../pages/Task';
import Tasks from '../pages/Tasks';
import UserTasks from '../pages/UserTasks';

const routes = [
   {
      component: Home,
      name: 'Home',
      path: '/',
   },
   {
      component: Tasks,
      name: 'Tasks',
      path: '/tasks',
   },
   {
      component: UserTasks,
      name: 'User Tasks',
      path: '/tasks/user',
   },
   {
      component: Task,
      name: 'Task',
      path: '/tasks/:tid',
   },
   {
      component: Calendar,
      name: 'Calendar View',
      path: '/calendar',
   },
   {
      component: Team,
      name: 'Team Members',
      path: '/team',
   },
   {
      component: Login,
      name: 'Login Page',
      path: '/login',
   },
   {
      component: Signup,
      name: 'Signup Page',
      path: '/signup',
   },
   {
      component: Dev,
      name: 'Developer page',
      path: '/dev',
   },
];

export default routes;
