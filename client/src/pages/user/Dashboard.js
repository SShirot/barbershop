import React, {useEffect, useState} from 'react';
import apiDashboardService from "../../api/apiDashboardService";
import {Breadcrumb, Card, Col, Container, Nav, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaConciergeBell, FaDatabase, FaPencilAlt, FaUser} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import {Bar} from "react-chartjs-2";

const UserDashboard = () => {
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
        try {
            const response = await apiDashboardService.getDashboard({});
            console.info("===========[response] ===========[] : ",response);
            setStatistics(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchMonthlyRevenue = async () => {
        // Giả lập dữ liệu doanh thu theo tháng
        try {
            const response = await apiDashboardService.getFetchMonthlyRevenue({});
            console.info("===========[getFetchMonthlyRevenue] ===========[] : ",response);
            setMonthlyRevenueData(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchDailyRevenue = async () => {
        // Giả lập dữ liệu doanh thu theo ngày
        try {
            const response = await apiDashboardService.getFetchDailyRevenue({});
            console.info("===========[getFetchDailyRevenue] ===========[] : ",response);
            setDailyRevenueData(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchNewMembers = async () => {
        try {
            const response = await apiDashboardService.getFetchNewUser({});
            console.info("===========[getFetchDailyRevenue] ===========[] : ",response);
            setNewMembers(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchNewOrders = async () => {
        // Giả lập danh sách đơn hàng mới
        try {
            const response = await apiDashboardService.getFetchNewOrder({});
            console.info("===========[getFetchDailyRevenue] ===========[] : ",response);
            setNewOrders(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
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
                            <Nav.Link as={Link} to="/user">User</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tổng số đơn hàng</Card.Title>
                            <Card.Text className={'d-flex align-items-center justify-content-center'}>
                                <FaCartShopping />
                                <span className={'m-lg-2'}>{statistics?.totalOrders}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tổng số dịch vụ</Card.Title>
                            <Card.Text className={'d-flex align-items-center justify-content-center'}>
                                <FaConciergeBell />
                                <span className={'m-lg-2'}>{statistics?.totalService}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Biểu đồ mua hàng các ngày trong tháng</Card.Title>
                            <Bar data={dailyRevenueData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDashboard;
