import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Image } from 'react-bootstrap';
import Select from 'react-select';
import apiCustomerService from "../../../../api/apiCustomerService";
import apiOrderService from "../../../../api/apiOrderService";
import apiProductService from "../../../../api/apiProductService";
import { FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const NewOrderModal = ({ show, onHide, orderToUpdate, refreshOrders }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleProductChange = (selectedOptions) => {
        const updatedProducts = selectedOptions.map(option => ({
            ...option,
            quantity: 1
        }));
        setSelectedProducts(updatedProducts);
        updateTotal(updatedProducts);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiCustomerService.getLists({ page: 1, page_size: 1000 });
                if (response.data.data) {
                    const userOptions = response.data.data.map(user => ({
                        value: user.id,
                        label: user.name
                    }));
                    setUsers(userOptions);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await apiProductService.getLists({ page: 1, page_size: 1000 });
                if (response.data.data) {
                    const productOptions = response.data.data.map(product => ({
                        value: product.id,
                        label: product.name,
                        price: product.price,
                        avatar: product.avatar,
                    }));
                    setProducts(productOptions);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (orderToUpdate && Object.keys(orderToUpdate).length > 0) {
            setUser({ value: orderToUpdate.user?.id, label: orderToUpdate.user.name });
            setShippingFee(orderToUpdate.total_shipping_fee);
            setTotalAmount(orderToUpdate.sub_total);
            setSelectedProducts(orderToUpdate.products.map(product => ({
                value: product.id,
                label: product.name,
                price: product.price,
                quantity: product.quantity
            })));
        } else {
            setUser(null);
            setShippingFee(0);
            setTotalAmount(0);
            setSelectedProducts([]);
        }
    }, [orderToUpdate]);

    const handleQuantityChange = (productId, quantity) => {
        const updatedProducts = selectedProducts.map((product) =>
            product.value === productId ? { ...product, quantity: parseInt(quantity) } : product
        );
        setSelectedProducts(updatedProducts);
        updateTotal(updatedProducts);
    };

    const removeProduct = (productId) => {
        const updatedProducts = selectedProducts.filter((product) => product.value !== productId);
        setSelectedProducts(updatedProducts);
        updateTotal(updatedProducts);
    };

    const updateTotal = (products) => {
        const productsTotal = products.reduce(
            (sum, product) => sum + product.price * (product.quantity || 1),
            0
        );
        const validShippingFee = parseFloat(shippingFee) || 0;
        setTotalAmount(productsTotal + validShippingFee);
    };

    const handleShippingFeeChange = (value) => {
        const fee = parseFloat(value) || 0;
        setShippingFee(fee);
        updateTotal(selectedProducts);
    };

    const handleSaveOrder = async () => {
        const orderData = {
            user_id: user.value,
            products: selectedProducts.map((p) => ({ id: p.value, quantity: p.quantity || 1 })),
            shipping_fee: shippingFee,
            total_amount: totalAmount,
            payment_method_id: 1,
        };
        if (orderToUpdate && Object.keys(orderToUpdate).length > 0) {
            await apiOrderService.updateOrder(orderToUpdate.id, orderData);
        } else {
            await apiOrderService.createOrder(orderData);
        }

        await refreshOrders(); // Gọi hàm refreshOrders sau khi lưu thành công
        onHide();
    };

    return (
        <Modal show={show} size="lg" onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{orderToUpdate && Object.keys(orderToUpdate).length > 0 ? "Cập nhật đơn hàng" : "Thêm mới đơn hàng"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Khách hàng</Form.Label>
                    <Select
                        value={user}
                        onChange={setUser}
                        options={users}
                        placeholder="Chọn khách hàng"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Sản phẩm</Form.Label>
                    <Select
                        isMulti
                        value={selectedProducts}
                        onChange={handleProductChange}
                        options={products}
                        placeholder="Chọn sản phẩm"
                    />
                </Form.Group>
                <Table responsive>
                    <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Hình ảnh</th>
                        <th style={{ width: '30%' }}>Tên sản phẩm</th>
                        <th style={{ width: '10%' }}>Số lượng</th>
                        <th style={{ width: '15%' }}>Đơn giá</th>
                        <th style={{ width: '15%' }}>Tổng tiền</th>
                        <th style={{ width: '10%' }}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedProducts.map((product) => (
                        <tr key={product.value}>
                            <td>
                                <Image src={product.avatar || "https://via.placeholder.com/150"} alt="Product" rounded style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{product.label}</td>
                            <td>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={product.quantity || 1}
                                    onChange={(e) => handleQuantityChange(product.value, e.target.value)}
                                />
                            </td>
                            <td>{formatCurrency(product.price)}</td>
                            <td>{formatCurrency(product.price * (product.quantity || 1))}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => removeProduct(product.value)}>
                                    <FaTrashAlt />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Form.Group className="mb-3">
                    <Form.Label>Phí vận chuyển</Form.Label>
                    <Form.Control
                        type="number"
                        value={shippingFee}
                        onChange={(e) => handleShippingFeeChange(e.target.value)}
                    />
                </Form.Group>
                <h4>Tổng cộng: {formatCurrency(totalAmount)}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="danger" onClick={onHide} className="d-flex justify-content-between align-items-center">
                    Huỷ bỏ <FaTimes />
                </Button>
                <Button size="sm" variant="primary" onClick={handleSaveOrder} className="d-flex justify-content-between align-items-center">
                    {orderToUpdate && Object.keys(orderToUpdate).length > 0 ? "Cập nhật đơn hàng" : "Lưu đơn hàng"} <FaSave className="ms-2" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewOrderModal;
