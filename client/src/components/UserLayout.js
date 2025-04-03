import React, { useState, startTransition } from "react";
import { Container, Nav, Dropdown, Navbar } from "react-bootstrap";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBox,
  FaPaw,
  FaShoppingCart,
  FaShareAlt,
  FaClipboardList,
  FaInternetExplorer,
} from "react-icons/fa"; // Thêm icon từ react-icons
import "./style/UserLayout.css"; // CSS tùy chỉnh
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const UserLayout = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout()); // Dispatch action logout để đăng xuất người dùng
    navigate("/login");
  };
  console.info("===========[] ===========[OK VAO DAY] : ");

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/user">
            Xin chào {user?.name}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/user/orders">
              Đơn hàng
            </Nav.Link>
            <Nav.Link as={Link} to="/user/vote">
              Đánh giá
            </Nav.Link>
            <Nav.Link as={Link} to="/user/services">
              Dịch vụ
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              className={"d-flex align-items-center"}
              
            >
              Vào website <FaInternetExplorer className={"ms-2"} />
            </Nav.Link>
          </Nav>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} id="dropdown-user">
                <img
                  src={user?.avatar || "https://via.placeholder.com/150"}
                  alt="Avatar"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                />
                {user?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/user/profile">
                  Cập nhật thông tin
                </Dropdown.Item>
                <Dropdown.Divider />
                {/* 🚀 FIX lỗi logout */}
                <Dropdown.Item
                    onClick={(e) => {
                        e.preventDefault();
                        startTransition(() => {
                            navigate("/login");
                        });
                    }}
                >
                    Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
      <Container style={{ minHeight: "70vh", paddingBottom: "100px" }}>
        <Outlet />
      </Container>
      <footer className="admin-footer text-center mt-4">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
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

export default UserLayout;
