import React, { useState } from 'react';
import { Modal, Button, Table, Nav } from 'react-bootstrap';
import ProductReviewModal from "./ProductReviewModal";
import apiVoteService from "../../../../api/apiVoteService";
import toastr from "toastr";
import { createSlug } from '../../../../helpers/formatters';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const OrderDetailsModal = ({ show, onHide, order }) => {
    console.info("===========[] ===========[order] : ", order);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const handleReviewClick = (product) => {
        setSelectedProduct(product);
        setShowReviewModal(true);
    };

    const submitReview = async (reviewData) => {
        try {
            let data = {
                product_id: selectedProduct.id,
                ...reviewData
            };
            console.info("===========[] ===========[data] : ", data);
            await apiVoteService.add(data);
            toastr.success("Đánh giá thành công", "Thông báo");

            // Đóng modal đánh giá và reset selectedProduct
            setShowReviewModal(false);
            setSelectedProduct(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi gửi đánh giá";
            toastr.error(errorMessage, "Thông báo");
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Customer: {order?.user?.name}</h5>
                    <h5>Phone: {order?.user?.phone}</h5>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th style={{ width: "40%" }}>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Tổng tiền</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order?.products?.map((item, idx) => (
                            <tr key={item.id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <Nav.Link as="a" target="_blank" rel="noopener noreferrer" href={`/p/${createSlug(item.name)}-${item.id}`}>{item.name}</Nav.Link>
                                </td>
                                <td>{item.qty}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td>{formatCurrency(item.price * item.qty)}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        onClick={() => handleReviewClick(item)}
                                    >
                                        Đánh giá
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            <ProductReviewModal
                show={showReviewModal}
                onHide={() => setShowReviewModal(false)}
                onSubmit={submitReview}
            />
        </>
    );
};

export default OrderDetailsModal;
