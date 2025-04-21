import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Badge, Table } from 'react-bootstrap';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import calendarService from '../../../services/calendarService';
import { toast } from 'react-toastify';

const locales = {
    'vi': vi,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [staffList, setStaffList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStaffList();
    }, []);

    useEffect(() => {
        if (selectedStaff) {
            fetchCalendarEvents();
        }
    }, [selectedStaff]);

    const fetchStaffList = async () => {
        try {
            console.log('1. Starting fetchStaffList...');
            const staffData = await calendarService.getStaffList();
            console.log('2. Raw API response:', staffData);
            
            if (Array.isArray(staffData)) {
                console.log('3. Valid staff array found, length:', staffData.length);
                setStaffList(staffData);
            } else {
                console.log('3. Invalid staff data:', {
                    hasData: !!staffData,
                    dataType: typeof staffData
                });
                setStaffList([]);
                toast.error('Dữ liệu nhân viên không hợp lệ');
            }
        } catch (error) {
            console.error('Error in fetchStaffList:', {
                error,
                message: error.message,
                response: error.response
            });
            toast.error('Không thể tải danh sách nhân viên');
            setStaffList([]);
        }
    };

    const fetchCalendarEvents = async () => {
        if (!selectedStaff) {
            toast.warning('Vui lòng chọn nhân viên');
            return;
        }

        try {
            setLoading(true);
            console.log('1. Fetching calendar events for staff:', selectedStaff);

            // Tính toán date range cho tháng hiện tại
            const today = new Date();
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const startDate = format(firstDay, 'yyyy-MM-dd');
            const endDate = format(lastDay, 'yyyy-MM-dd');

            console.log('2. Date range:', { startDate, endDate });
            
            const response = await calendarService.getStaffSchedule(selectedStaff, startDate, endDate);
            console.log('3. Calendar API response:', response);
            
            // Update the check to handle array response
            if (Array.isArray(response)) {
                const scheduleData = response;
                console.log('4. Raw schedule data:', scheduleData);
                
                // Chuyển đổi dữ liệu lịch thành format cho calendar
                const calendarEvents = scheduleData.map(schedule => {
                    try {
                        // Log raw date and time data
                        console.log('Raw schedule date/time:', {
                            work_date: schedule.work_date,
                            start_time: schedule.start_time,
                            end_time: schedule.end_time
                        });

                        // Parse work_date (lấy ngày từ ISO string)
                        const workDate = new Date(schedule.work_date);
                        
                        // Parse start time
                        const [startHour, startMinute] = (schedule.start_time || '00:00').split(':').map(Number);
                        const start = new Date(
                            workDate.getFullYear(),
                            workDate.getMonth(),
                            workDate.getDate(),
                            startHour,
                            startMinute
                        );

                        // Parse end time
                        const [endHour, endMinute] = (schedule.end_time || '23:59').split(':').map(Number);
                        const end = new Date(
                            workDate.getFullYear(),
                            workDate.getMonth(),
                            workDate.getDate(),
                            endHour,
                            endMinute
                        );

                        console.log('Parsed dates:', {
                            workDate: workDate.toISOString(),
                            start: start.toISOString(),
                            end: end.toISOString()
                        });

                        return {
                            id: schedule.id,
                            title: `Ca: ${schedule.shift_name || 'Chưa có tên'}`,
                            start,
                            end,
                            staff_name: schedule.staff_name || 'Chưa có tên',
                            shift_name: schedule.shift_name || 'Sáng',
                            status: schedule.status || 'pending',
                            allDay: false,
                            resource: {
                                staff_id: schedule.staff_id,
                                shift_id: schedule.shift_id
                            }
                        };
                    } catch (error) {
                        console.error('Error parsing date for schedule:', schedule, error);
                        return null;
                    }
                }).filter(event => event !== null);
                
                console.log('5. Formatted calendar events:', calendarEvents);
                if (calendarEvents.length > 0) {
                    console.log('6. First event example:', {
                        ...calendarEvents[0],
                        start: calendarEvents[0].start.toISOString(),
                        end: calendarEvents[0].end.toISOString()
                    });
                }
                setEvents(calendarEvents);
            } else {
                console.log('4. Invalid schedule data structure:', {
                    hasResponse: !!response,
                    hasData: !!response?.data,
                    hasDataArray: !!response?.data?.data,
                    isArray: Array.isArray(response?.data?.data),
                    actualData: response?.data
                });
                setEvents([]);
                toast.error('Dữ liệu lịch không hợp lệ');
            }
        } catch (error) {
            console.error('Error fetching calendar events:', {
                error,
                message: error.message,
                response: error.response,
                stack: error.stack
            });
            toast.error('Không thể tải lịch làm việc');
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Events state updated:', events);
    }, [events]);

    const handleEventClick = (event) => {
        console.log('Clicked event:', event);
        setSelectedEvent(event);
        setShowEventModal(true);
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = '#ffc107'; // Default color

        switch(event.status) {
            case 'approved':
                backgroundColor = '#28a745';
                break;
            case 'rejected':
                backgroundColor = '#dc3545';
                break;
            case 'pending':
                backgroundColor = '#ffc107';
                break;
            default:
                backgroundColor = '#6c757d';
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    const handleCloseModal = () => {
        setShowEventModal(false);
        setSelectedEvent(null);
    };

    const handleApproveSchedule = async (scheduleId) => {
        try {
            setLoading(true);
            await calendarService.approveRequest(scheduleId);
            toast.success('Đã duyệt ca làm việc');
            handleCloseModal();
            await fetchCalendarEvents();
        } catch (error) {
            console.error('Error approving schedule:', error);
            toast.error('Không thể duyệt ca làm việc');
        } finally {
            setLoading(false);
        }
    };

    const handleRejectSchedule = async (scheduleId) => {
        try {
            setLoading(true);
            await calendarService.rejectRequest(scheduleId);
            toast.success('Đã từ chối ca làm việc');
            handleCloseModal();
            await fetchCalendarEvents();
        } catch (error) {
            console.error('Error rejecting schedule:', error);
            toast.error('Không thể từ chối ca làm việc');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        let variant = 'secondary';
        let text = 'Chưa xác định';

        switch(status) {
            case 'approved':
                variant = 'success';
                text = 'Đã duyệt';
                break;
            case 'rejected':
                variant = 'danger';
                text = 'Đã từ chối';
                break;
            case 'pending':
                variant = 'warning';
                text = 'Đang chờ duyệt';
                break;
            default:
                break;
        }

        return <Badge bg={variant}>{text}</Badge>;
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={8}>
                                    <Form.Group>
                                        <Form.Label>Chọn nhân viên</Form.Label>
                                        <Form.Select
                                            value={selectedStaff}
                                            onChange={(e) => setSelectedStaff(e.target.value)}
                                        >
                                            <option value="">Chọn nhân viên...</option>
                                            {staffList.map(staff => (
                                                <option key={staff.id} value={staff.id}>
                                                    {staff.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="d-flex align-items-end">
                                    <Button 
                                        variant="primary" 
                                        onClick={fetchCalendarEvents}
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang tải...' : 'Tải lại'}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                                onSelectEvent={handleEventClick}
                                eventPropGetter={eventStyleGetter}
                                defaultView="month"
                                messages={{
                                    next: "Tiếp",
                                    previous: "Trước",
                                    today: "Hôm nay",
                                    month: "Tháng",
                                    week: "Tuần",
                                    day: "Ngày",
                                    agenda: "Lịch",
                                    date: "Ngày",
                                    time: "Giờ",
                                    event: "Sự kiện",
                                    noEventsInRange: "Không có sự kiện nào trong khoảng thời gian này."
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showEventModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết ca làm việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <div>
                            <Row className="mb-3">
                                <Col>
                                    <h5>Thông tin ca làm</h5>
                                    <Table borderless size="sm">
                                        <tbody>
                                            <tr>
                                                <td><strong>Ca:</strong></td>
                                                <td>{selectedEvent.shift_name}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Thời gian:</strong></td>
                                                <td>
                                                    {format(selectedEvent.start, 'HH:mm')} - {format(selectedEvent.end, 'HH:mm')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Ngày:</strong></td>
                                                <td>{format(selectedEvent.start, 'dd/MM/yyyy')}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Nhân viên:</strong></td>
                                                <td>{selectedEvent.staff_name}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Trạng thái:</strong></td>
                                                <td>{getStatusBadge(selectedEvent.status)}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            {selectedEvent.status === 'pending' && (
                                <Row>
                                    <Col className="d-flex gap-2 justify-content-end">
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            onClick={() => handleRejectSchedule(selectedEvent.id)}
                                        >
                                            Từ chối
                                        </Button>
                                        <Button 
                                            variant="success" 
                                            size="sm"
                                            onClick={() => handleApproveSchedule(selectedEvent.id)}
                                        >
                                            Duyệt
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default CalendarView; 