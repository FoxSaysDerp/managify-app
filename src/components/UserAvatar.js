import { Avatar, IconButton, Tooltip } from '@mui/material';

import StringAvatar from './StringAvatar';

const UserAvatar = (props) => {
   const { name, src, avatarOnly, sx } = props;

   if (avatarOnly) {
      if (!src) {
         return <StringAvatar name={name} sx={sx} />;
      }
      return <Avatar src={src} sx={sx} alt={name} />;
   }

   if (!src) {
      return (
         <Tooltip arrow title={name} sx={{ ...sx, display: 'block' }}>
            <IconButton>
               <StringAvatar name={name} />
            </IconButton>
         </Tooltip>
      );
   }
   return (
      <Tooltip arrow title={name} sx={{ ...sx, display: 'block' }}>
         <IconButton>
            <Avatar src={src} alt={name} />
         </IconButton>
      </Tooltip>
   );
};

export default UserAvatar;
