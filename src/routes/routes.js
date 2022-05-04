import Login from '../pages/Login';
import Dev from '../pages/Dev';
import Home from '../pages/Home';

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
      component: Dev,
      name: 'Developer page',
      path: '/dev',
   },
];

export default routes;
