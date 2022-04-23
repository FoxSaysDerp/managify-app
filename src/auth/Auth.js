import React from 'react';
import { Container, Col } from 'react-bootstrap';
import styled from 'styled-components';

const AuthImage = styled.img`
   width: 100%;
   object-fit: cover;
`;

const Auth = () => {
   return (
      <Container>
         <Col md={4}>
            <AuthImage
               src={require('../assets/images/photos/office-photo-1.jpg')}
               alt=""
            />
         </Col>
         <Col md={8}></Col>
      </Container>
   );
};

export default Auth;
