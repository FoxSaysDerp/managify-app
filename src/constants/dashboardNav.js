import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import HomeIcon from '@mui/icons-material/Home';

export const dashboardNav = (uid) => {
   return [
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
         link: `/users/${uid}`,
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
         link: '/users',
         label: 'Team members',
      },
   ];
};

export const dashboardNavSecondary = [
   {
      icon: (
         <LogoutIcon
            sx={{
               transform: 'rotate(180deg) translateX(2px)',
            }}
         />
      ),
      link: '/logout',
      label: 'Logout',
   },
];
