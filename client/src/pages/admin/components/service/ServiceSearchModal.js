import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ServiceSearchModal = ({
                                showSearchModal,
                                setShowSearchModal,
                                searchCriteria,
                                handleSearch,
                                handleResetSearch,
                                handleSearchSubmit
                            }) => {
    return (
        <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Search Services</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Search by Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter service name"
                            value={searchCriteria.name}
                            onChange={(e) => handleSearch(e.target.value, 'name')}
                        />
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

export default ServiceSearchModal;
