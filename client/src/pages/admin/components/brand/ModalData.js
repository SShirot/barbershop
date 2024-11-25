import React from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {FaSave, FaTimes} from "react-icons/fa";

const ModalData = ({
                           showCategoryModal,
                           setShowCategoryModal,
                           editingCategory,
                           handleAddEditCategory
                       }) => {
    return (
        <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingCategory ? 'Thêm mới' : 'Cập nhật'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: editingCategory?.name || '',
                        description: editingCategory?.description || '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Tên danh mục không được để trống'),
                        description: Yup.string().required('Mô tả không được để trống'),
                    })}
                    onSubmit={handleAddEditCategory}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên danh mục</Form.Label>
                                <Field name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mô tả</Form.Label>
                                <Field name="description" className="form-control" as="textarea" rows={3} />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </Form.Group>

                            <Button type="submit" className="d-flex justify-content-between align-items-center" size="sm" variant="primary">
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
