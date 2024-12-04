import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PostDeleteConfirmationModal = ({ showDeleteModal, setShowDeleteModal, handleDeletePost }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this post? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeletePost}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostDeleteConfirmationModal;
