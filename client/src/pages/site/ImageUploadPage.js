import React, { useState, useEffect } from "react";
import { Container, Button, Form, Spinner, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import axios from "axios";

const HairSwapApp = () => {
  const [idImage, setIdImage] = useState(null); // Ảnh mặt đã chọn
  const [refImage, setRefImage] = useState(null); // Ảnh tóc đã chọn
  const [idPreview, setIdPreview] = useState(null); // Preview ảnh mặt
  const [refPreview, setRefPreview] = useState(null); // Preview ảnh tóc
  const [resultImage, setResultImage] = useState(null); // Kết quả đổi tóc
  const [isProcessing, setIsProcessing] = useState(false); // Trạng thái xử lý
  const [gender, setGender] = useState(null); // Giới tính đã chọn
  const [activeTab, setActiveTab] = useState("upload"); // Tab đang active

  // Dữ liệu mẫu tóc (sẽ được thay thế bằng dữ liệu từ API sau)
  const [maleHairStyles, setMaleHairStyles] = useState([
    { id: 1, name: "Kiểu tóc nam 1", image: "https://via.placeholder.com/150?text=Male+Hair+1" },
    { id: 2, name: "Kiểu tóc nam 2", image: "https://via.placeholder.com/150?text=Male+Hair+2" },
    { id: 3, name: "Kiểu tóc nam 3", image: "https://via.placeholder.com/150?text=Male+Hair+3" },
    { id: 4, name: "Kiểu tóc nam 4", image: "https://via.placeholder.com/150?text=Male+Hair+4" },
    { id: 5, name: "Kiểu tóc nam 5", image: "https://via.placeholder.com/150?text=Male+Hair+5" },
    { id: 6, name: "Kiểu tóc nam 6", image: "https://via.placeholder.com/150?text=Male+Hair+6" },
  ]);

  const [femaleHairStyles, setFemaleHairStyles] = useState([
    { id: 1, name: "Kiểu tóc nữ 1", image: "https://via.placeholder.com/150?text=Female+Hair+1" },
    { id: 2, name: "Kiểu tóc nữ 2", image: "https://via.placeholder.com/150?text=Female+Hair+2" },
    { id: 3, name: "Kiểu tóc nữ 3", image: "https://via.placeholder.com/150?text=Female+Hair+3" },
    { id: 4, name: "Kiểu tóc nữ 4", image: "https://via.placeholder.com/150?text=Female+Hair+4" },
    { id: 5, name: "Kiểu tóc nữ 5", image: "https://via.placeholder.com/150?text=Female+Hair+5" },
    { id: 6, name: "Kiểu tóc nữ 6", image: "https://via.placeholder.com/150?text=Female+Hair+6" },
  ]);

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

  // Xử lý khi chọn ảnh tóc từ gallery
  const handleSelectHairStyle = (hairStyle) => {
    // Trong thực tế, chúng ta sẽ fetch ảnh từ URL và chuyển thành File object
    // Ở đây chúng ta sẽ giả lập bằng cách tạo một URL mới
    setRefImage(hairStyle.image);
    setRefPreview(hairStyle.image);
  };

  // Xử lý khi chọn ảnh tóc từ upload
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

  // Xử lý khi chọn giới tính
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
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
            onClick={() => handleGenderSelect('male')}
          >
            Nam
          </Button>
          <Button 
            variant={gender === 'female' ? 'primary' : 'outline-primary'} 
            onClick={() => handleGenderSelect('female')}
          >
            Nữ
          </Button>
        </div>
      </div>

      <Form>
        <Form.Group controlId="formIdImage" className="mb-3">
          <Form.Label>Input your face</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleIdImageChange}
          />
        </Form.Group>

        {/* Tabs để chọn giữa upload ảnh tóc hoặc chọn từ gallery */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="upload" title="Upload ảnh tóc">
            <Form.Group controlId="formRefImage" className="mb-3">
              <Form.Label>Input your expected hair</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleRefImageChange}
              />
            </Form.Group>
          </Tab>
          <Tab eventKey="gallery" title="Chọn từ gallery" disabled={!gender}>
            {gender && (
              <div className="mb-3">
                <h5>Chọn kiểu tóc {gender === 'male' ? 'nam' : 'nữ'}:</h5>
                <Row>
                  {(gender === 'male' ? maleHairStyles : femaleHairStyles).map((style) => (
                    <Col xs={6} sm={4} md={3} lg={2} key={style.id} className="mb-3">
                      <Card 
                        className="h-100 cursor-pointer" 
                        onClick={() => handleSelectHairStyle(style)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Card.Img variant="top" src={style.image} />
                        <Card.Body className="p-2">
                          <Card.Title className="small text-center">{style.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            {!gender && (
              <div className="alert alert-info">
                Vui lòng chọn giới tính trước khi xem các mẫu tóc
              </div>
            )}
          </Tab>
        </Tabs>

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
