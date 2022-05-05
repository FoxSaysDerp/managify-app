import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Copyright = (props) => {
   return (
      <Typography
         variant="body2"
         color="text.secondary"
         align="center"
         {...props}
      >
         {'Copyright © '}
         <Link component={Link} color="inherit" to="/">
            Managify
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
};

export default Copyright;
