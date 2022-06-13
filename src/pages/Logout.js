import { useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Spinner from '../components/Spinner';

const LogoutContainer = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   row-gap: 16px;
`;

const TextContainer = styled(Typography)`
   display: block;
   height: fit-content;
`;

const Logout = () => {
   const { logout } = useLogout();

   useEffect(() => logout, []);

   return (
      <LogoutContainer>
         <TextContainer variant="h4">You are being logout...</TextContainer>
         <Spinner />
      </LogoutContainer>
   );
};

export default Logout;
