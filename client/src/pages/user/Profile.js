import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Breadcrumb, Button, Card, Col, Container, Form, Nav, Row, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaCamera} from 'react-icons/fa';
import {Formik} from 'formik';
import * as Yup from 'yup';
import './style/Profile.css';
import {updateUserProfile, uploadAvatar} from "../../redux/slices/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import toastr from 'toastr';

const Profile = () => {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state) => state.auth);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
            const response = await dispatch(uploadAvatar(file));
            if (uploadAvatar.fulfilled.match(response)) {
                const url = unwrapResult(response);
                setAvatarPreview(url);
            }
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        // newPassword: Yup.string().min(6, 'Password must be at least 6 characters long').nullable(),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // Kiểm tra có ít nhất 1 chữ thường
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // Kiểm tra có ít nhất 1 chữ in hoa
            .matches(/\d/, 'Password must contain at least one number').nullable(),        // Kiểm tra có ít nhất 1 số
            // .required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').nullable(),
    });

    useEffect(() => {
        if (user) setAvatarPreview(user.avatar);
    }, []);

    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/user/dashboard">Dashboard</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                    <Card className="h-100">
                        <Card.Body>
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar position-relative">
                                        <img src={avatarPreview || "https://via.placeholder.com/150"} alt="Avatar"
                                             className="avatar-img avatar-profile-img"/>
                                        <input type="file" id="avatarUpload" style={{display: 'none'}}
                                               onChange={handleAvatarChange}/>
                                        <label htmlFor="avatarUpload" className="avatar-upload-label">
                                            <FaCamera className="camera-icon"/>
                                        </label>
                                    </div>
                                    <h5 className="user-name">{user?.name || 'User Name'}</h5>
                                    <h6 className="user-email">{user?.email || 'user@example.com'}</h6>
                                </div>
                                {/*<div className="about">*/}
                                {/*    <h5>About</h5>*/}
                                {/*    <p>*/}
                                {/*        I'm {user?.name}. Full Stack Designer I enjoy creating user-centric, delightful*/}
                                {/*        and human experiences.*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={9} lg={9} md={12} sm={12} xs={12}>
                    <Card className="h-100">
                        <Card.Body>
                            <Formik
                                initialValues={{
                                    name: user?.name || '',
                                    email: user?.email || '',
                                    avatar: avatarPreview,
                                    dateOfBirth: user?.dateOfBirth || '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (values, {setSubmitting}) => {
                                    try {
                                        // Gọi hành động updateUserProfile và đợi phản hồi
                                        const result = await dispatch(updateUserProfile({
                                            ...values,
                                            avatar: avatarPreview
                                        })).unwrap();
                                        toastr.success('Cập nhật thành công', 'Success');
                                        // setErrorMessage(null);
                                    } catch (error) {
                                        toastr.error('Cập nhật thất bại', 'Error');
                                        // setSuccessMessage(null); // Reset thông báo thành công nếu có
                                    }

                                    setSubmitting(false);

                                    // dispatch(updateUserProfile({...values, avatar: avatarPreview}));
                                    // setSubmitting(false);
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
                                                <h6 className="mb-2 text-primary">Personal Details</h6>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                <Form.Group controlId="fullName">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        placeholder="Enter full name"
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.name && !!errors.name}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.name}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                <Form.Group controlId="eMail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter email ID"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.email && !!errors.email}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                <Form.Group controlId="dateOfBirth">
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={values.dateOfBirth}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <h6 className="mt-3 mb-2 text-primary">Change Password</h6>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                <Form.Group controlId="newPassword">
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="newPassword"
                                                        placeholder="Enter new password"
                                                        value={values.newPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.newPassword && !!errors.newPassword}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.newPassword}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                                <Form.Group controlId="confirmPassword">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Confirm new password"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.confirmPassword}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="gutters">
                                            <Col xl={12} lg={12} md={12} sm={12} xs={12} className={'mt-4'}>
                                                <div className="text-right">
                                                    <Button variant="primary" type="submit"
                                                            disabled={isSubmitting || loading}>
                                                        Update
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
        </Container>
    );
};

export default Profile;
