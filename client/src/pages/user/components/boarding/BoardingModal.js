import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

const BoardingModal = ({ showBoardingModal, setShowBoardingModal, editingBoarding, handleAddEditBoarding, loading }) => {
    const [services, setServices] = useState(editingBoarding ? editingBoarding.services : []);
    const [days, setDays] = useState(editingBoarding ? editingBoarding.days : 1);

    const validationSchema = Yup.object().shape({
        petId: Yup.string().required('Pet is required'),
        days: Yup.number().min(1, 'Days must be at least 1').required('Days are required'),
        services: Yup.array().min(1, 'At least one service must be selected').required('Services are required'),
    });

    const calculateTotalPrice = (days, selectedServices, services) => {
        const selectedServicePrices = services
            ?.filter(service => selectedServices.includes(service._id))
            .reduce((total, service) => total + service.price, 0);

        return selectedServicePrices * days;
    };

    return (
        <Modal show={showBoardingModal} onHide={() => setShowBoardingModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingBoarding ? 'Edit Boarding' : 'Add Boarding'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        petId: editingBoarding ? editingBoarding.pet._id : '',
                        days: days,
                        services: services
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleAddEditBoarding({ ...values, totalPrice: calculateTotalPrice(services, days) });
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Pet</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="petId"
                                    value={values.petId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.petId && !!errors.petId}
                                >
                                    {/* Render pet options */}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">{errors.petId}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Days</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="days"
                                    value={values.days}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setDays(e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.days && !!errors.days}
                                />
                                <Form.Control.Feedback type="invalid">{errors.days}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Services</Form.Label>
                                {/* Render services options */}
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={loading}>
                                {editingBoarding ? 'Update' : 'Add'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default BoardingModal;
