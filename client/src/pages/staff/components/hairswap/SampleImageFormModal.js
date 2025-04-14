import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { FaSave, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { formatCurrencyInput } from '../../../../helpers/formatters';

const SampleImageFormModal = ({ showSampleImageModal, setShowSampleImageModal, editingSampleImage, handleAddSampleImage, handleUpdateSampleImage, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (editingSampleImage) {
            setFormData(editingSampleImage);
            setPreviewImage(editingSampleImage.image);
        }
    }, [editingSampleImage]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: value });
        if (files && files[0]) {
            setPreviewImage(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const formDataToSubmit = new FormData();        
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('description', formData.description);
            if (formData.image) {
                formDataToSubmit.append('image', formData.image);
            }

            if (editingSampleImage) {
                await handleUpdateSampleImage(editingSampleImage.id, formDataToSubmit);
            } else {
                await handleAddSampleImage(formDataToSubmit);
            }

            setShowSampleImageModal(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsProcessing(false);
        }   
    };

    return (
        <Modal show={showSampleImageModal} onHide={() => setShowSampleImageModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingSampleImage ? 'Cập nhật mẫu ảnh' : 'Thêm mẫu ảnh'}</Modal.Title>
            </Modal.Header> 
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên mẫu ảnh</Form.Label>
                        <Form.Control 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control 
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh mẫu</Form.Label>
                        <Form.Control 
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowSampleImageModal(false)}>
                    Hủy bỏ
                </Button>
                <Button variant="primary" type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Đang xử lý...' : 'Lưu'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SampleImageFormModal;
