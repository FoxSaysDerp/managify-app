import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [isFulfilled, setIsFulfilled] = useState(false);
   const { dispatch } = useAuthContext();

   const login = async (email, password) => {
      setError(null);
      setIsPending(true);

      try {
         ('auth');
         const res = await projectAuth.signInWithEmailAndPassword(
            email,
            password
         );

         dispatch({ type: 'LOGIN', payload: res.user });

         await projectFirestore.collection('users').doc(res.user.uid).update({
            online: true,
         });

         if (!isCancelled) {
            ('!isCancelled');
            setIsPending(false);
            setError(null);

            setIsFulfilled(true);
         }
      } catch (err) {
         if (!isCancelled) {
            setError(err.message);
            setIsPending(false);

            setIsFulfilled(false);
         }
      }
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { login, isPending, error, isFulfilled };
};
