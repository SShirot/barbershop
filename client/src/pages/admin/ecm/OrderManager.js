import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ButtonGroup, Dropdown, Table, Pagination } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import OrderBreadcrumbs from '../components/order/OrderBreadcrumbs';
import apiOrderService from "../../../api/apiOrderService";
import { FaListUl } from "react-icons/fa";
import OrderDetailsModal from '../components/order/OrderDetailsModal';
import DeleteConfirmationModal from '../components/order/DeleteConfirmationModal';
import UpdateOrderStatus from '../components/order/UpdateOrderStatus';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchOrdersWithParams = async (params) => {
        try {
            const response = await apiOrderService.getListsAdmin(params);
            setOrders(response.data.orders);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchOrdersWithParams({ ...params, page: params.page || 1 });
    }, [searchParams]);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    const handleDeleteOrder = async () => {
        try {
            await apiOrderService.deleteOrder(orderToDelete._id);
            setOrders((prevOrders) => prevOrders?.filter((order) => order._id !== orderToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const getVariant = (status) => {
        switch (status) {
            case 'pending':
                return 'primary';
            case 'completed':
                return 'success';
            case 'canceled':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <OrderBreadcrumbs />
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Orders</h2>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Customer Phone</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, idx) => (
                            <tr key={order._id} style={{ cursor: 'pointer' }}>
                                <td onClick={() => handleOrderClick(order)}>{idx + 1}</td>
                                <td onClick={() => handleOrderClick(order)}>{order.guestInfo?.name}</td>
                                <td onClick={() => handleOrderClick(order)}>{order.guestInfo?.phone}</td>
                                <td onClick={() => handleOrderClick(order)}>{formatCurrency(order.totalAmount)}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <>
                                            {order.status !== 'completed' && (
                                                <UpdateOrderStatus orderId={order._id} currentStatus={order.status} />
                                            )}
                                            {order.status === 'completed' && (
                                                <span className={'btn btn-sm btn-success'}>completed</span>
                                            )}
                                        </>
                                    ) : (
                                        <span className={`btn btn-sm btn-${getVariant(order.status)}`}>{order.status}</span>
                                    )}

                                </td>
                                <td>
                                    {user.role === 'admin' && (
                                        <>
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                                    <FaListUl />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item disabled={order.status === 'completed'} onClick={() => {
                                                        setOrderToDelete(order);
                                                        setShowDeleteModal(true);
                                                    }}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={meta.page === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(meta.page - 1)}
                            disabled={meta.page === 1}
                        />
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(meta.page + 1)}
                            disabled={meta.page === meta.total_page}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(meta.total_page)}
                            disabled={meta.page === meta.total_page}
                        />
                    </Pagination>
                </Col>
            </Row>

            <OrderDetailsModal
                show={showOrderModal}
                onHide={() => setShowOrderModal(false)}
                order={selectedOrder}
            />

            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteOrder}
            />
        </Container>
    );
};

export default OrderManager;
