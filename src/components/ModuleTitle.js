import React from 'react';

import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const ModuleTitle = (props) => {
   const { title } = props;

   const subtext = grey[400];
   return (
      <React.Fragment>
         <Typography
            variant="subtitle"
            sx={{
               color: subtext,
               textTransform: 'uppercase',
               letterSpacing: '3px',
               fontSize: '0.75rem',
            }}
         >
            Dashboard
         </Typography>
         <Typography
            variant="h3"
            sx={{ fontWeight: 700, fontSize: '2.25rem' }}
            gutterBottom
         >
            {title}
         </Typography>
      </React.Fragment>
   );
};

export default ModuleTitle;
