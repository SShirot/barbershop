import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = ({information}) => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={3} className="text-center">
                        <img src={require('./../../../assets/images/location.png')} alt="Location" className="footer-icon" />
                        <h5>Địa chỉ</h5>
                        <p>{information?.full_address}</p>
                    </Col>
                    <Col md={3} className="text-center">
                        <img src={require('./../../../assets/images/phone.png')} alt="Phone" className="footer-icon" />
                        <h5>Hotline</h5>
                        <p>{information?.contact_number}</p>
                    </Col>
                    <Col md={3} className="text-center">
                        <img src={require('./../../../assets/images/email.png')} alt="Email" className="footer-icon" />
                        <h5>Email</h5>
                        <p>{information?.email}</p>
                    </Col>
                    <Col md={3} className="text-center">
                        <img src={require('./../../../assets/images/clock.png')} alt="Clock" className="footer-icon" />
                        <h5>Thời gian mở cửa</h5>
                        <p>Từ Thứ 2 đến Chủ Nhật (8:00am - 10:00pm)</p>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col md={1} className="text-center">
                        <img src={require('./../../../assets/images/facebook.png')} alt="Facebook" className="footer-icon" />
                    </Col>
                    <Col md={1} className="text-center">
                        <img src={require('./../../../assets/images/youtube.png')} alt="YouTube" className="footer-icon" />
                    </Col>
                    <Col md={1} className="text-center">
                        <img src={require('./../../../assets/images/tiktok.png')} alt="TikTok" className="footer-icon" />
                    </Col>
                    <Col md={1} className="text-center">
                        <img src={require('./../../../assets/images/instagram.png')} alt="Instagram" className="footer-icon" />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col md={12} className="text-center">
                        <p>© 2024 {information?.copyright}.</p>
                        {/*<p>Đang online: 5 | Tháng: 7339 | Tổng truy cập: 1530656</p>*/}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
