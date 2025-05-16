import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import staffWorkScheduleService from '../../../api/staffWorkScheduleService';
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

const ViewSchedule = () => {
    const [events, setEvents] = useState([]);
    const [viewType, setViewType] = useState('day');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSchedules();
    }, [viewType, currentDate]);

    const fetchSchedules = async () => {
        try {
            setLoading(true);
            console.log('1. Fetching schedules...');
            console.log('View Type:', viewType);
            console.log('Current Date:', format(currentDate, 'yyyy-MM-dd'));

            const response = await staffWorkScheduleService.getStaffSchedule(
                viewType,
                format(currentDate, 'yyyy-MM-dd')
            );

            // Chuyển đổi dữ liệu lịch thành format cho calendar
            const calendarEvents = response.map(schedule => {
                try {
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

                    return {
                        id: schedule.id,
                        title: `${schedule.title} (${schedule.assigned_count || 0} công việc)`,
                        start,
                        end,
                        status: schedule.status,
                        work_date: schedule.work_date,
                        start_time: schedule.start_time,
                        end_time: schedule.end_time,
                        assigned_count: schedule.assigned_count || 0
                    };
                } catch (error) {
                    console.error('Error parsing date for schedule:', error);
                    return null;
                }
            }).filter(event => event !== null);

            console.log('2. Number of events loaded:', calendarEvents.length);
            setEvents(calendarEvents);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            toast.error('Không thể tải lịch làm việc');
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEventClick = (event) => {
        console.log('Clicked event:', event);
        setSelectedEvent(event);
        setShowDetailsModal(true);
    };

    const handleNavigate = (newDate) => {
        console.log('Navigating to:', newDate);
        setCurrentDate(newDate);
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = '#ffc107'; // Default color

        // Màu sắc dựa trên status
        switch(event.status) {
            case 'approved':
                backgroundColor = '#28a745'; // Green for approved
                break;
            case 'rejected':
                backgroundColor = '#dc3545'; // Red for rejected
                break;
            case 'pending':
                backgroundColor = '#ffc107'; // Yellow for pending
                break;
            default:
                backgroundColor = '#6c757d'; // Grey for unknown status
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

    const handleCancelSchedule = async () => {
        if (!selectedEvent) return;

        try {
            setLoading(true);
            await staffWorkScheduleService.cancelSchedule(selectedEvent.id);
            toast.success('Đã hủy ca làm việc');
            setShowDetailsModal(false);
            fetchSchedules();
        } catch (error) {
            console.error('Error cancelling schedule:', error);
            toast.error('Không thể hủy ca làm việc');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid>
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
                                eventPropGetter={eventStyleGetter}
                                views={['day', 'week', 'month']}
                                view={viewType}
                                onView={(newView) => setViewType(newView)}
                                onSelectEvent={handleEventClick}
                                onNavigate={handleNavigate}
                                date={currentDate}
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
                            <div className="text-center mt-3">
                                <Button 
                                    variant="primary" 
                                    onClick={fetchSchedules}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang tải...' : 'Tải lại'}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal hiển thị chi tiết ca làm việc */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết ca làm việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <p><strong>Ca:</strong> {selectedEvent.title}</p>
                            <p><strong>Ngày:</strong> {format(new Date(selectedEvent.work_date), 'dd/MM/yyyy')}</p>
                            <p><strong>Giờ bắt đầu:</strong> {selectedEvent.start_time}</p>
                            <p><strong>Giờ kết thúc:</strong> {selectedEvent.end_time}</p>
                            <p><strong>Trạng thái:</strong> {
                                selectedEvent.status === 'approved' ? 'Đã duyệt' :
                                selectedEvent.status === 'pending' ? 'Chờ duyệt' :
                                'Đã từ chối'
                            }</p>
                            <p><strong>Số công việc:</strong> {selectedEvent.assigned_count}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedEvent?.status === 'pending' && (
                        <Button variant="danger" onClick={handleCancelSchedule}>
                            Hủy ca làm việc
                        </Button>
                    )}
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ViewSchedule;