import React, {startTransition} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        window.history.back(); // Quay lại trang trước đó
    };
    const goHome = () => {
        startTransition(() => {
            navigate("/");
        });
    };

    return (
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1 className="display-4 text-danger">401</h1>
                    <h2 className="mb-4">Bạn không có quyền truy cập trang này</h2>
                    <p className="lead text-muted">
                        Vui lòng kiểm tra lại quyền truy cập hoặc liên hệ với quản trị viên nếu bạn cần quyền truy cập.
                    </p>
                    <Button variant="primary" onClick={goBack}>
                        <FaArrowLeft className="me-2" /> Quay lại
                    </Button>

                    <Button variant="danger" className="ms-2" onClick={goHome}>
                        <FaHome className="me-2" /> Về trang chủ
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UnauthorizedPage;
