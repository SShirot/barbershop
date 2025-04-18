import React, { useState, useEffect } from "react";
import { Container, Button, Form, Spinner, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import sampleImageService from "../../api/sampleImageService";

const HairSwapApp = () => {
  const [idImage, setIdImage] = useState(null); // Ảnh mặt đã chọn
  const [refImage, setRefImage] = useState(null); // Ảnh tóc đã chọn
  const [idPreview, setIdPreview] = useState(null); // Preview ảnh mặt
  const [refPreview, setRefPreview] = useState(null); // Preview ảnh tóc
  const [resultImage, setResultImage] = useState(null); // Kết quả đổi tóc
  const [isProcessing, setIsProcessing] = useState(false); // Trạng thái xử lý
  const [gender, setGender] = useState(null); // Giới tính đã chọn
  const [hairStyles, setHairStyles] = useState([]); // Danh sách mẫu tóc
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Giải phóng bộ nhớ URL khi component unmount
  useEffect(() => {
    return () => {
      if (idPreview) URL.revokeObjectURL(idPreview);
      if (refPreview) URL.revokeObjectURL(refPreview);
    };
  }, [idPreview, refPreview]);

  // Lấy danh sách mẫu tóc khi giới tính thay đổi
  useEffect(() => {
    const fetchHairStyles = async () => {
      if (!gender) return;
      
      setLoading(true);
      try {
        const response = await sampleImageService.getHairStyles(gender);
        const styles = Array.isArray(response.data?.data) ? response.data.data : [];
        setHairStyles(styles);
      } catch (error) {
        console.error("Error fetching hair styles:", error);
        alert("Không thể tải danh sách mẫu tóc. Vui lòng thử lại sau!");
        setHairStyles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHairStyles();
  }, [gender]);

  // Xử lý khi chọn ảnh mặt
  const handleIdImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdImage(file);
      setIdPreview(URL.createObjectURL(file));
    }
  };

  // Xử lý khi chọn ảnh tóc từ gallery
  const handleSelectHairStyle = (hairStyle) => {
    setRefImage(hairStyle.avatar);
    setRefPreview(hairStyle.avatar);
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
      
      // Nếu refImage là URL (từ gallery), chúng ta cần fetch nó trước
      if (typeof refImage === 'string') {
        const response = await fetch(refImage);
        const blob = await response.blob();
        formData.append("ref_image", blob, "hair_style.jpg");
      } else {
        formData.append("ref_image", refImage);
      }
      
      formData.append("id_image", idImage);

      // Gửi request đến API xử lý đổi tóc
      const response = await axios.post(
        "http://localhost:8000/upload_images/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
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
      
      {/* Chọn giới tính */}
      <div className="mb-4">
        <h5>Chọn giới tính của bạn:</h5>
        <div className="d-flex gap-3">
          <Button 
            variant={gender === 'male' ? 'primary' : 'outline-primary'} 
            onClick={() => setGender('male')}
          >
            Nam
          </Button>
          <Button 
            variant={gender === 'female' ? 'primary' : 'outline-primary'} 
            onClick={() => setGender('female')}
          >
            Nữ
          </Button>
        </div>
      </div>

      <Form>
        <Form.Group controlId="formIdImage" className="mb-3">
          <Form.Label>Upload ảnh mặt của bạn</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleIdImageChange}
          />
        </Form.Group>

        {/* Hiển thị thư viện ảnh tóc */}
        {gender && (
          <div className="mb-3">
            <h5>Chọn kiểu tóc {gender === 'male' ? 'nam' : 'nữ'}:</h5>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : hairStyles.length === 0 ? (
              <div className="alert alert-info">
                Không có mẫu tóc nào cho giới tính {gender === 'male' ? 'nam' : 'nữ'}
              </div>
            ) : (
              <Row>
                {hairStyles.map((style) => (
                  <Col xs={6} sm={4} md={3} lg={2} key={style.id} className="mb-3">
                    <Card 
                      className="h-100 cursor-pointer" 
                      onClick={() => handleSelectHairStyle(style)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Card.Img 
                        variant="top" 
                        src={style.avatar} 
                        style={{ height: '150px', objectFit: 'cover' }}
                        onError={(e) => {
                          console.log("Image load error for:", style.avatar);
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5%22%20y%3D%2296.3%22%3ENo Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                        }}
                      />
                      <Card.Body className="p-2">
                        <Card.Title className="small text-center">{style.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}

        {(idPreview || refPreview) && (
          <div className="mb-4">
            <h5>Preview:</h5>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {idPreview && (
                <div>
                  <p>Ảnh mặt của bạn:</p>
                  <img
                    src={idPreview}
                    alt="Face Preview"
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
              {refPreview && (
                <div>
                  <p>Kiểu tóc đã chọn:</p>
                  <img
                    src={refPreview}
                    alt="Hair Preview"
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleHairSwap}
          disabled={isProcessing || !idImage || !refImage}
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
              Đang xử lý...
            </>
          ) : (
            "Thử kiểu tóc mới"
          )}
        </Button>
      </Form>

      {resultImage && (
        <div className="mt-4">
          <h5>Kết quả:</h5>
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
