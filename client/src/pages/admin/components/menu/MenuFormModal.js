import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaSave, FaTimes } from "react-icons/fa";

const MenuFormModal = ({ showMenuModal, setShowMenuModal, editingMenu, handleAddEditMenu }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingMenu) {
            setFormValues({
                name: editingMenu.name,
				
                description: editingMenu.description,
            });
        } else {
            setFormValues({ name: '', description: '' });
        }
    }, [editingMenu]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Xóa lỗi nếu người dùng đã nhập
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.name) {
            newErrors.name = 'Tên chuyên mục là bắt buộc.';
        }
        if (!formValues.description) {
            newErrors.description = 'Mô tả chuyên mục là bắt buộc.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleAddEditMenu({
				...formValues, 
				status: formValues?.status || 'pending',
				is_featured: formValues?.is_featured || 1,

			});
            setShowMenuModal(false);
        }
    };

    return (
        <Modal show={showMenuModal} onHide={() => setShowMenuModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingMenu ? 'Cập nhật chuyên mục' : 'Thêm mới chuyên mục'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="menuName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            placeholder="Tên chuyên mục"
                            isInvalid={!!errors.name}
                        />
                        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group controlId="menuDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Mô tả chuyên mục"
                            isInvalid={!!errors.description}
                        />
                        {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="d-flex justify-content-between align-items-center" size="sm" variant="danger" onClick={() => setShowMenuModal(false)}>
                    Huỷ bỏ <FaTimes />
                </Button>
                <Button className="d-flex justify-content-between align-items-center" size="sm" variant="primary" onClick={handleSubmit}>
                    {editingMenu ? 'Cập nhật' : 'Thêm mới'} <FaSave className="ms-2" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MenuFormModal;
