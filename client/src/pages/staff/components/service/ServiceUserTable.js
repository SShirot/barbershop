import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const ServiceUserTable = ({ services, onComplete }) => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Badge bg="warning">Chờ duyệt</Badge>;
            case 'processing':
                return <Badge bg="success">Đã duyệt</Badge>;
            case 'completed':
                return <Badge bg="success">Đã hoàn thành</Badge>;
            case 'canceled':
                return <Badge bg="danger">Đã hủy</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const formatDate = (dateString) => {
        try {
            if (!dateString) return '';
            return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString || '';
        }
    };

    const formatTime = (timeString) => {
        try {
            if (!timeString) return '';
            const [hours, minutes] = timeString.split(':');
            return `${hours}:${minutes}`;
        } catch (error) {
            console.error('Error formatting time:', error);
            return timeString || '';
        }
    };

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên khách hàng</th>
                    <th>Dịch vụ</th>
                    <th>Ngày hẹn</th>
                    <th>Giờ hẹn</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {services.map((service) => (
                    <tr key={service.id}>
                        <td>{service.id}</td>
                        <td>{service.user_name}</td>
                        <td>{service.service_name}</td>
                        <td>{formatDate(service.date)}</td>
                        <td>{formatTime(service.time)}</td>
                        <td>{getStatusBadge(service.status)}</td>
                        <td>
                            {service.status === 'processing' && (
                                <Button 
                                    variant="success" 
                                    size="sm"
                                    onClick={() => onComplete(service.id)} 
                                >
                                    Hoàn thành
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ServiceUserTable;
