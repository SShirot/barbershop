import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchModal = ({ showSearchModal, setShowSearchModal, searchCriteria, handleSearch, handleSearchSubmit, handleResetSearch }) => {
    return (
        <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Search Boardings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Pet Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={searchCriteria.petName}
                            onChange={(e) => handleSearch(e.target.value, 'petName')}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={searchCriteria.status}
                            onChange={(e) => handleSearch(e.target.value, 'status')}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                            <option value="completed">Completed</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleResetSearch}>
                    Reset
                </Button>
                <Button variant="primary" onClick={handleSearchSubmit}>
                    Search
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal;
