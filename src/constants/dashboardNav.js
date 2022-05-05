import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';

export const dashboardNav = [
   {
      icon: <HomeIcon />,
      link: '/',
      label: 'Home',
   },
   {
      icon: <AutoAwesomeMotionIcon />,
      link: '/tasks',
      label: 'Tasks',
   },
   {
      icon: <FolderSharedIcon />,
      link: '/tasks/:uid',
      label: 'My tasks',
   },
   {
      icon: <CalendarViewMonthIcon />,
      link: '/calendar',
      label: 'Calendar',
   },
   {
      icon: <AddToPhotosIcon />,
      link: '/tasks/new',
      label: 'Create new task',
   },
   {
      icon: <PeopleAltIcon />,
      link: '/team',
      label: 'Team members',
   },
];

export const dashboardNavSecondary = [
   {
      icon: (
         <LogoutIcon sx={{ transform: 'rotate(180deg) translateX(-5px)' }} />
      ),
      link: '/logout',
      label: 'Logout',
   },
];

export const dashboardNavDev = [
   {
      icon: <ConstructionIcon />,
      link: '/dev',
      label: 'Admin',
      chip: {
         color: 'error',
         label: 'DEV',
      },
   },
];
