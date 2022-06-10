import { useParams, useHistory } from 'react-router-dom';

import { useDocument } from '../hooks/useDocument';

import moment from 'moment';

import {
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
   InputAdornment,
   FormControl,
   Button,
   Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ArchiveIcon from '@mui/icons-material/Archive';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import deLocale from 'date-fns/locale/de';

import { getColor } from '../util/getColor';

const Task = () => {
   const { tid } = useParams();
   const history = useHistory();
   const { document, error } = useDocument('tasks', tid);

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

   console.log(document);

   return (
      <Paper sx={{ p: 2 }}>
         <Box>
            <Grid container sx={{ py: 2 }} spacing={2}>
               <Grid item xs={8}>
                  <TextField
                     id="taskName"
                     label="Task name"
                     value={document.taskName}
                     fullWidth
                     inputProps={{
                        style: { fontSize: 28, lineHeight: 1.5 },
                        readOnly: true,
                     }}
                  />
               </Grid>
               <Grid item xs={2} sx={{ display: 'grid', alignItems: 'center' }}>
                  <FormControl variant="standard">
                     <InputLabel htmlFor="taskCreator">Task creator</InputLabel>
                     <Input
                        id="taskCreator"
                        value={document.taskCreator}
                        readOnly
                        startAdornment={
                           <InputAdornment position="start">
                              {/* <Avatar
                                 src={getUser(document.taskCreator).photoURL}
                                 alt={getUser(document.taskCreator).displayName}
                                 sx={{ maxHeight: 24, maxWidth: 24 }}
                              /> */}
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
                        .unix(document.taskCreationDate)
                        .format('Do MMMM YYYY, HH:mm')}
                     variant="filled"
                     InputProps={{
                        readOnly: true,
                     }}
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
                     InputProps={{
                        readOnly: true,
                     }}
                     value={document.taskDescription}
                  />
               </Grid>
               <Grid item xs={3}>
                  <Stack>
                     <FormControl sx={{ mb: 3 }}>
                        <InputLabel id="assignedUsersLabel">
                           Assigned to
                        </InputLabel>
                        <Select
                           labelId="assignedUsersLabel"
                           id="assignedUsers"
                           value={document.assignedUsers}
                           multiple
                           readOnly
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
                                       console.log(value);
                                       return (
                                          <Chip key={value} label={value} />
                                       );
                                    })}
                                 </Box>
                              );
                           }}
                        ></Select>
                     </FormControl>
                     <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={deLocale}
                     >
                        <DatePicker
                           label="Due date"
                           value={document.dueDate}
                           readOnly
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
                                 readOnly
                                 value={document.taskPriority}
                                 input={
                                    <OutlinedInput
                                       id="taskPriorityChip"
                                       label="Chip"
                                    />
                                 }
                                 renderValue={() => (
                                    <Box>
                                       <Chip
                                          label={document.taskPriority}
                                          style={{
                                             backgroundColor: getColor({
                                                value: document.taskPriority,
                                                type: 'priority',
                                             }),
                                          }}
                                       />
                                    </Box>
                                 )}
                              ></Select>
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
                                 readOnly
                                 value={document.taskStatus}
                                 input={
                                    <OutlinedInput
                                       id="taskStatusChip"
                                       label="Chip"
                                    />
                                 }
                                 renderValue={() => (
                                    <Box>
                                       <Chip
                                          label={document.taskStatus}
                                          style={{
                                             backgroundColor: getColor({
                                                value: document.taskStatus,
                                                type: 'status',
                                             }),
                                          }}
                                       />
                                    </Box>
                                 )}
                              ></Select>
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
                  sx={{ mt: 3, mb: 2, py: 1, px: 5 }}
               >
                  Edit
               </Button>
               <Divider orientation="vertical" flexItem />
               <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2, py: 1, px: 2 }}
                  startIcon={<ArchiveIcon />}
               >
                  Archive
               </Button>
            </Grid>
         </Box>
      </Paper>
   );
};

export default Task;
