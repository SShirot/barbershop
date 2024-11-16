import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchModal = ({ showSearchModal, setShowSearchModal, searchCriteria, handleSearch, handleSearchSubmit, handleResetSearch }) => {
    return (
        <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Search Pets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Search by Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter pet name"
                            value={searchCriteria.name}
                            onChange={(e) => handleSearch(e.target.value, 'name')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Search by Gender</Form.Label>
                        <Form.Control
                            as="select"
                            value={searchCriteria.gender}
                            onChange={(e) => handleSearch(e.target.value, 'gender')}
                        >
                            <option value="">All</option>
                            <option value="male">Đực</option>
                            <option value="female">Cái</option>
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
