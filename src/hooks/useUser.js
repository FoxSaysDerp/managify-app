import { useEffect, useState } from 'react';
import { useCollection } from './useCollection';

const AVATAR_PLACEHOLDER =
   'https://firebasestorage.googleapis.com/v0/b/managify-389f8.appspot.com/o/avatars%2Favatar-placeholder.jpg?alt=media&token=36835d1a-f75f-41d5-a044-809f579a881f';

export const useUser = (userId) => {
   const [userObj, setUserObj] = useState({
      id: userId,
      displayName: 'Loading',
      photoURL: AVATAR_PLACEHOLDER,
   });

   const { documents } = useCollection('users');

   useEffect(() => {
      if (documents && documents.length > 0) {
         setUserObj(
            documents.find((user) => {
               if (user.id === userId) return user;
            })
         );
      }
   }, [documents]);

   return userObj;
};
