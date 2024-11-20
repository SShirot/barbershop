import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import appointmentService from "../../api/appointmentService";
import toastr from 'toastr';

const BookingModal = ({ show, handleClose, API, setSuccessMessage }) => {
    const [services, setServices] = useState([]);
    const [isHomeVisit, setIsHomeVisit] = useState(false);

    useEffect(() => {
        axios.get(`${API}user/services`)
            .then(response => {
                setServices(response.data.data.services);
            })
            .catch(error => {
                console.error("There was an error fetching the services!", error);
            });
    }, [API]);

    const handleBookingSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await appointmentService.add(values);
            handleClose();
            resetForm();
            toastr.success('Đặt lịch thành công!', 'Success');
        } catch (error) {
            console.error("There was an error booking the appointment!", error);
            toastr.error('Có lỗi xẩy ra, xin vui lòng thử lại', 'Error');
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        service: Yup.string().required('Vui lòng chọn dịch vụ'),
        date: Yup.date().required('Vui lòng chọn ngày khám'),
        address: Yup.string().when('isHomeVisit', {
            is: true,
            then: (schema) => schema.required('Vui lòng nhập địa chỉ nếu chọn khám tại nhà'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đặt lịch khám</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        service: '',
                        date: '',
                        isHomeVisit: false,
                        address: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleBookingSubmit}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="service" className={'mb-2'}>
                                <Form.Label>Chọn dịch vụ</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="service"
                                    value={values.service}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.service && !!errors.service}
                                >
                                    <option value="">Chọn dịch vụ...</option>
                                    {services.map(service => (
                                        <option key={service._id} value={service._id}>{service.name}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.service}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="date" className={'mb-2'}>
                                <Form.Label>Chọn ngày khám</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.date && !!errors.date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.date}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="isHomeVisit" className={'mb-2'}>
                                <Form.Check
                                    type="checkbox"
                                    name="isHomeVisit"
                                    label="Khám tại nhà"
                                    checked={values.isHomeVisit}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setIsHomeVisit(e.target.checked);
                                    }}
                                />
                            </Form.Group>

                            {values.isHomeVisit && (
                                <Form.Group controlId="address" className={'mb-2'}>
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        placeholder="Nhập địa chỉ"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.address && !!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}

                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Đặt lịch
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default BookingModal;
