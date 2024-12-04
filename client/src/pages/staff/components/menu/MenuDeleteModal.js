import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {FaTrash, FaSave} from "react-icons/fa";

const MenuDeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteData }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Xoá dữ liệu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn xoá dữ liệu này không, dữ liệu xoá đi không thể khôi phục
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className={'d-flex align-items-center'}>
                    <FaTrash className={'mx-1'} /> Huỷ bỏ
                </Button>
                <Button variant="danger" onClick={handleDeleteData} className={'d-flex align-items-center'}>
                    <FaSave className={'mx-1'}/> Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MenuDeleteModal;
