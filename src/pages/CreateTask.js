import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useCollection } from '../hooks/useCollection';
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
} from '@mui/material';

import Spinner from '../components/Spinner';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import deLocale from 'date-fns/locale/de';

import { TASK_PRIORITY } from '../constants/taskPriority';
import { TASK_STATUS } from '../constants/taskStatus';

const CreateTask = () => {
   const [isLoading, setIsLoading] = useState(false);

   const [users, setUsers] = useState([]);

   const [assignedUsers, setAssignedUsers] = useState([]);
   const [dueDate, setDueDate] = useState(moment());
   const [taskPriority, setTaskPriority] = useState('Low');
   const [taskStatus, setTaskStatus] = useState('Open');

   const history = useHistory();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const { documents } = useCollection('users');
   const { user } = useAuthContext();
   const { addDocument, response } = useFirestore('tasks');

   const handleAssignedUsersChange = (e) => {
      const {
         target: { value },
      } = e;
      setAssignedUsers(typeof value === 'string' ? value.split(',') : value);
   };

   const creationTime = moment();

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
         dueDate: new Date(),
         taskPriority,
         taskStatus,
         isArchived: false,
      };

      await addDocument(payload);

      if (!response.error) {
         setIsLoading(false);
         history.push('/tasks');
      }
   };

   useEffect(() => {
      if (documents) {
         setUsers(documents);
      }
   }, [documents]);

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
                        value={user.displayName}
                        startAdornment={
                           <InputAdornment position="start">
                              <Avatar
                                 src={user.photoURL}
                                 alt={user.displayName}
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
                     defaultValue={creationTime.format('Do MMMM YYYY, HH:mm')}
                     variant="filled"
                     InputProps={{
                        readOnly: true,
                     }}
                  />
                  <TextField
                     id="taskCreationDate"
                     label="Created on"
                     value={creationTime}
                     variant="filled"
                     InputProps={{
                        readOnly: true,
                     }}
                     sx={{ display: 'none' }}
                     {...register('taskCreationDate', {
                        required: true,
                     })}
                  />
               </Grid>
            </Grid>
            <Divider textAlign="right" sx={{ mb: 1, mt: 1 }}>
               <Chip label="DETAILS" />
            </Divider>
            <Grid container spacing={2}>
               <Grid item xs={9} sx={{ px: 1 }}>
                  <TextField
                     id="taskDescription"
                     label="Description"
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
                                 defaultValue="Open"
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
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  columnGap: '16px',
               }}
            >
               <Button
                  type="submit"
                  variant="contained"
                  disabled={!errors}
                  sx={{ mt: 3, mb: 2, py: 2, px: 5 }}
               >
                  {isLoading ? 'Submitting...' : 'Submit'}
               </Button>
               {isLoading && <Spinner size={32} />}
            </Grid>
         </Box>
      </Paper>
   );
};

export default CreateTask;
