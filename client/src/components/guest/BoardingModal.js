import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Formik } from "formik";
import * as Yup from 'yup';
import petService from './../../api/petService';
import boardingApi from './../../api/boardingApi';
import toastr from "toastr";

const BoardingModal = ({ show, handleClose, API, setSuccessMessage }) => {
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [days, setDays] = useState(1); // State để lưu số ngày
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch pets
        fetchPetsWithParams({ page_size: 100 });

        // Fetch services
        axios.get(`${API}user/services`)
            .then(response => {
                setServices(response.data.data.services);
            })
            .catch(error => {
                console.error("There was an error fetching the services!", error);
            });
    }, [API]);

    // Tính toán tổng tiền khi số ngày hoặc dịch vụ thay đổi
    useEffect(() => {
        const newTotalPrice = calculateTotalPrice(days, selectedServices, services);
        setTotalPrice(newTotalPrice);
    }, [days, selectedServices, services]);

    const calculateTotalPrice = (days, selectedServices, services) => {
        const selectedServicePrices = services
            ?.filter(service => selectedServices.includes(service._id))
            .reduce((total, service) => total + service.price, 0);

        return selectedServicePrices * days;
    };

    const fetchPetsWithParams = async (params) => {
        try {
            const response = await petService.getPets(params);
            setPets(response.data.pets);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const handleBookingSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const data = {
                petId: values.petId,
                serviceIds: selectedServices,
                days: values.days,
                totalPrice: totalPrice // Gửi tổng tiền lên server
            };
            const response = await boardingApi.add(data);
            toastr.success('Ký gủi pet thành công!', 'Success');
            handleClose();
            resetForm();
        } catch (error) {
            toastr.error('Có lỗi xẩy ra, xin vui lòng thử lại', 'Error');
            console.error("There was an error creating the boarding!", error);
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        petId: Yup.string().required('Vui lòng chọn thú cưng'),
        days: Yup.number().required('Vui lòng nhập số ngày muốn ký gửi').min(1, 'Số ngày phải lớn hơn 0')
    });

    const handleServiceChange = (serviceId, checked) => {
        if (checked) {
            setSelectedServices([...selectedServices, serviceId]);
        } else {
            setSelectedServices(selectedServices?.filter(id => id !== serviceId));
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ký gửi thú cưng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        petId: '',
                        days: days // Khởi tạo giá trị của số ngày từ state
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
                          setFieldValue,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="petId" className={'mb-2'}>
                                <Form.Label>Chọn thú cưng</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="petId"
                                    value={values.petId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.petId && !!errors.petId}
                                >
                                    <option value="">Chọn thú cưng...</option>
                                    {pets.map(pet => (
                                        <option key={pet._id} value={pet._id}>{pet.name}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.petId}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className={'mb-2'}>
                                <Form.Label>Chọn dịch vụ</Form.Label>
                                {services.map(service => (
                                    <Form.Check
                                        key={service._id}
                                        type="checkbox"
                                        label={`${service.name} - ${service.price} VND`}
                                        onChange={(e) => {
                                            handleServiceChange(service._id, e.target.checked);
                                            setFieldValue('services', selectedServices);
                                        }}
                                    />
                                ))}
                            </Form.Group>

                            <Form.Group controlId="days" className={'mb-2'}>
                                <Form.Label>Số ngày muốn ký gửi</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="days"
                                    value={values.days}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setDays(e.target.value); // Cập nhật state `days`
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.days && !!errors.days}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.days}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Hiển thị tổng tiền */}
                            <div className="mt-3">
                                <strong>Tổng tiền: {totalPrice.toLocaleString()} VND</strong>
                            </div>

                            <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-3">
                                Ký gửi
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default BoardingModal;
