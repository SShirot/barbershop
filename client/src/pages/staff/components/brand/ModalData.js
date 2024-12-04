import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";

const ModalData = ({
                       showCategoryModal,
                       setShowCategoryModal,
                       editingCategory,
                       handleAddEditCategory,
                       apiUpload // Thêm API upload ảnh
                   }) => {
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState(editingCategory?.avatar || null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await apiUpload.uploadImage(file); // Gọi API upload ảnh
                setImageData(response.data); // Lưu link ảnh
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingCategory ? 'Cập nhật' : 'Thêm mới'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: editingCategory?.name || '',
                        description: editingCategory?.description || '',
                        avatar: imageData || '', // Thêm giá trị ban đầu cho ảnh
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Tên thương hiệu không được để trống'),
                        description: Yup.string().required('Mô tả không được để trống'),
                    })}
                    onSubmit={(values) => {
                        const data = { ...values, avatar: imageData }; // Thêm ảnh vào dữ liệu gửi
                        handleAddEditCategory(data);
                    }}
                >
                    {({ handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên thương hiệu</Form.Label>
                                <Field name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mô tả</Form.Label>
                                <Field name="description" className="form-control" as="textarea" rows={3} />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Ảnh thương hiệu</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            handleImageChange(e);
                                            setFieldValue('avatar', e.target.files[0]);
                                        }}
                                    />
                                    {loading && <Spinner animation="border" size="sm" className="ms-2" />}
                                </div>
                                {imageData && (
                                    <div className="mt-2">
                                        <img src={imageData} alt="Preview" style={{ width: '100%', maxHeight: '200px' }} />
                                    </div>
                                )}
                            </Form.Group>

                            <Button
                                type="submit"
                                className="d-flex justify-content-between align-items-center"
                                size="sm"
                                variant="primary"
                                disabled={loading} // Disable nút khi đang tải ảnh
                            >
                                {editingCategory ? 'Cập nhật' : 'Thêm mới'} <FaSave className="ms-2" />
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default ModalData;
