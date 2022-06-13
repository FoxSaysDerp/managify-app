import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import CalendarPage from '../pages/Calendar';
import Team from '../pages/Team';
import Task from '../pages/Task';
import CreateTask from '../pages/CreateTask';
import EditTask from '../pages/EditTask';
import Tasks from '../pages/Tasks';
import UserProfile from '../pages/UserProfile';

const routes = [
   {
      component: <Home />,
      name: 'Home',
      path: '/',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <Tasks />,
      name: 'Tasks',
      path: '/tasks',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <CreateTask />,
      name: 'Create new task',
      path: '/tasks/new',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <Task />,
      name: 'Task',
      path: '/tasks/:tid',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <EditTask />,
      name: 'Task',
      path: '/tasks/:tid/edit',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <CalendarPage />,
      name: 'Calendar View',
      path: '/calendar',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <Team />,
      name: 'Team Members',
      path: '/users',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <UserProfile />,
      name: 'User Tasks',
      path: '/users/:uid',
      auth: 'loggedIn',
      hasDashboard: true,
   },
   {
      component: <Login />,
      name: 'Login Page',
      path: '/login',
      auth: 'loggedOut',
      hasDashboard: false,
   },
   {
      component: <Logout />,
      name: 'Logout Page',
      path: '/logout',
      auth: 'loggedIn',
      hasDashboard: false,
   },
   {
      component: <Signup />,
      name: 'Signup Page',
      path: '/signup',
      auth: 'loggedOut',
      hasDashboard: false,
   },
];

export default routes;
