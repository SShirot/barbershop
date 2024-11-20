import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, Container, Nav, Row, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import serviceService from "../../api/serviceService";
import dashboardService from "../../api/dashboardService";
import {FaDatabase, FaPencilAlt, FaUser} from "react-icons/fa";
import {FaCartShopping, FaPencil} from "react-icons/fa6";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalArticles: 0
    });

    // Khởi tạo dữ liệu biểu đồ với cấu trúc mặc định
    const [monthlyRevenueData, setMonthlyRevenueData] = useState({
        labels: [],
        datasets: [{ label: 'Revenue', data: [] }]
    });

    const [dailyRevenueData, setDailyRevenueData] = useState({
        labels: [],
        datasets: [{ label: 'Daily Revenue', data: [] }]
    });

    const [newMembers, setNewMembers] = useState([]);
    const [newOrders, setNewOrders] = useState([]);

    useEffect(() => {
        // Gọi các hàm để lấy dữ liệu cần thiết
        fetchStatistics();
        fetchMonthlyRevenue();
        fetchDailyRevenue();
        fetchNewMembers();
        fetchNewOrders();
    }, []);

    const fetchStatistics = async () => {
        // Giả lập dữ liệu thống kê
        // setStatistics({
        //     totalMembers: 1200,
        //     totalOrders: 320,
        //     totalProducts: 450,
        //     totalArticles: 300
        // });

        try {
            const response = await dashboardService.getDashboard({});
            console.info("===========[response] ===========[] : ",response);
            setStatistics(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchMonthlyRevenue = async () => {
        // Giả lập dữ liệu doanh thu theo tháng
        try {
            const response = await dashboardService.getFetchMonthlyRevenue({});
            console.info("===========[getFetchMonthlyRevenue] ===========[] : ",response);
            setMonthlyRevenueData(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchDailyRevenue = async () => {
        // Giả lập dữ liệu doanh thu theo ngày
        try {
            const response = await dashboardService.getFetchDailyRevenue({});
            console.info("===========[getFetchDailyRevenue] ===========[] : ",response);
            setDailyRevenueData(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchNewMembers = async () => {
        try {
            const response = await dashboardService.getFetchNewUser({});
            console.info("===========[getFetchDailyRevenue] ===========[] : ",response);
            setNewMembers(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchNewOrders = async () => {
        // Giả lập danh sách đơn hàng mới
        try {
            const response = await dashboardService.getFetchNewOrder({});
            console.info("===========[getFetchDailyRevenue] ===========[] : ",response);
            setNewOrders(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
        // setNewOrders([
        //     { id: 1, orderNumber: 'ORD001', customer: 'John Doe', totalAmount: '$500', date: '2024-10-30' },
        //     { id: 2, orderNumber: 'ORD002', customer: 'Jane Smith', totalAmount: '$300', date: '2024-10-29' },
        // ]);
    };

    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tổng số thành viên</Card.Title>
                            <Card.Text className={'d-flex align-items-center justify-content-center'}>
                                <FaUser />
                                <span className={'m-lg-2'}>{statistics.totalUsers}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tổng số đơn hàng</Card.Title>
                            <Card.Text className={'d-flex align-items-center justify-content-center'}>
                                <FaCartShopping />
                                <span className={'m-lg-2'}>{statistics.totalOrders}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tổng số sản phẩm</Card.Title>
                            <Card.Text className={'d-flex align-items-center justify-content-center'}>
                                <FaDatabase />
                                <span className={'m-lg-2'}>{statistics.totalProducts}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tổng số bài viết</Card.Title>
                            <Card.Text className={'d-flex align-items-center justify-content-center'}>
                                <FaPencilAlt />
                                <span className={'m-lg-2'}>{statistics.totalArticles}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Biểu đồ doanh thu theo tháng</Card.Title>
                            <Bar data={monthlyRevenueData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Biểu đồ doanh thu các ngày trong tháng</Card.Title>
                            <Bar data={dailyRevenueData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Danh sách thành viên mới</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Joined Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {newMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td>{member.id}</td>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.joinedDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Danh sách đơn hàng mới</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    {/*<th>Order Number</th>*/}
                                    {/*<th>Customer</th>*/}
                                    <th>Total Amount</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {newOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        {/*<td>{order.orderNumber}</td>*/}
                                        {/*<td>{order.customer}</td>*/}
                                        <td>{order.totalAmount}</td>
                                        <td>{order.date}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
