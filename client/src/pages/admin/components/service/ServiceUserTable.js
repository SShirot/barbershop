import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Form } from 'react-bootstrap';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FaTrash } from 'react-icons/fa';
import apiHelper from '../../../../api/apiHelper';
import toastr from 'toastr';

const ServiceUserTable = ({ services, onApprove, onReject, onComplete, setServiceToDelete, setShowDeleteModal }) => {
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState({});
    const [selectedService, setSelectedService] = useState(null);
    useEffect(() => {
        if (selectedService?.date && selectedService?.time) {
            fetchStaffList(selectedService.date, selectedService.time);
        }
    }, [selectedService]);
    
    const handleServiceClick = (service) => {
            
        setSelectedService(service);
        
      };

    const fetchStaffList = async (date, time) => {
        console.log('Fetching staff list for date:', date, 'and time:', time);

        if (!date || !time) return;
        console.log('Fetching staff list for date:', date, 'and time:', time);
        try {
          const formattedDate = format(new Date(date), "yyyy-MM-dd");
          const formattedTime = time.length === 5 ? `${time}:00` : time;
          console.log('Fetching staff list for date:', formattedDate, 'and time:', formattedTime);

          
          const response = await apiHelper.get(`/user/staff-list/by-date`, {
            params: {
              date: formattedDate,
              time: formattedTime,
            },
          });
      
          if (response?.data) {
            if (Array.isArray(response.data)) {
                setStaffList(response.data);
            }
            else if (response.data.data) {
                setStaffList(response.data.data);
            }
            else {
                setStaffList([]);
            }
        }
          console.log("Staff list received:", response.data?.data);
          console.log("Full API response:", response);

        } catch (error) {
          console.error("Lỗi khi lấy danh sách thợ:", error);
          toastr.error("Không thể tải danh sách nhân viên", "Lỗi");
          setStaffList([]);
        }
      };
    

    // const fetchServiceUser = async () => {
    //     try {
    //         await apiHelper.get('/admin/assigned-services/services-user')
    //             .then(response => {
    //                 console.log('service user list response:', response);
    //             })
    //             .catch(error => {
    //                 console.error("Error fetching service user:", error);
    //                 toastr.error(error.response?.data?.message || "Không thể tải danh sách đặt lịch", "Lỗi");
    //                 setServiceUser([]);
    //             });
    //     } catch (error) {
    //         console.error("Error in fetchServiceUser:", error);
    //         setServiceUser([]);
    //     }
    // };

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

    const handleStaffChange = (serviceId, staffId) => {
        console.log('Staff changed for service:', serviceId, 'New staff ID:', staffId);
        setSelectedStaff(prev => ({
            ...prev,
            [serviceId]: staffId
        }));
    };

    const handleApproveWithStaff = async (serviceId) => {
        const staffId = selectedStaff[serviceId];
        console.log('Approving service:', serviceId, 'with staff:', staffId);
        if (!staffId) {
            toastr.warning("Vui lòng chọn nhân viên trước khi duyệt", "Cảnh báo");
            return;
        }
        onApprove(serviceId, staffId);
    };

    const handleComplete = async (serviceId) => {
        const staffId = selectedStaff[serviceId];
        console.log('Completing service:', serviceId, 'with staff:', staffId);
        if (!staffId) {
            toastr.warning("Vui lòng chọn nhân viên trước khi hoàn thành", "Cảnh báo");
            return; 
        }
        onComplete(serviceId, staffId);
    };
    
    const formatDate = (dateString) => {
        try {
            if (!dateString) return '';
            const formattedDate = format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
            return formattedDate;
        } catch (error) {
            console.error('Error formatting date:', error);
            console.error('Original date string:', dateString);
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
            console.error('Original time string:', timeString);
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
                    <th>Thợ cắt</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
            {services.map((service) => {
                console.log('Service data:', service); // Log dữ liệu mỗi dòng
                return (
                    <tr key={service.id}>
                        <td>{service.id}</td>
                        <td>{service.user_name}</td>
                        <td>{service.service_name}</td>
                        <td>{formatDate(service.date)}</td>
                        <td>{formatTime(service.time)}</td>
                        <td>
                        <Form.Select
                            size="sm"
                            value={service.staff_id || selectedStaff[service.id] || ''}
                            disabled={['canceled', 'processing', 'completed'].includes(service.status)}
                            onClick={() => handleServiceClick(service)} // Chỉ gọi API khi chưa có staff
                            onChange={(e) => handleStaffChange(service.id, e.target.value)}
                        >
                            <option value="">Chọn nhân viên...</option>
                            {service.staff_name ? (  // Nếu staff_name đã có, không cần gọi API
                                <option value={service.staff_id} selected>
                                    {service.staff_name}
                                </option>
                            ) : (
                                Array.isArray(staffList) && staffList.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.name}
                                    </option>
                                ))
                            )}
                        </Form.Select>

                        </td>
                        <td>{getStatusBadge(service.status)}</td>
                        <td>
                            {service.status === 'pending' && (
                                <div className="d-flex gap-2">
                                    <Button 
                                        variant="success" 
                                        size="sm"
                                        onClick={() => {
                                            service.staff_id 
                                                ? onApprove(service.id, service.staff_id) 
                                                : handleApproveWithStaff(service.id);
                                        }}
                                        
                                    >
                                        Duyệt
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => onReject(service.id)}
                                    >
                                        Từ chối
                                    </Button>
                                    <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                                        setServiceToDelete(service);
                                        setShowDeleteModal(true);
                                        }} title="Xoá">
                                        <FaTrash/>
                                    </Button>
                                </div>
                            )}
                            {service.status === 'processing' && (
                                <div className="d-flex gap-2">
                                    <Button 
                                        variant="success" 
                                        size="sm"
                                        onClick={() => {
                                            service.staff_name 
                                                ? onComplete(service.id) 
                                                : handleComplete(service.id);
                                        }}
                                        
                                    >
                                        Hoàn thành
                                    </Button>
                                </div>
                            )}

                        </td>

                    </tr>
                );
            })}
            </tbody>
        </Table>
    );
};

export default ServiceUserTable;
