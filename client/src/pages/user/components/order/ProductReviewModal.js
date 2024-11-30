import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import apiUpload from '../../../../api/apiUpload'; // Import API upload

const ProductReviewModal = ({ show, onHide, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]); // State lưu danh sách ảnh
    const [isUploading, setIsUploading] = useState(false); // Trạng thái upload

    useEffect(() => {
        // Reset form khi modal được mở lại
        if (show) {
            setRating(0);
            setComment('');
            setImages([]);
        }
    }, [show]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true); // Hiển thị trạng thái upload
        try {
            const response = await apiUpload.uploadImage(file); // Gọi API upload ảnh
            setImages((prev) => [...prev, response.data]); // Lưu URL ảnh sau khi upload
        } catch (error) {
            console.error('Lỗi upload ảnh:', error);
        } finally {
            setIsUploading(false); // Tắt trạng thái upload
        }
    };

    const handleImageRemove = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index)); // Xóa ảnh theo index
    };

    const handleSubmit = () => {
        onSubmit({
            rating,
            comment,
            images, // Đính kèm danh sách URL ảnh vào payload
        });
        // Reset form sau khi gửi
        setRating(0);
        setComment('');
        setImages([]);
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
                <Form.Group className="mt-3">
                    <Form.Label>Hình ảnh</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading} // Không cho chọn thêm ảnh khi đang upload
                    />
                </Form.Group>
                {isUploading && <p>Đang tải ảnh lên...</p>}
                <div className="d-flex flex-wrap mt-3">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="position-relative m-2"
                            style={{ width: "80px", height: "80px" }}
                        >
                            <Image
                                src={img}
                                thumbnail
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0"
                                onClick={() => handleImageRemove(index)}
                            >
                                &times;
                            </Button>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary" onClick={handleSubmit}>Gửi đánh giá</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductReviewModal;
