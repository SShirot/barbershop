import React from 'react';
import { Breadcrumb, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <Nav.Item>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/user/pets">Pets</Nav.Link>
            </Nav.Item>
            <Breadcrumb.Item active>Index</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
