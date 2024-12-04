import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FaCamera } from 'react-icons/fa';
import { uploadAvatar } from "../../../../redux/slices/authSlice";

const PromotionFormModal = ({
                                showPromotionModal,
                                setShowPromotionModal,
                                editingPromotion,
                                handleAddEditPromotion,
                                loading,
                                error
                            }) => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(editingPromotion?.programImage || '');
    const [uploading, setUploading] = useState(false); // State cho việc upload

    // Schema validation với Yup
    const validationSchema = Yup.object().shape({
        code: Yup.string().required('Code is required'),
        programName: Yup.string().required('Program Name is required'),
        discountValue: Yup.number().required('Discount Value is required').positive('Must be positive'),
        discountType: Yup.string().required('Discount Type is required'),
        isUnlimited: Yup.boolean(),
        startDate: Yup.date().nullable().when('isUnlimited', {
            is: false,
            then: (schema) => schema.required('Start date is required'),
        }),
        endDate: Yup.date().nullable().when('isUnlimited', {
            is: false,
            then: (schema) => schema.required('End date is required'),
        }),
        usageLimit: Yup.number().nullable().positive('Must be positive'),
        isActive: Yup.boolean().required('Required'),
        programImage: Yup.string().required('Program Image is required'),
    });

    // Định dạng ngày
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Format yyyy-MM-dd
    };

    // Xử lý sự kiện thay đổi ảnh
    const handleImageChange = async (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true); // Bắt đầu tải lên ảnh
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            const response = await dispatch(uploadAvatar(file));
            if (uploadAvatar.fulfilled.match(response)) {
                const url = response.payload;
                setImagePreview(url);
                setFieldValue('programImage', url); // Cập nhật giá trị ảnh trong Formik
            }
            setUploading(false); // Kết thúc tải lên
        }
    };

    return (
        <Modal show={showPromotionModal} onHide={() => setShowPromotionModal(false)} dialogClassName="modal-fullscreen">
            <Modal.Header closeButton>
                <Modal.Title>{editingPromotion ? 'Edit Promotion' : 'Add New Promotion'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Row className="gutters mt-3">
                    <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                        <Card className="h-100">
                            <Card.Body>
                                <div className="user-profile">
                                    <div className="user-avatar position-relative">
                                        {uploading ? (
                                            <Spinner animation="border" variant="primary" />
                                        ) : (
                                            <img src={imagePreview || "https://via.placeholder.com/150"} alt="Promotion" className="promotion-img" style={{ width: '150px', height: '150px', borderRadius:'10px'}} />
                                        )}
                                        <Formik
                                            initialValues={{
                                                programImage: imagePreview || '',
                                            }}
                                            validationSchema={validationSchema}
                                            onSubmit={() => {}} // No need to handle submit for image here
                                        >
                                            {({ setFieldValue }) => (
                                                <>
                                                    <input type="file" id="imageUpload" style={{ display: 'none' }}
                                                           onChange={(e) => handleImageChange(e, setFieldValue)} />
                                                    <label htmlFor="imageUpload" className="avatar-upload-label">
                                                        <FaCamera className="camera-icon" />
                                                    </label>
                                                </>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={9} lg={9} md={12} sm={12} xs={12}>
                        <Card className="h-100">
                            <Card.Body>
                                <Formik
                                    initialValues={{
                                        code: editingPromotion?.code || '',
                                        programName: editingPromotion?.programName || '',
                                        discountValue: editingPromotion?.discountValue || 0,
                                        discountType: editingPromotion?.discountType || 'percent',
                                        isUnlimited: editingPromotion?.isUnlimited || false,
                                        startDate: formatDateForInput(editingPromotion?.startDate) || '',
                                        endDate: formatDateForInput(editingPromotion?.endDate) || '',
                                        usageLimit: editingPromotion?.usageLimit || '',
                                        isActive: editingPromotion?.isActive || true,
                                        programImage: imagePreview || '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        console.log("Submitting values: ", values); // Kiểm tra giá trị trước khi submit
                                        handleAddEditPromotion(values); // Gọi hàm xử lý submit
                                        setSubmitting(false); // Đặt trạng thái submitting về false
                                    }}
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
                                            <Row className="gutters">
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <h6 className="mb-2 text-primary">Promotion Details</h6>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <Form.Group controlId="code">
                                                        <Form.Label>Promotion Code</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="code"
                                                            placeholder="Enter promotion code"
                                                            value={values.code}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.code && !!errors.code}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.code}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <Form.Group controlId="programName">
                                                        <Form.Label>Program Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="programName"
                                                            placeholder="Enter program name"
                                                            value={values.programName}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.programName && !!errors.programName}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.programName}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <Form.Group controlId="discountValue">
                                                        <Form.Label>Discount Value</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="discountValue"
                                                            placeholder="Enter discount value"
                                                            value={values.discountValue}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.discountValue && !!errors.discountValue}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.discountValue}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <Form.Group controlId="discountType">
                                                        <Form.Label>Discount Type</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            name="discountType"
                                                            value={values.discountType}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.discountType && !!errors.discountType}
                                                        >
                                                            <option value="percent">Percentage</option>
                                                            <option value="amount">Amount</option>
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.discountType}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <h6 className="mt-3 mb-2 text-primary">Additional Information</h6>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <Form.Group controlId="startDate">
                                                        <Form.Label>Start Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="startDate"
                                                            value={values.startDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.startDate && !!errors.startDate}
                                                            disabled={values.isUnlimited}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.startDate}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <Form.Group controlId="endDate">
                                                        <Form.Label>End Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="endDate"
                                                            value={values.endDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.endDate && !!errors.endDate}
                                                            disabled={values.isUnlimited}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.endDate}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <Form.Group controlId="usageLimit">
                                                        <Form.Label>Usage Limit</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="usageLimit"
                                                            placeholder="Unlimited if empty"
                                                            value={values.usageLimit}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.usageLimit && !!errors.usageLimit}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.usageLimit}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12} className={'mt-2'}>
                                                    <Form.Group controlId="isActive">
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Active"
                                                            name="isActive"
                                                            checked={values.isActive}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="gutters">
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12} className={'mt-4'}>
                                                    <div className="text-right">
                                                        <Button variant="primary" type="submit" disabled={isSubmitting || loading}>
                                                            {editingPromotion ? 'Update Promotion' : 'Add Promotion'}
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default PromotionFormModal;
