import React from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CategoryModal = ({
                           showCategoryModal,
                           setShowCategoryModal,
                           editingCategory,
                           handleAddEditCategory
                       }) => {
    return (
        <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: editingCategory?.name || '',
                        description: editingCategory?.description || '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Required'),
                        description: Yup.string().required('Required'),
                    })}
                    onSubmit={handleAddEditCategory}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Field name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Field name="description" className="form-control" as="textarea" rows={3} />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </Form.Group>

                            <Button type="submit" variant="success">
                                {editingCategory ? 'Update Category' : 'Add Category'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default CategoryModal;
