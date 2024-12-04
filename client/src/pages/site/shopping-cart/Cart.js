import React, {useState, useEffect, startTransition} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import {setAllCart} from "../../../redux/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaTrashAlt, FaCheckCircle, FaHome} from 'react-icons/fa';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [itemCount, setItemCount] = useState(0); // Thêm state cho itemCount


    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

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
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            );
            dispatch(setAllCart(updatedItems));
            // dispatch(addToCart({ ...updatedItems, quantity: 1 }));  // Thêm 1 sản phẩm vào giỏ hàng
            updateCartInLocalStorage(updatedItems); // Cập nhật localStorage ngay lập tức
            return updatedItems;
        });
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems?.filter((item) => item.id !== id);
            updateCartInLocalStorage(updatedItems); // Cập nhật localStorage ngay lập tức
            return updatedItems;
        });
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        startTransition(() => {
            navigate("/checkout");
        });
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
                        <tr key={item.id}>
                            <td>{idx + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price.toLocaleString('vi-VN')} vnđ</td>
                            <td>
                                <Form.Control
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                    style={{ width: '80px', display: 'inline-block' }}
                                />
                            </td>
                            <td>{(item.price * item.quantity).toLocaleString('vi-VN')} vnđ</td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                    <FaTrashAlt className="me-2" />
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
                <Link className="text-white btn btn-danger text-decoration-none"
                      onClick={(e) => {
                          e.preventDefault();
                          startTransition(() => {
                              navigate("/");
                          });
                      }}
                      to={'/'}>
                    <FaHome className="me-2" />
                    Tiếp tục mua sắm
                </Link>

                {cartItems?.length > 0 && (
                    <Button variant="primary" onClick={handleCheckout}>
                        <FaCheckCircle className="me-2" />
                        Thanh toán
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default Cart;
