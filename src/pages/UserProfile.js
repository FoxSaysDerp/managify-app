import { useParams, useHistory } from 'react-router-dom';

import { useDocument } from '../hooks/useDocument';
import { useCollection } from '../hooks/useCollection';

import moment from 'moment';

import styled from '@mui/styled-engine-sc';
import { Paper, Box, Grid, Stack, Typography, Avatar } from '@mui/material';
import { grey, green } from '@mui/material/colors';

import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import TaskList from '../components/TaskList';

const secondary = grey[500];
const offline = grey[300];
const available = green[400];

const AvailabilityStatus = styled('span')`
   display: block;
   width: 8px;
   height: 8px;
   border-radius: 50%;
   background-color: ${(props) => (props.isOnline ? available : offline)};
   margin-right: 6px;
`;

const UserProfile = () => {
   const { uid } = useParams();
   const history = useHistory();
   const { document, error } = useDocument('users', uid);
   const { documents } = useCollection('tasks', [
      'assignedUsersIds',
      'array-contains',
      uid,
   ]);

   console.log('document', document);

   if (error) {
      toast.error(error, {
         position: 'bottom-center',
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });
      history.goBack();
      return;
   }
   if (!document) {
      return (
         <Paper
            sx={{
               p: 2,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Typography>Loading...</Typography>
            <Spinner />
         </Paper>
      );
   }

   return (
      <Grid container spacing={2}>
         <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
               <Box>
                  <Grid container spacing={4}>
                     <Grid item xs={2}>
                        <Avatar
                           src={document.photoURL}
                           alt={document.displayName}
                           sx={{
                              width: '100%',
                              height: 'unset',
                           }}
                           style={{ aspectRatio: 1 }}
                        />
                     </Grid>
                     <Grid
                        item
                        xs={10}
                        sx={{ display: 'flex', alignItems: 'center' }}
                     >
                        <Stack>
                           <Grid container spacing={3}>
                              <Grid item>
                                 <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 500 }}
                                 >
                                    {document.displayName}
                                 </Typography>
                              </Grid>
                              <Grid
                                 item
                                 sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                 <AvailabilityStatus
                                    isOnline={document.online ? 1 : undefined}
                                 />
                                 <Typography
                                    variant="overline"
                                    color={
                                       document.online ? available : offline
                                    }
                                 >
                                    {document.online ? 'online' : 'offline'}
                                 </Typography>
                              </Grid>
                           </Grid>
                           <Typography
                              sx={{ display: 'block', marginTop: '5px' }}
                              color={secondary}
                              variant="caption"
                           >
                              @{document.id}
                           </Typography>
                        </Stack>
                     </Grid>
                  </Grid>
               </Box>
            </Paper>
         </Grid>
         <Grid item xs={4}>
            <Paper sx={{ p: 2 }}>
               <Grid container>
                  <Grid
                     item
                     xs={6}
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                     }}
                  >
                     <Typography variant="h3" sx={{ minHeight: '48px' }}>
                        {documents.length}
                     </Typography>
                     <Typography variant="subtitle2">tasks</Typography>
                  </Grid>
                  <Grid
                     item
                     xs={6}
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                     }}
                  >
                     <Typography
                        variant="h5"
                        align="center"
                        sx={{
                           minHeight: '48px',
                           display: 'flex',
                           alignItems: 'center',
                        }}
                     >
                        {moment.unix(document.joined.seconds).from(moment())}
                     </Typography>
                     <Typography variant="subtitle2">joined</Typography>
                  </Grid>
               </Grid>
            </Paper>
         </Grid>
         <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
               <TaskList
                  label={`${document.displayName}'s tasks`}
                  tasks={documents}
               />
            </Paper>
         </Grid>
      </Grid>
   );
};

export default UserProfile;
