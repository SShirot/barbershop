import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import apiUpload from "../../api/apiUpload";

const ImageUploadPage = () => {
    const [selectedImage, setSelectedImage] = useState(null); // Ảnh đã chọn
    const [previewImage, setPreviewImage] = useState(null); // Ảnh preview
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // URL ảnh sau khi upload
    const [isUploading, setIsUploading] = useState(false); // Trạng thái upload

    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file)); // Tạo preview
            setUploadedImageUrl(null); // Reset URL ảnh sau khi upload
        }
    };

    // Gửi ảnh đến API
    const handleUpload = async () => {
        if (!selectedImage) {
            alert("Vui lòng chọn ảnh trước khi xác nhận!");
            return;
        }

        setIsUploading(true);

        try {

            try {
                const response = await apiUpload.uploadImage(selectedImage);
                console.info("===========[] ===========[response] : ",response);
                setUploadedImageUrl(response.data)
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {

            }

        } catch (error) {
            console.error("Lỗi khi upload ảnh:", error);
            alert("Đã xảy ra lỗi khi upload.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if (uploadedImageUrl) {
            const a = document.createElement('a');
            a.href = uploadedImageUrl;
            a.download = 'downloaded_image.jpg'; // Tên file khi tải về
            a.click();
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4">Upload và Preview Ảnh</h2>
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Chọn ảnh để upload</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                {previewImage && (
                    <div className="mb-4">
                        <h5>Preview:</h5>
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }}
                        />
                    </div>
                )}
                <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={isUploading}
                >
                    {isUploading ? "Đang upload..." : "Xác nhận upload"}
                </Button>
                {uploadedImageUrl && (
                    <div className="mt-4">
                        <h5>Preview ảnh đã upload:</h5>
                        <img
                            src={uploadedImageUrl}
                            alt="Uploaded"
                            style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }}
                        />
                        <div className="mt-3">
                            <Button
                                variant="success"
                                onClick={handleDownload}
                            >
                                Tải ảnh xuống
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </Container>
    );
};

export default ImageUploadPage;
