import React, { useState, useEffect } from "react";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

const HairSwapApp = () => {
  const [idImage, setIdImage] = useState(null); // Ảnh mặt đã chọn
  const [refImage, setRefImage] = useState(null); // Ảnh tóc đã chọn
  const [idPreview, setIdPreview] = useState(null); // Preview ảnh mặt
  const [refPreview, setRefPreview] = useState(null); // Preview ảnh tóc
  const [resultImage, setResultImage] = useState(null); // Kết quả đổi tóc
  const [isProcessing, setIsProcessing] = useState(false); // Trạng thái xử lý

  // Giải phóng bộ nhớ URL khi component unmount
  useEffect(() => {
    return () => {
      if (idPreview) URL.revokeObjectURL(idPreview);
      if (refPreview) URL.revokeObjectURL(refPreview);
    };
  }, [idPreview, refPreview]);

  // Xử lý khi chọn ảnh mặt
  const handleIdImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdImage(file);
      setIdPreview(URL.createObjectURL(file));
    }
  };

  // Xử lý khi chọn ảnh tóc
  const handleRefImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRefImage(file);
      setRefPreview(URL.createObjectURL(file));
    }
  };

  // Gửi API đổi tóc
  const handleHairSwap = async () => {
    if (!idImage || !refImage) {
      alert("Vui lòng chọn cả ảnh mặt và ảnh tóc trước khi xác nhận!");
      return;
    }

    setIsProcessing(true);
    setResultImage(null);

    try {
      const formData = new FormData();
      formData.append("id_image", idImage);
      formData.append("ref_image", refImage);

      // Gửi request đến API xử lý đổi tóc
      const response = await axios.post(
        "http://localhost:8000/upload_images/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Đảm bảo nhận file ảnh dạng blob
        }
      );

      // Tạo URL từ blob để hiển thị ảnh kết quả
      const imageUrl = URL.createObjectURL(response.data);
      setResultImage(imageUrl);
    } catch (error) {
      console.error("Lỗi khi đổi tóc:", error);
      alert("Không thể kết nối đến server hoặc xử lý thất bại!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Hair Swap Application</h2>
      <Form>
        <Form.Group controlId="formIdImage" className="mb-3">
          <Form.Label>Input your face</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleIdImageChange}
          />
        </Form.Group>
        <Form.Group controlId="formRefImage" className="mb-3">
          <Form.Label>Input your expected hair</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleRefImageChange}
          />
        </Form.Group>
        {(idPreview || refPreview) && (
          <div className="mb-4">
            <h5>Preview:</h5>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {idPreview && (
                <img
                  src={idPreview}
                  alt="Face Preview"
                  style={{
                    maxWidth: "45%",
                    height: "auto",
                    border: "1px solid #ddd",
                  }}
                />
              )}
              {refPreview && (
                <img
                  src={refPreview}
                  alt="Hair Preview"
                  style={{
                    maxWidth: "45%",
                    height: "auto",
                    border: "1px solid #ddd",
                  }}
                />
              )}
            </div>
          </div>
        )}
        <Button
          variant="primary"
          onClick={handleHairSwap}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Processing...
            </>
          ) : (
            "Swap Hair"
          )}
        </Button>
      </Form>
      {resultImage && (
        <div className="mt-4">
          <h5>Result:</h5>
          <img
            src={resultImage}
            alt="Result"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #ddd",
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default HairSwapApp;
