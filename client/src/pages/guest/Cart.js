import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import apiOrderService from "./../../api/apiOrderService";
import {addToCart, setAllCart} from "../../redux/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [itemCount, setItemCount] = useState(0); // Thêm state cho itemCount
    const [showCheckout, setShowCheckout] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    // Khởi tạo `userInfo` với thông tin user nếu đã đăng nhập
    const [userInfo, setUserInfo] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                if (parsedCart && Array.isArray(parsedCart.items)) {
                    setCartItems(parsedCart.items);
                    setItemCount(parsedCart.itemCount || 0); // Cập nhật itemCount từ localStorage
                } else {
                    console.error("Giỏ hàng không có items hợp lệ", parsedCart);
                }
            } catch (error) {
                console.error("Không thể phân tích dữ liệu từ localStorage", error);
            }
        }
    }, []);

    // Hàm cập nhật giỏ hàng vào localStorage
    const updateCartInLocalStorage = (items) => {
        const updatedCart = {
            items,
            itemCount: items.reduce((count, item) => count + item.quantity, 0) // Tính lại itemCount
        };
        setItemCount(updatedCart.itemCount); // Cập nhật itemCount trong state
        dispatch(setAllCart(items));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (id, quantity) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            );
            dispatch(setAllCart(updatedItems));
            // dispatch(addToCart({ ...updatedItems, quantity: 1 }));  // Thêm 1 sản phẩm vào giỏ hàng
            updateCartInLocalStorage(updatedItems); // Cập nhật localStorage ngay lập tức
            return updatedItems;
        });
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems?.filter((item) => item._id !== id);
            updateCartInLocalStorage(updatedItems); // Cập nhật localStorage ngay lập tức
            return updatedItems;
        });
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleConfirmPayment = async () => {
        try {
            // Định dạng dữ liệu theo yêu cầu của API
            const orderData = {
                user_id: user?.id, // Nếu bạn có lưu user_id trong Redux
                products: cartItems.map(item => ({
                    id: item.id, // ID sản phẩm
                    quantity: item.quantity
                })),
                shipping_fee: 0, // Có thể điều chỉnh giá trị nếu cần
                total_amount: getTotalPrice(),
                payment_method_id: 1 // Giá trị ID phương thức thanh toán, thay đổi nếu cần
            };

            const response = await apiOrderService.add(orderData);
            console.info("===========[] ===========[createOrder] : ", response);

            // Xóa giỏ hàng sau khi thanh toán thành công
            setCartItems([]);
            localStorage.removeItem('cart');

            // Chuyển hướng đến trang thông báo thành công
            navigate('/');
        } catch (error) {
            console.error('Thanh toán thất bại:', error);
            // Xử lý lỗi (có thể hiển thị thông báo lỗi cho người dùng)
        }
    };

    return (
        <Container className="my-5">
            <h2>Giỏ hàng của bạn</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {cartItems?.length > 0 ? (
                    cartItems.map((item, idx) => (
                        <tr key={item._id}>
                            <td>{idx + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price.toLocaleString('vi-VN')} vnđ</td>
                            <td>
                                <Form.Control
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                    style={{ width: '80px', display: 'inline-block' }}
                                />
                            </td>
                            <td>{(item.price * item.quantity).toLocaleString('vi-VN')} vnđ</td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">Giỏ hàng của bạn đang trống</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <h4 className="text-end">Tổng tiền: {getTotalPrice().toLocaleString('vi-VN')} vnđ</h4>
            <h5 className="text-end">Số lượng sản phẩm: {itemCount}</h5> {/* Hiển thị itemCount */}
            <div className="d-flex justify-content-between mt-3">
                <Button variant="primary">Tiếp tục mua sắm</Button>
                {cartItems?.length > 0 && (
                    <Button variant="danger" onClick={handleCheckout}>Thanh toán</Button>
                )}
            </div>

            {/* Modal để nhập thông tin thanh toán */}
            <Modal show={showCheckout} onHide={() => setShowCheckout(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin thanh toán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên"
                                name="name"
                                value={userInfo.name}
                                onChange={handleUserInfoChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleUserInfoChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ giao hàng"
                                name="address"
                                value={userInfo.address}
                                onChange={handleUserInfoChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCheckout(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleConfirmPayment}>
                        Xác nhận thanh toán
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Cart;
