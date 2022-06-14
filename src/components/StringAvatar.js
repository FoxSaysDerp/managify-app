import React from 'react';
import { Avatar } from '@mui/material';

const stringToColor = (string) => {
   let hash = 0;
   let i;

   for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }

   let color = '#';

   for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
   }

   return color;
};

const stringAvatar = (name) => {
   if (!name) {
      return {
         sx: {
            bgcolor: '#ffb300',
         },
         children: 'A',
      };
   }
   return {
      sx: {
         bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
   };
};

const StringAvatar = (props) => {
   const { name, sx } = props;
   return <Avatar {...stringAvatar(name ? name : 'Aaaaaa')} sx={sx} />;
};

export default StringAvatar;
