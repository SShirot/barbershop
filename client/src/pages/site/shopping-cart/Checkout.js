import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import apiOrderService from '../../../api/apiOrderService';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CheckoutSummary from "../../components/cart/CheckoutSummary";
import CheckoutForm from "../../components/cart/CheckoutForm"; // Đường dẫn API của bạn
import { clearCart } from '../../../redux/slices/cartSlice';

const Checkout = () => {

    const user = useSelector((state) => state.auth.user);
    const cartFromRedux = useSelector((state) => state.cart.items);
    const [userInfo, setUserInfo] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
        email: user?.email || '',
    });
    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const [shippingMethod, setShippingMethod] = useState('localPickup');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const taxRate = 0;
    const shippingFee = 0;

    const navigate = useNavigate();

    // Load cart data from both localStorage and Redux
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        let parsedCart = [];
        
        if (savedCart) {
            try {
                parsedCart = JSON.parse(savedCart);
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }

        if (cartFromRedux && cartFromRedux.length > 0) {
            setCartItems(cartFromRedux);
        }
        else if (parsedCart && parsedCart.length > 0) {
            setCartItems(parsedCart);
        }
        else {
            setCartItems([]);
        }
    }, [cartFromRedux]);

    // Lấy phương thức thanh toán từ API
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await apiOrderService.getPaymentMethods();
                if (response?.data?.data) {
                    const methods = response.data.data;
                    setPaymentMethods(methods);
                    const defaultMethod = methods.find((method) => method.is_default === true);
                    setPaymentMethod(defaultMethod?.id || methods[0]?.id || '');
                }
            } catch (error) {
                console.error('Lỗi khi lấy phương thức thanh toán:', error);
            }
        };

        fetchPaymentMethods();
    }, []);

    const handleUserInfoChange = (e) => {
        const {name, value} = e.target;
        setUserInfo({...userInfo, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const orderData = {
                user_id: user?.id,
                products: cartItems.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })),
                shipping_fee: 0,
                total_amount: getTotalPrice(),
                payment_method_id: paymentMethod
            };

            const response = await apiOrderService.add(orderData);
            if (response.status === "success") {
                setCartItems([]);
                dispatch(clearCart());
                localStorage.removeItem('cart');
                if(paymentMethod !== 1) {
                    try {
                        let newData = {
                            order_id: response?.data.data.id,
                            url_return: 'http://localhost:3000/checkout/success',
                            amount: response?.data.data.sub_total,
                            service_code: "hotel",
                            url_callback: 'http://localhost:3000/checkout/failure'
                        }
                        const responsePayment = await axios.post("https://123code.net/api/v1/payment/add", newData);
                        setIsLoading(false);
                        window.location.href = responsePayment.data.link
                        return;
                    } catch (err) {
                        console.error('Payment error:', err);
                    }
                }
                navigate('/');
            } else {
                alert("Error");
            }
        } catch (error) {
            console.error('Thanh toán thất bại:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSubTotal = () => {
        if (!cartItems || cartItems.length === 0) {
            return 0;
        }
        return cartItems.reduce((total, item) => {
            return total + (Number(item.price) * Number(item.quantity));
        }, 0);
    };

    const calculateTax = (subtotal) => {
        return subtotal * taxRate;
    };

    const handlePaymentChange = (id) => {
        setPaymentMethod(id);
    };

    const calculateTotal = (subtotal, tax, shippingFee) => {
        return subtotal + tax + shippingFee - discountAmount;
    };

    const handleApplyDiscount = () => {
        if (discountCode === 'SALE10') {
            setDiscountAmount(getSubTotal() * 0.1);
        } else {
            alert('Mã giảm giá không hợp lệ!');
        }
    };

    const subtotal = getSubTotal();
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, tax, shippingFee);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (Number(item.price) * Number(item.quantity));
        }, 0);
    };

    return (
        <Container>
            <h1 className="my-4">Thanh toán</h1>
            <Row>
                <Col md={7}>
                    <CheckoutForm
                        userInfo={userInfo}
                        handleUserInfoChange={handleUserInfoChange}
                        shippingMethod={shippingMethod}
                        setShippingMethod={setShippingMethod}
                        paymentMethods={paymentMethods}
                        paymentMethod={paymentMethod}
                        handlePaymentChange={handlePaymentChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </Col>
                <Col md={5}>
                    <CheckoutSummary
                        cartItems={cartItems}
                        subtotal={subtotal}
                        tax={tax}
                        shippingFee={shippingFee}
                        discountAmount={discountAmount}
                        total={total}
                        discountCode={discountCode}
                        setDiscountCode={setDiscountCode}
                        handleApplyDiscount={handleApplyDiscount}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
