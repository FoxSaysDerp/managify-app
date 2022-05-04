import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import {
   List,
   ListItem,
   ListItemText,
   ListItemAvatar,
   Avatar,
   Skeleton,
   Typography,
   Badge,
} from '@mui/material';
import { grey, green } from '@mui/material/colors';

import DUMMY_USERS from '../constants/dummyUsers';

const UserList = () => {
   const [isLoading, setIsLoading] = useState(true);

   const secondary = grey[500];
   const offline = grey[300];
   const available = green[400];

   const users = DUMMY_USERS();
   console.log(users);

   const StatusBadge = styled(Badge)`
      > span {
         background-color: ${available};
      }
      ${({ isoffline }) =>
         isoffline &&
         `
         > span {
         background-color: ${offline};
      }`}
   `;

   useEffect(() => {
      if (users.isLoaded) {
         setIsLoading(false);
      }
   }, [users]);

   if (isLoading) {
      return (
         <List sx={{ width: '100%' }}>
            {/* eslint-disable-next-line */}
            {Array.from({ length: 10 }, (_, i) => (
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <Skeleton variant="circular" width={40} height={40} />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                     <Skeleton variant="text" />
                     <Skeleton variant="text" />
                  </ListItemText>
               </ListItem>
            ))}
         </List>
      );
   }

   return (
      <List sx={{ width: '100%' }}>
         {users.users.map((user, index) => {
            return (
               <ListItem key={index}>
                  <ListItemAvatar>
                     <StatusBadge
                        variant="dot"
                        badgeContent={4}
                        isoffline={user.registered.age % 2}
                        anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'right',
                        }}
                     >
                        <Avatar>
                           <img src={user.picture.thumbnail} alt="User" />
                        </Avatar>
                     </StatusBadge>
                  </ListItemAvatar>
                  <ListItemText>
                     <Typography sx={{ display: 'inline-block', mr: 1 }}>
                        {`${user.name.first} ${user.name.last}`}
                     </Typography>
                     <Typography
                        sx={{ display: 'block' }}
                        color={secondary}
                        variant="caption"
                     >
                        {`@${user.login.username}`}
                     </Typography>
                  </ListItemText>
               </ListItem>
            );
         })}
      </List>
   );
};

export default UserList;
