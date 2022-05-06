import Login from '../pages/Login';
import Dev from '../pages/Dev';
import Home from '../pages/Home';
import NewTask from '../pages/NewTask';

const routes = [
   {
      component: Home,
      name: 'Home',
      path: '/',
   },
   {
      component: Login,
      name: 'Login Page',
      path: '/login',
   },
   {
      component: NewTask,
      name: 'Create new task',
      path: '/tasks/new',
   },
   {
      component: Dev,
      name: 'Developer page',
      path: '/dev',
   },
];

export default routes;
