import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Dropdown, Table, Pagination } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import OrderBreadcrumbs from '../components/order/OrderBreadcrumbs';
import apiOrderService from "../../../api/apiOrderService";
import {FaEdit, FaListUl, FaPlusCircle, FaTrash} from "react-icons/fa";
import OrderDetailsModal from '../components/order/OrderDetailsModal';
import DeleteConfirmationModal from '../components/order/DeleteConfirmationModal';
import UpdateOrderStatus from '../components/order/UpdateOrderStatus';
import NewOrderModal from '../components/order/NewOrderModal';
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";

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
    const [showNewOrderModal, setShowNewOrderModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchOrdersWithParams = async (params) => {
        try {
            const response = await apiOrderService.getListsAdmin(params);
            setOrders(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchOrdersWithParams({ ...params, page: params.page || 1, page_size : params.page_size || 10 });
    }, [searchParams]);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    const handleDeleteData = async () => {
        try {
            await apiOrderService.delete(orderToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            await fetchOrdersWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
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
                        <h2>Quản lý đơn hàng</h2>
                        <Button size={'sm'} variant="primary" onClick={() => setShowNewOrderModal(true)}>
                            Thêm mới <FaPlusCircle className={'mx-1'} />
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã ĐH</th>
                            <th>Khách hàng</th>
                            <th>SĐT</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, idx) => (
                            <tr key={order.id} style={{ cursor: 'pointer' }}>
                                <td onClick={() => handleOrderClick(order)}>{idx + 1}</td>
                                <td onClick={() => handleOrderClick(order)}>{order.code}</td>
                                <td onClick={() => handleOrderClick(order)}>{order.user?.name}</td>
                                <td onClick={() => handleOrderClick(order)}>{order.user?.phone}</td>
                                <td onClick={() => handleOrderClick(order)}>{formatCurrency(order.sub_total)}</td>
                                <td onClick={() => handleOrderClick(order)}>
                                    <span className={`text-${getVariant(order.status)}`}>{order.status}</span>
                                </td>
                                <td>
                                    <Button size="sm" variant="primary" onClick={() => {}}
                                            title="Cập nhật">
                                        <FaEdit/>
                                    </Button>
                                    <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                                        setOrderToDelete(order);
                                        setShowDeleteModal(true);
                                    }} title="Xoá">
                                        <FaTrash/>
                                    </Button>
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
                        {Array.from({length: meta.total_page}, (_, index) => (
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

            <NewOrderModal
                show={showNewOrderModal}
                onHide={() => {
					setShowNewOrderModal(false);
					fetchOrdersWithParams({page: meta.page || 1});
				}}
            />
            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />
        </Container>
    );
};

export default OrderManager;
