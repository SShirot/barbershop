import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SampleImageDeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteSampleImage }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Xóa mẫu ảnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa mẫu ảnh này không?
            </Modal.Body>
            <Modal.Footer> 
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Hủy bỏ
                </Button>
                <Button variant="danger" onClick={handleDeleteSampleImage}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SampleImageDeleteModal;
