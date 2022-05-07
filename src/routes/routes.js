import Login from '../pages/Login';
import Dev from '../pages/Dev';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Team from '../pages/Team';
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
      component: Dev,
      name: 'Developer page',
      path: '/dev',
   },
];

export default routes;
