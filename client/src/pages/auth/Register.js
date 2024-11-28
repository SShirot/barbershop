import React, {startTransition, useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../guest/style/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import {registerUser} from "../../redux/slices/authSlice";
import bgImage from "../../assets/images/bg-login.jpg";
import toastr from 'toastr';
import slideService from "../../api/slideService";

const Register = () => {
    const initialValues = {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: 'customer'
    };
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [slides, setSlides] = useState([]);
    const backgroundImageUrl = slides.length > 0 ? slides[0].avatar : '';

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Email không được để trống'),
        name: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Tên không được chứa số')  // Regex để kiểm tra không chứa số
            .required('Tên không được để trống'),
        password: Yup.string()
            .min(6, 'Mật khẩu ít nhất 6 ký tự')
            .matches(/[a-z]/, 'Mật khẩu có ít nhất 1 chữ thường')  // Kiểm tra có ít nhất 1 chữ thường
            .matches(/[A-Z]/, 'Mật khẩu có ít nhất 1 chữ in hoa')  // Kiểm tra có ít nhất 1 chữ in hoa
            .matches(/\d/, 'Mật khẩu có ít nhất 1 chữ số')              // Kiểm tra có ít nhất 1 số
            .required('Mật khẩu không được để trống'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
            .required('Mật khẩu xác nhận không được để trống')
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        const result = await dispatch(registerUser(values));
        if (registerUser.fulfilled.match(result)) {
            toastr.success('Đăng ký thành công, xin vui lòng kiểm tra email để kích hoạt tài khoản', 'Success');
            navigate('/login');
        } else {
            setErrors({ submit: "Đăng ký thất bại, vui lòng thử lại." });
            toastr.error('Đăng ký thất bại, thông tin đăng ký không hợp lệ', 'Error');
        }
        setSubmitting(false);
    };

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

    return (
        <Row className="no-gutter">
            <Col
                className="col-md-6 d-none d-md-flex bg-image"
                style={{ backgroundImage: `url(${backgroundImageUrl || bgImage})` }}
            ></Col>
            <Row className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                    <Container className="container">
                        <Row className="row">
                            <Col className="col-lg-12 col-xl-8 mx-auto">
                                <h4 className="display-6">Đăng ký tài khoản</h4>
                                <p className="text-muted mb-4">Xin vui lòng điền đẩy đủ thông tin</p>
                                {error && error?.message && <Alert variant="danger">{error.message}</Alert>}
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor="email">Name</label>
                                                <Field name="name" type="text" className="form-control"/>
                                                <ErrorMessage name="name" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email">Email</label>
                                                <Field name="email" type="email" className="form-control"/>
                                                <ErrorMessage name="email" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password">Password</label>
                                                <Field name="password" type="password" className="form-control"/>
                                                <ErrorMessage name="password" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <Field name="confirmPassword" type="password" className="form-control"/>
                                                <ErrorMessage name="confirmPassword" component="div"
                                                              className="text-danger"/>
                                            </div>
                                            <Button type="submit" className="w-100" disabled={isSubmitting}>
                                                Login
                                            </Button>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Bạn đã có tài khoản? Đăng nhập <Link
                                                    to={'/login'}
                                                    className="font-italic text-muted"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        startTransition(() => {
                                                            navigate("/login");
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
                                            <div className="text-center d-flex justify-content-between mt-4"><p>Code
                                                by <Link to={'/'}
                                                         className="font-italic text-muted"><u>Phuphan</u></Link></p>
                                                <Link to={'/'}  onClick={(e) => {
                                                    e.preventDefault();
                                                    startTransition(() => {
                                                        navigate("/");
                                                    });
                                                }}
                                                      className="font-italic text-danger">Trang chủ</Link>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Row>
        </Row>
    )
};

export default Register;
