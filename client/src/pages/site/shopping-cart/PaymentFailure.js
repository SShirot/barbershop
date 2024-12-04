import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center py-5">
            <FaTimesCircle size={80} className="text-danger mb-4" />
            <h1 className="mb-3">Thanh toán thất bại!</h1>
            <p>Rất tiếc, đã xảy ra sự cố khi xử lý thanh toán của bạn. Vui lòng thử lại.</p>
            <Button
                variant="danger"
                onClick={() => navigate('/checkout')}
                className="mt-3"
            >
                Thử lại thanh toán
            </Button>
        </Container>
    );
};

export default PaymentFailure;
