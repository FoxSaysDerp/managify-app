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
   Link,
} from '@mui/material';
import { grey, green } from '@mui/material/colors';
import StringAvatar from '../components/StringAvatar';
import { Link as RouterLink } from 'react-router-dom';

const secondary = grey[500];
const offline = grey[300];
const available = green[400];

const StatusBadge = styled(Badge)`
   > span {
      background-color: ${(props) => (props.isoffline ? offline : available)};
   }
`;

const UserList = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [users, setUsers] = useState([]);
   const [online, setOnline] = useState(0);

   const { user } = useAuthContext();
   const { documents } = useCollection('users', '', [
      'online',
      'desc',
      'displayName',
      'desc',
   ]);

   useEffect(() => {
      if (documents && user) {
         setOnline(documents.filter((el) => el.online === true).length);
         setUsers(documents.filter((el) => el.id !== user?.uid));
         setIsLoading(false);
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
         <>
            <Typography variant="h6" sx={{ pt: 1, pl: 1 }}>
               Online ({online})
            </Typography>
            <List sx={{ width: '100%' }}>
               {users.map((userItem, index) => {
                  return (
                     <ListItem key={index}>
                        <ListItemAvatar>
                           <StatusBadge
                              component={RouterLink}
                              to={`/users/${userItem.id}`}
                              variant="dot"
                              badgeContent={4}
                              isoffline={!userItem.online ? 1 : undefined}
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
                              <Grid item>
                                 <Stack>
                                    <Link
                                       component={RouterLink}
                                       color="inherit"
                                       underline="none"
                                       sx={{ display: 'inline-block', mr: 1 }}
                                       to={`/users/${userItem.id}`}
                                    >
                                       {userItem.displayName}
                                    </Link>
                                    <Typography
                                       component={RouterLink}
                                       sx={{ display: 'block' }}
                                       color={secondary}
                                       variant="caption"
                                       to={`/users/${userItem.id}`}
                                    >
                                       {`@${userItem.id.slice(
                                          3,
                                          userItem.id.slice.length - 15
                                       )}...`}
                                    </Typography>
                                 </Stack>
                              </Grid>
                           </Grid>
                        </ListItemText>
                     </ListItem>
                  );
               })}
            </List>
         </>
      )
   );
};

export default UserList;
