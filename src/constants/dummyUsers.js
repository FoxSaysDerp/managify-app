import { useState, useEffect } from 'react';

const DUMMY_USERS = () => {
   const [users, setUsers] = useState({});

   useEffect(() => {
      fetch('https://randomuser.me/api/?results=10')
         .then((response) => response.json())
         .then((json) => {
            setUsers({ users: json.results, isLoaded: true });
         });
   }, []);

   return users;
};

export default DUMMY_USERS;
