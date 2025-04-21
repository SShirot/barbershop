import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import calendarService from '../../../services/calendarService';
import { useSelector } from 'react-redux';

const RegisterSchedule = () => {
  const user = useSelector((state) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    // Fetch available shifts
    const fetchShifts = async () => {
      try {
        console.log('Fetching shifts...');
        const response = await calendarService.getShifts();
        console.log('Shifts response:', response);
        if (response && response.data) {
          setShifts(response.data);
        } else {
          console.error('Invalid shifts response:', response);
          toast.error('Không thể tải danh sách ca làm việc');
        }
      } catch (error) {
        console.error('Error fetching shifts:', error);
        toast.error('Không thể tải danh sách ca làm việc');
      }
    };
    fetchShifts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting schedule with data:', {
        staff_id: user.id,
        work_date: selectedDate,
        shift_id: selectedShift
      });

      const scheduleData = {
        staff_id: user.id,
        work_date: selectedDate,
        shift_id: selectedShift
      };

      const response = await calendarService.createWorkSchedule(scheduleData);
      console.log('Create schedule response:', response);
      
      if (response && response.data) {
        toast.success('Đăng ký lịch làm việc thành công!');
        // Reset form
        setSelectedDate('');
        setSelectedShift('');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi đăng ký lịch làm việc');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Đăng Ký Lịch Làm Việc</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày làm việc</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ca làm việc</Form.Label>
                  <Form.Select
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                    required
                  >
                    <option value="">Chọn ca làm việc</option>
                    {shifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.name} ({shift.start_time} - {shift.end_time})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Đang xử lý...' : 'Đăng Ký Lịch'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterSchedule; 