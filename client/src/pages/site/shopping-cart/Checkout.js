import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import apiOrderService from "../../../api/apiOrderService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/cart/CheckoutSummary";
import CheckoutForm from "../../components/cart/CheckoutForm"; // Đường dẫn API của bạn

const Checkout = () => {
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    email: user?.email || "",
  });

  console.info("===========[] ===========[userInfo] : ", userInfo);

  const [cartItems, setCartItems] = useState([]); // Danh sách sản phẩm trong giỏ hàng
  const [shippingMethod, setShippingMethod] = useState("localPickup");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const taxRate = 0;
  const shippingFee = 0;

  const navigate = useNavigate();

  // Lấy giỏ hàng từ localStorage (giả định giỏ hàng lưu ở localStorage)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      console.log("=========== CART: ", savedCart);
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart.items || []);
      } catch (error) {
        console.error(
          "Không thể phân tích dữ liệu giỏ hàng từ localStorage:",
          error
        );
      }
    }
  }, []);

  // Lấy phương thức thanh toán từ API
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await apiOrderService.getPaymentMethods();
        if (response?.data?.data) {
          const methods = response.data.data;
          setPaymentMethods(methods);
          const defaultMethod = methods.find(
            (method) => method.is_default === true
          );
          setPaymentMethod(defaultMethod?.id || methods[0]?.id || "");
        }
      } catch (error) {
        console.error("Lỗi khi lấy phương thức thanh toán:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Thông tin người dùng:", userInfo);
    console.log("Phương thức vận chuyển:", shippingMethod);
    console.log("Phương thức thanh toán:", paymentMethod);

    setIsLoading(true); // Hiển thị loading
    try {
      const orderData = {
        user_id: user?.id,
        products: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        shipping_fee: 0,
        total_amount: getTotalPrice(),
        payment_method_id: paymentMethod,
      };

      const response = await apiOrderService.add(orderData);
      console.info(
        "===========[] ===========[response.status] : ",
        response.status
      );
      if (response.status === "success") {
        setCartItems([]);
        localStorage.removeItem("cart");
        if (paymentMethod !== 1) {
          try {
            let newData = {
              order_id: response?.data.data.id,
              url_return: "http://localhost:3000/checkout/success",
              amount: response?.data.data.sub_total,
              service_code: "hotel",
              url_callback: "http://localhost:3000/checkout/failure",
            };
            const responsePayment = await axios.post(
              "https://payment.template/api/v1/payment/add",
              newData
            );
            setIsLoading(false);
            console.info("===========[] ===========[123code] : ", response);
            window.location.href = responsePayment.data.link;
            return;
          } catch (err) {
            console.info("===========[] ===========[] : ", err);
          }
        }

        navigate("/");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Thanh toán thất bại:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tính tổng tiền tạm tính
  const getSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Tính thuế
  const calculateTax = (subtotal) => {
    return subtotal * taxRate;
  };

  const handlePaymentChange = (id) => {
    console.log("Phương thức thanh toán được chọn:", id);
    setPaymentMethod(id);
  };

  // Tính tổng tiền cuối cùng
  const calculateTotal = (subtotal, tax, shippingFee) => {
    return subtotal + tax + shippingFee - discountAmount;
  };

  // Xử lý khi người dùng nhấn "Áp dụng" mã giảm giá
  const handleApplyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscountAmount(getSubTotal() * 0.1); // Giảm 10%
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  const subtotal = getSubTotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax, shippingFee);

  // // Tính tổng tiền sản phẩm
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
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
