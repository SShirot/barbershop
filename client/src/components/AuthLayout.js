import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const AuthLayout = () => {
    return (
        <Container fluid>
            <Outlet />
        </Container>
    );
};

export default AuthLayout;
