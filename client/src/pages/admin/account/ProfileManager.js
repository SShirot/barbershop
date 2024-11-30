import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Form, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import userService from '../../../api/userService';
import apiUpload from "../../../api/apiUpload";
import { toast } from 'react-toastify';

const ProfileManager = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    useEffect(() => {
        // Gọi API lấy thông tin người dùng
        const fetchUserData = async () => {
            try {
                const response = await userService.getProfile();
                setUser(response.data);
                setPreviewAvatar(response.data.avatar); // Hiển thị avatar hiện tại
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
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
            name: user.name,
            email: user.email,
            avatar: avatar || user.avatar,
            phone: user.phone
        };

        try {
            setLoading(true);
            await userService.updateProfile(updatedData);
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
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/user">Tài khoản</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={8}>
                    <h3>Thông tin người dùng</h3>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={user.name}
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
                                        value={user.email}
                                        onChange={handleInputChange}
                                        readOnly
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
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            {/*<Col md={6}>*/}
                            {/*    <Form.Group className="mb-3">*/}
                            {/*        <Form.Label>Email</Form.Label>*/}
                            {/*        <Form.Control*/}
                            {/*            type="email"*/}
                            {/*            name="email"*/}
                            {/*            value={user.email}*/}
                            {/*            onChange={handleInputChange}*/}
                            {/*            readOnly*/}
                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Col>*/}
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

export default ProfileManager;
