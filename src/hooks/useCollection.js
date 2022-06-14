import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
   const [documents, setDocuments] = useState(null);
   const [error, setError] = useState(null);
   const [query, setQuery] = useState(_query);

   const orderBy = useRef(_orderBy).current;
   useEffect(() => {
      let ref = projectFirestore.collection(collection);
      if (query?.length > 0) {
         if (query[0] && query[0] instanceof Array) {
            query.forEach(q => ref = ref.where(...q));
         } else {
            ref = ref.where(...query);
         }
      }
      if (orderBy) {
         ref = ref.orderBy(...orderBy);
      }

      const unsubscribe = ref.onSnapshot(
         (snapshot) => {
            let results = [];
            snapshot.docs.forEach((doc) => {
               results.push({ ...doc.data(), id: doc.id });
            });

            setDocuments(results);
            setError(null);
         },
         (error) => {
            console.log(error);
            setError('Could not fetch the data');
         }
      );

      return () => unsubscribe();
   }, [collection, query, orderBy]);

   return { documents, error, setQuery };
};
