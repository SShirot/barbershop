import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Form, Spinner, Tab, Tabs } from 'react-bootstrap';
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
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Lấy thông tin người dùng
                const userResponse = await userService.getProfile();
                setUser(userResponse.data);
                setPreviewAvatar(userResponse.data.avatar);
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

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await apiUpload.uploadImage(file);
                setAvatar(response.data);
                setPreviewAvatar(response.data);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSaveProfile = async () => {
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
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>

            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Row>
                    <Col md={12}>
                        <Tabs defaultActiveKey="profile" className="mb-3">
                            <Tab eventKey="profile" title="Thông tin cá nhân">
                                <Row className="mt-4">
                                    <Col md={8}>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Avatar</Form.Label>
                                                <div className="d-flex align-items-center">
                                                    {previewAvatar && (
                                                        <img
                                                            src={previewAvatar}
                                                            alt="Avatar preview"
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                                                        />
                                                    )}
                                                    <div>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            onChange={handleAvatarChange}
                                                            accept="image/*"
                                                        />
                                                        <Button
                                                            variant="primary"
                                                            onClick={handleSaveProfile}
                                                            className="mt-2"
                                                            disabled={!avatar}
                                                        >
                                                            Upload Avatar
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={user?.name || ''}
                                                    readOnly
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={user?.email || ''}
                                                    readOnly
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={user?.phone || ''}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProfileManager;
