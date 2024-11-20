// components/LoginLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const LoginLayout = () => {
    return (
        <Container fluid>
            <Outlet />
        </Container>
    );
};

export default LoginLayout;
