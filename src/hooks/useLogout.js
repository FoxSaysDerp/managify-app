import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const { dispatch, user } = useAuthContext();

   const history = useHistory();

   const logout = async () => {
      setError(null);
      setIsPending(true);

      try {
         const { uid } = user;
         await projectFirestore.collection('users').doc(uid).update({
            online: false,
         });

         await projectAuth.signOut();

         dispatch({ type: 'LOGOUT' });

         if (!isCancelled) {
            setIsPending(false);
            setError(null);
            history.push('/login');
         }
      } catch (err) {
         if (!isCancelled) {
            setError(err.message);
            setIsPending(false);
         }
      }
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { logout, error, isPending };
};
