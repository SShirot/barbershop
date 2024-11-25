// ProductReviewModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const ProductReviewModal = ({ show, onHide, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        // Reset form khi modal được mở lại
        if (show) {
            setRating(0);
            setComment('');
        }
    }, [show]);

    const handleSubmit = () => {
        onSubmit({
            rating,
            comment
        });
        // Reset form sau khi gửi
        setRating(0);
        setComment('');
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Đánh giá sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Đánh giá chung</h5>
                <div className="d-flex justify-content-around my-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={30}
                            color={star <= rating ? "orange" : "gray"}
                            onClick={() => setRating(star)}
                            style={{ cursor: "pointer" }}
                        />
                    ))}
                </div>
                <Form.Group>
                    <Form.Label>Bình luận</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Nhập cảm nhận của bạn về sản phẩm"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary" onClick={handleSubmit}>Gửi đánh giá</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductReviewModal;
