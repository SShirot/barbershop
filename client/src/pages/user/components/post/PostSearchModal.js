import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PostSearchModal = ({
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
                <Modal.Title>Search Posts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="searchTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={searchCriteria.title}
                            onChange={(e) => handleSearch(e.target.value, 'title')}
                            placeholder="Enter post title"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowSearchModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSearchSubmit}>
                    Search
                </Button>
                <Button variant="outline-secondary" onClick={handleResetSearch}>
                    Reset
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostSearchModal;
