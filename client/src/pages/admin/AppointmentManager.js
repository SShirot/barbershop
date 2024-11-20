import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    Breadcrumb,
    Nav,
    ButtonGroup,
    Dropdown,
    Badge,
    Pagination
} from 'react-bootstrap';
import appointmentService from './../../api/appointmentService';
import { Link } from "react-router-dom";
import moment from "moment/moment";
import {FaListUl} from "react-icons/fa";

const AppointmentManager = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [filters, setFilters] = useState({});

    const fetchAppointments = async (page = 1) => {
        try {
            // Tạo object params, bao gồm trang hiện tại và các bộ lọc khác nếu có
            const params = {
                page,
                ...filters, // Bao gồm tất cả các filters hiện tại (nếu có)
            };

            const response = await appointmentService.getAppointmentsAdmin(params); // Gửi params đến API
            setAppointments(response.data.appointments); // Cập nhật danh sách cuộc hẹn
            setTotalPages(response.data.meta.total_page); // Cập nhật tổng số trang từ meta
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments(currentPage); // Gọi API khi currentPage thay đổi
    }, [currentPage]);

    const handleConfirm = async (id) => {
        try {
            await appointmentService.confirmAppointment(id);
            fetchAppointments(); // Cập nhật danh sách sau khi xác nhận
        } catch (error) {
            console.error("Error confirming appointment:", error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await appointmentService.cancelAppointment(id);
            fetchAppointments(); // Cập nhật danh sách sau khi hủy
        } catch (error) {
            console.error("Error canceling appointment:", error);
        }
    };

    const handleComplete = async (id) => {
        try {
            await appointmentService.completeAppointment(id);
            fetchAppointments(); // Cập nhật danh sách sau khi hoàn thành
        } catch (error) {
            console.error("Error completing appointment:", error);
        }
    };

    const handlePending = async (id) => {
        try {
            await appointmentService.pendingAppointment(id);
            fetchAppointments(); // Cập nhật danh sách sau khi chuyển sang chờ xác nhận
        } catch (error) {
            console.error("Error setting appointment to pending:", error);
        }
    };

    // Hàm để xác định màu sắc của label dựa trên trạng thái
    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'confirmed':
                return 'success';
            case 'canceled':
                return 'danger';
            case 'completed':
                return 'primary';
            default:
                return 'secondary';
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                            <Nav.Link as={Link} to="/admin/appointments">Appointments</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Appointments</h2>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Home Visit</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td>{index + 1}</td>
                                <td>{appointment?.user?.name || 'N/A'}</td>
                                {/* Nếu user là null, hiển thị 'N/A' */}
                                <td>{appointment?.service?.name}</td>
                                <td>{moment(appointment.date).format('HH:mm DD-MM-YYYY')}</td>
                                <td>{appointment.isHomeVisit ? 'Yes' : 'No'}</td>
                                <td>{appointment.address || 'N/A'}</td>
                                {/* Nếu address là null, hiển thị 'N/A' */}
                                <td>
                                    <Badge bg={getStatusBadgeVariant(appointment.status)}>
                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </Badge>
                                </td>
                                <td>
                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                                            <FaListUl/>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleConfirm(appointment._id)}>Confirm</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleCancel(appointment._id)}>Cancel</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleComplete(appointment._id)}>Complete</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handlePending(appointment._id)}>Set to Pending</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {/* Bộ phân trang */}
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, idx) => (
                            <Pagination.Item
                                key={idx + 1}
                                active={currentPage === idx + 1}
                                onClick={() => handlePageChange(idx + 1)}
                            >
                                {idx + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default AppointmentManager;
