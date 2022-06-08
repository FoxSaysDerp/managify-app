import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
   <LoadingOutlined style={{ fontSize: 48, color: '#ffb300' }} spin />
);

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
   const history = useHistory();

   const { logout, isPending } = useLogout;

   useEffect(() => {
      logout;

      if (!isPending) {
         setTimeout(() => {
            history.push('/');
         }, 500);
      }
   }, []);

   return (
      <LogoutContainer>
         <TextContainer variant="h4">You are being logout...</TextContainer>
         <Spin indicator={antIcon} />
      </LogoutContainer>
   );
};

export default Logout;
