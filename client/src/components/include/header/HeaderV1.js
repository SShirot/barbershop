// import {Badge, Container, Dropdown, Nav, Navbar} from "react-bootstrap";
// import {Link} from "react-router-dom";
// import {createSlug} from "../../../helpers/formatters";
// import {FaShoppingCart} from "react-icons/fa";
// import React, {startTransition} from "react";
//
// <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
//     <Container>
//         <Navbar.Brand as={Link} to="/">
//             <img src={ information?.logo ? information?.logo : 'https://shop.30shine.com/images/Logo_30shine.svg'} alt="Logo" style={{ width: '80px' }} />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//             <Nav className="me-auto">
//                 <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
//                 <Dropdown>
//                     <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components">
//                         Sản phẩm
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                         {categories?.length > 0 ? (
//                             categories.map((category) => (
//                                 <Dropdown.Item as={Link} to={`/c/${createSlug(category.name)}`} key={category.id}>
//                                     {category.name}
//                                 </Dropdown.Item>
//                             ))
//                         ) : (
//                             <Dropdown.Item>Không có sản phẩm</Dropdown.Item>
//                         )}
//                     </Dropdown.Menu>
//                 </Dropdown>
//                 {isAuthenticated && (
//                     <Nav.Link onClick={handleBookingShow}>Đặt lịch</Nav.Link>
//                 )}
//             </Nav>
//             <Nav>
//                 <Nav.Link as={Link} to="/cart" className="position-relative">
//                     <FaShoppingCart size={24} />
//                     {itemCount > 0 && (
//                         <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
//                             {itemCount}
//                         </Badge>
//                     )}
//                 </Nav.Link>
//                 {isAuthenticated ? (
//                     <Dropdown align="end">
//                         <Dropdown.Toggle as={Nav.Link} id="dropdown-user">
//                             <img
//                                 src={user?.avatar || 'https://via.placeholder.com/150'}
//                                 alt="Avatar"
//                                 style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
//                             />
//                             {user?.name}
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             <Dropdown.Item as={Link} to="/user/profile">Cập nhật thông tin</Dropdown.Item>
//                             <Dropdown.Item as={Link} to="/user/orders">Đơn hàng</Dropdown.Item>
//                             <Dropdown.Divider />
//                             <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 ) : (
//                     <>
//                         <Nav.Link as={Link} onClick={(e) => {
//                             e.preventDefault();
//                             startTransition(() => {
//                                 navigate("/login");
//                             });
//                         }} >Đăng nhập</Nav.Link>
//                         <Nav.Link as={Link} onClick={(e) => {
//                             e.preventDefault();
//                             startTransition(() => {
//                                 navigate("/register");
//                             });
//                         }} >Đăng ký</Nav.Link>
//                     </>
//                 )}
//             </Nav>
//         </Navbar.Collapse>
//     </Container>
// </Navbar>
