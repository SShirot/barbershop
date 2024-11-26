import React, { useState, useEffect } from 'react';
import {Breadcrumb, Col, Container, Nav, Row, Card, Table, Spinner, Form, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {FaDatabase, FaPencilAlt, FaUser} from "react-icons/fa";
import {FaCartShopping, FaPencil} from "react-icons/fa6";
import apiSettingInformation from "../../../api/apiSettingInformation";
import apiUpload from "../../../api/apiUpload";
import {toast} from "react-toastify";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InformationManage = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    useEffect(() => {
        // Gọi API lấy thông tin người dùng
        const fetchInfoData = async () => {
            try {
                const response = await apiSettingInformation.getInfo();
                console.info("===========[] ===========[response] : ",response);
                setInfo(response.data?.data);
                setPreviewAvatar(response.data?.data?.logo);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInfoData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleAvatarChange = async (e)  => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await apiUpload.uploadImage(file);
                setAvatar(response.data);
                setPreviewAvatar(response.data)
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }

    };

    const handleSaveChanges = async () => {
        const updatedData = {
            name: info.name,
            email: info.email,
            logo: avatar || info.logo,
            full_address: info.full_address,
            contact_number: info.contact_number,
            copyright: info.copyright,
        };

        try {
            setLoading(true);
            const response = await apiSettingInformation.create(updatedData);
            console.info("===========[] ===========[response] : ",response);
            toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Cập nhật thông tin thất bại!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Thông tin website</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={8}>
                    <h3>Thông tin website</h3>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={info?.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={info?.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contact_number"
                                        value={info?.contact_number}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Copyright</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="copyright"
                                        value={info?.copyright}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="full_address"
                                        value={info?.full_address}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <div className="mb-3">
                                <img
                                    src={previewAvatar || 'https://via.placeholder.com/150'}
                                    alt="Avatar"
                                    className="img-fluid rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </div>
                            <Form.Control type="file" onChange={handleAvatarChange} />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSaveChanges} disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default InformationManage;
