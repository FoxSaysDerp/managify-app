import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import { useCollection } from '../hooks/useCollection';
import { useDocument } from '../hooks/useDocument';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import { getColor } from '../util/getColor';

import moment from 'moment';

import {
   Avatar,
   TextField,
   Input,
   OutlinedInput,
   InputLabel,
   Paper,
   Box,
   Grid,
   Divider,
   Chip,
   Stack,
   Select,
   MenuItem,
   InputAdornment,
   FormControl,
   Skeleton,
   Button,
   Typography,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
} from '@mui/material';

import styled from '@mui/styled-engine-sc';
import Spinner from '../components/Spinner';
import ArchiveIcon from '@mui/icons-material/Archive';
import BackspaceIcon from '@mui/icons-material/Backspace';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import deLocale from 'date-fns/locale/de';

import { TASK_PRIORITY, TASK_STATUS } from '../constants/taskProperties';
import { yellow, green } from '@mui/material/colors';

const active = green[400];
const archived = yellow[800];

const VerticalDivider = styled('span')`
   display: inline-block;
   height: 48px;
   max-height: 100%;
   width: 1px;
   margin-top: 8px;
   background-color: #e0e0e0;
`;

const TaskState = styled('span')`
   display: block;
   width: 8px;
   height: 8px;
   border-radius: 50%;
   background-color: ${(props) => (props.isArchived ? archived : active)};
   transform: translateY(18px);
`;

const EditTask = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);

   const [users, setUsers] = useState([]);

   const [assignedUsers, setAssignedUsers] = useState([]);
   const [dueDate, setDueDate] = useState(moment());
   const [taskPriority, setTaskPriority] = useState('Low');
   const [taskStatus, setTaskStatus] = useState('Open');
   const [isArchived, setIsArchived] = useState(false);

   const history = useHistory();
   const { tid } = useParams();

   const { register, handleSubmit } = useForm();

   const { documents } = useCollection('users');
   const { document } = useDocument('tasks', tid);
   const { user } = useAuthContext();
   const { updateDocument, deleteDocument, response } = useFirestore('tasks');

   const handleAssignedUsersChange = (e) => {
      const {
         target: { value },
      } = e;
      setAssignedUsers(typeof value === 'string' ? value.split(',') : value);
   };

   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
      PaperProps: {
         style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
         },
      },
   };

   const onSubmit = async (data) => {
      setIsLoading(true);

      let payload = {
         ...data,
         taskCreator: users.find((el) => el.id === user.uid),
         assignedUsers,
         assignedUsersIds: assignedUsers.map((el) => el.id),
         dueDate,
         taskPriority,
         taskStatus,
         isArchived: false,
      };

      console.log(payload);

      await updateDocument(tid, payload);

      if (!response.error) {
         setIsLoading(false);
         history.push(`/tasks/${tid}`);
      }
   };

   const handleClose = () => {
      setOpenDialog(false);
   };

   const handleDeletion = async () => {
      setIsLoading(true);

      await deleteDocument(tid);
      if (!response.error) {
         setIsLoading(false);
         history.push('/tasks');
      }
   };

   const DeleteConfirmationDialog = (props) => {
      const { open } = props;

      return (
         <Dialog open={open}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  <Typography align="center">
                     This task will be deleted forever{' '}
                     <strong>(a very long time)</strong>.
                     <br /> Are you sure you want to delete it?
                  </Typography>
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleDeletion}
                  variant="contained"
                  color="error"
               >
                  Agree
               </Button>
               <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
         </Dialog>
      );
   };

   useEffect(() => {
      if (documents) {
         setUsers(documents);
      }
   }, [documents]);

   useEffect(() => {
      if (document) {
         console.log(document);

         setAssignedUsers(document.assignedUsers);
         setDueDate(document.dueDate);
         setTaskPriority(document.taskPriority);
         setTaskStatus(document.taskStatus);
         setIsArchived(document.isArchived);
      }
   }, [document]);

   if (!documents || !document) {
      return <div>Loading...</div>;
   }

   return (
      <Paper sx={{ p: 2 }}>
         <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
         >
            <Grid container sx={{ py: 2 }} spacing={2}>
               <Grid item xs={8}>
                  <TextField
                     id="taskName"
                     label="Task name"
                     defaultValue={document.taskName}
                     fullWidth
                     required
                     inputProps={{ style: { fontSize: 28, lineHeight: 1.5 } }}
                     {...register('taskName', {
                        required: true,
                     })}
                  />
               </Grid>
               <Grid item xs={2} sx={{ display: 'grid', alignItems: 'center' }}>
                  <FormControl variant="standard">
                     <InputLabel htmlFor="taskCreator">Task creator</InputLabel>
                     <Input
                        id="taskCreator"
                        value={document.taskCreator.displayName}
                        startAdornment={
                           <InputAdornment position="start">
                              <Avatar
                                 src={document.taskCreator.photoURL}
                                 alt={document.taskCreator.displayName}
                                 sx={{ maxHeight: 24, maxWidth: 24 }}
                              />
                           </InputAdornment>
                        }
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={2} sx={{ display: 'grid', alignItems: 'center' }}>
                  <TextField
                     id="taskCreationDateDisplay"
                     label="Created on"
                     defaultValue={moment
                        .unix(document.createdAt.seconds)
                        .format('Do MMMM YYYY, HH:mm')}
                     variant="filled"
                     InputProps={{
                        readOnly: true,
                     }}
                  />
               </Grid>
            </Grid>
            <Box
               sx={{
                  margin: '-24px 2px -24px 0',
                  transform: 'translateX(4px)',
               }}
            >
               <TaskState isArchived={isArchived} />
               <Typography
                  variant="overline"
                  sx={{
                     marginLeft: '14px',
                     fontStyle: 'italic',
                     fontWeight: 600,
                     color: isArchived ? archived : active,
                  }}
               >
                  {isArchived ? 'Archived' : 'Active'}
               </Typography>
            </Box>
            <Divider textAlign="right" sx={{ mb: 1, mt: 1 }}>
               <Chip label="DETAILS" />
            </Divider>
            <Grid container spacing={2}>
               <Grid item xs={9} sx={{ px: 1 }}>
                  <TextField
                     id="taskDescription"
                     label="Description"
                     defaultValue={document.taskDescription}
                     multiline
                     rows={10}
                     placeholder="Enter a descriptive text..."
                     variant="filled"
                     fullWidth
                     required
                     {...register('taskDescription', {
                        required: true,
                     })}
                  />
               </Grid>
               <Grid item xs={3}>
                  <Stack>
                     {users.length <= 0 && (
                        <Skeleton
                           variant="rectangular"
                           width={288}
                           height={65}
                           sx={{ mb: 3 }}
                        />
                     )}
                     {users.length > 0 && (
                        <FormControl sx={{ mb: 3 }}>
                           <InputLabel id="assignedUsersLabel">
                              Assigned to
                           </InputLabel>
                           <Select
                              labelId="assignedUsersLabel"
                              id="assignedUsers"
                              value={assignedUsers}
                              onChange={handleAssignedUsersChange}
                              multiple
                              required
                              input={
                                 <OutlinedInput
                                    id="assignedUsersChip"
                                    label="Chip"
                                 />
                              }
                              renderValue={(selected) => {
                                 return (
                                    <Box
                                       sx={{
                                          display: 'flex',
                                          flexWrap: 'wrap',
                                          gap: 0.5,
                                       }}
                                    >
                                       {selected.map((value) => {
                                          return (
                                             <Chip
                                                avatar={
                                                   <Avatar
                                                      alt={value.displayName}
                                                      src={value.photoURL}
                                                   />
                                                }
                                                key={value.id}
                                                label={value.displayName}
                                             />
                                          );
                                       })}
                                    </Box>
                                 );
                              }}
                              MenuProps={MenuProps}
                           >
                              {users.map((user) => (
                                 <MenuItem key={user.id} value={user}>
                                    {user.displayName}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     )}
                     <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={deLocale}
                     >
                        <DatePicker
                           label="Due date"
                           value={dueDate}
                           required
                           onChange={(newDueDate) => {
                              setDueDate(moment(newDueDate));
                           }}
                           mask="'__.__.____'"
                           renderInput={(params) => <TextField {...params} />}
                        />
                     </LocalizationProvider>
                     <Grid container spacing={1}>
                        <Grid item xs={6}>
                           <FormControl sx={{ my: 3, width: '100%' }}>
                              <InputLabel id="taskPriorityLabel">
                                 Priority
                              </InputLabel>
                              <Select
                                 labelId="taskPriorityLabel"
                                 id="taskPriority"
                                 defaultValue="Low"
                                 value={taskPriority}
                                 onChange={(e) => {
                                    setTaskPriority(e.target.value);
                                 }}
                                 input={
                                    <OutlinedInput
                                       id="taskPriorityChip"
                                       label="Chip"
                                    />
                                 }
                                 renderValue={() => (
                                    <Box>
                                       <Chip
                                          label={taskPriority}
                                          style={{
                                             backgroundColor: getColor({
                                                value: taskPriority,
                                                type: 'priority',
                                             }),
                                          }}
                                       />
                                    </Box>
                                 )}
                                 MenuProps={MenuProps}
                                 required
                              >
                                 {TASK_PRIORITY.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                       {item.name}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                           <FormControl sx={{ my: 3, width: '100%' }}>
                              <InputLabel id="taskStatusLabel">
                                 Status
                              </InputLabel>
                              <Select
                                 fullWidth
                                 labelId="taskStatusLabel"
                                 id="taskStatus"
                                 defaultValue={document.taskStatus}
                                 value={taskStatus}
                                 onChange={(e) => {
                                    setTaskStatus(e.target.value);
                                 }}
                                 input={
                                    <OutlinedInput
                                       id="taskStatusChip"
                                       label="Chip"
                                    />
                                 }
                                 renderValue={() => (
                                    <Box>
                                       <Chip
                                          label={taskStatus}
                                          style={{
                                             backgroundColor: getColor({
                                                value: taskStatus,
                                                type: 'status',
                                             }),
                                          }}
                                       />
                                    </Box>
                                 )}
                                 MenuProps={MenuProps}
                                 required
                              >
                                 {TASK_STATUS.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                       {item.name}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Grid>
                     </Grid>
                  </Stack>
               </Grid>
            </Grid>
            <Grid
               container
               sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}
            >
               <Grid
                  item
                  xs={6}
                  sx={{
                     display: 'flex',
                     justifyContent: 'flex-start',
                     alignItems: 'center',
                     columnGap: '16px',
                  }}
               >
                  <Button
                     type="submit"
                     variant="contained"
                     sx={{ mt: 3, mb: 2, py: 1, px: 5 }}
                  >
                     {isLoading ? 'Updating...' : 'Update'}
                  </Button>
                  {isLoading && <Spinner size={32} />}
                  <VerticalDivider />
                  <Button
                     type="button"
                     variant="contained"
                     onClick={() => setIsArchived(!isArchived)}
                     color="warning"
                     sx={{ mt: 3, mb: 2, py: 1, px: 2 }}
                     startIcon={<ArchiveIcon />}
                  >
                     {isArchived ? 'Unarchive' : 'Archive'}
                  </Button>
               </Grid>
               <Button
                  type="button"
                  variant="contained"
                  onClick={() => setOpenDialog(true)}
                  color="error"
                  sx={{ mt: 3, mb: 2, py: 1, px: 2 }}
                  startIcon={<BackspaceIcon />}
               >
                  Delete
               </Button>
               <DeleteConfirmationDialog
                  onClose={handleClose}
                  open={openDialog}
               />
            </Grid>
         </Box>
      </Paper>
   );
};

export default EditTask;
