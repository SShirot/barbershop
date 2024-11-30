import React, {startTransition} from 'react';
import {Container, Navbar, Nav, NavDropdown, Dropdown} from 'react-bootstrap';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import './UserLayout.css';
import {logout} from "../redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {FaInternetExplorer} from "react-icons/fa";

const AdminLayout = ({ isAuthenticated, user, onLogout }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout()); // Dispatch action logout để đăng xuất người dùng
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/admin">ADMIN</Navbar.Brand>
                    <Nav className="me-auto">
                        {/*<Nav.Link as={Link} to="/admin/orders">Đơn hàng</Nav.Link>*/}
                        {/*<Nav.Link as={Link} to="/admin/services">Dịch Vụ</Nav.Link>*/}
                        {/*<Nav.Link as={Link} to="/admin/appointments">Đặt lịch</Nav.Link>*/}
                        {/*<Nav.Link as={Link} to="/admin/promotions">Khuyến mãi</Nav.Link>*/}
                        <Nav.Link as={Link} to="/admin/user">Tài khoản</Nav.Link>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-news">
                                Tin tức
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/news/menus">Chuyên mục</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/news/tags">Từ khoá</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/news/articles">Bài viết</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-ecm">
                                Bán hàng
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/ecommerce/categories">Danh mục</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/ecommerce/brands">Thương hiệu</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/ecommerce/product-labels">Nhãn sản phẩm</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/ecommerce/product">Sản phẩm</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/ecommerce/order">Đơn hàng</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/ecommerce/vote">Đánh giá</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-ecm">
                                Dịch vụ
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/services/manage">Quản lý dịch vụ</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/services/order">Khách đăng ký </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-ecm">
                                Dữ liệu website
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/slides">Quản lý slide</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/setting/information">Thông tin website</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link as={Link} to="/" className={'d-flex align-items-center'} target={'_blank'}>Vào website <FaInternetExplorer  className={'ms-2'}/></Nav.Link>
                    </Nav>
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-user">
                                <img
                                    src={user?.avatar || 'https://via.placeholder.com/150'}
                                    alt="Avatar"
                                    style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
                                />
                                {user?.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/profile">Cập nhật thông tin</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    onClick={(e) => {
                                        e.preventDefault();
                                        startTransition(() => {
                                            navigate("/login");
                                        });
                                    }}
                                >Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>
            <Container style={{ minHeight: '70vh',paddingBottom: '100px'}}>
                <Outlet />
            </Container>
            <footer className="admin-footer text-center mt-4">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="/help">Help</a> |
                        <a href="/privacy-policy">Privacy Policy</a> |
                        <a href="/terms-of-service">Terms of Service</a>
                    </div>
                </div>
            </footer>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
};

export default AdminLayout;
