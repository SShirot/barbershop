import React from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';

const ServiceFormModal = ({
                              showServiceModal,
                              setShowServiceModal,
                              editingService,
                              handleAddEditService,
                              formatCurrencyInput
                          }) => {
    return (
        <Modal
            show={showServiceModal}
            onHide={() => setShowServiceModal(false)}
            dialogClassName="modal-fullscreen"
        >
            <Modal.Header closeButton>
                <Modal.Title>{editingService ? 'Cập nhật dịch vụ' : 'Thêm mới dịch vụ'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Formik
                            initialValues={{
                                name: editingService?.name || '',
                                price: editingService?.price || 0,
                                is_home_service: editingService?.is_home_service || false,
                                description: editingService?.description || '',
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Tên dịch vụ không được để trống'),
                                price: Yup.string()
                                    .required('Giá dịch vụ không được để trống')
                                    .test('isValidPrice', 'Giá không hợp lệ', value => {
                                        const cleanValue = value.replace(/\./g, ''); // Loại bỏ dấu chấm
                                        return !isNaN(parseFloat(cleanValue)) && isFinite(cleanValue); // Kiểm tra nếu là số hợp lệ
                                    }),
                                is_home_service: Yup.boolean(),
                                description: Yup.string()
                                    .required('Mô tả không được để trống')
                                    .test('isNotEmpty', 'Mô tả không được để trống', (value) => {
                                        return value && value.replace(/<(.|\n)*?>/g, '').trim()?.length > 0;
                                    }),
                            })}
                            onSubmit={handleAddEditService}
                        >
                            {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Field name="name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <Field
                                            name="price"
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/\./g, "");
                                                setFieldValue("price", rawValue ? parseFloat(rawValue) : 0); // Chuyển đổi thành số hoặc gán 0 nếu trống
                                            }}
                                            onBlur={(e) => {
                                                // Khi người dùng rời khỏi trường, format lại giá trị
                                                const rawValue = e.target.value.replace(/\./g, "");
                                                setFieldValue("price", formatCurrencyInput(rawValue)); // Sử dụng hàm format khi mất focus
                                            }}
                                        />
                                        <ErrorMessage name="price" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Service Location</Form.Label>
                                        <div className="form-check">
                                            <Field
                                                name="is_home_service"
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={values.is_home_service}
                                                onChange={(e) => setFieldValue('is_home_service', e.target.checked)}
                                            />
                                            <Form.Label className="form-check-label">Dịch vụ tại nhà</Form.Label>
                                        </div>
                                        <ErrorMessage name="is_home_service" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <ReactQuill
                                            value={values.description}
                                            onChange={(value) => setFieldValue('description', value)}
                                            theme="snow"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Button type="submit" variant="success" disabled={isSubmitting}>
                                        {editingService ? 'Cập nhật' : 'Thêm mới'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ServiceFormModal;
