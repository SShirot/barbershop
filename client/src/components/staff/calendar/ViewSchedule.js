import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import workScheduleService from '../../../api/workScheduleService';
import { useSelector } from 'react-redux';

const ViewSchedule = () => {
  const user = useSelector((state) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchSchedules();
    }
  }, [selectedDate]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      console.log('Fetching schedules for:', { staffId: user.id, date: selectedDate });
      const response = await workScheduleService.getStaffSchedule(user.id, selectedDate);
      console.log('Raw API response:', response);
      
      // Kiểm tra cấu trúc dữ liệu
      if (response && response.data) {
        console.log('Schedule data:', response.data);
        // Đảm bảo dữ liệu là một mảng
        const scheduleArray = Array.isArray(response.data) ? response.data : [response.data];
        setSchedules(scheduleArray);
      } else {
        console.log('No schedule data found');
        setSchedules([]);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi tải lịch làm việc');
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success">Đã duyệt</span>;
      case 'pending':
        return <span className="badge bg-warning">Chờ duyệt</span>;
      case 'rejected':
        return <span className="badge bg-danger">Đã từ chối</span>;
      default:
        return <span className="badge bg-secondary">Không xác định</span>;
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Xem Lịch Làm Việc</h4>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Label>Chọn ngày</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-25"
                />
              </Form.Group>

              {loading ? (
                <div className="text-center">Đang tải...</div>
              ) : schedules.length > 0 ? (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Ca làm việc</th>
                      <th>Thời gian</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((schedule, index) => (
                      <tr key={schedule.id || index}>
                        <td>{schedule.shift_name || 'Không có tên ca'}</td>
                        <td>
                          {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                        </td>
                        <td>{getStatusBadge(schedule.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted">
                  {selectedDate ? 'Không có lịch làm việc cho ngày này' : 'Vui lòng chọn ngày để xem lịch làm việc'}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewSchedule; 