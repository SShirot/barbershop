import React, { startTransition, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaChevronRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../style/style_header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import SearchBar from "./SearchBar";
const BookingModal = React.lazy(() =>
  import("../../../components/include/BookingModal")
);
const API = process.env.REACT_APP_API_BASE_URL;

const Header = ({ information }) => {
  const itemCount = useSelector((state) => state.cart.itemCount);
  const user = useSelector((state) => state.auth.user);
  const [showBooking, setShowBooking] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleBookingShow = () => setShowBooking(true);
  const handleBookingClose = () => setShowBooking(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={"fixed-header"}>
      {/* Header for Mobile */}
      <Navbar bg="primary" variant="light" expand="lg" className="d-lg-none">
        <div className={"d-flex w-100 justify-content-between"}>
          <Button variant="link" className="text-white">
            <FaBars />
          </Button>
          <Form className="d-flex" style={{ width: "75%" }}>
            <FormControl
              type="search"
              placeholder="Bạn đang tìm kiếm gì"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">
              <FaSearch />
            </Button>
          </Form>
          <Button
            variant="link"
            className="text-white position-relative"
            as={Link}
            to="/cart"
          >
            <FaShoppingCart />
            <span
              className="position-absolute translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.75rem", top: "5px", right: "10px" }}
            >
              {itemCount}
            </span>
          </Button>
        </div>
      </Navbar>
      {/*<div className="bg-warning d-lg-none text-center py-2">*/}
      {/*    <FaChevronRight className="me-1"/>*/}
      {/*    <span className="text-dark fw-bold">30 NGÀY đổi ý & miễn phí trả hàng</span>*/}
      {/*</div>*/}

      {/* Header for Desktop */}
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        className="d-none d-lg-block"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => {
                navigate("/");
              });
            }}
            className="fw-bold text-primary"
          >
            <img
              src={information?.logo ? information?.logo : "/images/logo.png"}
              alt="Logo"
              style={{ width: "80px" }}
            />
          </Navbar.Brand>
          <SearchBar />

          {/*<Form className="d-flex w-50" style={{ height: '40px'}}>*/}
          {/*    <FormControl*/}
          {/*        type="search"*/}
          {/*        placeholder="Bạn đang tìm kiếm gì"*/}
          {/*        className="me-2"*/}
          {/*        aria-label="Search"*/}
          {/*    />*/}
          {/*    <Button variant="outline-light"><FaSearch/></Button>*/}
          {/*</Form>*/}
          <Nav className="ms-auto nav-menu-header align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              onClick={(e) => {
                e.preventDefault();
                startTransition(() => {
                  navigate("/");
                });
              }}
            >
              Trang chủ
            </Nav.Link>
            {user && <Nav.Link onClick={handleBookingShow}>Đặt lịch</Nav.Link>}
            <Dropdown align="end" className="ms-3">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic-user"
                className={
                  "d-flex align-items-center justify-content-between dropdown-basic-user"
                }
              >
                {user ? (
                  <div className="d-flex align-items-center">
                    <img
                      src={user?.avatar || "/images/default.png"}
                      alt="Avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    <span>{user.name || "Tài khoản"}</span>
                  </div>
                ) : (
                  <span>Tài khoản</span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user ? (
                  <>
                    <Dropdown.Item as={Link} to="/user/profile">
                      Cập nhật thông tin
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/user/orders">
                      Đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Đăng xuất
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item
                      as={Link}
                      onClick={(e) => {
                        e.preventDefault();
                        startTransition(() => {
                          navigate("/login");
                        });
                      }}
                      to="/login"
                    >
                      Đăng nhập
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      onClick={(e) => {
                        e.preventDefault();
                        startTransition(() => {
                          navigate("/register");
                        });
                      }}
                      to="/register"
                    >
                      Đăng ký
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative text-dark"
            >
              <FaShoppingCart />
              <span
                className="position-absolute top-0  badge rounded-pill bg-danger d-flex justify-content-center align-items-center"
                style={{
                  fontSize: "0.75rem",
                  width: "20px",
                  height: "20px",
                  right: "0",
                }}
              >
                {itemCount}
              </span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="d-none d-lg-flex bg-light py-2 justify-content-center">
        <Container className="d-flex justify-content-between">
          <div>
            <Nav>
              <Nav.Link href="#" className="text-dark">
                100% hàng thật
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Freeship mọi đơn
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Hoàn 200% nếu hàng giả
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                30 ngày đổi trả
              </Nav.Link>
            </Nav>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Giao đến: Quận 9, TP Hồ Chí Minh
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  Chọn địa chỉ khác
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
        <BookingModal
          show={showBooking}
          handleClose={handleBookingClose}
          API={API}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    </header>
  );
};

export default Header;
