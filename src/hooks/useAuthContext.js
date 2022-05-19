import { AuthContext } from '../context/auth-context';
import { useContext } from 'react';

export const useAuthContext = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw Error('useAuthContext not in AuthContext Provider');
   }

   return context;
};
