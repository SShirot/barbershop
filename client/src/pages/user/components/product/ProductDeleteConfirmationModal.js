import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductDeleteConfirmationModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteProduct }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteProduct}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDeleteConfirmationModal;
