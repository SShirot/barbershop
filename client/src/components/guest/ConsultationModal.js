import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import apiConsultationsService from "../../api/apiConsultationsService";
import toastr from "toastr";

const ConsultationModal = ({ show, handleClose, API, setSuccessMessage }) => {
    const [consultationType, setConsultationType] = useState('health');
    const [consultationText, setConsultationText] = useState('');

    const handleSubmit = async () => {
        try {
            const data = {
                type: consultationType,
                text: consultationText,
                status: 'pending', // Trạng thái mặc định là 'chờ xử lý'
            }

            // Gửi dữ liệu đến API
            const response = await apiConsultationsService.add(data);
            toastr.success('Đăng ký tư vấn thành công!', 'Success');
            handleClose();
        } catch (error) {
            toastr.error('Có lỗi xẩy ra, xin vui lòng thử lại', 'Error');
            console.error('Error submitting consultation:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Yêu cầu tư vấn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung cần tư vấn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập nội dung cần tư vấn"
                            value={consultationText}
                            onChange={(e) => setConsultationText(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chọn loại tư vấn</Form.Label>
                        <Form.Control
                            as="select"
                            value={consultationType}
                            onChange={(e) => setConsultationType(e.target.value)}
                        >
                            <option value="health">Sức khoẻ</option>
                            <option value="care">Chăm sóc</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy bỏ
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Gửi yêu cầu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConsultationModal;
