import React from 'react';
import { Modal, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PetModal = ({
                      showPetModal,
                      setShowPetModal,
                      editingPet,
                      petImage,
                      defaultImage,
                      handleImageChange,
                      description,
                      setDescription,
                      handleAddEditPet,
                      formatCurrencyInput,
                      loading
                  }) => {
    return (
        <Modal show={showPetModal} onHide={() => setShowPetModal(false)} dialogClassName="modal-fullscreen">
            <Modal.Header closeButton>
                <Modal.Title>{editingPet ? 'Edit Pet' : 'Add New Pet'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Row>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Form.Label>Pet Image</Form.Label>
                                    <div className="pet-image-preview mb-3">
                                        {loading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            <img
                                                src={petImage || defaultImage}
                                                alt="Pet"
                                                className="img-fluid"
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        )}
                                    </div>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </div>
                            </Col>
                            <Col md={8}>
                                <Formik
                                    initialValues={{
                                        name: editingPet?.name || '',
                                        age: editingPet?.age || '',
                                        type: editingPet?.type || '',
                                        gender: editingPet?.gender || 'male',
                                        price: editingPet?.price || 0,
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().required('Required'),
                                        age: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
                                        type: Yup.string().required('Required'),
                                        gender: Yup.string().required('Required'),
                                        price: Yup.number().required('Required').positive('Must be positive'),
                                    })}
                                    onSubmit={handleAddEditPet}
                                >
                                    {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Field name="name" className="form-control" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Age</Form.Label>
                                                        <Field name="age" type="number" className="form-control" />
                                                        <ErrorMessage name="age" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Type</Form.Label>
                                                        <Field name="type" className="form-control" />
                                                        <ErrorMessage name="type" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Gender</Form.Label>
                                                        <Field as="select" name="gender" className="form-control">
                                                            <option value="male">Đực</option>
                                                            <option value="female">Cái</option>
                                                        </Field>
                                                        <ErrorMessage name="gender" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Price</Form.Label>
                                                        <Field
                                                            name="price"
                                                            type="text"
                                                            className="form-control"
                                                            value={formatCurrencyInput(values.price.toString())}
                                                            onChange={(e) => {
                                                                const rawValue = e.target.value.replace(/\./g, "");
                                                                setFieldValue("price", rawValue);
                                                            }}
                                                        />
                                                        <ErrorMessage name="price" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <ReactQuill
                                                    value={description}
                                                    onChange={setDescription}
                                                    theme="snow"
                                                />
                                            </Form.Group>

                                            <Button type="submit" variant="success" disabled={isSubmitting}>
                                                {editingPet ? 'Update Pet' : 'Add Pet'}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default PetModal;
