import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Form, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Link } from "react-router-dom";
import userService from '../../../api/userService';
import apiWorkPreferencesService from '../../../api/apiWorkPreferencesService';
import apiUpload from "../../../api/apiUpload";
import { toast } from 'react-toastify';

const ProfileManager = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [workPreferences, setWorkPreferences] = useState({
        shift_morning: false,
        shift_afternoon: false,
        shift_night: false,
        full_week: false,
        off_saturday: false,
        off_sunday: false
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Lấy thông tin người dùng
                const userResponse = await userService.getProfile();
                setUser(userResponse.data);
                setPreviewAvatar(userResponse.data.avatar);

                // Lấy nguyện vọng làm việc
                const workPreferencesResponse = await apiWorkPreferencesService.findByUser();
                if (workPreferencesResponse?.data?.data) {
                    console.log("============= ", workPreferencesResponse.data?.data);
                    setWorkPreferences(workPreferencesResponse.data?.data);
                }
            } catch (error) {
                console.error("Error fetching user data or work preferences:", error);
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

    const toggleWorkPreference = (name) => {
        setWorkPreferences((prevPreferences) => ({
            ...prevPreferences,
            [name]: !prevPreferences[name]
        }));
    };

    const handleSaveWorkPreferences = async () => {
        try {
            setLoading(true);
            console.info("===========[] ===========[workPreferences] : ",workPreferences);
            await apiWorkPreferencesService.createOrUpdate(workPreferences);
            toast.success("Cập nhật nguyện vọng thành công!");
        } catch (error) {
            console.error("Error updating work preferences:", error);
            toast.error("Cập nhật nguyện vọng thất bại!");
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

            <Tabs defaultActiveKey="profile" id="profile-tabs" className="mt-4">
                {/* Tab cập nhật thông tin */}
                <Tab eventKey="profile" title="Cập nhật thông tin">
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

                                <Button variant="primary" onClick={handleSaveProfile} disabled={loading}>
                                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Tab>

                {/* Tab đăng ký lịch làm việc */}
                <Tab eventKey="work-preferences" title="Đăng ký lịch làm việc">
                    <Row className="mt-4">
                        <Col md={8}>
                            <h3>Nguyện vọng làm việc</h3>
                            <Form>
                                {[
                                    { name: "shift_morning", label: "Làm ca sáng" },
                                    { name: "shift_afternoon", label: "Làm ca chiều" },
                                    { name: "shift_night", label: "Làm ca tối" },
                                    { name: "full_week", label: "Làm cả tuần" },
                                    { name: "off_saturday", label: "Nghỉ thứ 7" },
                                    { name: "off_sunday", label: "Nghỉ chủ nhật" },
                                ].map((item) => (
                                    <Form.Group className="mb-3" key={item.name}>
                                        <div
                                            className="d-flex align-items-center"
                                            onClick={() => toggleWorkPreference(item.name)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <Form.Check
                                                type="checkbox"
                                                name={item.name}
                                                checked={workPreferences[item?.name]}
                                                readOnly
                                                id={item.name}
                                            />
                                            <Form.Label htmlFor={item.name} className="ms-2 mb-0">
                                                {item.label}
                                            </Form.Label>
                                        </div>
                                    </Form.Group>
                                ))}
                                <Button variant="primary" onClick={handleSaveWorkPreferences} disabled={loading}>
                                    {loading ? "Đang lưu..." : "Lưu nguyện vọng"}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Tab>



                {/* Tab quản lý lịch làm việc */}
                <Tab eventKey="work-schedule" title="Quản lý lịch làm việc">
                    <Row className="mt-4">
                        <Col md={8}>
                            <h3>Quản lý lịch làm việc</h3>
                            <p>Hiển thị bảng quản lý lịch làm việc ở đây...</p>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default ProfileManager;
