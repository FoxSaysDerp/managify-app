import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';
import moment from 'moment';

let initialState = {
   document: null,
   isPending: false,
   error: null,
   success: null,
};

const firestoreReducer = (state, action) => {
   switch (action.type) {
      case 'IS_PENDING':
         return {
            ...initialState,
            isPending: true,
         };
      case 'ADDED_DOCUMENT':
         return {
            ...initialState,
            document: action.payload,
         };
      case 'DELETED_DOCUMENT':
         return {
            ...initialState,
            success: true,
         };
      case 'ERROR':
         return {
            ...initialState,
            error: action.payload,
         };
   }
};

export const useFirestore = (collection) => {
   const [response, dispatch] = useReducer(firestoreReducer, initialState);
   const [isCancelled, setIsCancelled] = useState(false);

   const ref = projectFirestore.collection(collection);

   const dispatchIfNotCancelled = (action) => {
      if (!isCancelled) {
         dispatch(action);
      }
   };

   const addDocument = async (doc) => {
      dispatch({ type: 'IS_PENDING' });

      try {
         const createdAt = timestamp.fromDate(moment());
         const addedDocument = await ref.add({ ...doc, createdAt });
         dispatchIfNotCancelled({
            type: 'ADDED_DOCUMENT',
            payload: addedDocument,
         });
      } catch (err) {
         dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      }
   };

   const deleteDocument = async (id) => {
      dispatch({ type: 'IS_PENDING' });

      try {
         await ref.doc(id).delete();
         dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
      } catch (err) {
         dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' });
      }
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { addDocument, deleteDocument, response };
};
