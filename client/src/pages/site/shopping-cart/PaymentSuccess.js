import React, { useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiOrderService from "../../../api/apiOrderService";
import toastr from "toastr";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyPaymentOrder = async () => {
            const params = Object.fromEntries([...searchParams]);
            console.info("===========[] ===========[params] : ", params);
            if (Object.keys(params).length === 0) {
                navigate("/");
                return;
            }
            const status = params.vnp_ResponseCode;
            const dataOrder = {
                id: params.vnp_TxnRef,
                secure_hash: params.vnp_SecureHash,
                order_ref: params.vnp_TransactionNo,
                payment_status: status === "00" ? "completed" : "failed"
            };
            try {
                const response = await apiOrderService.updateStatusPayment(dataOrder);
                console.info("===========[] ===========[response] : ", response);

                // Loại bỏ query parameters khỏi URL
                const baseUrl = window.location.href.split('?')[0];
                window.history.replaceState(null, null, baseUrl);

                // Xử lý thành công, hiển thị giao diện
                setIsLoading(false);
            } catch (error) {
                console.info("===========[] ===========[] : ", error);
                toastr.error("Đã xảy ra lỗi khi xác thực thanh toán.");
                setIsLoading(false); // Dù lỗi vẫn hiển thị giao diện
            }
        };

        verifyPaymentOrder();
    }, []);

    if (isLoading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Đang xử lý thanh toán, vui lòng chờ...</p>
            </Container>
        );
    }

    return (
        <Container className="text-center py-5">
            <FaCheckCircle size={80} className="text-success mb-4" />
            <h1 className="mb-3">Thanh toán thành công!</h1>
            <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ để xác nhận đơn hàng sớm nhất.</p>
            <Button
                variant="primary"
                onClick={() => navigate('/')}
                className="mt-3"
            >
                Quay lại trang chủ
            </Button>
        </Container>
    );
};

export default PaymentSuccess;
