import React, { startTransition } from "react";
import { Container, Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./style/UserLayout.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInternetExplorer } from "react-icons/fa";

const StaffLayout = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/staff">
            STAFF
          </Navbar.Brand>
          <Nav className="me-auto">
            <Dropdown as={Nav.Item}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/staff/news/menus">
                  Chuyên mục
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/news/tags">
                  Từ khoá
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/news/articles">
                  Bài viết
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} id="dropdown-ecm">
                Bán hàng
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/staff/ecommerce/categories">
                  Danh mục
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/ecommerce/attributes">
                  Thuộc tính
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/ecommerce/brands">
                  Thương hiệu
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/ecommerce/product-labels">
                  Nhãn sản phẩm
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/ecommerce/product">
                  Sản phẩm
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/ecommerce/order">
                  Đơn hàng
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/ecommerce/vote">
                  Đánh giá
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} id="dropdown-ecm">
                Dịch vụ
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/staff/services/manage">
                  Quản lý dịch vụ
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/staff/services/order">
                  Khách đăng ký{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              as={Link}
              to="/"
              className={"d-flex align-items-center"}
              target={"_blank"}
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
                <Dropdown.Item as={Link} to="/staff/profile">
                  Cập nhật thông tin
                </Dropdown.Item>
                <Dropdown.Divider />
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

export default StaffLayout;
