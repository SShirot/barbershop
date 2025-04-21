import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import calendarService from '../../../services/calendarService';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const StaffRegisterView = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            console.log('Fetching staff requests...');
            const response = await calendarService.getStaffRequests();
            console.log('Received staff requests:', response);
            // Kiểm tra và đảm bảo response.data là một mảng
            setRequests(Array.isArray(response?.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast.error('Không thể tải danh sách yêu cầu đăng ký lịch');
            setRequests([]); // Reset về mảng rỗng nếu có lỗi
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            console.log('=== Approve Request Flow ===');
            console.log('1. Frontend - Starting approve request for ID:', requestId);
            
            const response = await calendarService.approveRequest(requestId);
            console.log('2. Frontend - Received response from approve API:', response);
            
            toast.success('Đã phê duyệt yêu cầu');
            console.log('3. Frontend - Refreshing requests list...');
            await fetchRequests();
            console.log('4. Frontend - Requests list refreshed');
        } catch (error) {
            console.error('Error in handleApprove:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            toast.error('Không thể phê duyệt yêu cầu');
        }
    };

    const handleReject = async (requestId) => {
        try {
            console.log('Rejecting request:', requestId);
            const response = await calendarService.rejectRequest(requestId);
            console.log('Reject response:', response);
            toast.success('Đã từ chối yêu cầu');
            fetchRequests();
        } catch (error) {
            console.error('Error rejecting request:', error);
            toast.error('Không thể từ chối yêu cầu');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Badge bg="warning">Chờ duyệt</Badge>;
            case 'approved':
                return <Badge bg="success">Đã duyệt</Badge>;
            case 'rejected':
                return <Badge bg="danger">Đã từ chối</Badge>;
            default:
                return <Badge bg="secondary">Không xác định</Badge>;
        }
    };

    const formatDate = (dateString) => {
        try {
            console.log('Formatting date:', dateString);
            if (!dateString) {
                console.log('Date string is empty or null');
                return '-';
            }
            
            // Parse the ISO date string and adjust for timezone
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.log('Invalid date:', dateString);
                return '-';
            }

            // Format the date to YYYY-MM-DD first to remove time component
            const formattedDate = date.toISOString().split('T')[0];
            console.log('Formatted date string:', formattedDate);
            
            // Then format it to the desired display format
            return format(new Date(formattedDate), 'dd/MM/yyyy', { locale: vi });
        } catch (error) {
            console.error('Error formatting date:', error, 'for date string:', dateString);
            return '-';
        }
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Danh sách yêu cầu đăng ký lịch</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Nhân viên</th>
                                        <th>Ngày làm việc</th>
                                        <th>Ca làm việc</th>
                                        <th>Thời gian</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                Đang tải...
                                            </td>
                                        </tr>
                                    ) : requests.length > 0 ? (
                                        requests.map(request => (
                                            <tr key={request.id}>
                                                <td>{request.staff_name || '-'}</td>
                                                <td>{formatDate(request.work_date)}</td>
                                                <td>{request.shift_name || '-'}</td>
                                                <td>
                                                    {request.start_time && request.end_time 
                                                        ? `${request.start_time} - ${request.end_time}`
                                                        : '-'
                                                    }
                                                </td>
                                                <td>{getStatusBadge(request.status)}</td>
                                                <td>
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                variant="success"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => handleApprove(request.id)}
                                                            >
                                                                Duyệt
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => handleReject(request.id)}
                                                            >
                                                                Từ chối
                                                            </Button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                Không có yêu cầu nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StaffRegisterView; 