import React, {startTransition, useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../guest/style/Login.css';
import {loginUser, logout} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import bgImage from '../../assets/images/bg-login.jpg';
import toastr from 'toastr';
import slideService from "../../api/slideService";

const Login = () => {
    const initialValues = {
        email: '',
        password: ''
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth); // Add isAuthenticated
    const [slides, setSlides] = useState([]);

    // Lấy URL của hình ảnh từ slides (sử dụng hình ảnh đầu tiên trong danh sách)
    const backgroundImageUrl = slides.length > 0 ? slides[0].avatar : '';


    useEffect(() => {
        dispatch(logout());
    }, []);

    useEffect(() => {

    }, [isAuthenticated, navigate]);

    useEffect(() => {
        // Hàm gọi API để lấy danh sách slide
        const fetchSlides = async () => {
            try {
                const response = await slideService.getListsGuest({
                    page_site: "auth"
                });
                setSlides(response.data.data);
            } catch (error) {
                console.error("Error fetching slides:", error);
            }
        };

        fetchSlides();
    }, []);


    const validationSchema = Yup.object({
        email: Yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
        password: Yup.string().min(6, 'Mật khẩu phải >= 6 ký tự').required('Mật khẩu không được để trống')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const result = await dispatch(loginUser(values));
            console.info("===========[userLogin] ===========[response] : ",result);
            if (loginUser?.fulfilled.match(result)) {
                let response = await unwrapResult(result);
                console.info("===========[userLogin] ===========[response math] : ",response);
                if(response.user.user_type === 'ADMIN') {
                    navigate('/admin');
                }else {
                    navigate('/');
                }
                return true;
            }else {
                console.info("===========[] ===========[FAIL ROI] : ");
                // toastr.error('Sai thông tin hoạc tài khoản không hợp lệ', 'Error');
                setSubmitting(false);
                return true;
            }
        } catch (err) {
            console.info("===========[err] ===========[FAIL ROI] : ");
            toastr.error('Sai thông tin hoạc tài khoản không hợp lệ', 'Error');
            setSubmitting(false);
        }
    };

    return (
        <Row className="no-gutter">
            <Col
                className="col-md-6 d-none d-md-flex bg-image"
                style={{ backgroundImage: `url(${backgroundImageUrl || bgImage})` }}
            ></Col>
            <Col className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                    <Container>
                        <Row>
                            <Col lg={12} xl={8} className="mx-auto">
                                <h4 className="display-6">Đăng nhập hệ thống</h4>
                                <p className="text-muted mb-4">Xin vui lòng điền đẩy đủ thông tin</p>
                                {error && error.trim() && <Alert variant="danger">{error}</Alert>}
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor="email">Email</label>
                                                <Field name="email" type="email" className="form-control" />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password">Password</label>
                                                <Field name="password" type="password" className="form-control" />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                            <Button type="submit" className="w-100" disabled={isSubmitting || loading}>
                                                {loading ? 'Logging in...' : 'Login'}
                                            </Button>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Bạn chưa có tài khoản? Đăng ký <Link
                                                    to={'/register'} className="font-italic text-muted"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        startTransition(() => {
                                                            navigate("/register");
                                                        });
                                                    }}
                                                >
                                                    <u>tại đây</u></Link>
                                                </p>
                                                <p>Bạn quên mật khẩu <Link
                                                    to={'/login'}
                                                    className="font-italic text-muted"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        startTransition(() => {
                                                            navigate("/forgot-password");
                                                        });
                                                    }}
                                                >
                                                    <u>tại đây</u></Link>
                                                </p>
                                            </div>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Code by <Link to={'/'}
                                                                 className="font-italic text-muted"><u>Phuphan</u></Link>
                                                </p>
                                                <Link to={'/'} className="font-italic text-danger"
                                                      onClick={(e) => {
                                                          e.preventDefault();
                                                          startTransition(() => {
                                                              navigate("/");
                                                          });
                                                      }}
                                                >Trang chủ</Link>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
