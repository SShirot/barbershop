import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserSearchModal = ({ showSearchModal, setShowSearchModal, searchCriteria, handleSearch, handleResetSearch, handleSearchSubmit }) => {
    return (
        <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Search Users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchCriteria.name}
                        onChange={(e) => handleSearch(e.target.value, 'name')}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={searchCriteria.email}
                        onChange={(e) => handleSearch(e.target.value, 'email')}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        as="select"
                        value={searchCriteria.role}
                        onChange={(e) => handleSearch(e.target.value, 'role')}
                    >
                        <option value="">All</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowSearchModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleSearchSubmit}>Search</Button>
                <Button variant="warning" onClick={handleResetSearch}>Reset</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserSearchModal;
