import React, { useState } from 'react';
import { Container, Nav, Dropdown, Navbar } from 'react-bootstrap';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaBox, FaPaw, FaShoppingCart, FaShareAlt, FaClipboardList } from 'react-icons/fa'; // Thêm icon từ react-icons
import './UserLayout.css'; // CSS tùy chỉnh
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const UserLayout = ({ isAuthenticated, user }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State quản lý trạng thái sidebar (mở hoặc đóng)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Lấy path hiện tại để đánh dấu mục menu đang active

    const handleLogout = () => {
        dispatch(logout()); // Dispatch action logout để đăng xuất người dùng
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Thay đổi trạng thái ẩn/hiện sidebar
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
                <Container fluid>
                    <div className="d-flex align-items-center sidebar-toggle">
                        {/* Icon để ẩn/hiện sidebar */}
                        <span onClick={toggleSidebar} className="toggle-sidebar-icon text-white">
                            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </span>
                        <Navbar.Brand as={Link} to="/user"></Navbar.Brand>
                    </div>
                    <Nav className="ml-auto">
                        <Dropdown align="end">
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-user">
                                <img
                                    src={user.avatar || 'https://via.placeholder.com/150'}
                                    alt="Avatar"
                                    className="avatar-img"
                                />
                                {user.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/user/profile">Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>

            {/* Main content with Sidebar */}
            <div className="d-flex flex-grow-1">
                {/* Sidebar */}
                {isSidebarOpen && (
                    <div className="admin-sidebar bg-dark text-white">
                        <Nav className="flex-column">
                            <Nav.Link
                                as={Link}
                                to="/user/orders"
                                className={`text-white ${location.pathname === '/user/orders' ? 'active' : ''}`}
                            >
                                <FaClipboardList className="me-2" />
                                Đơn hàng
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/user/pets"
                                className={`text-white ${location.pathname === '/user/pets' ? 'active' : ''}`}
                            >
                                <FaPaw className="me-2" />
                                My pets
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/user/posts"
                                className={`text-white ${location.pathname === '/user/posts' ? 'active' : ''}`}
                            >
                                <FaShareAlt className="me-2" />
                                Chia sẻ
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/user/boarding"
                                className={`text-white ${location.pathname === '/user/boarding' ? 'active' : ''}`}
                            >
                                <FaClipboardList className="me-2" />
                                Ký gửi
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/user/products"
                                className={`text-white ${location.pathname === '/user/products' ? 'active' : ''}`}
                            >
                                <FaBox className="me-2" />
                                Sản phẩm
                            </Nav.Link>
                        </Nav>
                    </div>
                )}

                {/* Main content */}
                <div className={`admin-content flex-grow-1 p-3 ${isSidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
                    <Container>
                        <Outlet />
                    </Container>
                </div>
            </div>

            {/* Footer (Fixed at the bottom) */}
            <footer className="admin-footer text-center mt-auto py-3 bg-dark text-white">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="/help" className="text-white">Help</a> |
                        <a href="/privacy-policy" className="text-white">Privacy Policy</a> |
                        <a href="/terms-of-service" className="text-white">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserLayout;
