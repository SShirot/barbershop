import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PromotionDeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDeletePromotion }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this promotion?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeletePromotion}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PromotionDeleteModal;
