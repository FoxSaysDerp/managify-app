import React, { useState, useEffect } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';

import styled from 'styled-components';

import {
   Grid,
   Stack,
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
import StringAvatar from '../components/StringAvatar';

const secondary = grey[500];
const offline = grey[300];
const available = green[400];

/* eslint-disable */
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
/* eslint-enable */

const UserList = (props) => {
   const { extended } = props;

   const [isLoading, setIsLoading] = useState(true);
   const [users, setUsers] = useState([]);

   const { documents } = useCollection('users');
   const { user } = useAuthContext();

   useEffect(() => {
      console.log('documents', documents);
      if (documents && user) {
         setUsers(documents.filter((el) => el.id !== user?.uid));
         setIsLoading(false);
         console.log('users', users);
      }
   }, [documents, user]);

   if (isLoading) {
      return (
         <List sx={{ width: '100%' }}>
            {/* eslint-disable-next-line */}
            {Array.from({ length: 10 }, (_, i) => (
               <ListItem key={i}>
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
      !isLoading && (
         <List sx={{ width: '100%' }}>
            {users.map((userItem, index) => {
               return (
                  <ListItem key={index}>
                     <ListItemAvatar>
                        <StatusBadge
                           variant="dot"
                           badgeContent={4}
                           isoffline={userItem.online}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                           }}
                        >
                           {userItem?.photoURL ? (
                              <Avatar src={userItem?.photoURL} />
                           ) : (
                              <StringAvatar name={userItem.displayName} />
                           )}
                        </StatusBadge>
                     </ListItemAvatar>
                     <ListItemText>
                        <Grid container>
                           <Grid item sx={{ minWidth: extended && '150px' }}>
                              <Stack>
                                 <Typography
                                    sx={{ display: 'inline-block', mr: 1 }}
                                 >
                                    {userItem.displayName}
                                 </Typography>
                                 <Typography
                                    sx={{ display: 'block' }}
                                    color={secondary}
                                    variant="caption"
                                 >
                                    {`@${userItem.id.slice(
                                       3,
                                       userItem.id.slice.length - 15
                                    )}...`}
                                 </Typography>
                              </Stack>
                           </Grid>
                           {extended && (
                              <Grid
                                 item
                                 sx={{
                                    mx: 3,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Typography
                                    sx={{ display: 'inline-block' }}
                                    color={secondary}
                                    variant="caption"
                                 >
                                    Tasks:
                                 </Typography>
                                 <Typography
                                    sx={{ ml: 1, display: 'inline-block' }}
                                    variant="body2"
                                 >
                                    6
                                 </Typography>
                              </Grid>
                           )}
                        </Grid>
                     </ListItemText>
                  </ListItem>
               );
            })}
         </List>
      )
   );
};

export default UserList;
