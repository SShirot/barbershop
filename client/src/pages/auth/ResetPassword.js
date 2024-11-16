import React, { startTransition, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../guest/style/Login.css';
import { loginUser, logout } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import bgImage from '../../assets/images/bg-login.jpg';
import toastr from 'toastr';
import slideService from "../../api/slideService";
import userService from "../../api/userService";

const ResetPassword = () => {
    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [slides, setSlides] = useState([]);
    const { token } = useParams();
    const backgroundImageUrl = slides.length > 0 ? slides[0].avatar : '';

    useEffect(() => {
        dispatch(logout()); // Đảm bảo người dùng đã đăng xuất
    }, [dispatch]);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await slideService.getListsGuest({ page_site: "auth" });
                setSlides(response.data.data);
            } catch (error) {
                console.error("Error fetching slides:", error);
            }
        };
        fetchSlides();
    }, []);

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .required('Mật khẩu không được để trống'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
            .required('Xác nhận mật khẩu không được để trống')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const newData = {
                ...values,
                token: token,
            }
            console.info("===========[] ===========[newData] : ",newData);
            const response = await userService.resetPassword(newData);
            toastr.success('Đổi mật khẩu thành công, xin vui lòng đăng nhập', 'Thông báo');
            navigate('/login')
            setSubmitting(false);
        } catch (err) {
            toastr.error('Sai thông tin hoặc tài khoản không hợp lệ.', 'Error');
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
                                <h4 className="display-6">Đặt lại mật khẩu</h4>
                                <p className="text-muted mb-4">Xin vui lòng điền đầy đủ thông tin</p>
                                {error && error.trim() && <Alert variant="danger">{error}</Alert>}
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor="password">Password</label>
                                                <Field name="password" type="password" className="form-control"/>
                                                <ErrorMessage name="password" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <Field name="confirmPassword" type="password" className="form-control"/>
                                                <ErrorMessage name="confirmPassword" component="div" className="text-danger"/>
                                            </div>
                                            <Button type="submit" className="w-100" disabled={isSubmitting || loading}>
                                                {loading ? 'Loading...' : 'Xác nhận'}
                                            </Button>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Bạn chưa có tài khoản? Đăng ký <Link to={'/register'} className="font-italic text-muted"
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            startTransition(() => {
                                                                                                navigate("/register");
                                                                                            });
                                                                                        }}>
                                                    <u>tại đây</u>
                                                </Link>
                                                </p>
                                                <Link to={'/'} className="font-italic text-danger"
                                                      onClick={(e) => {
                                                          e.preventDefault();
                                                          startTransition(() => {
                                                              navigate("/");
                                                          });
                                                      }}>Trang chủ</Link>
                                            </div>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Code by <Link to={'/'} className="font-italic text-muted"><u>Phuphan</u></Link></p>
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

export default ResetPassword;
