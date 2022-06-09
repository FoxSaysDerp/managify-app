import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Team from '../pages/Team';
import Task from '../pages/Task';
import CreateTask from '../pages/CreateTask';
import Tasks from '../pages/Tasks';
import UserTasks from '../pages/UserTasks';

const routes = [
   {
      component: <Home />,
      name: 'Home',
      path: '/',
      auth: 'loggedIn',
   },
   {
      component: <Tasks />,
      name: 'Tasks',
      path: '/tasks',
      auth: 'loggedIn',
   },
   {
      component: <UserTasks />,
      name: 'User Tasks',
      path: '/tasks/user',
      auth: 'loggedIn',
   },
   {
      component: <Task />,
      name: 'Task',
      path: '/taskxs/:tid',
      auth: 'loggedIn',
   },
   {
      component: <CreateTask />,
      name: 'Create new task',
      path: '/tasks/new',
      auth: 'loggedIn',
   },
   {
      component: <Calendar />,
      name: 'Calendar View',
      path: '/calendar',
      auth: 'loggedIn',
   },
   {
      component: <Team />,
      name: 'Team Members',
      path: '/team',
      auth: 'loggedIn',
   },
   {
      component: <Login />,
      name: 'Login Page',
      path: '/login',
      auth: 'loggedOut',
   },
   {
      component: <Logout />,
      name: 'Logout Page',
      path: '/logout',
      auth: 'loggedIn',
   },
   {
      component: <Signup />,
      name: 'Signup Page',
      path: '/signup',
      auth: 'loggedOut',
   },
];

export default routes;
