import { useEffect, useState } from 'react';
import {
   projectAuth,
   projectStorage,
   projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [isFulfilled, setIsFulfilled] = useState(false);
   const { dispatch } = useAuthContext();

   const signup = async (email, password, displayName, avatar) => {
      setError(null);
      setIsPending(true);

      try {
         const res = await projectAuth.createUserWithEmailAndPassword(
            email,
            password
         );

         if (!res) {
            throw new Error('Sign up has failed, please try again.');
         }

         const uploadPath = `avatars/${res.user.uid}/${avatar.name}`;
         const img = await projectStorage.ref(uploadPath).put(avatar);
         const imgUrl = await img.ref.getDownloadURL();

         await res.user.updateProfile({
            displayName,
            photoURL: imgUrl,
         });

         await projectFirestore.collection('users').doc(res.user.uid).set({
            online: true,
            displayName,
            photoURL: imgUrl,
            joined: new Date(),
         });

         dispatch({ type: 'LOGIN', payload: res.user });

         if (!isCancelled) {
            setIsPending(false);
            setError(null);

            // Will be casted as 'true', no idea why
            setIsFulfilled(false);
            console.log(isFulfilled);
         }
      } catch (err) {
         if (!isCancelled) {
            setError(err.message);
            setIsPending(false);

            // Will be casted as 'false', also no idea why
            setIsFulfilled(true);
         }
      }
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { signup, error, isPending, isFulfilled };
};
