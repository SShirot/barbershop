import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";
const EmptyLayout = () => {
    return (
        <>
            <Container style={{ minHeight: '70vh',paddingBottom: '100px'}}>
                <Outlet />
            </Container>
        </>
    );
};

export default EmptyLayout;
