import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { FaSave, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { formatCurrencyInput } from '../../../../helpers/formatters';
import apiUpload from '../../../../api/apiUpload'; // Đảm bảo đã import đúng

const SampleImageFormModal = ({ showSampleImageModal, setShowSampleImageModal, editingSampleImage, handleAddSampleImage, handleUpdateSampleImage, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
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
        if (files && files[0]) {
            setFormData({
                ...formData,
                image: value, // fakepath for display
                imageFile: files[0], // real file for upload
            });
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            let imageUrl = formData.image;
            // Nếu có file thực, upload lên server
            if (formData.imageFile instanceof File) {
                const uploadRes = await apiUpload.uploadImage(formData.imageFile);
                // Tùy backend trả về, có thể là uploadRes.data hoặc uploadRes.data.data
                imageUrl = uploadRes.data.data || uploadRes.data.imageUrl || uploadRes.data;
            }
            const hairData = {
                name: formData.name,
                gender: formData.gender,
                avatar: imageUrl,
            };
            if (editingSampleImage) {
                await handleUpdateSampleImage(editingSampleImage.id, hairData);
            } else {
                await handleAddSampleImage(hairData);
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
                            placeholder='Nhập tên mẫu ảnh'
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giới tính</Form.Label>
                        <div>
                            <Form.Check 
                                inline
                                label="Nam"
                                name="gender"
                                type="radio"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            />
                            <Form.Check 
                                inline
                                label="Nữ"
                                name="gender"
                                type="radio"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh mẫu</Form.Label>
                        <Form.Control 
                            type="file"
                            name="image"

                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSampleImageModal(false)}>
                        Hủy bỏ
                    </Button>
                    <Button variant="primary" type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Đang xử lý...' : 'Lưu'}
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SampleImageFormModal;
