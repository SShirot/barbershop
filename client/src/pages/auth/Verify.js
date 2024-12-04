import React, {startTransition, useEffect, useState} from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../site/style/Login.css';
import bgImage from '../../assets/images/bg-login.jpg';
import toastr from 'toastr';
import slideService from "../../api/slideService";
import userService from "../../api/userService";

const Verify = () => {

    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [slides, setSlides] = useState([]);
    const backgroundImageUrl = slides.length > 0 ? slides[0].avatar : '';
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await userService.verifyAccount(token);
                console.info("===========[] ===========[response] : ",response);
                toastr.success("Xác thực thành công, xin vui lòng đăng nhập");
                navigate('/login');
            } catch (error) {
                console.info("===========[] ===========[] : ",error);
                setMessage('Verification failed');
                if (error.response && error.response.data) {
                    const { message } = error.response.data;
                    setMessage(message || "Verification failed");
                } else {
                    setMessage("An unexpected error occurred. Please try again later.");
                }
            }
        };

        verifyAccount();
    }, [token]);

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
                                <h4 className="display-6">Kích hoạt tài khoản</h4>
                                {message && <Alert variant="danger">{message}</Alert>}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Row>
        </Row>
    );
};

export default Verify;
